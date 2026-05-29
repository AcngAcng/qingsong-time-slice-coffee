import { signalShelves } from "../data/signal-shelves.js";

export type RawSignal = {
  id?: string;
  shelfId?: string;
  shelfTitle?: string;
  rawTitle: string;
  rawTitleZh?: string;
  rawSummary: string;
  rawSummaryZh?: string;
  rawUrl: string;
  source: "X / Grok Search";
  whyWorthWatching: string;
  whyWorthWatchingZh?: string;
  fetchedAt: string;
  categoryHint: string;
};

export type PreparedSignalBean = {
  id: string;
  shelfId: string;
  shelfTitle: string;
  sliceTitle: string;
  sliceReason: string;
  relation: string;
  source: "X / Grok Search";
  rawTitle: string;
  rawUrl: string;
  rawSummary: string;
  whyWorthWatching: string;
  score: number;
  fetchedAt: string;
  coreJudgment?: string;
  keywords?: string[];
};

export const SIGNAL_EDITOR_RULES = [
  "你不是新闻总结助手。",
  "你是时代切片编辑。",
  "你的任务不是复述新闻，而是判断这件事说明世界正在发生什么变化，以及它是否值得被不同身份的人看见。",
  "不写鸡汤，不写行业报告腔，不写赋能、重塑、革新、开启新时代。",
  "不直接展示 X 原文，要输出像信息豆货架上的时代切片。",
  "句子要自然、具体、有判断。",
];

const DEFAULT_SHELF_ID = "life-signals";
const BANNED_TERMS = ["赋能", "重塑", "革新", "开启新时代"];
const MAX_PREPARED_COUNT = 54;

const relationByShelf: Record<string, string> = {
  "ai-frontier": "人与模型",
  "build-workflow": "人与工具链",
  "design-creation": "人与创作",
  "market-capital": "人与市场",
  "self-upgrade": "人与能力",
  "life-signals": "人与日常",
};

const titleTemplates: Record<string, string[]> = {
  "ai-frontier": ["模型和 Agent 正在把技术边界往外推。", "AI 基础设施开始决定谁能更快行动。", "技术前沿正在从能力演示走向真实场景。"],
  "build-workflow": ["工具开始接手流程里的中间步骤。", "会安排工具，正在比会使用工具更重要。", "工作里的重复动作，正在被重新分配。"],
  "design-creation": ["生成变快之后，取舍变得更贵。", "创意和执行之间的距离正在变短。", "工具会产出更多版本，人要负责方向。"],
  "market-capital": ["市场开始给 AI 变化重新定价。", "资本情绪正在暴露新的机会和风险。", "价格、资金和预期正在变成时代信号。"],
  "self-upgrade": ["答案越容易得到，问题越需要被判断。", "学习开始从记住内容，转向判断路径。", "知识变多之后，选择问题变得更难。"],
  "life-signals": ["推荐不只陈列商品，也在设计选择。", "天气正在进入每个人的成本表。", "看见信息，不等于理解信息。", "日常选择正在变成被系统解释过的对话。"],
};

const reasonTemplates: Record<string, string> = {
  "ai-frontier": "这条信号说明，模型、Agent 与 AI 基础设施正在改变技术边界。",
  "build-workflow": "这条信号说明，代码、工具链与自动化流程正在改变产品构建方式。",
  "design-creation": "这条信号说明，生成工具、版权争议与创作者工作流正在被重新定义。",
  "market-capital": "这条信号说明，资本、加密与 AI 公司动态正在释放新的机会信号。",
  "self-upgrade": "这条信号说明，当答案越来越便宜，个人真正需要更新的是判断力。",
  "life-signals": "这条信号说明，气候、医疗、教育与消费正在进入每个人的日常判断。",
};

const shelfKeywords: Record<string, string[]> = {
  "ai-frontier": ["openai", "anthropic", "xai", "grok", "claude", "deepmind", "model", "agent", "robot", "robotics", "safety", "paper", "research", "infra", "infrastructure"],
  "build-workflow": ["cursor", "codex", "claude code", "github copilot", "dspy", "coding", "code", "developer", "toolchain", "workflow", "automation", "delivery", "linear", "notion", "slack"],
  "design-creation": ["design", "creative", "creator", "content", "video", "image", "music", "animation", "copyright", "ip", "film", "generate"],
  "market-capital": ["market", "crypto", "stock", "funding", "nvidia", "macro", "capital", "price", "valuation", "consumer data", "finance"],
  "self-upgrade": ["learn", "course", "student", "school", "skill", "habit", "career", "judgment", "fomo", "routine", "teacher", "study"],
  "life-signals": ["education", "health", "medical", "climate", "weather", "farm", "agriculture", "city", "consumer", "daily", "trust", "source", "platform", "public", "cost", "retail", "shop"],
};

function clampPreparedCount(limit?: number) {
  if (!Number.isFinite(limit)) return MAX_PREPARED_COUNT;
  return Math.min(MAX_PREPARED_COUNT, Math.max(8, Math.floor(limit || MAX_PREPARED_COUNT)));
}

