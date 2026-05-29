const fs = require("node:fs");
const http = require("node:http");
const path = require("node:path");
const { pathToFileURL } = require("node:url");

const port = Number(process.env.PORT || 8080);
const root = process.cwd();

const mimeTypes = {
  ".html": "text/html;charset=utf-8",
  ".css": "text/css;charset=utf-8",
  ".js": "text/javascript;charset=utf-8",
  ".json": "application/json;charset=utf-8",
  ".svg": "image/svg+xml;charset=utf-8",
};

const rewriteSchema = {
  type: "object",
  additionalProperties: false,
  required: ["title", "todayChange", "whyImportant", "relationToYou", "focusNow", "keywords", "coreLine"],
  properties: {
    title: { type: "string" },
    todayChange: { type: "string" },
    whyImportant: { type: "string" },
    relationToYou: { type: "string" },
    focusNow: { type: "string" },
    keywords: {
      type: "array",
      maxItems: 3,
      items: { type: "string" },
    },
    coreLine: { type: "string" },
  },
};

const sliceSchema = {
  type: "object",
  additionalProperties: false,
  required: ["sliceTitle", "sliceReason", "changedRelation", "badVersionToAvoid"],
  properties: {
    sliceTitle: { type: "string" },
    sliceReason: { type: "string" },
    changedRelation: { type: "string" },
    badVersionToAvoid: { type: "string" },
  },
};

function readRequestBody(request) {
  return new Promise((resolve, reject) => {
    let body = "";

    request.on("data", (chunk) => {
      body += chunk;

      if (body.length > 100_000) {
        request.destroy();
        reject(new Error("Request body too large"));
      }
    });
    request.on("end", () => resolve(body));
    request.on("error", reject);
  });
}

function sendJson(response, statusCode, payload) {
  response.writeHead(statusCode, {
    "Content-Type": "application/json;charset=utf-8",
  });
  response.end(JSON.stringify(payload));
}

function getShanghaiDate() {
  return new Intl.DateTimeFormat("en-CA", {
    day: "2-digit",
    month: "2-digit",
    timeZone: "Asia/Shanghai",
    year: "numeric",
  }).format(new Date());
}

function clampSignalLimit(limit) {
  if (!Number.isFinite(limit)) return 18;
  return Math.min(18, Math.max(8, Math.floor(limit)));
}

async function loadPreparedSignalFallback(limit, fetchedAt) {
  const moduleUrl = pathToFileURL(path.join(root, "data", "prepared-signals.js")).href;
  const { preparedSignals } = await import(`${moduleUrl}?fallback=${Date.now()}`);

  return preparedSignals.slice(0, clampSignalLimit(limit)).map((signal) => ({
    ...signal,
    fetchedAt,
  }));
}

function extractOutputText(payload) {
  if (payload.output_text) {
    return payload.output_text;
  }

  const message = payload.output?.find((item) => item.type === "message");
  const textPart = message?.content?.find((item) => item.type === "output_text");
  return textPart?.text;
}

async function requestOpenAiJson({ schemaName, schema, systemPrompt, userPrompt, maxOutputTokens = 700 }) {
  const openaiResponse = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: process.env.OPENAI_MODEL || "gpt-4.1-mini",
      input: [
        {
          role: "system",
          content: [{ type: "input_text", text: systemPrompt }],
        },
        {
          role: "user",
          content: [{ type: "input_text", text: userPrompt }],
        },
      ],
      text: {
        format: {
          type: "json_schema",
          name: schemaName,
          strict: true,
          schema,
        },
      },
      temperature: 0.35,
      max_output_tokens: maxOutputTokens,
    }),
  });

  if (!openaiResponse.ok) {
    const errorText = await openaiResponse.text();
    console.error("OpenAI API error:", openaiResponse.status, errorText);
    throw new Error("OpenAI API request failed");
  }

  const payload = await openaiResponse.json();
  const outputText = extractOutputText(payload);

  if (!outputText) {
    console.error("OpenAI response did not include output text:", payload);
    throw new Error("OpenAI API response was empty");
  }

  return JSON.parse(outputText);
}

