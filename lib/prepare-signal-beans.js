import { signalShelves } from "../data/signal-shelves.js";

export const SIGNAL_EDITOR_RULES = [
  "你不是新闻总结助手。",
  "你是时代切片编辑。",
  "你的任务不是复述新闻，而是判断这件事说明世界正在发生什么变化，以及它是否值得被不同身份的人看见。",
  "不写鸡汤，不写行业报告腔，不写赋能、重塑、革新、开启新时代。",
  "不直接展示 X 原文，要输出像信息豆货架上的时代切片。",
  "句子要自然、具体、有判断。",
];

const DEFAULT_SHELF_ID = "trust-society";
const BANNED_TERMS = ["赋能", "重塑", "革新", "开启新时代"];

const relationByShelf = {
  "ai-work": "人与工作",
  learning: "人与知识",
  creation: "人与创作",
  "life-consumption": "人与消费",
  "climate-agriculture": "人与环境",
  "trust-society": "人与信任",
};

const titleTemplates = {
  "ai-work": [
    "工具开始接手流程里的中间步骤。",
    "会安排工具，正在比会使用工具更重要。",
    "工作里的重复动作，正在被重新分配。",
  ],
  learning: [
    "答案越容易得到，问题越需要被判断。",
    "学习开始从记住内容，转向判断路径。",
    "知识变多之后，选择问题变得更难。",
  ],
  creation: [
    "生成变快之后，取舍变得更贵。",
    "创意和执行之间的距离正在变短。",
    "工具会产出更多版本，人要负责方向。",
  ],
  "life-consumption": [
    "推荐不只陈列商品，也在设计选择。",
    "下一次影响购买的，可能是一套系统。",
    "日常消费正在变成被计算过的对话。",
  ],
  "climate-agriculture": [
    "天气正在进入每个人的成本表。",
    "土地之外的系统，正在决定田里的结果。",
    "气候不再只是背景，而是供应链变量。",
  ],
  "trust-society": [
    "看见信息，不等于理解信息。",
    "真实感越强，来源越需要被看见。",
    "信息越多，判断立场越重要。",
  ],
};

const reasonTemplates = {
  "ai-work": "这条信号说明，AI 不只是提供建议，也开始进入研究、整理、协作和交付这些具体环节。",
  learning: "这条信号说明，当答案变得便宜，学习能力会更多落在提问、验证和判断上。",
  creation: "这条信号说明，生成工具降低了产出门槛，但方向、结构和取舍反而更关键。",
  "life-consumption": "这条信号说明，推荐和购买不再只是展示商品，而是在组织人的注意和选择。",
  "climate-agriculture": "这条信号说明，天气、土地、物流和价格正在连成一条更贴近日常生活的变化链。",
  "trust-society": "这条信号说明，信息抵达得越快，人越需要判断来源、语境和没有被说出的部分。",
};

const shelfKeywords = {
  "ai-work": ["work", "job", "office", "agent", "workflow", "productivity", "enterprise", "software", "automation", "tool"],
  learning: ["learn", "education", "student", "school", "university", "course", "teacher", "knowledge", "study"],
  creation: ["design", "creative", "creator", "content", "interface", "video", "image", "music", "writing", "generate"],
  "life-consumption": ["shop", "retail", "consumer", "consumption", "recommendation", "purchase", "brand", "commerce", "daily"],
  "climate-agriculture": ["climate", "weather", "farm", "agriculture", "food", "crop", "supply chain", "energy", "land"],
  "trust-society": ["trust", "source", "society", "media", "misinformation", "verify", "truth", "policy", "public", "safety"],
};

function clampPreparedCount(limit) {
  if (!Number.isFinite(limit)) return 18;
  return Math.min(18, Math.max(8, Math.floor(limit)));
}

function sanitizeText(value) {
  const text = String(value || "").replace(/\s+/g, " ").trim();
  return BANNED_TERMS.reduce((next, term) => next.replaceAll(term, ""), text);
}

function getShelf(shelfId) {
  return signalShelves.find((shelf) => shelf.shelfId === shelfId) || signalShelves.find((shelf) => shelf.shelfId === DEFAULT_SHELF_ID);
}

export function classifySignal(rawSignal) {
  const text = `${rawSignal.categoryHint || ""} ${rawSignal.rawTitle || ""} ${rawSignal.rawSummary || ""}`.toLowerCase();

  for (const [shelfId, keywords] of Object.entries(shelfKeywords)) {
    if (keywords.some((keyword) => text.includes(keyword))) {
      return shelfId;
    }
  }

  return DEFAULT_SHELF_ID;
}

export function normalizeRawSignals(rawSignals, fetchedAt) {
  if (!Array.isArray(rawSignals)) return [];

  return rawSignals
    .map((signal) => ({
      rawTitle: sanitizeText(signal?.rawTitle || signal?.title || ""),
      rawSummary: sanitizeText(signal?.rawSummary || signal?.summary || signal?.text || ""),
      rawUrl: sanitizeText(signal?.rawUrl || signal?.url || ""),
      source: "X / Grok Search",
      whyWorthWatching: sanitizeText(signal?.whyWorthWatching || signal?.reason || signal?.rawSummary || signal?.summary || ""),
      fetchedAt,
      categoryHint: sanitizeText(signal?.categoryHint || signal?.category || ""),
    }))
    .filter((signal) => signal.rawTitle || signal.rawSummary);
}

export function prepareSignalBeans(rawSignals, options = {}) {
  const fetchedAt = options.fetchedAt || new Date().toISOString().slice(0, 10);
  const targetCount = clampPreparedCount(options.limit);
  const normalizedSignals = normalizeRawSignals(rawSignals, fetchedAt).slice(0, targetCount);

  return normalizedSignals
    .map((rawSignal, index) => {
      const shelfId = classifySignal(rawSignal);
      const shelf = getShelf(shelfId);
      const titlePool = titleTemplates[shelfId] || titleTemplates[DEFAULT_SHELF_ID];
      const sliceTitle = titlePool[index % titlePool.length];
      const sliceReason = reasonTemplates[shelfId] || reasonTemplates[DEFAULT_SHELF_ID];
      const score = Math.max(0.72, Number((0.96 - index * 0.025).toFixed(2)));

      return {
        id: String(101 + index).padStart(3, "0"),
        shelfId,
        shelfTitle: shelf.title,
        sliceTitle,
        sliceReason,
        relation: relationByShelf[shelfId] || relationByShelf[DEFAULT_SHELF_ID],
        source: rawSignal.source || "X / Grok Search",
        rawTitle: rawSignal.rawTitle,
        rawUrl: rawSignal.rawUrl,
        rawSummary: rawSignal.rawSummary,
        whyWorthWatching: rawSignal.whyWorthWatching,
        score,
        fetchedAt,
        coreJudgment: sliceTitle.replace(/。$/, ""),
        keywords: [shelf.title.split(" / ")[0], "Signal", "Judgment"],
      };
    })
    .sort((a, b) => b.score - a.score);
}