function sanitizeText(value: unknown) {
  const text = String(value || "").replace(/\s+/g, " ").trim();
  return BANNED_TERMS.reduce((next, term) => next.replaceAll(term, ""), text);
}

function getShelf(shelfId: string) {
  return signalShelves.find((shelf) => shelf.shelfId === shelfId) || signalShelves.find((shelf) => shelf.shelfId === DEFAULT_SHELF_ID)!;
}

export function classifySignal(rawSignal: Partial<RawSignal>) {
  if (signalShelves.some((shelf) => shelf.shelfId === rawSignal.shelfId)) {
    return rawSignal.shelfId!;
  }

  const text = `${rawSignal.categoryHint || ""} ${rawSignal.rawTitle || ""} ${rawSignal.rawSummary || ""}`.toLowerCase();

  for (const [shelfId, keywords] of Object.entries(shelfKeywords)) {
    if (keywords.some((keyword) => text.includes(keyword))) return shelfId;
  }

  return DEFAULT_SHELF_ID;
}

export function normalizeRawSignals(rawSignals: unknown, fetchedAt: string): RawSignal[] {
  if (!Array.isArray(rawSignals)) return [];

  return rawSignals
    .map((signal: any) => ({
      id: sanitizeText(signal?.id || ""),
      shelfId: sanitizeText(signal?.shelfId || ""),
      shelfTitle: sanitizeText(signal?.shelfTitle || ""),
      rawTitle: sanitizeText(signal?.rawTitle || signal?.title || ""),
      rawTitleZh: sanitizeText(signal?.rawTitleZh || signal?.rawTitle || signal?.title || ""),
      rawSummary: sanitizeText(signal?.rawSummary || signal?.summary || signal?.text || ""),
      rawSummaryZh: sanitizeText(signal?.rawSummaryZh || signal?.rawSummary || signal?.summary || signal?.text || ""),
      rawUrl: sanitizeText(signal?.rawUrl || signal?.url || ""),
      source: sanitizeText(signal?.source || "X / Grok Search") as "X / Grok Search",
      whyWorthWatching: sanitizeText(signal?.whyWorthWatching || signal?.reason || signal?.rawSummary || signal?.summary || ""),
      whyWorthWatchingZh: sanitizeText(signal?.whyWorthWatchingZh || signal?.whyWorthWatching || signal?.reason || signal?.rawSummary || signal?.summary || ""),
      fetchedAt: sanitizeText(signal?.fetchedAt || fetchedAt),
      categoryHint: sanitizeText(signal?.categoryHint || signal?.category || ""),
    }))
    .filter((signal) => signal.rawTitle || signal.rawSummary);
}

function buildSliceReason(rawSignal: RawSignal, shelfId: string) {
  const evidence = sanitizeText(rawSignal.whyWorthWatching || rawSignal.rawSummary || rawSignal.rawTitle);
  if (evidence) return evidence;
  return reasonTemplates[shelfId] || reasonTemplates[DEFAULT_SHELF_ID];
}

export function prepareSignalBeans(rawSignals: unknown, options: { fetchedAt?: string; limit?: number } = {}): PreparedSignalBean[] {
  const fetchedAt = options.fetchedAt || new Date().toISOString().slice(0, 10);
  const targetCount = clampPreparedCount(options.limit);
  const normalizedSignals = normalizeRawSignals(rawSignals, fetchedAt).slice(0, targetCount);

  return normalizedSignals
    .map((rawSignal, index) => {
      const shelfId = classifySignal(rawSignal);
      const shelf = getShelf(shelfId);
      const titlePool = titleTemplates[shelfId] || titleTemplates[DEFAULT_SHELF_ID];
      const sliceTitle = titlePool[index % titlePool.length];
      const sliceReason = buildSliceReason(rawSignal, shelfId);
      const score = Math.max(0.78, Number((0.96 - (index % 9) * 0.02).toFixed(2)));

      return {
        id: rawSignal.id || String(101 + index).padStart(3, "0"),
        shelfId,
        shelfTitle: rawSignal.shelfTitle || shelf.title,
        sliceTitle,
        sliceReason,
        relation: relationByShelf[shelfId] || relationByShelf[DEFAULT_SHELF_ID],
        source: rawSignal.source,
        rawTitle: rawSignal.rawTitle,
        rawTitleZh: rawSignal.rawTitleZh || rawSignal.rawTitle,
        rawUrl: rawSignal.rawUrl,
        rawSummary: rawSignal.rawSummary,
        rawSummaryZh: rawSignal.rawSummaryZh || rawSignal.rawSummary,
        whyWorthWatching: rawSignal.whyWorthWatching,
        whyWorthWatchingZh: rawSignal.whyWorthWatchingZh || rawSignal.whyWorthWatching,
        score,
        fetchedAt: rawSignal.fetchedAt || fetchedAt,
        coreJudgment: sliceTitle.replace(/。$/, ""),
        keywords: [shelf.title.split(" / ")[0], "Signal", "Judgment"],
      };
    })
}