function buildRewriteSystemPrompt() {
  return [
    "你不是新闻总结助手。",
    "你是“时代信息编辑”。",
    "",
    "你的任务不是生成更多信息，而是判断：什么值得被谁看见。",
    "你需要把一条时代变化，重构成某个身份真正需要理解的信息价值。",
    "",
    "要求：",
    "- 不写鸡汤",
    "- 不写空泛鼓励",
    "- 不重复新闻",
    "- 不要“拥抱未来”“赋能每个人”这种话",
    "- 强调真实变化",
    "- 强调对该身份的实际关系",
    "- 输出必须简洁",
    "- 像未来消费品标签上的文字",
    "- 目标是减少 FOMO，而不是制造更多焦虑",
    "",
    "核心叙事必须隐含在输出里：",
    "过去，人们买水是为了解渴。",
    "后来，人们购买品牌。",
    "而 AI 时代，人们开始购买“对这个时代的理解”。",
    "于是，我们把今天真正重要的一则变化，装进了一杯咖啡里。",
  ].join("\n");
}

function buildRewriteUserPrompt({ signal, identity }) {
  return [
    "请根据以下输入生成身份化价值重构：",
    "",
    "时代切片：",
    signal.slice,
    "",
    "切片说明：",
    signal.shortReason,
    "",
    "用户身份：",
    identity.name,
    "",
    "输出 JSON：",
    "{",
    '  "title": "不超过20字",',
    '  "todayChange": "不超过50字",',
    '  "whyImportant": "不超过60字",',
    '  "relationToYou": "不超过60字",',
    '  "focusNow": "不超过60字",',
    '  "keywords": ["最多3个关键词"],',
    '  "coreLine": "适合放在咖啡杯标签上的一句核心判断，不超过28字"',
    "}",
  ].join("\n");
}

function buildSliceSystemPrompt() {
  return [
    "你不是新闻标题生成器。",
    "你也不是营销文案助手。",
    "",
    "你是“时代切片编辑”。",
    "",
    "你的任务不是把新闻写得更好听，而是从一条真实信息中提炼：这件事说明世界正在发生什么具体变化。",
    "",
    "请严格区分：",
    "新闻标题：发生了什么",
    "时代切片：这说明什么正在改变",
    "",
    "生成时代切片时必须遵守：",
    "1. 必须基于输入信息，不能凭空造概念。",
    "2. 不要写成行业报告标题。",
    "3. 不要写成鸡汤金句。",
    "4. 不要写成宏大口号。",
    "5. 不要使用“赋能、重塑、革新、进入链路、深度融合、开启新时代”等词。",
    "6. 尽量写成一个具体变化：从 A 到 B；某个边界正在消失；某个能力正在换定义；某个日常场景正在被改变。",
    "7. 句子要短，像一张贴在咖啡杯上的信息标签。",
    "8. 读起来要像冷静判断，不像广告。",
    "",
    "你可以在内部思考表面事件、背后的时代变化、正在变化的关系、受影响的人，但最后只输出 JSON。",
  ].join("\n");
}

function buildSliceUserPrompt({ rawTitle, rawSummary, source }) {
  return [
    "输入：",
    `原始信息标题：${rawTitle}`,
    `原始信息摘要：${rawSummary}`,
    `来源：${source}`,
    "",
    "请先在内部思考：",
    "- 表面事件是什么？",
    "- 背后的时代变化是什么？",
    "- 哪个关系正在变化？",
    "- 哪些人会受到影响？",
    "",
    "最后只输出 JSON：",
    "{",
    '  "sliceTitle": "一句时代切片，不超过22个中文字",',
    '  "sliceReason": "解释这条切片为什么值得被看见，不超过45个中文字",',
    '  "changedRelation": "这条信息背后正在变化的关系，例如 人与工具 / 人与知识 / 人与消费 / 人与工作",',
    '  "badVersionToAvoid": "一个不应该使用的生硬标题"',
    "}",
  ].join("\n");
}

async function handleRewrite(request, response) {
  if (request.method !== "POST") {
    sendJson(response, 405, { error: "Method not allowed" });
    return;
  }

  if (!process.env.OPENAI_API_KEY) {
    sendJson(response, 500, { error: "OPENAI_API_KEY is not configured" });
    return;
  }

  try {
    const body = JSON.parse(await readRequestBody(request));
    const { signal, identity } = body;

    if (!signal?.slice || !signal?.shortReason || !identity?.name || !identity?.label) {
      sendJson(response, 400, { error: "Missing signal or identity fields" });
      return;
    }

    const result = await requestOpenAiJson({
      schemaName: "time_slice_value_rewrite",
      schema: rewriteSchema,
      systemPrompt: buildRewriteSystemPrompt(),
      userPrompt: buildRewriteUserPrompt({ signal, identity }),
    });

    sendJson(response, 200, result);
  } catch (error) {
    console.error("Rewrite route failed:", error);
    sendJson(response, 500, { error: "Rewrite route failed" });
  }
}

async function handleSlice(request, response) {
  if (request.method !== "POST") {
    sendJson(response, 405, { error: "Method not allowed" });
    return;
  }

  if (!process.env.OPENAI_API_KEY) {
    sendJson(response, 500, { error: "OPENAI_API_KEY is not configured" });
    return;
  }

  try {
    const body = JSON.parse(await readRequestBody(request));
    const { rawTitle, rawSummary, source } = body;

    if (!rawTitle || !rawSummary || !source) {
      sendJson(response, 400, { error: "Missing rawTitle, rawSummary, or source" });
      return;
    }

    const result = await requestOpenAiJson({
      schemaName: "time_slice_signal_slice",
      schema: sliceSchema,
      systemPrompt: buildSliceSystemPrompt(),
      userPrompt: buildSliceUserPrompt({ rawTitle, rawSummary, source }),
      maxOutputTokens: 500,
    });

    sendJson(response, 200, result);
  } catch (error) {
    console.error("Slice route failed:", error);
    sendJson(response, 500, { error: "Slice route failed" });
  }
}

async function handlePrepareSignals(request, response) {
  if (request.method !== "POST") {
    sendJson(response, 405, { error: "Method not allowed" });
    return;
  }

  const fetchedAt = getShanghaiDate();

  try {
    const bodyText = await readRequestBody(request);
    const body = bodyText ? JSON.parse(bodyText) : {};
    const limit = clampSignalLimit(Number(body.limit));

    const signals = await loadPreparedSignalFallback(limit, fetchedAt);
    sendJson(response, 200, { signals, fallback: true, reason: "Using local raw signal mock" });
  } catch (error) {
    console.error("Prepare signals route failed; using local fallback.", error);
    const signals = await loadPreparedSignalFallback(12, fetchedAt);

    sendJson(response, 200, { signals, fallback: true, reason: "Prepare signals route failed" });
  }
}

function serveStatic(request, response) {
  const url = new URL(request.url, `http://${request.headers.host}`);
  let pathname = decodeURIComponent(url.pathname);

  if (pathname === "/") {
    pathname = "/index.html";
  }

  const filePath = path.resolve(root, `.${pathname}`);

  if (!filePath.startsWith(root)) {
    response.writeHead(403);
    response.end("Forbidden");
    return;
  }

  fs.readFile(filePath, (error, data) => {
    if (error) {
      response.writeHead(404);
      response.end("Not found");
      return;
    }

    response.writeHead(200, {
      "Content-Type": mimeTypes[path.extname(filePath)] || "application/octet-stream",
    });
    response.end(data);
  });
}

const server = http.createServer((request, response) => {
  if (request.url?.startsWith("/api/rewrite")) {
    handleRewrite(request, response);
    return;
  }

  if (request.url?.startsWith("/api/slice")) {
    handleSlice(request, response);
    return;
  }

  if (request.url?.startsWith("/api/prepare-signals")) {
    handlePrepareSignals(request, response);
    return;
  }

  serveStatic(request, response);
});

server.listen(port, "127.0.0.1", () => {
  console.log(`Time Slice Coffee demo running at http://127.0.0.1:${port}`);
});
