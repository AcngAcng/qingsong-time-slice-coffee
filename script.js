import { preparedSignals } from "./data/prepared-signals.js";
import { candidateSignalsExpanded } from "./data/candidate-signals-expanded.js";
import { signalShelves } from "./data/signal-shelves.js";
import { identities, valueRewrites } from "./data/signals.js";

const shelfGrid = document.querySelector("#shelf-grid");
const signalBeanStage = document.querySelector("#signal-bean-stage");
const signalGrid = document.querySelector("#signal-grid");
const selectedSignalPanel = document.querySelector("#selected-signal-panel");
const identityGrid = document.querySelector("#identity-grid");
const strengthGrid = document.querySelector("#strength-grid");
const serveGrid = document.querySelector("#serve-grid");
const identitySection = document.querySelector("#identity-section");
const brewSection = document.querySelector("#brew-section");
const serveSection = document.querySelector("#serve-section");
const valueSection = document.querySelector("#value-section");
const labelSection = document.querySelector("#label-section");
const valueTitle = document.querySelector("#value-title");
const valuePanel = document.querySelector("#value-panel");
const productPreview = document.querySelector("#product-preview");
const printLabel = document.querySelector("#print-label");
const pickupLabel50x70Preview = document.querySelector("#pickup-50x70-label");
const devLabel50x70Current = document.querySelector("#label-50x70-current");
const devLabel50x70CurrentMeta = document.querySelector("#label-50x70-current-meta");
const printButton = document.querySelector("#print-button");
const resetButton = document.querySelector("#reset-button");
const brewButton = document.querySelector("#brew-button");
const refreshSignalsButton = document.querySelector("#refresh-signals-button");
const signalRefreshStatus = document.querySelector("#signal-refresh-status");
const heroCodeCup = document.querySelector("#hero-code-cup");
const codeCupField = document.querySelector("#code-cup-field");
const heroOrderButton = document.querySelector(".hero-actions .primary");
const sliceReceiptPreview = document.createElement("aside");
const isCandidateSignalMode = new URLSearchParams(window.location.search).get("signals") === "candidate";
const baseSignalSource = isCandidateSignalMode ? candidateSignalsExpanded : preparedSignals;
const SHOW_CUP_OVERLAY_LABEL = true;
const DEFAULT_HEADER_OFFSET = 72;
const DEFAULT_SCROLL_EXTRA_OFFSET = 40;
const sectionScrollOffsets = {
  top: 0,
  signals: -210,
  "signal-flow-anchor": 84,
  "signal-bean-stage": 560,
  "selected-signal-panel": 88,
  "identity-section": 88,
  "brew-section": 88,
  "serve-section": 76,
  "value-section": 16,
  "label-section": 56,
};
const signalsIntroOffset = 84;
const signalsActiveOffset = 64;

if ("scrollRestoration" in window.history) {
  window.history.scrollRestoration = "manual";
}

const strengths = [
  {
    id: "light",
    label: "Light",
    description: "只看核心判断",
  },
  {
    id: "regular",
    label: "Regular",
    description: "理解变化关系",
  },
  {
    id: "double",
    label: "Double",
    description: "看见与你有关的重点",
  },
];

const serveStyles = [
  {
    id: "hot",
    label: "Served Hot",
    vessel: "Paper Cup",
    description: "A daily signal to carry with you.",
    cn: "热饮 / 纸杯",
    cnDescription: "把今天的理解带在手里。",
  },
  {
    id: "iced",
    label: "Served Iced",
    vessel: "Clear Cup",
    description: "A visible slice of today.",
    cn: "冰饮 / 透明杯",
    cnDescription: "把今天的变化看得更清楚。",
  },
];

const identityIntentDisplay = {
  student: {
    option: "Learn / 学点什么",
    description: "一杯清醒点的",
    forLabel: "FOR LEARNING",
  },
  builder: {
    option: "Build / 做点东西",
    description: "一杯能动手的",
    forLabel: "FOR BUILDING",
  },
  designer: {
    option: "Create / 创作表达",
    description: "一杯有灵感的",
    forLabel: "FOR CREATING",
  },
  founder: {
    option: "Spot Opportunity / 找机会",
    description: "一杯看见机会的",
    forLabel: "FOR OPPORTUNITY",
  },
  vc: {
    option: "Make a Decision / 做判断",
    description: "一杯帮你定下来的",
    forLabel: "FOR DECIDING",
  },
  everyday: {
    option: "Ease FOMO / 少焦虑一点",
    description: "一杯少点噪音的",
    forLabel: "FOR LESS FOMO",
  },
};

const legacyIdentityForLabel = {
  STUDENT: "FOR LEARNING",
  LEARNING: "FOR LEARNING",
  BUILDER: "FOR BUILDING",
  BUILDING: "FOR BUILDING",
  DESIGNER: "FOR CREATING",
  CREATING: "FOR CREATING",
  FOUNDER: "FOR OPPORTUNITY",
  OPPORTUNITY: "FOR OPPORTUNITY",
  VC: "FOR DECIDING",
  DECIDING: "FOR DECIDING",
  "EVERYDAY PERSON": "FOR LESS FOMO",
  EVERYDAY: "FOR LESS FOMO",
  "LESS FOMO": "FOR LESS FOMO",
};

const receiptChoiceLabels = {
  student: "学点什么",
  builder: "做点东西",
  designer: "创作表达",
  founder: "找机会",
  vc: "做判断",
  everyday: "少焦虑一点",
};

sliceReceiptPreview.id = "slice-receipt-preview";
sliceReceiptPreview.className = "slice-receipt-preview";
sliceReceiptPreview.setAttribute("aria-live", "polite");

let selectedSignal = null;
let selectedShelfId = null;
let selectedIdentity = null;
let selectedStrength = strengths[1];
let selectedServeStyle = serveStyles[0];
let activeRewrite = null;
let activeSignals = baseSignalSource;
let isPreparingSignals = false;
let signalRoundIndex = 0;
let generatedLabel = null;
let currentCanonicalSlice = null;
let currentCanonicalSignalId = null;
let hasVisitedSignals = false;
let hasSelectedStrength = false;
let hasSelectedServeStyle = false;

const signalMarkByShelf = {
  "ai-frontier": "ai-frontier",
  "build-workflow": "build-workflow",
  "design-creation": "design-creation",
  "market-capital": "market-capital",
  "self-upgrade": "self-upgrade",
  "life-signals": "life-signals",
};

const labelShelfByShelf = {
  "ai-frontier": "AI FRONTIER",
  "build-workflow": "BUILD & WORKFLOW",
  "design-creation": "DESIGN & CREATION",
  "market-capital": "MARKET & CAPITAL",
  "self-upgrade": "SELF UPGRADE",
  "life-signals": "LIFE SIGNALS",
};

const legacyShelfIdMap = {
  "ai-work": "ai-frontier",
  learning: "self-upgrade",
  creation: "design-creation",
  "life-consumption": "life-signals",
  "climate-agriculture": "life-signals",
  "trust-society": "life-signals",
};

const codeCupTokens = [
  "0",
  "1",
  "/",
  "{",
  "}",
  "[",
  "]",
  "<",
  ">",
  ":",
  ";",
  "=",
  ".",
  "signal",
  "slice",
  "value",
  "label",
  "fetch",
  "parse",
  "rewrite",
  "emit",
];

function seededRandom(seed) {
  const value = Math.sin(seed * 999.91) * 10000;
  return value - Math.floor(value);
}

function getCupBodyEdge(y) {
  const t = Math.max(0, Math.min(1, (y - 30) / 58));

  return {
    center: 47,
    half: 23 - t * 8,
  };
}

function getCodeCupPoint(x, y, seed) {
  const random = seededRandom(seed);
  const cap = y >= 15 && y <= 25 && Math.abs(x - 44) < 15 + (y - 15) * 0.52;
  const rim = y >= 24 && y <= 32 && Math.abs(x - 45) < 32 - Math.abs(y - 28) * 1.4;
  const bodyEdge = getCupBodyEdge(y);
  const body = y >= 30 && y <= 88 && Math.abs(x - bodyEdge.center) < bodyEdge.half;
  const rightEdge = bodyEdge.center + bodyEdge.half;
  const edgeMist = y >= 18 && y <= 76 && x > rightEdge && x < rightEdge + 16 && random < 0.11 - (x - rightEdge) * 0.004;

  if (!cap && !rim && !body && !edgeMist) return null;

  const leftShadow = x < bodyEdge.center - bodyEdge.half * 0.38 ? 0.24 : 0;
  const edgeShadow = body && Math.abs(Math.abs(x - bodyEdge.center) - bodyEdge.half) < 2.2 ? 0.18 : 0;
  const rimShadow = rim ? 0.28 : 0;
  const capShadow = cap && x < 43 ? 0.18 : 0;
  const rightFade = x > bodyEdge.center + bodyEdge.half * 0.34 ? -0.18 : 0;
  const baseOpacity = edgeMist ? 0.2 + random * 0.22 : Math.max(0.32, Math.min(0.76, 0.42 + leftShadow + edgeShadow + rimShadow + capShadow + rightFade + random * 0.16));

  return {
    baseOpacity,
    peakOpacity: Math.min(1, baseOpacity + 0.24),
    isCore: body && x > 38 && x < 56 && y > 38 && y < 68,
    isEdge: edgeMist,
  };
}

function renderCodeCupVisual() {
  if (!codeCupField) return;

  const isCompact = window.matchMedia("(max-width: 680px)").matches;
  const rows = isCompact ? 42 : 54;
  const cols = isCompact ? 28 : 36;
  const fragment = document.createDocumentFragment();
  let rendered = 0;

  codeCupField.innerHTML = "";

  for (let row = 0; row < rows; row += 1) {
    for (let col = 0; col < cols; col += 1) {
      const seed = row * 101 + col * 17 + 7;
      const jitterX = (seededRandom(seed + 1) - 0.5) * 1.15;
      const jitterY = (seededRandom(seed + 2) - 0.5) * 0.9;
      const x = 16 + (col / (cols - 1)) * 70 + jitterX;
      const y = 12 + (row / (rows - 1)) * 78 + jitterY;
      const point = getCodeCupPoint(x, y, seed);

      if (!point) continue;

      const densityGate = point.isEdge ? 0.74 : point.isCore ? 0.05 : 0.18;
      if (seededRandom(seed + 3) < densityGate) continue;
      if (rendered > (isCompact ? 430 : 690)) break;

      const token = codeCupTokens[Math.floor(seededRandom(seed + 4) * codeCupTokens.length)];
      const span = document.createElement("span");

      span.className = `code-token${token.length <= 1 ? " is-dot" : ""}${point.isCore ? " is-core" : ""}${point.isEdge ? " is-edge" : ""}`;
      span.textContent = token;
      span.style.setProperty("--x", x.toFixed(2));
      span.style.setProperty("--y", y.toFixed(2));
      span.style.setProperty("--base-opacity", point.baseOpacity.toFixed(2));
      span.style.setProperty("--peak-opacity", point.peakOpacity.toFixed(2));
      span.style.setProperty("--delay", `${(seededRandom(seed + 5) * -5).toFixed(2)}s`);
      span.style.setProperty("--duration", `${(2 + seededRandom(seed + 6) * 3).toFixed(2)}s`);
      span.style.setProperty("--drift", `${(0.45 + seededRandom(seed + 7) * 1.55).toFixed(2)}px`);
      span.style.setProperty("--token-size", `${(isCompact ? 5.7 : 6.2) + seededRandom(seed + 8) * (token.length > 1 ? 1.4 : 4.6)}px`);

      fragment.appendChild(span);
      rendered += 1;
    }
  }

  codeCupField.appendChild(fragment);
}

function pulseCodeCup(className, duration = 1600) {
  if (!heroCodeCup) return;

  heroCodeCup.classList.add(className);
  window.setTimeout(() => {
    if (className !== "is-brewing") {
      heroCodeCup.classList.remove(className);
    }
  }, duration);
}

function setCodeCupBrewing(isBrewing) {
  if (!heroCodeCup) return;

  heroCodeCup.classList.toggle("is-brewing", isBrewing);
  if (isBrewing) {
    heroCodeCup.classList.remove("is-complete");
  }
}

function setCodeCupComplete() {
  if (!heroCodeCup) return;

  const labelNumber = heroCodeCup.querySelector(".code-cup-label strong");
  if (labelNumber) {
    labelNumber.textContent = selectedSignal?.id ? `#${selectedSignal.id}` : "#000";
  }

  heroCodeCup.classList.remove("is-brewing", "is-ordering");
  heroCodeCup.classList.add("is-complete");
}

function getHeaderScrollOffset() {
  const header = document.querySelector(".site-header");
  const headerHeight = header?.getBoundingClientRect().height || DEFAULT_HEADER_OFFSET;

  return Math.ceil(headerHeight + DEFAULT_SCROLL_EXTRA_OFFSET);
}

function getSectionTarget(section) {
  if (!section) return null;
  if (typeof section === "string") {
    return document.querySelector(section.startsWith("#") ? section : `#${section}`);
  }

  return section;
}

function scrollToSection(section, options = {}) {
  const target = getSectionTarget(section);
  if (!target) return;

  const behavior = options.behavior || "smooth";
  const targetId = options.offsetKey || target.id || "";
  const offset = options.offset ?? sectionScrollOffsets[targetId] ?? getHeaderScrollOffset();
  const top = targetId === "top" || offset === 0
    ? 0
    : Math.max(0, target.getBoundingClientRect().top + window.scrollY - offset);

  window.scrollTo({
    top,
    behavior,
  });
}

function scrollAfterRender(element, options = {}) {
  window.setTimeout(() => {
    scrollToSection(element, options);
  }, 0);
}

function waitForSignalsLayout(callback) {
  window.requestAnimationFrame(() => {
    window.requestAnimationFrame(() => {
      window.setTimeout(callback, 140);
    });
  });
}

function ensureSignalsIntroRendered() {
  clearGeneratedOutputState();
  selectedShelfId = null;
  selectedSignal = null;
  renderShelves();
  renderSignals();
}

function scrollToSignalsIntro() {
  ensureSignalsIntroRendered();
  waitForSignalsLayout(() => {
    scrollToSection("#signal-flow-anchor", { offset: signalsIntroOffset });
  });
}

function scrollToSignalsActive() {
  scrollToSection("#signal-flow-anchor", { offset: signalsActiveOffset });
}

function enterSignalsShelf() {
  if (!hasVisitedSignals) {
    hasVisitedSignals = true;
    scrollToSignalsIntro();
    return;
  }

  scrollToSignalsActive();
}

function resetPagePositionOnLoad() {
  if (window.location.hash) {
    window.history.replaceState(null, "", window.location.pathname);
  }

  window.scrollTo({
    top: 0,
    behavior: "auto",
  });
}

function enableSection(section) {
  section.classList.remove("is-disabled");
}

function getCurrentSignal() {
  return selectedSignal || null;
}

function shouldLogSignalFlowDebug() {
  const host = window.location.hostname || "";
  return host === "127.0.0.1" || host === "localhost" || window.location.search.includes("debug=signal");
}

function getSignalLabelNo(signal = getCurrentSignal()) {
  return signal?.id ? `#${signal.id}` : "#000";
}

function isLabelForCurrentSignal(label, signal = getCurrentSignal()) {
  if (!label || !signal?.id) return false;
  return cleanLabelCopy(label.labelNo) === getSignalLabelNo(signal);
}

function isLabelForCurrentSelection(label, signal = getCurrentSignal()) {
  if (!isLabelForCurrentSignal(label, signal)) return false;
  return normalizeLabelIntensity(label.intensity) === normalizeLabelIntensity(selectedStrength?.id)
    && normalizeLabelServeStyle(label.serveStyle) === normalizeLabelServeStyle(selectedServeStyle?.id);
}

function clearGeneratedOutputState({ clearDom = true } = {}) {
  activeRewrite = null;
  generatedLabel = null;
  currentCanonicalSlice = null;
  currentCanonicalSignalId = null;

  if (!clearDom) return;

  if (valuePanel) valuePanel.innerHTML = "";
  if (valueTitle) valueTitle.textContent = "";
  if (printLabel) printLabel.innerHTML = "";
  if (pickupLabel50x70Preview) pickupLabel50x70Preview.innerHTML = "";
  if (productPreview) productPreview.innerHTML = "";
}

function getSelectedShelf() {
  return signalShelves.find((shelf) => shelf.shelfId === selectedShelfId);
}

function getSafeShelf(shelfId) {
  return signalShelves.find((shelf) => shelf.shelfId === shelfId)
    || signalShelves.find((shelf) => shelf.shelfId === "ai-frontier")
    || signalShelves[0];
}

function normalizeShelfId(shelfId) {
  return legacyShelfIdMap[shelfId] || shelfId;
}

function normalizeSignalShelf(signal) {
  const normalizedShelfId = normalizeShelfId(signal?.shelfId);
  const shelf = getSafeShelf(normalizedShelfId);

  return {
    ...signal,
    shelfId: shelf.shelfId,
    shelfTitle: shelf.title,
  };
}

function normalizeSignalList(signals) {
  if (!Array.isArray(signals)) return [];
  return signals.filter(Boolean).map(normalizeSignalShelf);
}

function getSignalCountForShelf(shelfId, signals = activeSignals) {
  return signals.filter((signal) => signal.shelfId === shelfId).length;
}

function getFirstShelfIdWithSignals(signals = activeSignals) {
  return signalShelves.find((shelf) => getSignalCountForShelf(shelf.shelfId, signals) > 0)?.shelfId
    || "ai-frontier";
}

function getVisibleSignalsForShelf(shelfId = selectedShelfId) {
  return getRoundSignals().filter((signal) => signal.shelfId === shelfId);
}

function logSignalRefreshDiagnostics() {
  console.log("Signal refresh diagnostics", {
    refreshedSignalsLength: activeSignals.length,
    selectedShelfId,
    availableShelfIds: Array.from(new Set(activeSignals.map((signal) => signal.shelfId))),
    visibleSignalsLength: getVisibleSignalsForShelf().length,
  });
}

function setSignalRefreshState(isLoading, message = "") {
  isPreparingSignals = isLoading;

  if (refreshSignalsButton) {
    refreshSignalsButton.disabled = isLoading;
  }

  if (signalRefreshStatus) {
    signalRefreshStatus.textContent = message;
  }
}

function resetSignalFlowAfterRefresh(nextSignals) {
  const normalizedSignals = normalizeSignalList(nextSignals);
  clearGeneratedOutputState();
  activeSignals = normalizedSignals.length ? normalizedSignals : normalizeSignalList(baseSignalSource);
  selectedSignal = null;
  selectedIdentity = null;
  selectedShelfId = selectedShelfId && getSignalCountForShelf(selectedShelfId, activeSignals)
    ? selectedShelfId
    : null;

  renderShelves();
  renderSignals();
  renderIdentities();
  identitySection.classList.add("is-disabled");
  brewSection.classList.add("is-disabled");
  serveSection.classList.add("is-disabled");
  resetBrewResult();
  logSignalRefreshDiagnostics();
}

function wait(ms) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms);
  });
}

function escapeHtml(value) {
  return String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function getIdentityIntentDisplay(identityId) {
  return identityIntentDisplay[identityId] || identityIntentDisplay.everyday;
}

function getIdentityForLabel(identityId = selectedIdentity?.id, fallbackIdentity = "") {
  const byId = identityIntentDisplay[identityId]?.forLabel;
  if (byId) return byId;

  const legacyKey = String(fallbackIdentity || "").trim().toUpperCase();
  return legacyIdentityForLabel[legacyKey] || "FOR TODAY";
}

function getShortText(value, maxLength = 112) {
  const text = String(value || "").replace(/\s+/g, " ").trim();

  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength - 1)}…`;
}

function formatLabelDate(value) {
  const date = String(value || "").trim();

  if (/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return date.replaceAll("-", ".");
  }

  return date || new Intl.DateTimeFormat("zh-CN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date()).replaceAll("/", ".");
}

function getSignalRawTitle(signal) {
  return signal?.rawTitle || signal?.rawTitleZh || "";
}

function getRawSignalHeadline(signal = selectedSignal) {
  return signal?.rawTitleZh || signal?.rawTitle || getSignalRawTitle(signal) || "今天发生了一条值得看的变化。";
}

function getSignalRawSummary(signal) {
  return signal?.rawSummary || signal?.rawSummaryZh || signal?.whyWorthWatching || signal?.whyWorthWatchingZh || "";
}

function getSignalWorthWatching(signal) {
  return signal?.whyWorthWatching || signal?.whyWorthWatchingZh || "";
}

function getSignalMark(signal = selectedSignal) {
  return signalMarkByShelf[signal?.shelfId] || "life-signals";
}

function getLabelShelf(signal = selectedSignal) {
  return labelShelfByShelf[signal?.shelfId] || String(signal?.shelfTitle || "TODAY SIGNAL").toUpperCase();
}

function getRoundSignals() {
  return signalShelves
    .flatMap((shelf) => {
      const shelfSignals = activeSignals.filter((signal) => signal.shelfId === shelf.shelfId);
      const count = Math.min(3, shelfSignals.length);

      if (!count) return [];

      const startIndex = shelfSignals.length > 3
        ? (signalRoundIndex * 3) % shelfSignals.length
        : signalRoundIndex % shelfSignals.length;

      return Array.from({ length: count }, (_, index) => shelfSignals[(startIndex + index) % shelfSignals.length]);
    })
    .filter(Boolean);
}

function renderShelves() {
  shelfGrid.innerHTML = `
    <div class="rack-kicker">SIGNAL SHELVES / 信息货架</div>
    <div class="shelf-label-grid">
      ${signalShelves
    .map(
      (shelf) => `
        <button
          class="shelf-card${shelf.shelfId === selectedShelfId ? " is-selected" : ""}"
          data-shelf-id="${shelf.shelfId}"
          type="button"
        >
          <span class="selected-shelf-mark">SELECTED</span>
          <strong>${shelf.title}</strong>
          <span class="shelf-description">${shelf.description}</span>
          <span class="shelf-tags">${(shelf.tags || []).map((tag) => `<b>${escapeHtml(tag)}</b>`).join("")}</span>
        </button>
      `,
    )
    .join("")}
    </div>
  `;
}

function renderSignals() {
  const shelf = getSelectedShelf();
  const shelfSignals = getVisibleSignalsForShelf();

  if (!shelf) {
    signalBeanStage.classList.add("is-empty");
    signalGrid.innerHTML = "";
    renderSelectedSignal();
    return;
  }

  signalBeanStage.classList.remove("is-empty");
  signalGrid.innerHTML = `
    <div class="bean-stage-heading">
      <span>RAW SIGNALS / 今日热点原料</span>
      <div>
        <strong>${escapeHtml(shelf.title)}</strong>
        <p>${escapeHtml(shelf.description)}</p>
      </div>
    </div>
    <div class="bean-grid">
      ${shelfSignals.length
    ? shelfSignals
    .map(
      (signal) => {
        const rawTitle = getSignalRawTitle(signal);
        const rawSummary = getSignalRawSummary(signal);
        const worthWatching = getSignalWorthWatching(signal);
        const rawUrl = signal.rawUrl || "No public URL";

        return `
        <button
          class="signal-card${signal.id === selectedSignal?.id ? " is-selected" : ""}"
          data-signal-id="${signal.id}"
          title="${escapeHtml(rawTitle)}"
          type="button"
        >
          <span class="signal-card-top">
            <span class="bean-label">RAW SIGNAL</span>
            <span class="signal-number">#${signal.id}</span>
          </span>
          <span class="raw-source-row">
            <span>${escapeHtml(signal.source || "X / Grok Search")}</span>
            <span>${escapeHtml(signal.fetchedAt || "")}</span>
          </span>
          <strong class="raw-title">${escapeHtml(rawTitle)}</strong>
          <span class="raw-summary">${escapeHtml(getShortText(rawSummary))}</span>
          <span class="raw-watch-chip">${escapeHtml(getShortText(worthWatching, 72))}</span>
          <span class="raw-url">${escapeHtml(rawUrl)}</span>
          <span class="relation">${escapeHtml(signal.shelfTitle || shelf.title)}</span>
        </button>
      `;
      },
    )
    .join("")
    : '<p class="raw-empty-note">No signals found for this shelf. Try refreshing again.</p>'}
    </div>
  `;
  renderSelectedSignal();
}

function renderSelectedSignal() {
  if (!selectedSignal) {
    selectedSignalPanel.innerHTML = "";
    return;
  }

  const rawTitle = getSignalRawTitle(selectedSignal);
  const rawSummary = getSignalRawSummary(selectedSignal);
  const whyWorthWatching = getSignalWorthWatching(selectedSignal);
  const rawUrl = selectedSignal.rawUrl || "No public URL attached";
  const structuralSliceTitle = getStructuralSliceTitle(selectedSignal, selectedSignal.sliceTitle);

  selectedSignalPanel.innerHTML = `
    <article class="selected-signal-card">
      <div class="selected-signal-kicker">
        <span>SELECTED RAW SIGNAL / 已选原始信号</span>
        <span>#${escapeHtml(selectedSignal.id)}</span>
      </div>
      <h3>${escapeHtml(rawTitle)}</h3>
      <p>${escapeHtml(rawSummary)}</p>
      <p class="raw-watch-note">${escapeHtml(whyWorthWatching)}</p>
      <div class="selected-signal-meta">
        <span>Source / ${escapeHtml(selectedSignal.source)}</span>
        <span>Fetched / ${escapeHtml(selectedSignal.fetchedAt)}</span>
        <span>URL / ${escapeHtml(rawUrl)}</span>
      </div>
      <div class="extracted-slice-card">
        <div class="selected-signal-kicker">
          <span>EXTRACTED SLICE / 已萃取时代切片</span>
          <span>${escapeHtml(selectedSignal.relation)}</span>
        </div>
        <h4>${escapeHtml(structuralSliceTitle)}</h4>
        <p>${escapeHtml(selectedSignal.sliceReason)}</p>
        <div class="selected-signal-meta">
          <span>Shelf / ${escapeHtml(selectedSignal.shelfTitle)}</span>
          <span>Relation / ${escapeHtml(selectedSignal.relation)}</span>
        </div>
      </div>
      <button class="button primary continue-signal-button" id="continue-signal-button" type="button">
        Continue to Intent / 选择今日用途
      </button>
    </article>
  `;
}

function renderIdentities() {
  identityGrid.innerHTML = identities
    .map(
      (identity) => {
        const intentDisplay = getIdentityIntentDisplay(identity.id);
        return `
        <button class="identity-card${identity.id === selectedIdentity?.id ? " is-selected" : ""}" data-identity-id="${identity.id}" type="button">
          <span>Today&apos;s Cup</span>
          <strong>${escapeHtml(intentDisplay.option)}</strong>
          <small>${escapeHtml(intentDisplay.description)}</small>
        </button>
      `;
      },
    )
    .join("");
}

function renderStrengths() {
  strengthGrid.innerHTML = strengths
    .map(
      (strength) => `
        <button class="strength-card${strength.id === selectedStrength.id ? " is-selected" : ""}" data-strength-id="${strength.id}" type="button">
          <strong>${strength.label}</strong>
          <span>${strength.description}</span>
        </button>
      `,
    )
    .join("");
}

function renderServeStyles() {
  if (!selectedSignal) {
    serveGrid.innerHTML = "";
    return;
  }

  serveGrid.innerHTML = serveStyles
    .map(
      (serveStyle) => `
        <button class="serve-card${serveStyle.id === selectedServeStyle.id ? " is-selected" : ""}" data-serve-id="${serveStyle.id}" type="button">
          <span class="selected-mark">SELECTED</span>
          <div class="serve-copy">
            <strong>${serveStyle.label}</strong>
            <span>${serveStyle.vessel}</span>
            <p>${serveStyle.description}</p>
            <small>${serveStyle.cn}<br>${serveStyle.cnDescription}</small>
          </div>
          <div class="serve-card-preview">
            ${getCupPreviewMarkup(serveStyle.id, {
              number: selectedSignal.id,
              title: getStructuralSliceTitle(selectedSignal, selectedSignal.sliceTitle),
              persona: getIdentityForLabel(),
              coreLine: selectedSignal.coreJudgment,
              variant: "small",
              showOverlayLabel: false,
            })}
          </div>
        </button>
      `,
    )
    .join("");
}

function getCupPreviewMarkup(serveStyle, labelData) {
  const styleClass = serveStyle === "iced" ? "cup-preview-iced" : "cup-preview-hot";
  const src = serveStyle === "iced" ? "/public/images/cup-iced-clean.png" : "/public/images/cup-hot-clean.png";
  const alt = serveStyle === "iced" ? "Time Slice Coffee iced clear cup" : "Time Slice Coffee hot paper cup";
  const shouldShowOverlay = labelData.showOverlayLabel ?? SHOW_CUP_OVERLAY_LABEL;

  return `
    <div class="cup-preview ${styleClass} cup-preview-${labelData.variant || "pickup"}">
      <img src="${src}" alt="${alt}" />
      ${
        shouldShowOverlay
          ? `<div class="cup-overlay-label">
        <span class="label-brand">TIME SLICE COFFEE</span>
        <span class="label-number">#${labelData.number}</span>
        <strong>${labelData.title}</strong>
        <span class="label-persona">${labelData.persona}</span>
        <small>Today’s Information Slice.</small>
      </div>`
          : ""
      }
    </div>
  `;
}

function getLabelShelfShort(shelf) {
  return String(shelf || "TODAY SIGNAL").split("/")[0].trim();
}

function getShortRawSignalTitle(signal) {
  return getShortText(getSignalRawTitle(signal), 72);
}

function getSignalLabelContext(signal) {
  return {
    rawTitle: getSignalRawTitle(signal),
    rawSummary: getSignalRawSummary(signal),
    whyWorthWatching: getSignalWorthWatching(signal),
    sliceReason: signal.sliceReason || "",
  };
}

function normalizeLabelIntensity(intensity) {
  return ["light", "regular", "double"].includes(intensity) ? intensity : "regular";
}

function normalizeLabelServeStyle(serveStyle) {
  return ["hot", "iced"].includes(serveStyle) ? serveStyle : "hot";
}

function cleanLabelCopy(value) {
  return String(value || "")
    .replace(/\s+/g, " ")
    .replace(/赋能|拥抱未来|重塑新时代|开启新时代/g, "")
    .trim();
}

function cleanCoreShiftCopy(value) {
  return cleanLabelCopy(value)
    .replace(/^它说明/, "")
    .replace(/^这说明/, "")
    .replace(/^说明/, "")
    .trim();
}

function trimLabelCopy(value, maxLength) {
  const text = cleanLabelCopy(value);
  if (text.length <= maxLength) return text;

  return text
    .slice(0, maxLength)
    .replace(/[，、：；,.:\s]+$/g, "")
    .trim();
}

function trimNoteCopy(value, maxLength) {
  const text = cleanLabelCopy(value);
  if (text.length <= maxLength) return text;

  const nextChar = text[maxLength] || "";
  let fitted = text.slice(0, maxLength);

  if (/[A-Za-z0-9_-]/.test(nextChar) && /[A-Za-z0-9_-]$/.test(fitted)) {
    fitted = fitted.replace(/\s?[A-Za-z0-9_-]+$/g, "");
  }

  return fitted.replace(/[，、：；,.:/\s]+$/g, "").trim();
}

function ensureLabelSentence(value) {
  const text = cleanLabelCopy(value).replace(/[.。]+$/g, "");
  return text ? `${text}。` : "";
}

function fitLabelSentence(value, maxLength, fallback) {
  const fitted = trimLabelCopy(value, maxLength);
  return ensureLabelSentence(fitted || fallback);
}

function fitNoteSentence(value, maxLength, fallback) {
  const fitted = trimNoteCopy(value, maxLength);
  return ensureLabelSentence(fitted || fallback);
}

function normalizeCopyForCompare(value) {
  return cleanLabelCopy(value)
    .replace(/[，。.!?！？、：:；;\s]/g, "")
    .replace(/^它说明/, "")
    .toLowerCase();
}

function areCopyLinesSimilar(first, second) {
  const a = normalizeCopyForCompare(first);
  const b = normalizeCopyForCompare(second);
  if (!a || !b) return false;
  if (a === b) return true;
  const minLength = Math.min(a.length, b.length);
  return minLength >= 10 && (a.includes(b) || b.includes(a));
}

function isBrokenGeneratedCopy(value) {
  const text = cleanLabelCopy(value);
  if (!text || /undefined|null/i.test(text)) return true;
  if (/[、,，:：;；]$/.test(text)) return true;
  if (/[A-Za-z]$/.test(text) && !/[A-Za-z]{2,}$/.test(text)) return true;
  if (/从单次回$/.test(text)) return true;
  if (/何时保$/.test(text)) return true;
  if (/让用户控制何时保$/.test(text)) return true;
  return [
    "从 Anthropic 影响的",
    "影响的流程开始调整",
    "用 xxx 判断",
    "用 Anthropic 判断",
    "先看它会改变哪一步执行流程",
  ].some((phrase) => text.includes(phrase));
}

function getUniqueCopyLines(lines) {
  return lines
    .map((line) => ensureLabelSentence(line))
    .filter((line) => line && !isBrokenGeneratedCopy(line))
    .reduce((uniqueLines, line) => {
      if (!uniqueLines.some((existing) => areCopyLinesSimilar(existing, line))) {
        uniqueLines.push(line);
      }
      return uniqueLines;
    }, []);
}

function getLabelCopyLimits(intensity) {
  if (intensity === "light") {
    return {
      sliceTitle: 24,
      signalContext: 34,
      identityValue: 32,
      todayFocus: 30,
    };
  }

  if (intensity === "double") {
    return {
      sliceTitle: 30,
      signalContext: 38,
      identityValue: 46,
      todayFocus: 42,
    };
  }

  return {
    sliceTitle: 30,
    signalContext: 38,
    identityValue: 44,
    todayFocus: 40,
  };
}

function getLabelRelationNoun(signal) {
  const relationBySignalShelf = {
    "ai-frontier": "技术边界",
    "build-workflow": "流程边界",
    "design-creation": "表达取舍",
    "market-capital": "市场信号",
    "self-upgrade": "能力变化",
    "life-signals": "日常选择",
  };

  return relationBySignalShelf[signal?.shelfId] || "关键变化";
}

function getSignalExtractionNotes(signal) {
  return signal?.extractionNotes && typeof signal.extractionNotes === "object"
    ? signal.extractionNotes
    : null;
}

function getCleanNoteField(signal, field) {
  return cleanLabelCopy(getSignalExtractionNotes(signal)?.[field]);
}

function isMemoryControlSignal(signal) {
  const context = getSignalContextText(signal);
  return /OpenAI|Agent|agent|记忆|memory|何时忘记|忘记|控制权|审查记忆|长期关系/i.test(context)
    && /记忆|memory|何时忘记|忘记|控制权|审查记忆/i.test(context);
}

function isRobotVideoLearningSignal(signal) {
  const context = getSignalContextText(signal);
  return /DeepMind|robotics|机器人论文|视频学习|video learning|倒水|开抽屉|连续动作|物理世界|manipulation/i.test(context)
    && /视频学习|video learning|倒水|开抽屉|连续动作|物理世界|manipulation/i.test(context);
}

function isCursorIndexingSignal(signal) {
  return /Cursor|monorepo|大型仓库|仓库索引|repo indexing|agent 友好/i.test(getSignalContextText(signal));
}

function isNvidiaCapitalSignal(signal) {
  return /NVIDIA|财报|数据中心收入|资本开支|capex|GPU|HBM/i.test(getSignalContextText(signal));
}

function isAiImageCopyrightSignal(signal) {
  return /AI 图像|生成图像|版权|授权|来源凭证|训练来源|商业使用|Content Credentials|provenance|Firefly/i.test(getSignalContextText(signal))
    && /版权|授权|来源|凭证|commercial|provenance|Content Credentials/i.test(getSignalContextText(signal));
}

function getSignalCoreInsight(signal) {
  const notes = getSignalExtractionNotes(signal);
  const context = getSignalContextText(signal);
  if (!notes?.coreShift && isMemoryControlSignal(signal)) {
    return "Agent 能力正在从单次回答转向长期关系，控制权会成为产品核心。";
  }

  if (!notes?.coreShift && isRobotVideoLearningSignal(signal)) {
    return "模型边界正在从屏幕文本延伸到物理世界的连续操作。";
  }

  if (!notes?.coreShift && isAiImageCopyrightSignal(signal)) {
    return "生成内容的价值不只看效果，也要看能否解释权利来源。";
  }

  if (!notes?.coreShift && /Claude|Anthropic/i.test(context) && /工具调用|权限确认|确认机制|删改文件|发送邮件|外部 API|API 调用/.test(context)) {
    return "Claude 工具调用风险集中在权限确认。";
  }

  return cleanCoreShiftCopy(
    notes?.coreShift ||
    signal?.whyWorthWatchingZh ||
    signal?.whyWorthWatching ||
    signal?.sliceReason ||
    signal?.coreJudgment ||
    signal?.sliceTitle ||
    signal?.rawSummaryZh ||
    signal?.rawSummary
  );
}

function getSignalPurposeSubject(signal, maxLength = 10) {
  const source =
    signal?.rawTitleZh ||
    signal?.sliceTitle ||
    signal?.rawTitle ||
    signal?.rawSummaryZh ||
    signal?.rawSummary ||
    signal?.shelfTitle ||
    getLabelRelationNoun(signal);
  const firstClause = cleanLabelCopy(source).split(/[。！？!?，,：:]/)[0];

  return trimLabelCopy(firstClause, maxLength) || getLabelRelationNoun(signal);
}

function getSignalContextText(signal, candidateTitle = "") {
  return [
    candidateTitle,
    signal?.sliceTitle,
    signal?.coreJudgment,
    signal?.sliceReason,
    signal?.rawTitleZh,
    signal?.rawTitle,
    signal?.rawSummaryZh,
    signal?.rawSummary,
    signal?.whyWorthWatchingZh,
    signal?.whyWorthWatching,
    signal?.extractionNotes?.labelPotential,
    signal?.extractionNotes?.coreShift,
    signal?.extractionNotes?.whyToday,
    signal?.extractionNotes?.possibleUserValue,
    signal?.extractionNotes?.noiseToIgnore,
    signal?.shelfTitle,
  ].map(cleanLabelCopy).filter(Boolean).join(" ");
}

function getRawHeadline(signal) {
  return cleanLabelCopy(signal?.rawTitleZh || signal?.rawTitle || "");
}

function stripPropagationShell(value) {
  return cleanLabelCopy(value)
    .replace(/^(OpenAI|Anthropic|DeepMind|Google|Meta|NVIDIA|Cursor|Claude|xAI)\s*/i, "$1 ")
    .replace(/^(.*?)?(研究员|安全团队|开发者|用户|账号|博主|社区|团队|投资者|交易员|论文)\s*(在 X )?(转发|讨论|晒出|比较|热议|分享|发布|展示|记录)(：|:)/, "")
    .replace(/^(OpenAI 研究员在 X 讨论|DeepMind 机器人论文被开发者转发|Cursor 用户晒出|AI infra 账号比较|社区热议|开发者转发)(：|:)?/i, "")
    .trim();
}

function getSignalSubject(signal) {
  const rawHeadline = getRawHeadline(signal);
  const colonParts = rawHeadline.split(/[：:]/).map((part) => part.trim()).filter(Boolean);
  let subject = colonParts.length > 1 ? colonParts.slice(1).join("：") : rawHeadline;
  subject = stripPropagationShell(subject || rawHeadline).replace(/[。.!?！？]+$/g, "");

  if (isRobotVideoLearningSignal(signal)) {
    return "机器人通过视频学习连续动作。";
  }

  if (isMemoryControlSignal(signal)) {
    return "Agent 记忆重点变成何时忘记。";
  }

  if (isCursorIndexingSignal(signal)) {
    return "大型仓库文档开始变成 agent 友好结构。";
  }

  if (isNvidiaCapitalSignal(signal)) {
    return "NVIDIA 财报把投资判断转向资本开支。";
  }

  if (isAiImageCopyrightSignal(signal)) {
    return "AI 图像版权进入创作交付判断。";
  }

  if (/AI infra.*OpenAI.*Anthropic/i.test(rawHeadline)) {
    return "AI infra 比较模型路线差异。";
  }

  const firstClause = subject.split(/[，,；;]/).find((clause) => {
    const text = cleanLabelCopy(clause);
    return text.length >= 6 && !/(转发|讨论|晒出|比较|热议|账号|用户|博主)$/.test(text);
  }) || subject;

  return ensureLabelSentence(trimNoteCopy(firstClause, 30) || getLabelRelationNoun(signal));
}

function getSignalEventDigest(signal, signalSubject = getSignalSubject(signal)) {
  if (isRobotVideoLearningSignal(signal)) {
    return "模型通过视频学习倒水、开抽屉等连续动作，展示机器人从视频示范中学习物理操作的能力。";
  }

  if (isMemoryControlSignal(signal)) {
    return "Agent memory 的讨论重点从记住更多，转向何时忘记、如何让用户控制保留和删除。";
  }

  if (isCursorIndexingSignal(signal)) {
    return "大型仓库索引失败让团队意识到，文档目录需要改成 Agent 更容易读取和定位的结构。";
  }

  if (isNvidiaCapitalSignal(signal)) {
    return "投资者把 NVIDIA 数据中心收入和云厂商资本开支并排比较，用来判断 AI 需求是否真实兑现。";
  }

  if (isAiImageCopyrightSignal(signal)) {
    return "生成图像的商业使用开始需要来源、授权和训练数据边界证明。";
  }

  const rawHeadline = getRawHeadline(signal);
  const colonParts = rawHeadline.split(/[：:]/).map((part) => part.trim()).filter(Boolean);
  const headlineEvent = colonParts.length > 1 ? stripPropagationShell(colonParts.slice(1).join("：")) : "";
  const summary = cleanLabelCopy(signal?.rawSummaryZh || signal?.rawSummary);
  const worthWatching = cleanCoreShiftCopy(signal?.whyWorthWatchingZh || signal?.whyWorthWatching);
  const base = summary || headlineEvent || signalSubject || worthWatching;
  const detail = worthWatching && !areCopyLinesSimilar(base, worthWatching)
    ? `${trimSentenceEnd(base)}，${trimSentenceEnd(worthWatching)}。`
    : base;

  return ensureLabelSentence(detail || signalSubject || "今天出现了一条值得重新判断的信息信号。");
}

function getLabelSignalContext(signal, canonical = null) {
  if (isAiImageCopyrightSignal(signal)) {
    return "生成图像的商业使用开始需要来源与授权证明。";
  }

  if (isRobotVideoLearningSignal(signal)) {
    return "模型通过视频学习倒水、开抽屉等物理操作。";
  }

  if (isMemoryControlSignal(signal)) {
    return "OpenAI 研究员讨论 agent 记忆不只是存更多。";
  }

  if (isCursorIndexingSignal(signal)) {
    return "Cursor 用户晒出索引失败后，团队调整文档目录。";
  }

  if (isNvidiaCapitalSignal(signal)) {
    return "投资者用收入和资本开支判断 AI 需求兑现。";
  }

  const eventDigest = cleanLabelCopy(canonical?.eventDigest || getSignalEventDigest(signal, canonical?.signalSubject));
  const firstSentence = eventDigest.split(/[。！？!?]/).map((part) => part.trim()).find(Boolean);
  const firstClause = eventDigest.split(/[，,；;]/).map((part) => part.trim()).find((part) => part.length >= 8);
  return ensureLabelSentence(firstSentence && firstSentence.length <= 40 ? firstSentence : firstClause || eventDigest);
}

function getSignalWhyToday(signal, coreShift = getSignalCoreInsight(signal)) {
  const notes = getSignalExtractionNotes(signal);
  const whyToday = cleanLabelCopy(notes?.whyToday);
  if (whyToday && !isBrokenGeneratedCopy(whyToday)) return ensureLabelSentence(whyToday);

  const worthWatching = cleanCoreShiftCopy(signal?.whyWorthWatchingZh || signal?.whyWorthWatching);
  if (worthWatching && !isBrokenGeneratedCopy(worthWatching) && !areCopyLinesSimilar(worthWatching, coreShift)) {
    return ensureLabelSentence(worthWatching);
  }

  return "";
}

function getSignalNoiseToIgnore(signal) {
  const notes = getSignalExtractionNotes(signal);
  const noiseToIgnore = cleanLabelCopy(notes?.noiseToIgnore);
  if (noiseToIgnore && !isBrokenGeneratedCopy(noiseToIgnore)) {
    return ensureLabelSentence(noiseToIgnore);
  }

  return "";
}

function getCanonicalLabelTitle(signal, candidateTitle = "") {
  const subject = getSignalSubject(signal);
  const labelPotential = getCleanNoteField(signal, "labelPotential");
  const labelPotentialIsBetter = labelPotential
    && !isBrokenGeneratedCopy(labelPotential)
    && labelPotential.length <= 30
    && (
      cleanLabelCopy(subject).length > 28 ||
      /Hyperscalers|Iris Energy|Nebius|TencentDB|Computer Use|MCP|API/i.test(subject)
    );

  if (labelPotentialIsBetter) {
    return ensureLabelSentence(labelPotential);
  }

  if (subject && !isBrokenGeneratedCopy(subject)) return ensureLabelSentence(subject);

  if (labelPotential && !isBrokenGeneratedCopy(labelPotential) && labelPotential.length <= 30) {
    return ensureLabelSentence(labelPotential);
  }

  return safeLabelTitleForPrint(candidateTitle, signal);
}

function buildPurposeAngleFromNotes(identity, signal) {
  const notes = getSignalExtractionNotes(signal);
  if (!notes) return "";

  const coreShift = cleanCoreShiftCopy(notes.coreShift);
  const whyToday = cleanLabelCopy(notes.whyToday);
  const possibleUserValue = cleanLabelCopy(notes.possibleUserValue);
  const noiseToIgnore = cleanLabelCopy(notes.noiseToIgnore);
  const labelPotential = cleanLabelCopy(notes.labelPotential);
  const decisionValue = whyToday && noiseToIgnore
    ? `判断时看：${trimSentenceEnd(whyToday)}；先忽略：${trimSentenceEnd(noiseToIgnore)}。`
    : whyToday || noiseToIgnore || coreShift;
  const everydayValue = noiseToIgnore || (labelPotential ? `今天只需要带走：${labelPotential}` : coreShift);

  const lines = {
    student: whyToday || coreShift,
    builder: possibleUserValue || coreShift,
    designer: possibleUserValue || coreShift,
    founder: possibleUserValue || whyToday || coreShift,
    vc: decisionValue,
    everyday: everydayValue,
  };

  return ensureLabelSentence(lines[identity?.id] || possibleUserValue || whyToday || coreShift);
}

function buildCanonicalSlice(signal = getCurrentSignal(), identity = selectedIdentity, intensity = selectedStrength?.id, serveStyle = selectedServeStyle?.id) {
  const normalizedIntensity = normalizeLabelIntensity(intensity);
  const normalizedServeStyle = normalizeLabelServeStyle(serveStyle);
  const rawHeadline = getRawHeadline(signal);
  const signalSubject = getSignalSubject(signal);
  const eventDigest = getSignalEventDigest(signal, signalSubject);
  const coreShift = ensureLabelSentence(getSignalCoreInsight(signal) || signalSubject);
  const whyToday = getSignalWhyToday(signal, coreShift);
  const noiseToIgnore = getSignalNoiseToIgnore(signal);
  const notePurposeAngle = buildPurposeAngleFromNotes(identity, signal);
  const specificPurposeAngle = buildSpecificSignalIdentityValue(identity, signal);
  const purposeTakeaway = ensureLabelSentence(notePurposeAngle || specificPurposeAngle || buildLabelIdentityFallback(identity, signal));
  const labelTitle = getCanonicalLabelTitle(signal, signalSubject);
  const labelValue = purposeTakeaway;
  const labelFocus = coreShift;
  const notes = getSignalExtractionNotes(signal);
  const densityLines = normalizedIntensity === "light"
    ? getUniqueCopyLines([signalSubject, eventDigest, purposeTakeaway])
    : normalizedIntensity === "double"
      ? getUniqueCopyLines([signalSubject, eventDigest, coreShift, whyToday, purposeTakeaway, noiseToIgnore || notes?.noiseToIgnore || notes?.whyToday])
      : getUniqueCopyLines([signalSubject, eventDigest, coreShift, purposeTakeaway]);

  const result = {
    rawHeadline,
    eventDigest,
    signalSubject,
    coreShift,
    whyToday,
    purposeTakeaway,
    noiseToIgnore,
    purposeAngle: purposeTakeaway,
    densityLines,
    labelTitle,
    labelValue,
    labelFocus,
    keywords: buildSignalKeywords(signal),
    intensity: normalizedIntensity,
    serveStyle: normalizedServeStyle,
  };

  if (signal?.id && signal.id === getCurrentSignal()?.id) {
    currentCanonicalSlice = result;
    currentCanonicalSignalId = signal.id;
    if (shouldLogSignalFlowDebug()) {
      console.log("CANONICAL SIGNAL SOURCE", {
        selectedSignalId: getCurrentSignal()?.id,
        selectedShelfId: getCurrentSignal()?.shelfId,
        rawTitleZh: getCurrentSignal()?.rawTitleZh,
        signalSubject: result.signalSubject,
        labelTitle: result.labelTitle,
      });
    }
  }

  return result;
}

function isInvalidSliceTitle(title) {
  const text = cleanLabelCopy(title);
  if (!text) return true;

  return [
    "值不值得继续看",
    "机会可能在这里",
    "今天学会这一点",
    "今天先带走这一点",
    "看见新的做法",
    "找到一个表达角度",
    "该不该跟进",
    "先理解这一点",
    "AI 基础设施开始决定谁能更快行动",
  ].some((phrase) => text.includes(phrase));
}

function isStructuralSliceTitle(title) {
  const text = cleanLabelCopy(title);
  if (isInvalidSliceTitle(text)) return false;

  return /(正在|开始|进入|走向|从.+到|从.+走向|接手|分流|交付|流程|场景|能力|关系|工单|客服|验证|入口)/.test(text);
}

function getStructuralSliceTitle(signal, candidateTitle = "") {
  return buildCanonicalSlice(signal, selectedIdentity, selectedStrength?.id, selectedServeStyle?.id).coreShift
    || ensureLabelSentence(candidateTitle)
    || "一个具体流程正在发生变化。";
}

function safeLabelTitleForPrint(title, signal) {
  const isBrokenTitle = (value) => {
    const text = cleanLabelCopy(value);
    if (!text || /undefined|null/i.test(text)) return true;
    if (/[、,，:：;；]$/.test(text)) return true;
    if (/[、,，]\s*[A-Z](?:[。.]|$)/.test(text)) return true;
    if (/(?:与|和|比较)\s*[A-Z](?:[。.]|$)/.test(text)) return true;

    return [
      "市场正重估 AI 变化",
      "值不值得继续看",
      "机会可能在这里",
      "今天学会这一点",
      "该不该跟进",
      "看见新的做法",
      "判断是否继续跟进",
    ].some((phrase) => text.includes(phrase));
  };

  const pickSafeClause = (value, maxLength = 28) => {
    const text = cleanLabelCopy(value)
      .replace(/[。.!?！？]+$/g, "")
      .replace(/账号|用户|帖子|博主/g, "")
      .trim();

    if (!text) return "";
    if (/AI infra.*比较.*OpenAI.*Anthropic/i.test(text)) return "AI infra 比较模型路线";

    const firstSentence = text.split(/[。！？!?]/)[0].trim();
    if (!firstSentence || isBrokenTitle(firstSentence)) return "";

    const clauses = firstSentence
      .split(/[，,：:；;]/)
      .map((clause) => clause.trim())
      .filter(Boolean);
    const safeClause = clauses.find((clause) => clause.length >= 6 && clause.length <= maxLength && !isBrokenTitle(clause));
    if (safeClause) return safeClause;
    if (firstSentence.length <= maxLength && !isBrokenTitle(firstSentence)) return firstSentence;

    return "";
  };

  const context = getSignalContextText(signal, title);
  if (isMemoryControlSignal(signal)) {
    return "Agent 记忆重点变成何时忘记。";
  }

  if (/Claude|Anthropic/i.test(context) && /工具调用|权限确认|确认机制|删改文件|发送邮件|外部 API|API 调用/.test(context)) {
    return "Claude 工具调用评测暴露权限确认问题。";
  }

  const candidates = [
    { value: signal?.extractionNotes?.labelPotential, maxLength: 34 },
    { value: signal?.labelPotential, maxLength: 34 },
    { value: signal?.rawTitleZh, maxLength: 28 },
    { value: signal?.rawTitle, maxLength: 28 },
    { value: signal?.rawSummaryZh, maxLength: 28 },
    { value: signal?.rawSummary, maxLength: 28 },
    { value: title, maxLength: 28 },
  ];

  for (const candidate of candidates) {
    const safeTitle = pickSafeClause(candidate.value, candidate.maxLength);
    if (safeTitle) return ensureLabelSentence(safeTitle);
  }

  return "今日 AI 信号更新。";
}

function buildLabelSliceTitle(signal, intensity, candidateTitle) {
  return buildCanonicalSlice(signal, selectedIdentity, intensity, selectedServeStyle?.id).labelTitle
    || safeLabelTitleForPrint(candidateTitle, signal);
}

function buildExtractionIdentityValue(identity, signal) {
  const notes = getSignalExtractionNotes(signal);
  if (!notes) return "";

  const coreShift = cleanLabelCopy(notes.coreShift);
  const whyToday = cleanLabelCopy(notes.whyToday);
  const possibleUserValue = cleanLabelCopy(notes.possibleUserValue);
  const noiseToIgnore = cleanLabelCopy(notes.noiseToIgnore);
  const decisionValue = whyToday && noiseToIgnore
    ? `判断时看：${trimSentenceEnd(whyToday)}；先忽略：${trimSentenceEnd(noiseToIgnore)}。`
    : whyToday || noiseToIgnore || coreShift;

  const lines = {
    student: whyToday || coreShift,
    builder: possibleUserValue || coreShift,
    designer: possibleUserValue || coreShift,
    founder: possibleUserValue || whyToday || coreShift,
    vc: decisionValue,
    everyday: noiseToIgnore || coreShift,
  };

  return lines[identity?.id] || possibleUserValue || whyToday || coreShift;
}

function buildSpecificSignalIdentityValue(identity, signal) {
  if (isMemoryControlSignal(signal)) {
    const lines = {
      student: "理解记忆难点不是更长，而是何时忘记。",
      builder: "做记忆功能时，要让用户控制保留和删除。",
      designer: "把记忆控制做成可看见、可撤回的界面。",
      founder: "机会在可控记忆、隐私边界和长期关系。",
      vc: "判断重点是用户能否审查和删除记忆。",
      everyday: "只记住：Agent 记忆要能被用户控制。",
    };
    return lines[identity?.id] || "";
  }

  if (isRobotVideoLearningSignal(signal)) {
    const lines = {
      student: "理解机器人学习正在从指令转向视频示范。",
      builder: "先看视频数据、仿真迁移和低成本机械臂能否连起来。",
      designer: "把机器人动作拆成可演示的连续步骤。",
      founder: "机会在家庭机器人训练数据和低成本执行场景。",
      vc: "判断重点是视频学习能否稳定迁移到真实机械臂。",
      everyday: "今天只需要带走：机器人开始从视频里学连续动作。",
    };
    return lines[identity?.id] || "";
  }

  if (isCursorIndexingSignal(signal)) {
    const lines = {
      student: "理解大仓库索引会决定 Agent 能不能看懂项目边界。",
      builder: "先把 README、模块边界和文档目录整理成 Agent 容易读取的结构。",
      designer: "把交付文档做成 Agent 和团队都能追踪的入口。",
      founder: "机会在大型项目的代码理解、文档结构和上下文检索。",
      vc: "判断重点是索引质量能否支撑真实大型代码库协作。",
      everyday: "今天只需要带走：Agent 也需要更清楚的项目入口。",
    };
    return lines[identity?.id] || "";
  }

  if (isNvidiaCapitalSignal(signal)) {
    const lines = {
      student: "理解 AI 热度正在被收入、资本开支和供应链数字检验。",
      builder: "做 AI 项目预算时，要把 GPU 交付和云厂商资本开支一起看。",
      designer: "把 AI 叙事表达成收入、供给和采购节奏的证据链。",
      founder: "机会在能降低推理成本、交付周期或基础设施不确定性的环节。",
      vc: "判断重点是数据中心收入、资本开支和供应链是否互相验证。",
      everyday: "今天只需要带走：AI 热度最终要被真实采购和成本验证。",
    };
    return lines[identity?.id] || "";
  }

  if (isAiImageCopyrightSignal(signal)) {
    const lines = {
      student: "理解生成图像商业使用为什么需要来源和授权证明。",
      builder: "把版权和来源证明纳入创作交付流程。",
      designer: "交付 AI 图像时，同时说明生成来源和授权边界。",
      founder: "机会在版权证明、授权检查和客户验收流程。",
      vc: "判断重点是来源证明能否降低商业使用风险。",
      everyday: "今天只需要带走：生成效果之外还要看授权证据。",
    };
    return lines[identity?.id] || "";
  }

  return "";
}

function buildPermissionSignalIdentityValue(identity, signal) {
  const context = getSignalContextText(signal);
  if (!/(Anthropic|Claude|工具调用|权限确认|确认机制|删改文件|发送邮件|外部 API|API 调用)/i.test(context)) {
    return "";
  }

  const lines = {
    student: "理解工具调用从回答问题变成执行边界。",
    builder: "先检查删改文件、发邮件和 API 调用前的确认机制。",
    designer: "把权限确认做成清楚的用户提示。",
    founder: "机会在可控的 agent 执行和权限审计。",
    vc: "判断重点是权限确认是否足够清楚。",
    everyday: "只记住：能行动的 AI 必须先确认权限。",
  };

  return lines[identity?.id] || "";
}

function buildLabelIdentityFallback(identity, signal) {
  const noteValue = buildExtractionIdentityValue(identity, signal);
  if (noteValue) return ensureLabelSentence(noteValue);

  const specificValue = buildSpecificSignalIdentityValue(identity, signal);
  if (specificValue) return ensureLabelSentence(specificValue);

  const permissionValue = buildPermissionSignalIdentityValue(identity, signal);
  if (permissionValue) return ensureLabelSentence(permissionValue);

  const coreInsight = trimSentenceEnd(getSignalCoreInsight(signal));
  const lines = {
    student: coreInsight ? `先理解：${coreInsight}。` : "先理解这条变化背后的原因。",
    builder: coreInsight ? `把这条变化落到一个可调整的步骤。` : "先找一处可调整的流程。",
    designer: coreInsight ? `先看它改变了哪个表达或交付入口。` : "先找一个表达入口。",
    founder: coreInsight ? `先看它对应的需求和场景。` : "先看一个可测试的需求入口。",
    vc: coreInsight ? `判断重点是：${coreInsight}。` : "先看一个真实判断依据。",
    everyday: coreInsight ? `今天只需要带走：${coreInsight}。` : "今天只保留真正相关的一点。",
  };

  return lines[identity?.id] || "先判断这条变化与你有什么关系。";
}

function buildLabelFocusFallback(identity) {
  const lines = {
    student: "记下一个要理解的问题。",
    builder: "选一个可调整的步骤。",
    designer: "换一个表达角度。",
    founder: "选一个可测试的入口。",
    vc: "先看一个判断依据。",
    everyday: "其他噪音先放下。",
  };

  return lines[identity?.id] || "保留一个真实判断。";
}

function buildSignalKeywords(signal, fallbackKeywords = []) {
  const notes = getSignalExtractionNotes(signal);
  const source = [
    signal?.rawTitleZh,
    signal?.rawTitle,
    signal?.rawSummaryZh,
    signal?.rawSummary,
    signal?.whyWorthWatchingZh,
    signal?.whyWorthWatching,
    signal?.shelfTitle,
    notes?.labelPotential,
    notes?.coreShift,
    notes?.whyToday,
    notes?.possibleUserValue,
  ].map(cleanLabelCopy).filter(Boolean).join(" ");
  const rules = [
    ["DeepMind", /DeepMind/i],
    ["Robotics", /机器人|robot/i],
    ["Video Learning", /视频学习|video/i],
    ["Physical Action", /倒水|开抽屉|连续动作|物理世界/i],
    ["OpenAI", /OpenAI/i],
    ["Agent Memory", /Agent.*记忆|agent.*记忆|memory|长期关系/i],
    ["Forgetting", /忘记|何时忘记/i],
    ["Control", /控制权|用户控制|审查记忆|权限确认|确认机制/i],
    ["Claude", /Claude/i],
    ["Tool Use", /工具调用|tool use|Computer Use/i],
    ["Permission", /权限|确认机制|确认/i],
    ["Safety", /安全|risk|风险/i],
    ["Claude Code", /Claude Code/i],
    ["Cursor", /Cursor/i],
    ["Monorepo", /monorepo|大型仓库/i],
    ["Indexing", /索引|indexing/i],
    ["Docs", /文档|README|目录|doc/i],
    ["Supabase", /Supabase/i],
    ["MCP", /\bMCP\b/i],
    ["Figma", /Figma/i],
    ["Firefly", /Firefly|Adobe/i],
    ["Copyright", /版权|授权|\bIP\b|commercial/i],
    ["NVIDIA", /NVIDIA/i],
    ["Capex", /资本开支|capex/i],
    ["GPU", /\bGPU\b|NVIDIA/i],
    ["Power", /电力|变压器|power/i],
    ["Agent", /Agent|agent/i],
    ["Research", /研究|research/i],
    ["Workflow", /工作流|workflow/i],
    ["Provenance", /provenance|来源证明|来源凭证|Content Credentials/i],
    ["Financing", /融资|贷款|债券|financing/i],
  ];
  const keywords = rules
    .filter(([, pattern]) => pattern.test(source))
    .map(([keyword]) => keyword);
  const merged = [...keywords, ...fallbackKeywords].filter(Boolean);

  return Array.from(new Set(merged)).slice(0, 4);
}

function getPurposeBrewCopy(identity, signal, label) {
  const canonical = buildCanonicalSlice(signal, identity, label?.intensity, label?.serveStyle);
  const notes = getSignalExtractionNotes(signal);
  const noteTitle = notes ? trimSentenceEnd(notes.labelPotential || notes.coreShift) : "";
  const identityValue = canonical.purposeTakeaway || canonical.purposeAngle || buildLabelIdentityFallback(identity, signal);
  const coreInsight = trimSentenceEnd(canonical.coreShift || getSignalCoreInsight(signal));
  const todayFocus = canonical.coreShift || getSignalCoreInsight(signal) || buildLabelFocusFallback(identity);
  const keywords = canonical.keywords || buildSignalKeywords(signal);
  const copyByIdentity = {
    student: {
      title: canonical.signalSubject || noteTitle || "先理解这一点",
      whyImportant: canonical.whyToday || (coreInsight ? `今天值得理解：${coreInsight}。` : "今天值得理解这条变化背后的原因。"),
      relationToYou: identityValue,
      focusNow: todayFocus,
      keywords: buildSignalKeywords(signal, ["Learn", "Skill", "Signal"]),
    },
    builder: {
      title: canonical.signalSubject || noteTitle || "找到可调整的步骤",
      whyImportant: canonical.whyToday || (coreInsight ? `可以落到的步骤：${coreInsight}。` : "先找一处可调整的流程。"),
      relationToYou: identityValue,
      focusNow: todayFocus,
      keywords: buildSignalKeywords(signal, ["Build", "Workflow", "Action"]),
    },
    designer: {
      title: canonical.signalSubject || noteTitle || "找到一个表达角度",
      whyImportant: canonical.whyToday || (coreInsight ? "先看它改变了哪个表达或交付入口。" : "先找一个表达入口。"),
      relationToYou: identityValue,
      focusNow: todayFocus,
      keywords: buildSignalKeywords(signal, ["Create", "Design", "Judgment"]),
    },
    founder: {
      title: canonical.signalSubject || noteTitle || "看见需求入口",
      whyImportant: canonical.whyToday || (coreInsight ? "先看它对应的需求和场景。" : "先看一个可测试的需求入口。"),
      relationToYou: identityValue,
      focusNow: todayFocus,
      keywords: buildSignalKeywords(signal, ["Opportunity", "Need", "Entry"]),
    },
    vc: {
      title: canonical.signalSubject || noteTitle || "先看判断依据",
      whyImportant: canonical.whyToday || (coreInsight ? `判断重点是：${coreInsight}。` : "先看一个真实判断依据。"),
      relationToYou: identityValue,
      focusNow: todayFocus,
      keywords: buildSignalKeywords(signal, ["Decision", "Risk", "Follow"]),
    },
    everyday: {
      title: canonical.signalSubject || noteTitle || "今天先带走这一点",
      whyImportant: canonical.whyToday || (coreInsight ? `今天只需要带走：${coreInsight}。` : "今天只保留真正相关的一点。"),
      relationToYou: identityValue,
      focusNow: todayFocus,
      keywords: buildSignalKeywords(signal, ["Signal", "Focus", "Calm"]),
    },
  };

  return {
    ...(copyByIdentity[identity?.id] || copyByIdentity.everyday),
    keywords: (copyByIdentity[identity?.id] || copyByIdentity.everyday).keywords || keywords,
    coreLine: canonical.coreShift || label?.sliceTitle || getCleanNoteField(signal, "coreShift") || signal?.coreJudgment || signal?.sliceTitle || "",
    eventDigest: canonical.eventDigest,
    noiseToIgnore: canonical.noiseToIgnore,
  };
}

function trimSentenceEnd(value) {
  return cleanLabelCopy(value).replace(/[。.!?！？]+$/g, "");
}

function getReceiptSelectionParts({ forceComplete = false } = {}) {
  const parts = [];
  if (selectedIdentity) parts.push(receiptChoiceLabels[selectedIdentity.id]);
  if (hasSelectedStrength || forceComplete) parts.push(selectedStrength?.label);
  if (hasSelectedServeStyle || forceComplete) parts.push(selectedServeStyle?.id === "iced" ? "Iced" : "Hot");

  return parts.filter(Boolean);
}

function getReceiptPurposeDirection(identityId) {
  const directionByIdentity = {
    student: "看今天最值得理解的一点。",
    builder: "看它会改变哪一步做事。",
    designer: "看它带来的表达或交付入口。",
    founder: "看它对应的需求和场景。",
    vc: "看判断依据和需要忽略的噪音。",
    everyday: "只保留真正相关的一点。",
  };

  return directionByIdentity[identityId] || directionByIdentity.everyday;
}

function getReceiptResultLines({ forceComplete = false } = {}) {
  if (!selectedSignal) return null;

  const canonical = buildCanonicalSlice(selectedSignal, selectedIdentity, selectedStrength?.id, selectedServeStyle?.id);
  const intensity = normalizeLabelIntensity(selectedStrength?.id);
  const canShowStrength = hasSelectedStrength || forceComplete;

  if (!canShowStrength) {
    return getUniqueCopyLines([canonical.signalSubject, canonical.eventDigest]);
  }

  if (intensity === "light") {
    return getUniqueCopyLines([canonical.signalSubject, canonical.eventDigest, canonical.purposeTakeaway]);
  }

  if (intensity === "double") {
    return getUniqueCopyLines([
      canonical.signalSubject,
      canonical.eventDigest,
      canonical.coreShift,
      canonical.whyToday,
      canonical.purposeTakeaway,
      canonical.noiseToIgnore ? `可以不用追：${trimSentenceEnd(canonical.noiseToIgnore)}。` : "",
    ]);
  }

  return getUniqueCopyLines([
    canonical.signalSubject,
    canonical.eventDigest,
    canonical.coreShift,
    canonical.purposeTakeaway,
  ]);
}

function buildSliceReceiptCopy({ forceComplete = false } = {}) {
  if (!selectedSignal) return null;
  const canonical = buildCanonicalSlice(selectedSignal, selectedIdentity, selectedStrength?.id, selectedServeStyle?.id);
  const rawHeadline = canonical.rawHeadline || getRawSignalHeadline(selectedSignal);
  const structuralTitle = canonical.coreShift || getStructuralSliceTitle(selectedSignal, selectedSignal.sliceTitle);
  const selectionParts = getReceiptSelectionParts({ forceComplete });
  const resultLines = getReceiptResultLines({ forceComplete }) || [];
  const meta = [`#${selectedSignal.id || "000"}`, getLabelShelfShort(getLabelShelf(selectedSignal) || selectedSignal.shelfTitle)].filter(Boolean).join(" · ");

  return {
    rawHeadline,
    signalSubject: canonical.signalSubject,
    eventDigest: canonical.eventDigest,
    structuralTitle,
    whyToday: canonical.whyToday,
    purposeTakeaway: canonical.purposeTakeaway,
    noiseToIgnore: canonical.noiseToIgnore,
    labelTitle: canonical.labelTitle,
    meta,
    selectionParts,
    purposeDirection: selectedIdentity ? getReceiptPurposeDirection(selectedIdentity.id) : "",
    resultLines,
  };
}

function mountSliceReceiptPreview(stage = "raw") {
  const anchor = stage === "raw"
    ? selectedSignalPanel
    : stage === "serve"
    ? serveGrid
    : stage === "brew"
      ? strengthGrid
      : identityGrid;

  if (!anchor) return;
  anchor.insertAdjacentElement("afterend", sliceReceiptPreview);
}

function renderSliceReceiptPreview(stage = "raw") {
  if (!selectedSignal) {
    sliceReceiptPreview.remove();
    return;
  }

  mountSliceReceiptPreview(stage);
  const receipt = buildSliceReceiptCopy();

  sliceReceiptPreview.innerHTML = `
    <div class="slice-receipt-title">当前切片预览</div>
    <div class="slice-receipt-kicker">TIME SLICE RECEIPT</div>
    <div class="slice-receipt-meta">
      <span>${escapeHtml(receipt.meta)}</span>
      <span>Raw Signal selected</span>
    </div>
    <h3>${escapeHtml(receipt.signalSubject || receipt.labelTitle || receipt.rawHeadline)}</h3>
    <div class="slice-receipt-layer">
      <span>发生了什么</span>
      <p>${escapeHtml(receipt.eventDigest)}</p>
    </div>
    <div class="slice-receipt-layer">
      <span>这说明</span>
      <p>${escapeHtml(receipt.structuralTitle)}</p>
    </div>
    ${receipt.selectionParts.length ? `
      <div class="slice-receipt-order">
        ${selectedIdentity ? `<span>Cup: ${escapeHtml(receiptChoiceLabels[selectedIdentity.id])}</span>` : ""}
        ${hasSelectedStrength ? `<span>Strength: ${escapeHtml(selectedStrength.label)}</span>` : ""}
        ${hasSelectedServeStyle ? `<span>Serve: ${escapeHtml(selectedServeStyle.label.replace("Served ", ""))}</span>` : ""}
      </div>
    ` : ""}
    ${receipt.purposeDirection ? `<p class="slice-receipt-note">${escapeHtml(receipt.purposeDirection)}</p>` : ""}
    ${selectedIdentity ? `
      <div class="slice-receipt-result">
        <p><strong>这杯带走：</strong>${escapeHtml(receipt.purposeTakeaway)}</p>
        ${receipt.noiseToIgnore && (selectedStrength?.id === "double" || hasSelectedServeStyle)
          ? `<p><strong>可以不用追：</strong>${escapeHtml(receipt.noiseToIgnore)}</p>`
          : ""}
      </div>
    ` : ""}
  `;
}

function getReceiptCompletionMeta(receipt) {
  return [
    receipt.meta,
    selectedIdentity ? receiptChoiceLabels[selectedIdentity.id] : "",
    selectedStrength?.label || "",
    selectedServeStyle?.id === "iced" ? "Iced" : "Hot",
  ].filter(Boolean).join(" · ");
}

function getReceiptCompletionMarkup(value) {
  const receipt = buildSliceReceiptCopy({ forceComplete: true });
  const label = value.timeSliceLabel || generatedLabel || buildFallbackTimeSliceLabel();

  return `
    <article class="slice-receipt-complete">
      <div class="slice-receipt-kicker">TIME SLICE RECEIPT</div>
      <div class="slice-receipt-meta">
        <span>${escapeHtml(getReceiptCompletionMeta(receipt))}</span>
      </div>
      <h4>${escapeHtml(receipt.signalSubject || label.sliceTitle)}</h4>
      <div class="slice-receipt-layer">
        <span>发生了什么</span>
        <p>${escapeHtml(receipt.eventDigest)}</p>
      </div>
      <div class="slice-receipt-layer">
        <span>这说明</span>
        <p>${escapeHtml(receipt.structuralTitle)}</p>
      </div>
      <div class="slice-receipt-result">
        <p><strong>这杯带走：</strong>${escapeHtml(receipt.purposeTakeaway)}</p>
        ${receipt.noiseToIgnore ? `<p><strong>可以不用追：</strong>${escapeHtml(receipt.noiseToIgnore)}</p>` : ""}
      </div>
      <div class="keyword-row">${value.keywords.map((keyword) => `<b>${escapeHtml(keyword)}</b>`).join("")}</div>
      <div class="value-actions">
        <button class="button primary" id="generate-label-button" type="button">Generate Label / 生成杯贴</button>
      </div>
    </article>
  `;
}

function buildLabelIdentityValue(base, identity, signal, intensity) {
  const normalizedIntensity = normalizeLabelIntensity(intensity);
  const limits = getLabelCopyLimits(normalizedIntensity);
  const canonical = buildCanonicalSlice(signal, identity, normalizedIntensity, selectedServeStyle?.id);
  const noteValue = canonical.labelValue || canonical.purposeAngle;
  const fallback = normalizedIntensity === "light"
    ? noteValue || "一句今天要带走的判断。"
    : noteValue || buildLabelIdentityFallback(identity, signal);

  return fitLabelSentence(fallback, limits.identityValue, fallback);
}

function buildLabelTodayFocus(identity, signal, intensity, serveStyle) {
  const normalizedIntensity = normalizeLabelIntensity(intensity);
  if (normalizedIntensity === "light") return "";

  const limits = getLabelCopyLimits(normalizedIntensity);
  const canonical = buildCanonicalSlice(signal, identity, normalizedIntensity, serveStyle);
  const fallback = canonical.labelFocus || canonical.coreShift || buildLabelFocusFallback(identity);

  return fitLabelSentence(fallback, limits.todayFocus, fallback);
}

function getTodayFocusAlternative(signal, identityValue = "") {
  const notes = getSignalExtractionNotes(signal);
  const candidates = [
    notes?.noiseToIgnore ? `先忽略：${notes.noiseToIgnore}` : "",
    notes?.whyToday,
    getSignalCoreInsight(signal),
    signal?.rawSummaryZh,
    signal?.whyWorthWatchingZh,
    buildLabelFocusFallback(selectedIdentity),
  ];

  return candidates
    .map(cleanLabelCopy)
    .find((candidate) => candidate && !areCopyLinesSimilar(candidate, identityValue) && !isBrokenGeneratedCopy(candidate)) || "";
}

function fitTimeSliceLabelCopy(label, identity = selectedIdentity, signal = selectedSignal) {
  const intensity = normalizeLabelIntensity(label?.intensity);
  const serveStyle = normalizeLabelServeStyle(label?.serveStyle);
  const limits = getLabelCopyLimits(intensity);
  const canonical = buildCanonicalSlice(signal, identity, intensity, serveStyle);
  const sliceTitle = canonical.labelTitle || buildLabelSliceTitle(signal, intensity, label?.sliceTitle);
  const signalContextFallback = getLabelSignalContext(signal, canonical) || canonical.eventDigest || label?.sourceSignal || getSignalRawTitle(signal);
  const sourceSignal = fitLabelSentence(signalContextFallback, limits.signalContext, signalContextFallback);
  const noteIdentityValue = canonical.labelValue || canonical.purposeAngle || buildExtractionIdentityValue(identity, signal);
  const fitCopySentence = getSignalExtractionNotes(signal) ? fitNoteSentence : fitLabelSentence;
  const identityFallback = intensity === "light"
    ? noteIdentityValue || "一句今天要带走的判断。"
    : noteIdentityValue || "先判断这条变化与你有什么关系。";
  let identityValue = intensity === "light"
    ? fitCopySentence(label?.identityValue || identityFallback, limits.identityValue, identityFallback)
    : fitCopySentence(label?.identityValue, limits.identityValue, identityFallback);
  identityValue = isBrokenGeneratedCopy(identityValue)
    ? fitCopySentence(identityFallback, limits.identityValue, identityFallback)
    : identityValue;

  const focusFallback = getTodayFocusAlternative(signal, identityValue) || canonical.labelFocus || canonical.coreShift || getSignalCoreInsight(signal) || "保留一个真实判断。";
  let todayFocus = fitCopySentence(label?.todayFocus, limits.todayFocus, focusFallback);
  if (todayFocus && (isBrokenGeneratedCopy(todayFocus) || areCopyLinesSimilar(identityValue, todayFocus))) {
    todayFocus = fitCopySentence(focusFallback, limits.todayFocus, focusFallback);
  }

  const fittedLabel = {
    ...label,
    sourceUrl: cleanLabelCopy(label?.sourceUrl || label?.rawUrl || signal?.rawUrl),
    sourceSignal,
    sliceTitle,
    identityValue,
    todayFocus,
    intensity,
    serveStyle,
  };

  console.log("LABEL COPY FIT", {
    intensity,
    sliceTitle,
    identityValue,
    todayFocus,
  });

  return fittedLabel;
}

function getServeMeta(serveStyle) {
  if (serveStyle === "iced") {
    return {
      label: "SERVED ICED / CLEAR CUP",
      note: "See today's change more clearly.",
    };
  }

  return {
    label: "SERVED HOT / PAPER CUP",
    note: "Carry today's understanding in hand.",
  };
}

function buildFallbackTimeSliceLabel() {
  const identity = selectedIdentity?.en?.toUpperCase() || selectedIdentity?.name || selectedIdentity?.label || "EVERYDAY PERSON";
  const intensity = normalizeLabelIntensity(selectedStrength?.id);
  const serveStyle = normalizeLabelServeStyle(selectedServeStyle?.id);
  const signalId = selectedSignal?.id ? `#${selectedSignal.id}` : "#000";
  const canonical = buildCanonicalSlice(selectedSignal, selectedIdentity, intensity, serveStyle);

  return fitTimeSliceLabelCopy({
    labelNo: signalId,
    shelf: selectedSignal?.shelfTitle || getLabelShelf(selectedSignal) || "TIME SLICE",
    source: selectedSignal?.source || "LOCAL FALLBACK",
    date: formatLabelDate(selectedSignal?.fetchedAt || "TODAY"),
    sourceUrl: selectedSignal?.rawUrl || "",
    sourceSignal: getSignalRawTitle(selectedSignal) || "No source signal available",
    sliceTitle: canonical.labelTitle || "今天只看一条关键变化。",
    identity,
    identityValue: intensity === "light"
      ? canonical.labelValue || canonical.purposeAngle || "一句今天要带走的判断。"
      : canonical.labelValue || canonical.purposeAngle || buildLabelIdentityFallback(selectedIdentity, selectedSignal),
    todayFocus: intensity !== "light" ? canonical.labelFocus || canonical.coreShift || buildLabelFocusFallback(selectedIdentity) : "",
    intensity,
    serveStyle,
    signalMark: selectedSignal?.shelfId || "life-signals",
  }, selectedIdentity, selectedSignal);
}

function getSignalMarkSvg(signalMark) {
  const mark = String(signalMark || "life-signals");
  const svgAttrs = `class="signal-mark-svg" viewBox="0 0 44 44" aria-hidden="true" focusable="false"`;

  if (mark === "ai-frontier") {
    return `
      <svg ${svgAttrs}>
        <circle cx="12" cy="12" r="1.7"></circle>
        <circle cx="22" cy="12" r="1.7"></circle>
        <circle cx="32" cy="12" r="1.7"></circle>
        <circle cx="12" cy="22" r="1.7"></circle>
        <circle cx="22" cy="22" r="1.7"></circle>
        <circle cx="32" cy="22" r="1.7"></circle>
        <circle cx="12" cy="32" r="1.7"></circle>
        <circle cx="22" cy="32" r="1.7"></circle>
        <circle cx="32" cy="32" r="1.7"></circle>
      </svg>
    `;
  }

  if (mark === "build-workflow") {
    return `
      <svg ${svgAttrs}>
        <path d="M12 14h10v16h10"></path>
        <circle cx="12" cy="14" r="3.2"></circle>
        <circle cx="22" cy="30" r="3.2"></circle>
        <circle cx="32" cy="30" r="3.2"></circle>
      </svg>
    `;
  }

  if (mark === "design-creation") {
    return `
      <svg ${svgAttrs}>
        <path d="M12 18v-6h6"></path>
        <path d="M26 12h6v6"></path>
        <path d="M32 26v6h-6"></path>
        <path d="M18 32h-6v-6"></path>
        <path d="M17 22h10"></path>
      </svg>
    `;
  }

  if (mark === "market-capital") {
    return `
      <svg ${svgAttrs}>
        <path d="M9 32h27"></path>
        <path d="M10 28l7-8 6 5 10-13"></path>
        <circle cx="17" cy="20" r="1.8"></circle>
        <circle cx="23" cy="25" r="1.8"></circle>
        <circle cx="33" cy="12" r="1.8"></circle>
      </svg>
    `;
  }

  if (mark === "self-upgrade") {
    return `
      <svg ${svgAttrs}>
        <path d="M10 32h8v-7h8v-7h8v-7"></path>
        <path d="M10 36h25"></path>
      </svg>
    `;
  }

  return `
    <svg ${svgAttrs}>
      <path d="M8 24h6l3-9 6 18 4-13h9"></path>
      <path d="M8 34h28"></path>
    </svg>
  `;
}

function buildMockTimeSliceLabel() {
  const fallback = buildFallbackTimeSliceLabel();
  if (!selectedSignal || !selectedIdentity || !selectedStrength || !selectedServeStyle) {
    return fallback;
  }

  const base = valueRewrites[selectedIdentity.id] || valueRewrites.everyday || {};
  const identityName = selectedIdentity.en?.toUpperCase() || fallback.identity;
  const intensity = normalizeLabelIntensity(selectedStrength.id || fallback.intensity);
  const serveStyle = normalizeLabelServeStyle(selectedServeStyle.id || fallback.serveStyle);
  const canonical = buildCanonicalSlice(selectedSignal, selectedIdentity, intensity, serveStyle);

  return fitTimeSliceLabelCopy({
    labelNo: fallback.labelNo,
    shelf: getLabelShelf(selectedSignal) || fallback.shelf,
    source: selectedSignal.source || fallback.source,
    date: formatLabelDate(selectedSignal.fetchedAt || fallback.date),
    sourceUrl: selectedSignal.rawUrl || fallback.sourceUrl || "",
    sourceSignal: getShortRawSignalTitle(selectedSignal) || fallback.sourceSignal,
    sliceTitle: canonical.labelTitle || fallback.sliceTitle,
    identity: identityName,
    identityValue: canonical.labelValue || canonical.purposeAngle || buildLabelIdentityValue(base, selectedIdentity, selectedSignal, intensity) || fallback.identityValue,
    todayFocus: intensity !== "light" ? canonical.labelFocus || canonical.coreShift || buildLabelTodayFocus(selectedIdentity, selectedSignal, intensity, serveStyle) || fallback.todayFocus : "",
    intensity,
    serveStyle,
    signalMark: getSignalMark(selectedSignal) || fallback.signalMark,
  }, selectedIdentity, selectedSignal);
}

function getMockValueRewrite() {
  const base = valueRewrites[selectedIdentity.id];
  const timeSliceLabel = buildMockTimeSliceLabel();
  const purposeCopy = getPurposeBrewCopy(selectedIdentity, selectedSignal, timeSliceLabel);

  return {
    ...base,
    ...purposeCopy,
    todayChange: selectedSignal.sliceReason,
    keywords: purposeCopy.keywords || selectedSignal.keywords,
    coreLine: purposeCopy.coreLine || selectedSignal.coreJudgment,
    timeSliceLabel,
  };
}

function normalizeTimeSliceLabel(rewrite) {
  const fallback = buildMockTimeSliceLabel();
  const candidate = rewrite?.timeSliceLabel || rewrite;
  const canonical = buildCanonicalSlice(selectedSignal, selectedIdentity, fallback.intensity, fallback.serveStyle);
  const purposeIdentityValue = canonical.labelValue || canonical.purposeAngle || buildLabelIdentityValue(null, selectedIdentity, selectedSignal, fallback.intensity);
  const purposeTodayFocus = fallback.intensity !== "light" ? canonical.labelFocus || canonical.coreShift || buildLabelTodayFocus(selectedIdentity, selectedSignal, fallback.intensity, fallback.serveStyle) : "";
  const candidateMatchesCurrent =
    candidate?.identity === fallback.identity &&
    candidate?.intensity === fallback.intensity &&
    candidate?.serveStyle === fallback.serveStyle;

  return fitTimeSliceLabelCopy({
    labelNo: fallback.labelNo,
    shelf: fallback.shelf,
    source: fallback.source,
    date: fallback.date,
    sourceUrl: candidateMatchesCurrent && candidate?.sourceUrl ? candidate.sourceUrl : fallback.sourceUrl,
    sourceSignal: fallback.sourceSignal,
    sliceTitle: canonical.labelTitle || (candidateMatchesCurrent && candidate?.sliceTitle ? candidate.sliceTitle : fallback.sliceTitle),
    identity: fallback.identity,
    identityValue: purposeIdentityValue || (candidateMatchesCurrent && candidate?.identityValue ? candidate.identityValue : fallback.identityValue),
    todayFocus: purposeTodayFocus || (candidateMatchesCurrent && candidate?.todayFocus ? candidate.todayFocus : fallback.todayFocus),
    intensity: fallback.intensity,
    serveStyle: fallback.serveStyle,
    signalMark: fallback.signalMark,
  }, selectedIdentity, selectedSignal);
}

function normalizeRewrite(rewrite) {
  const fallback = getMockValueRewrite();
  const timeSliceLabel = normalizeTimeSliceLabel(rewrite);
  const purposeCopy = getPurposeBrewCopy(selectedIdentity, selectedSignal, timeSliceLabel);

  return {
    title: purposeCopy.title || rewrite?.title || fallback.title,
    todayChange: rewrite?.todayChange || selectedSignal?.sliceReason || fallback.todayChange,
    whyImportant: purposeCopy.whyImportant || rewrite?.whyImportant || timeSliceLabel.identityValue || fallback.whyImportant,
    relationToYou: purposeCopy.relationToYou || rewrite?.relationToYou || timeSliceLabel.identityValue || fallback.relationToYou,
    focusNow: purposeCopy.focusNow || rewrite?.focusNow || timeSliceLabel.todayFocus || fallback.focusNow,
    keywords: purposeCopy.keywords || (Array.isArray(rewrite?.keywords) && rewrite.keywords.length ? rewrite.keywords.slice(0, 3) : fallback.keywords),
    coreLine: purposeCopy.coreLine || rewrite?.coreLine || timeSliceLabel.sliceTitle || fallback.coreLine,
    timeSliceLabel,
  };
}

function getStableRewriteValue(rewrite = activeRewrite) {
  if (rewrite?.timeSliceLabel?.sliceTitle && isLabelForCurrentSelection(rewrite.timeSliceLabel)) {
    return rewrite;
  }

  if (generatedLabel?.sliceTitle && isLabelForCurrentSelection(generatedLabel)) {
    return {
      ...(rewrite || activeRewrite || {}),
      timeSliceLabel: generatedLabel,
    };
  }

  return normalizeRewrite(rewrite || activeRewrite || { timeSliceLabel: buildFallbackTimeSliceLabel() });
}

function getVisibleRows(value) {
  return [
    ["标题", value.title],
    ["今日变化", value.todayChange],
    ["为什么重要", value.whyImportant],
    ["你可以带走什么", value.relationToYou],
  ];
}

function renderLoading() {
  const lines = ["正在萃取今日信息...", "正在为你的视角重新判断这条变化...", "正在生成杯贴标签..."];

  valueTitle.textContent = "正在准备你的信息咖啡";
  valuePanel.innerHTML = `
    <div class="loading-panel">
      <span></span>
      <div>
        ${lines.map((line) => `<p>${line}</p>`).join("")}
      </div>
    </div>
  `;
}

function renderValueRewrite(rewrite) {
  const value = normalizeRewrite(rewrite);
  activeRewrite = value;
  generatedLabel = value.timeSliceLabel;
  if (shouldLogSignalFlowDebug()) {
    console.log("LABEL SIGNAL SOURCE", {
      selectedSignalId: selectedSignal?.id,
      generatedLabelNo: generatedLabel?.labelNo,
      generatedLabelMatchesSignal: isLabelForCurrentSignal(generatedLabel),
      generatedLabelMatchesSelection: isLabelForCurrentSelection(generatedLabel),
      hasExtractionNotes: Boolean(getSignalExtractionNotes(selectedSignal)),
      rawTitleZh: selectedSignal?.rawTitleZh,
      coreShift: getCleanNoteField(selectedSignal, "coreShift") || getSignalCoreInsight(selectedSignal),
      sliceTitle: generatedLabel?.sliceTitle,
      todayFocus: generatedLabel?.todayFocus,
    });
  }
  valueTitle.textContent = value.timeSliceLabel?.sliceTitle || getRawSignalHeadline(selectedSignal);
  valuePanel.innerHTML = getReceiptCompletionMarkup(value);
}

function renderTimeSliceLabel(rewrite = activeRewrite) {
  const value = getStableRewriteValue(rewrite);
  const label = value.timeSliceLabel || buildFallbackTimeSliceLabel();
  const serveMeta = getServeMeta(label.serveStyle);
  const identityForLabel = getIdentityForLabel(selectedIdentity?.id, label.identity);
  value.timeSliceLabel = label;
  activeRewrite = value;
  generatedLabel = label;
  console.log("generatedLabel", generatedLabel);

  printLabel.innerHTML = `
    <div class="print-label-top">
      <div class="label-brand-stack">
        <span>TIME SLICE COFFEE</span>
        <small>${escapeHtml(label.labelNo)}</small>
      </div>
      <div class="label-signal-mark" aria-label="${escapeHtml(label.signalMark)} signal mark">
        ${getSignalMarkSvg(label.signalMark)}
      </div>
    </div>
    <p class="label-subtitle">TODAY&rsquo;S INFORMATION SLICE</p>
    <div class="label-meta-line">
      <span>${escapeHtml(label.labelNo)} / ${escapeHtml(getLabelShelfShort(label.shelf))}</span>
      <span>${escapeHtml(label.source)} &middot; ${escapeHtml(label.date)}</span>
    </div>
    <h3>${escapeHtml(label.sliceTitle)}</h3>
    <div class="label-value-block">
      <span>${escapeHtml(identityForLabel)}</span>
      <p>${escapeHtml(label.identityValue)}</p>
    </div>
    <div class="label-focus-block">
      <span>TODAY&rsquo;S FOCUS</span>
      <p>${escapeHtml(label.todayFocus)}</p>
    </div>
    <div class="label-source-block">
      <span>SOURCE SIGNAL</span>
      <p>${escapeHtml(label.sourceSignal)}</p>
    </div>
    <div class="label-serve-block">
      <span>${escapeHtml(label.intensity.toUpperCase())} / ${escapeHtml(label.signalMark)}</span>
      <strong>${escapeHtml(serveMeta.label)}</strong>
      <p>${escapeHtml(serveMeta.note)}</p>
    </div>
    <div class="print-label-bottom">
      <span>SIGNAL &rarr; SLICE &rarr; VALUE &rarr; LABEL</span>
    </div>
  `;

  renderProductPreview(value);
  return label;
}

function renderProductPreview(value) {
  const label = value.timeSliceLabel || buildFallbackTimeSliceLabel();
  const identityForLabel = getIdentityForLabel(selectedIdentity?.id, label.identity);

  productPreview.innerHTML = `
    <div class="preview-scene">
      ${getCupPreviewMarkup(selectedServeStyle?.id || "hot", {
        number: selectedSignal?.id || "000",
        title: label.sliceTitle,
        persona: `${identityForLabel} / ${label.intensity.toUpperCase()}`,
        coreLine: label.todayFocus,
        variant: "pickup",
        showOverlayLabel: SHOW_CUP_OVERLAY_LABEL,
      })}
      <p>${selectedServeStyle?.label || "Served Hot"} · ${selectedServeStyle?.vessel || "Paper Cup"}</p>
    </div>
  `;
}

const devLabel50x70Sample = {
  labelNo: "#042",
  shelf: "AI FRONTIER",
  source: "X / GROK SEARCH",
  date: "2026.05.30",
  sliceTitle: "模型和 Agent 正在外推边界。",
  identity: "BUILDER",
  identityValue: "判断哪些边界仍需要人来定义。",
  todayFocus: "找出一个需人工确认的环节。",
  intensity: "regular",
  serveStyle: "hot",
  signalMark: "ai-frontier",
};

function getTodayLabelDate() {
  return new Intl.DateTimeFormat("zh-CN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date()).replaceAll("/", ".");
}

function getDevLabelServeFooter(serveStyle) {
  return normalizeLabelServeStyle(serveStyle) === "iced" ? "SERVED ICED / CLEAR CUP" : "SERVED HOT / PAPER CUP";
}

function decodeSourceQuery(rawQuery) {
  const query = cleanLabelCopy(rawQuery).replace(/\+/g, " ");

  try {
    return decodeURIComponent(query);
  } catch {
    return query;
  }
}

function getQrTargetUrl(rawUrl) {
  const sourceUrl = cleanLabelCopy(rawUrl);
  if (!sourceUrl) return "";

  if (/^https?:\/\//i.test(sourceUrl)) {
    return sourceUrl;
  }

  if (/^grok-search:\/\//i.test(sourceUrl)) {
    const rawQuery = sourceUrl.replace(/^grok-search:\/\//i, "").replace(/^\/+/, "");
    const query = decodeSourceQuery(rawQuery);
    return query ? `https://x.com/search?q=${encodeURIComponent(query)}` : "";
  }

  return "";
}

function getSourceAccessScanLabel(rawUrl, targetUrl) {
  const sourceUrl = cleanLabelCopy(rawUrl);
  const qrTargetUrl = cleanLabelCopy(targetUrl);

  if (/^grok-search:\/\//i.test(sourceUrl)) {
    return "SCAN SEARCH QUERY";
  }

  if (/^https?:\/\/(?:www\.)?(?:x|twitter)\.com\/search/i.test(qrTargetUrl)) {
    return "SCAN X SEARCH";
  }

  return "SCAN ORIGINAL";
}

function getQrBytes(value) {
  if (typeof TextEncoder !== "undefined") {
    return Array.from(new TextEncoder().encode(value));
  }

  return Array.from(unescape(encodeURIComponent(value))).map((char) => char.charCodeAt(0));
}

function appendQrBits(bitBuffer, value, bitLength) {
  for (let i = bitLength - 1; i >= 0; i -= 1) {
    bitBuffer.push((value >>> i) & 1);
  }
}

function multiplyQrGalois(x, y) {
  let result = 0;

  for (let i = 7; i >= 0; i -= 1) {
    result = (result << 1) ^ ((result >>> 7) * 0x11d);
    result ^= ((y >>> i) & 1) * x;
  }

  return result & 0xff;
}

function getQrErrorCorrectionDivisor(degree) {
  const result = Array(degree).fill(0);
  result[degree - 1] = 1;
  let root = 1;

  for (let i = 0; i < degree; i += 1) {
    for (let j = 0; j < result.length; j += 1) {
      result[j] = multiplyQrGalois(result[j], root);
      if (j + 1 < result.length) {
        result[j] ^= result[j + 1];
      }
    }
    root = multiplyQrGalois(root, 2);
  }

  return result;
}

function getQrErrorCorrectionCodewords(dataCodewords, degree) {
  const divisor = getQrErrorCorrectionDivisor(degree);
  const result = Array(degree).fill(0);

  dataCodewords.forEach((codeword) => {
    const factor = codeword ^ result.shift();
    result.push(0);
    divisor.forEach((coefficient, index) => {
      result[index] ^= multiplyQrGalois(coefficient, factor);
    });
  });

  return result;
}

function getQrFormatBits(errorCorrectionBits = 1, mask = 0) {
  const data = (errorCorrectionBits << 3) | mask;
  let remainder = data;

  for (let i = 0; i < 10; i += 1) {
    remainder = (remainder << 1) ^ (((remainder >>> 9) & 1) * 0x537);
  }

  return ((data << 10) | remainder) ^ 0x5412;
}

function buildQrMatrix(text) {
  const version = 5;
  const size = 17 + version * 4;
  const dataCodewordCount = 108;
  const errorCorrectionCodewordCount = 26;
  const dataBytes = getQrBytes(text);

  if (dataBytes.length > 106) {
    return null;
  }

  const bitBuffer = [];
  appendQrBits(bitBuffer, 0x4, 4);
  appendQrBits(bitBuffer, dataBytes.length, 8);
  dataBytes.forEach((byte) => appendQrBits(bitBuffer, byte, 8));
  const dataCapacityBits = dataCodewordCount * 8;
  appendQrBits(bitBuffer, 0, Math.min(4, dataCapacityBits - bitBuffer.length));

  while (bitBuffer.length % 8 !== 0) {
    bitBuffer.push(0);
  }

  const dataCodewords = [];
  for (let i = 0; i < bitBuffer.length; i += 8) {
    dataCodewords.push(bitBuffer.slice(i, i + 8).reduce((sum, bit) => (sum << 1) | bit, 0));
  }

  for (let padByte = 0xec; dataCodewords.length < dataCodewordCount; padByte ^= 0xfd) {
    dataCodewords.push(padByte);
  }

  const codewords = dataCodewords.concat(getQrErrorCorrectionCodewords(dataCodewords, errorCorrectionCodewordCount));
  const modules = Array.from({ length: size }, () => Array(size).fill(false));
  const isFunction = Array.from({ length: size }, () => Array(size).fill(false));

  const setModule = (x, y, isDark, isFunctionModule = true) => {
    if (x < 0 || y < 0 || x >= size || y >= size) return;
    modules[y][x] = Boolean(isDark);
    if (isFunctionModule) isFunction[y][x] = true;
  };

  const drawFinder = (left, top) => {
    for (let y = -1; y <= 7; y += 1) {
      for (let x = -1; x <= 7; x += 1) {
        const xx = left + x;
        const yy = top + y;
        const isInside = x >= 0 && x <= 6 && y >= 0 && y <= 6;
        const isDark = isInside && (x === 0 || x === 6 || y === 0 || y === 6 || (x >= 2 && x <= 4 && y >= 2 && y <= 4));
        setModule(xx, yy, isDark);
      }
    }
  };

  const drawAlignment = (centerX, centerY) => {
    for (let y = -2; y <= 2; y += 1) {
      for (let x = -2; x <= 2; x += 1) {
        setModule(centerX + x, centerY + y, Math.max(Math.abs(x), Math.abs(y)) !== 1);
      }
    }
  };

  drawFinder(0, 0);
  drawFinder(size - 7, 0);
  drawFinder(0, size - 7);
  drawAlignment(30, 30);

  for (let i = 8; i < size - 8; i += 1) {
    setModule(i, 6, i % 2 === 0);
    setModule(6, i, i % 2 === 0);
  }

  setModule(8, size - 8, true);

  const formatBits = getQrFormatBits(1, 0);
  for (let i = 0; i <= 5; i += 1) setModule(8, i, ((formatBits >>> i) & 1) !== 0);
  setModule(8, 7, ((formatBits >>> 6) & 1) !== 0);
  setModule(8, 8, ((formatBits >>> 7) & 1) !== 0);
  setModule(7, 8, ((formatBits >>> 8) & 1) !== 0);
  for (let i = 9; i < 15; i += 1) setModule(14 - i, 8, ((formatBits >>> i) & 1) !== 0);
  for (let i = 0; i < 8; i += 1) setModule(size - 1 - i, 8, ((formatBits >>> i) & 1) !== 0);
  for (let i = 8; i < 15; i += 1) setModule(8, size - 15 + i, ((formatBits >>> i) & 1) !== 0);

  const dataBits = codewords.flatMap((codeword) => {
    const bits = [];
    appendQrBits(bits, codeword, 8);
    return bits;
  });
  let bitIndex = 0;
  let upward = true;

  for (let right = size - 1; right >= 1; right -= 2) {
    if (right === 6) right -= 1;
    for (let vertical = 0; vertical < size; vertical += 1) {
      const y = upward ? size - 1 - vertical : vertical;
      for (let j = 0; j < 2; j += 1) {
        const x = right - j;
        if (isFunction[y][x]) continue;
        let isDark = bitIndex < dataBits.length ? dataBits[bitIndex] === 1 : false;
        bitIndex += 1;
        if ((x + y) % 2 === 0) isDark = !isDark;
        setModule(x, y, isDark, false);
      }
    }
    upward = !upward;
  }

  return modules;
}

function getQrSvgMarkup(text) {
  const qrTargetUrl = cleanLabelCopy(text);
  if (!qrTargetUrl) {
    return `<span class="label-source-qr-fallback">QR</span>`;
  }

  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=260x260&margin=1&data=${encodeURIComponent(qrTargetUrl)}`;

  return `
    <img
      alt="Scan source signal"
      class="label-source-qr-img"
      decoding="sync"
      loading="eager"
      referrerpolicy="no-referrer"
      src="${escapeHtml(qrImageUrl)}"
    >
  `;
}

function getSourceAccessMarkup(label, sourceSignal = null) {
  const rawUrl = sourceSignal?.rawUrl || label.sourceUrl;
  const qrTargetUrl = getQrTargetUrl(rawUrl);
  if (!qrTargetUrl) return "";
  const scanLabel = getSourceAccessScanLabel(rawUrl, qrTargetUrl);

  return `
    <section class="label-source-access" aria-label="source access">
      <div class="label-source-access-copy">
        <span>SOURCE ACCESS</span>
        <p>${escapeHtml(scanLabel)}</p>
        <strong>SOURCE ${escapeHtml(label.labelNo)}</strong>
      </div>
      <div class="label-source-qr">${getQrSvgMarkup(qrTargetUrl)}</div>
    </section>
  `;
}

function normalizeDevLabel50x70(label) {
  const source = label || devLabel50x70Sample;
  const intensity = normalizeLabelIntensity(source.intensity);
  const shelf = cleanLabelCopy(source.shelf) || "TIME SIGNAL";
  const identityValueFallback = intensity === "light"
    ? "一句今天要带走的判断。"
    : "先判断这条变化与你有什么关系。";
  const todayFocusFallback = intensity === "light" ? "" : "保留一个真实判断。";

  return {
    labelNo: cleanLabelCopy(source.labelNo) || "#000",
    shelf,
    source: cleanLabelCopy(source.source) || "SIGNAL SOURCE",
    date: cleanLabelCopy(source.date) || getTodayLabelDate(),
    sourceUrl: cleanLabelCopy(source.sourceUrl || source.rawUrl) || "",
    sourceSignal: cleanLabelCopy(source.sourceSignal) || "",
    sliceTitle: cleanLabelCopy(source.sliceTitle) || "今天只看一条关键变化。",
    identity: cleanLabelCopy(source.identity) || "READER",
    identityValue: cleanLabelCopy(source.identityValue) || identityValueFallback,
    todayFocus: cleanLabelCopy(source.todayFocus) || todayFocusFallback,
    intensity,
    serveStyle: normalizeLabelServeStyle(source.serveStyle),
  };
}

function getLabel50x70DensityClass(label, hasSourceAccess = false) {
  const sourceAccessWeight = hasSourceAccess ? 24 : 0;
  const copyLength = [
    label.sliceTitle,
    label.sourceSignal,
    label.identityValue,
    label.todayFocus,
  ].filter(Boolean).join("").length + sourceAccessWeight;
  const hasLongToken = /[A-Za-z0-9/_-]{16,}/.test([
    label.sliceTitle,
    label.sourceSignal,
    label.identityValue,
    label.todayFocus,
  ].filter(Boolean).join(" "));

  if (label.intensity === "double" || copyLength > 112 || hasLongToken) {
    return "label-copy-dense";
  }

  if (copyLength > 88) {
    return "label-copy-compact";
  }

  return "label-copy-normal";
}

function getDevLabel50x70Markup(label, { printable = false, sourceSignal = null } = {}) {
  const shelfShort = getLabelShelfShort(label.shelf);
  const brewLine = `BREW ${label.intensity.toUpperCase()} / ${shelfShort}`;
  const serveLine = getDevLabelServeFooter(label.serveStyle);
  const identityForLabel = getIdentityForLabel(selectedIdentity?.id, label.identity);
  const printAttribute = printable ? ` data-print-label="true"` : "";
  const densityClass = getLabel50x70DensityClass(label, Boolean(sourceSignal?.id));
  const headerMeta = `<span>${escapeHtml(label.source)} &middot; ${escapeHtml(label.date)}</span>`;
  const signalContext = cleanLabelCopy(label.sourceSignal);
  const contextValue = signalContext
    ? `<section class="label-test-context" aria-label="signal context">
        <span>SIGNAL CONTEXT</span>
        <p>${escapeHtml(signalContext)}</p>
      </section>`
    : "";
  const bodyValue = label.intensity === "light" || label.identityValue
    ? `<section class="label-test-body" aria-label="current identity">
        <span>${escapeHtml(identityForLabel)}</span>
        ${label.identityValue ? `<p>${escapeHtml(label.identityValue)}</p>` : ""}
      </section>`
    : "";
  const focusValue = label.todayFocus
    ? `<section class="label-test-focus${label.intensity === "light" ? " label-test-focus-lite" : ""}" aria-label="current today focus">
        ${label.intensity === "light" ? "" : "<span>TODAY'S FOCUS</span>"}
        <p>${escapeHtml(label.todayFocus)}</p>
      </section>`
    : "";
  const canonical = selectedSignal ? buildCanonicalSlice(selectedSignal, selectedIdentity, label.intensity, label.serveStyle) : null;
  const possibleNoiseValue = cleanLabelCopy(canonical?.noiseToIgnore || canonical?.whyToday);
  const noiseValue = label.intensity === "double"
    && possibleNoiseValue
    && !areCopyLinesSimilar(possibleNoiseValue, label.todayFocus)
    && !areCopyLinesSimilar(possibleNoiseValue, label.identityValue)
    ? possibleNoiseValue
    : "";
  const noiseSection = noiseValue
    ? `<section class="label-test-noise" aria-label="do not chase">
        <span>DON'T CHASE</span>
        <p>${escapeHtml(noiseValue)}</p>
      </section>`
    : "";
  const sourceAccessMarkup = getSourceAccessMarkup(label, sourceSignal);

  return `
    <article class="label-paper-50x70 label-paper-${escapeHtml(label.intensity)} ${densityClass}"${printAttribute}>
      <div class="label-safe-area">
        <header class="label-test-header">
          <strong>TIME SLICE COFFEE</strong>
          <span>${escapeHtml(label.labelNo)} / ${escapeHtml(shelfShort)}</span>
          ${headerMeta}
        </header>

        <h3>${escapeHtml(label.sliceTitle)}</h3>

        ${contextValue}
        ${bodyValue}
        ${focusValue}
        ${noiseSection}
        ${sourceAccessMarkup}

        <div class="label-test-brew">${escapeHtml(brewLine)}</div>
        <footer>${escapeHtml(serveLine)}</footer>
      </div>
    </article>
  `;
}

function getDevLabel50x70MetaMarkup(label, hasGeneratedLabel) {
  const mode = hasGeneratedLabel ? label.intensity.toUpperCase() : "SAMPLE";
  const intent = getIdentityForLabel(selectedIdentity?.id, label.identity);
  const serve = normalizeLabelServeStyle(label.serveStyle).toUpperCase();

  return `
    <span>CURRENT MODE: ${escapeHtml(mode)}</span>
    <span>INTENT: ${escapeHtml(intent)}</span>
    <span>SERVE: ${escapeHtml(serve)}</span>
  `;
}

function renderDevLabel50x70Preview(label = generatedLabel) {
  if (!devLabel50x70Current) return;

  const currentLabel = label && (!getCurrentSignal() || isLabelForCurrentSelection(label))
    ? label
    : null;
  const hasGeneratedLabel = Boolean(currentLabel);
  const safeLabel = normalizeDevLabel50x70(currentLabel);
  if (devLabel50x70CurrentMeta) {
    devLabel50x70CurrentMeta.innerHTML = getDevLabel50x70MetaMarkup(safeLabel, hasGeneratedLabel);
  }
  devLabel50x70Current.innerHTML = getDevLabel50x70Markup(safeLabel, {
    sourceSignal: hasGeneratedLabel ? getCurrentSignal() : null,
  });

  if (hasGeneratedLabel) {
    console.log("DEV 50X70 LABEL PREVIEW", {
      intensity: safeLabel.intensity,
      labelNo: safeLabel.labelNo,
      sliceTitle: safeLabel.sliceTitle,
      identityValue: safeLabel.identityValue,
      todayFocus: safeLabel.todayFocus,
      serveStyle: safeLabel.serveStyle,
    });
  }
}

function renderPickup50x70LabelPreview(label = generatedLabel) {
  if (!pickupLabel50x70Preview) return;

  const currentLabel = label && (!getCurrentSignal() || isLabelForCurrentSelection(label))
    ? label
    : getCurrentSignal()
      ? buildFallbackTimeSliceLabel()
      : label;
  const safeLabel = normalizeDevLabel50x70(currentLabel);
  pickupLabel50x70Preview.innerHTML = "";
  pickupLabel50x70Preview.innerHTML = getDevLabel50x70Markup(safeLabel, {
    sourceSignal: getCurrentSignal(),
  });
}

function getPrintFrame50x70Styles() {
  return `
    @page {
      size: 50mm 70mm;
      margin: 0;
    }

    html,
    body {
      width: 50mm;
      height: 70mm;
      margin: 0;
      padding: 0;
      overflow: hidden;
      background: #ffffff;
    }

    * {
      box-sizing: border-box;
    }

    body {
      display: block;
      font-family: Inter, "Arial", "Microsoft YaHei", sans-serif;
    }

    .label-paper-50x70 {
      width: 50mm !important;
      height: 70mm !important;
      margin: 0 !important;
      padding: 0 !important;
      position: fixed !important;
      left: 0 !important;
      top: 0 !important;
      overflow: hidden !important;
      background: #ffffff !important;
      border: none !important;
      box-shadow: none !important;
      transform: none !important;
      page-break-before: avoid !important;
      page-break-after: avoid !important;
      break-before: avoid !important;
      break-after: avoid !important;
    }

    .label-paper-50x70,
    .label-paper-50x70 * {
      color: #000000 !important;
      opacity: 1 !important;
      -webkit-text-fill-color: #000000 !important;
    }

    .label-paper-50x70 * {
      border-color: #000000 !important;
      overflow-wrap: anywhere !important;
      text-overflow: clip !important;
      white-space: normal !important;
      word-break: break-word !important;
    }

    .label-safe-area {
      width: 42mm !important;
      max-width: 42mm !important;
      height: 62mm !important;
      margin: 3mm auto 5mm !important;
      padding: 0 !important;
      display: flex !important;
      flex-direction: column !important;
      overflow: visible !important;
    }

    .label-test-header {
      display: flex !important;
      flex-direction: column !important;
      gap: 0.7mm !important;
      padding-bottom: 1.1mm !important;
      border-bottom: 0.5px solid #000000 !important;
    }

    .label-test-header strong {
      font-size: 7.2pt !important;
      font-weight: 700 !important;
      line-height: 1.12 !important;
      letter-spacing: 0 !important;
    }

    .label-test-header span {
      font-size: 5.6pt !important;
      font-weight: 700 !important;
      line-height: 1.16 !important;
      letter-spacing: 0 !important;
    }

    h3 {
      font-size: 10.9pt !important;
      line-height: 1.08 !important;
      margin: 1.8mm 0 1.4mm !important;
      font-weight: 750 !important;
      letter-spacing: 0 !important;
    }

    .label-paper-light h3 {
      font-size: 12.8pt !important;
      margin: 2.2mm 0 1.4mm !important;
    }

    .label-paper-double h3 {
      font-size: 10.8pt !important;
      line-height: 1.08 !important;
      margin: 1.8mm 0 1.5mm !important;
    }

    .label-test-context,
    .label-test-noise {
      display: flex !important;
      flex-direction: column !important;
      gap: 0.4mm !important;
      margin-bottom: 0.8mm !important;
      padding-left: 0.75mm !important;
      border-left: 0.5px solid #000000 !important;
    }

    .label-test-noise {
      margin-top: 0.55mm !important;
      margin-bottom: 0 !important;
    }

    .label-test-body {
      display: flex !important;
      flex-direction: column !important;
      gap: 0.65mm !important;
      padding-top: 1mm !important;
      border-top: 0.5px solid #000000 !important;
    }

    .label-test-body span,
    .label-test-focus span,
    .label-test-context span,
    .label-test-noise span {
      font-size: 5.6pt !important;
      font-weight: 700 !important;
      line-height: 1.16 !important;
      letter-spacing: 0 !important;
    }

    .label-test-context p,
    .label-test-body p,
    .label-test-noise p {
      margin: 0 !important;
      font-size: 6.7pt !important;
      font-weight: 700 !important;
      line-height: 1.18 !important;
      letter-spacing: 0 !important;
    }

    .label-test-focus {
      display: flex !important;
      flex-direction: column !important;
      gap: 0.5mm !important;
      margin-top: 1mm !important;
      padding-left: 1mm !important;
      border-left: 0.5px solid #000000 !important;
    }

    .label-test-focus p {
      margin: 0 !important;
      font-size: 6.3pt !important;
      font-weight: 700 !important;
      line-height: 1.16 !important;
      letter-spacing: 0 !important;
    }

    .label-test-focus-lite {
      border-left: 0 !important;
      margin-top: 0.65mm !important;
      padding-left: 0 !important;
    }

    .label-source-access {
      display: grid !important;
      grid-template-columns: minmax(0, 1fr) 17mm !important;
      gap: 1mm !important;
      align-items: center !important;
      margin-top: auto !important;
      padding-top: 0.8mm !important;
      border-top: 0.5px solid #000000 !important;
      flex-shrink: 0 !important;
    }

    .label-source-access-copy {
      display: grid !important;
      gap: 0.3mm !important;
      min-width: 0 !important;
    }

    .label-source-access-copy span {
      font-size: 5pt !important;
      font-weight: 700 !important;
      line-height: 1.05 !important;
      letter-spacing: 0 !important;
    }

    .label-source-access-copy p,
    .label-source-access-copy strong {
      margin: 0 !important;
      font-size: 5pt !important;
      font-weight: 700 !important;
      line-height: 1.08 !important;
      letter-spacing: 0 !important;
    }

    .label-source-qr {
      width: 17mm !important;
      height: 17mm !important;
      display: grid !important;
      place-items: center !important;
      justify-self: end !important;
      background: #ffffff !important;
      color: #000000 !important;
      flex-shrink: 0 !important;
    }

    .label-source-qr-svg,
    .label-source-qr-img {
      width: 100% !important;
      height: 100% !important;
      display: block !important;
      filter: none !important;
      image-rendering: pixelated !important;
      opacity: 1 !important;
      shape-rendering: crispEdges !important;
    }

    .label-source-qr-fallback {
      width: 100% !important;
      height: 100% !important;
      display: grid !important;
      place-items: center !important;
      border: 0.5px solid #000000 !important;
      font-size: 5pt !important;
      font-weight: 700 !important;
    }

    .label-test-brew {
      margin-top: 0.75mm !important;
      padding-top: 0.85mm !important;
      border-top: 0.5px solid #000000 !important;
      font-size: 5.8pt !important;
      font-weight: 700 !important;
      line-height: 1.16 !important;
      letter-spacing: 0 !important;
      flex-shrink: 0 !important;
    }

    footer {
      margin-top: 0.85mm !important;
      padding-top: 0.85mm !important;
      border-top: 0.5px solid #000000 !important;
      font-size: 6.1pt !important;
      font-weight: 700 !important;
      line-height: 1.16 !important;
      letter-spacing: 0 !important;
      flex-shrink: 0 !important;
    }

    .label-paper-50x70.label-copy-compact .label-test-header {
      gap: 0.5mm !important;
      padding-bottom: 0.85mm !important;
    }

    .label-paper-50x70.label-copy-compact h3 {
      font-size: 10.4pt !important;
      line-height: 1.04 !important;
      margin: 1.1mm 0 0.8mm !important;
    }

    .label-paper-50x70.label-copy-compact .label-test-body {
      gap: 0.45mm !important;
      padding-top: 0.75mm !important;
    }

    .label-paper-50x70.label-copy-compact .label-test-context {
      gap: 0.3mm !important;
      margin-bottom: 0.55mm !important;
      padding-left: 0.65mm !important;
    }

    .label-paper-50x70.label-copy-compact .label-test-context p,
    .label-paper-50x70.label-copy-compact .label-test-noise p {
      font-size: 5.55pt !important;
      line-height: 1.08 !important;
    }

    .label-paper-50x70.label-copy-compact .label-test-body p {
      font-size: 5.8pt !important;
      line-height: 1.1 !important;
    }

    .label-paper-50x70.label-copy-compact .label-test-focus {
      gap: 0.35mm !important;
      margin-top: 0.65mm !important;
      padding-left: 0.75mm !important;
    }

    .label-paper-50x70.label-copy-compact .label-test-focus p {
      font-size: 5.45pt !important;
      line-height: 1.08 !important;
    }

    .label-paper-50x70.label-copy-compact .label-source-access {
      grid-template-columns: minmax(0, 1fr) 16mm !important;
      gap: 0.75mm !important;
      padding-top: 0.6mm !important;
    }

    .label-paper-50x70.label-copy-compact .label-source-qr {
      width: 16mm !important;
      height: 16mm !important;
    }

    .label-paper-50x70.label-copy-compact .label-source-access-copy span,
    .label-paper-50x70.label-copy-compact .label-source-access-copy p,
    .label-paper-50x70.label-copy-compact .label-source-access-copy strong {
      font-size: 4.55pt !important;
      line-height: 1.05 !important;
    }

    .label-paper-50x70.label-copy-dense .label-test-header {
      gap: 0.4mm !important;
      padding-bottom: 0.7mm !important;
    }

    .label-paper-50x70.label-copy-dense .label-test-header span {
      font-size: 4.65pt !important;
      line-height: 1.08 !important;
    }

    .label-paper-50x70.label-copy-dense h3 {
      font-size: 9.8pt !important;
      line-height: 1.03 !important;
      margin: 0.85mm 0 0.65mm !important;
    }

    .label-paper-50x70.label-copy-dense .label-test-body {
      gap: 0.35mm !important;
      padding-top: 0.6mm !important;
    }

    .label-paper-50x70.label-copy-dense .label-test-context {
      gap: 0.25mm !important;
      margin-bottom: 0.45mm !important;
      padding-left: 0.55mm !important;
    }

    .label-paper-50x70.label-copy-dense .label-test-body span,
    .label-paper-50x70.label-copy-dense .label-test-focus span,
    .label-paper-50x70.label-copy-dense .label-test-context span,
    .label-paper-50x70.label-copy-dense .label-test-noise span,
    .label-paper-50x70.label-copy-dense .label-test-brew {
      font-size: 4.9pt !important;
      line-height: 1.06 !important;
    }

    .label-paper-50x70.label-copy-dense .label-test-context p,
    .label-paper-50x70.label-copy-dense .label-test-noise p {
      font-size: 5.15pt !important;
      line-height: 1.06 !important;
    }

    .label-paper-50x70.label-copy-dense .label-test-body p {
      font-size: 5.45pt !important;
      line-height: 1.07 !important;
    }

    .label-paper-50x70.label-copy-dense .label-test-focus {
      gap: 0.3mm !important;
      margin-top: 0.5mm !important;
      padding-left: 0.65mm !important;
    }

    .label-paper-50x70.label-copy-dense .label-test-focus p {
      font-size: 5.2pt !important;
      line-height: 1.06 !important;
    }

    .label-paper-50x70.label-copy-dense .label-source-access {
      grid-template-columns: minmax(0, 1fr) 15.5mm !important;
      gap: 0.6mm !important;
      padding-top: 0.5mm !important;
    }

    .label-paper-50x70.label-copy-dense .label-source-qr {
      width: 15.5mm !important;
      height: 15.5mm !important;
    }

    .label-paper-50x70.label-copy-dense .label-source-access-copy span,
    .label-paper-50x70.label-copy-dense .label-source-access-copy p,
    .label-paper-50x70.label-copy-dense .label-source-access-copy strong {
      font-size: 4.2pt !important;
      line-height: 1.03 !important;
    }

    .label-paper-50x70.label-copy-dense .label-test-brew {
      padding-top: 0.55mm !important;
    }

    .label-paper-50x70.label-copy-dense footer {
      font-size: 5.1pt !important;
      margin-top: 0.5mm !important;
      padding-top: 0.55mm !important;
    }
  `;
}

function printCurrent50x70Label() {
  const source = document.querySelector("#pickup-50x70-label .label-paper-50x70");

  if (!source) {
    console.warn("current 50x70 label not found");
    return;
  }

  console.log("IFRAME PRINT 50X70", {
    sourceLabels: document.querySelectorAll("#pickup-50x70-label .label-paper-50x70").length,
    framesBefore: document.querySelectorAll("#print-frame-50x70").length,
  });

  document.querySelectorAll("#print-frame-50x70").forEach((frame) => frame.remove());

  const iframe = document.createElement("iframe");
  iframe.id = "print-frame-50x70";
  iframe.style.position = "fixed";
  iframe.style.right = "0";
  iframe.style.bottom = "0";
  iframe.style.width = "0";
  iframe.style.height = "0";
  iframe.style.border = "0";
  iframe.style.visibility = "hidden";
  document.body.appendChild(iframe);

  const labelClone = source.cloneNode(true);
  labelClone.setAttribute("data-print-label", "true");

  const printDocument = iframe.contentDocument;
  const printWindow = iframe.contentWindow;

  if (!printDocument || !printWindow) {
    console.warn("50x70 print frame not available");
    iframe.remove();
    return;
  }

  printDocument.open();
  printDocument.write(`<!doctype html>
    <html lang="zh-CN">
      <head>
        <meta charset="UTF-8" />
        <style>${getPrintFrame50x70Styles()}</style>
      </head>
      <body></body>
    </html>`);
  printDocument.close();
  printDocument.body.replaceChildren(labelClone);

  console.log("IFRAME PRINT READY", {
    iframeLabels: printDocument.querySelectorAll(".label-paper-50x70").length,
  });

  printWindow.addEventListener("afterprint", () => {
    iframe.remove();
  }, { once: true });

  window.setTimeout(() => {
    printWindow.focus();
    printWindow.print();
    window.setTimeout(() => {
      if (iframe.isConnected) iframe.remove();
    }, 30000);
  }, 50);
}

async function fetchAiRewrite({ signal } = {}) {
  const response = await fetch("/api/rewrite", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    signal,
    body: JSON.stringify({
      signal: {
        id: selectedSignal?.id || "000",
        slice: selectedSignal?.sliceTitle || "今天，只看一条真正相关的变化。",
        shortReason: selectedSignal?.sliceReason || selectedSignal?.whyWorthWatching || "",
        rawTitle: getSignalRawTitle(selectedSignal),
        rawSummary: getSignalRawSummary(selectedSignal),
        whyWorthWatching: getSignalWorthWatching(selectedSignal),
        source: selectedSignal?.source || "LOCAL FALLBACK",
        fetchedAt: selectedSignal?.fetchedAt || "TODAY",
        shelf: getLabelShelf(selectedSignal),
        signalMark: getSignalMark(selectedSignal),
      },
      identity: {
        id: selectedIdentity?.id || "everyday",
        name: selectedIdentity?.name || "Everyday Person",
        en: selectedIdentity?.en || "Everyday Person",
        label: selectedIdentity?.label || "普通人",
      },
      intensity: selectedStrength?.id || "regular",
      serveStyle: selectedServeStyle?.id || "hot",
    }),
  });

  if (!response.ok) {
    throw new Error(`Rewrite API failed with ${response.status}`);
  }

  return response.json();
}

function resetBrewResult() {
  clearGeneratedOutputState();
  heroCodeCup?.classList.remove("is-brewing", "is-ordering", "is-complete");
  valueSection.classList.add("is-disabled");
  labelSection.classList.add("is-disabled");
}

function resetDemoFlow({ render = true } = {}) {
  clearGeneratedOutputState();
  selectedSignal = null;
  selectedShelfId = null;
  selectedIdentity = null;
  selectedStrength = strengths[1];
  selectedServeStyle = serveStyles[0];
  activeRewrite = null;
  signalRoundIndex = 0;
  hasVisitedSignals = false;
  heroCodeCup?.classList.remove("is-brewing", "is-ordering", "is-complete");
  identitySection.classList.add("is-disabled");
  brewSection.classList.add("is-disabled");
  serveSection.classList.add("is-disabled");
  valueSection.classList.add("is-disabled");
  labelSection.classList.add("is-disabled");

  if (!render) return;

  renderShelves();
  renderSignals();
  renderIdentities();
  renderStrengths();
  renderServeStyles();
  hasSelectedStrength = false;
  hasSelectedServeStyle = false;
  sliceReceiptPreview.remove();
}

function selectSignal(signalId) {
  selectedSignal = getRoundSignals().find((signal) => signal.id === signalId) || activeSignals.find((signal) => signal.id === signalId);
  selectedIdentity = null;
  hasSelectedStrength = false;
  hasSelectedServeStyle = false;
  renderSignals();
  renderIdentities();
  identitySection.classList.add("is-disabled");
  brewSection.classList.add("is-disabled");
  serveSection.classList.add("is-disabled");
  resetBrewResult();
  renderSliceReceiptPreview("raw");
  scrollAfterRender(selectedSignalPanel);
}

function selectShelf(shelfId) {
  hasVisitedSignals = true;
  selectedShelfId = shelfId;
  selectedSignal = null;
  selectedIdentity = null;
  hasSelectedStrength = false;
  hasSelectedServeStyle = false;
  renderShelves();
  renderSignals();
  renderIdentities();
  identitySection.classList.add("is-disabled");
  brewSection.classList.add("is-disabled");
  serveSection.classList.add("is-disabled");
  resetBrewResult();
  sliceReceiptPreview.remove();
  waitForSignalsLayout(scrollToSignalsActive);
}

function continueToLens() {
  if (!selectedSignal) return;

  enableSection(identitySection);
  renderSliceReceiptPreview("identity");
  scrollToSection(identitySection);
}

function selectIdentity(identityId) {
  selectedIdentity = identities.find((identity) => identity.id === identityId);
  hasSelectedStrength = false;
  hasSelectedServeStyle = false;
  renderIdentities();
  renderStrengths();
  renderServeStyles();
  enableSection(brewSection);
  enableSection(serveSection);
  resetBrewResult();
  renderSliceReceiptPreview("brew");
  scrollToSection(brewSection);
}

function selectStrength(strengthId) {
  selectedStrength = strengths.find((strength) => strength.id === strengthId);
  hasSelectedStrength = true;
  hasSelectedServeStyle = false;
  renderStrengths();
  renderServeStyles();
  enableSection(serveSection);
  labelSection.classList.add("is-disabled");
  renderSliceReceiptPreview("serve");
  scrollToSection(serveSection);

  if (activeRewrite) {
    renderValueRewrite(activeRewrite);
    renderTimeSliceLabel(activeRewrite);
    renderPickup50x70LabelPreview();
    renderDevLabel50x70Preview();
  }
}

function selectServeStyle(serveId) {
  selectedServeStyle = serveStyles.find((serveStyle) => serveStyle.id === serveId);
  hasSelectedServeStyle = true;
  renderServeStyles();
  labelSection.classList.add("is-disabled");
  renderSliceReceiptPreview("serve");
  brewSlice();
}

function showGeneratedLabel() {
  if (!activeRewrite) return;

  enableSection(labelSection);
  if (!isLabelForCurrentSelection(activeRewrite.timeSliceLabel)) {
    activeRewrite = normalizeRewrite(activeRewrite);
  }

  generatedLabel = isLabelForCurrentSelection(activeRewrite.timeSliceLabel)
    ? activeRewrite.timeSliceLabel
    : isLabelForCurrentSelection(generatedLabel)
      ? generatedLabel
      : buildFallbackTimeSliceLabel();
  activeRewrite = {
    ...activeRewrite,
    timeSliceLabel: generatedLabel,
  };
  renderTimeSliceLabel(activeRewrite);
  renderPickup50x70LabelPreview(generatedLabel);
  renderDevLabel50x70Preview(generatedLabel);
  console.log("generatedLabel", generatedLabel);
  scrollAfterRender(labelSection);
}

async function brewSlice() {
  if (!selectedSignal || !selectedIdentity) return;

  console.log("brewing started");
  console.log("selectedSignal", selectedSignal);
  console.log("selectedIdentity", selectedIdentity);
  console.log("selectedIntensity", selectedStrength?.id || "regular");
  console.log("selectedServeStyle", selectedServeStyle?.id || "hot");

  enableSection(valueSection);
  labelSection.classList.add("is-disabled");
  setCodeCupBrewing(true);
  renderLoading();
  scrollToSection(valueSection);

  try {
    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), 1200);
    let rewrite;

    try {
      rewrite = await fetchAiRewrite({ signal: controller.signal });
    } finally {
      window.clearTimeout(timeoutId);
    }

    renderValueRewrite(rewrite || { timeSliceLabel: buildFallbackTimeSliceLabel() });
    generatedLabel = renderTimeSliceLabel(activeRewrite);
    renderPickup50x70LabelPreview(generatedLabel);
    renderDevLabel50x70Preview(generatedLabel);
    console.log("generatedLabel", generatedLabel);
    setCodeCupComplete();
  } catch (error) {
    console.error(error);
    const fallbackLabel = buildFallbackTimeSliceLabel();
    let fallback;

    try {
      fallback = {
        ...getMockValueRewrite(),
        timeSliceLabel: fallbackLabel,
      };
    } catch (fallbackError) {
      console.error(fallbackError);
      fallback = {
        title: fallbackLabel.sliceTitle,
        todayChange: fallbackLabel.sliceTitle,
        whyImportant: fallbackLabel.identityValue,
        relationToYou: fallbackLabel.identityValue,
        focusNow: fallbackLabel.todayFocus,
        keywords: ["Signal", "Fallback", "Label"],
        coreLine: fallbackLabel.sliceTitle,
        timeSliceLabel: fallbackLabel,
      };
    }

    renderValueRewrite(fallback);
    generatedLabel = renderTimeSliceLabel(activeRewrite);
    renderPickup50x70LabelPreview(generatedLabel);
    renderDevLabel50x70Preview(generatedLabel);
    console.log("generatedLabel", generatedLabel);
    setCodeCupComplete();
  } finally {
    setCodeCupBrewing(false);
    scrollAfterRender(valueSection);
    console.log("brewing finished");
  }
}

async function refreshPreparedSignals() {
  if (isPreparingSignals) return;

  signalRoundIndex += 1;

  if (isCandidateSignalMode) {
    setSignalRefreshState(true, "Candidate signal beans: showing next group...");
    await wait(160);
    resetSignalFlowAfterRefresh(candidateSignalsExpanded);
    setSignalRefreshState(false, "Candidate signal beans loaded.");
    return;
  }

  setSignalRefreshState(true, "正在更新今日信息货架... Refreshing today’s signal shelf...");

  try {
    const [response] = await Promise.all([
      fetch("/api/prepare-signals", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          source: "x-grok",
          query: "AI OR work OR education OR climate OR design OR consumption",
          limit: 54,
        }),
      }),
      wait(520),
    ]);

    if (!response.ok) {
      throw new Error(`Prepare signals failed with ${response.status}`);
    }

    const payload = await response.json();
    resetSignalFlowAfterRefresh(payload.signals);
    setSignalRefreshState(false, "");
  } catch (error) {
    console.error("Prepare signals mock failed; using local fallback.", error);
    resetSignalFlowAfterRefresh(preparedSignals);
    setSignalRefreshState(false, "Using local prepared signal beans.");
  }
}

shelfGrid.addEventListener("click", (event) => {
  const card = event.target.closest("[data-shelf-id]");

  if (!card) return;
  selectShelf(card.dataset.shelfId);
});

signalGrid.addEventListener("click", (event) => {
  const card = event.target.closest("[data-signal-id]");

  if (!card) return;
  selectSignal(card.dataset.signalId);
});

selectedSignalPanel.addEventListener("click", (event) => {
  if (!event.target.closest("#continue-signal-button")) return;
  continueToLens();
});

valuePanel.addEventListener("click", (event) => {
  if (!event.target.closest("#generate-label-button")) return;
  showGeneratedLabel();
});

identityGrid.addEventListener("click", (event) => {
  const card = event.target.closest("[data-identity-id]");

  if (!card) return;
  selectIdentity(card.dataset.identityId);
});

strengthGrid.addEventListener("click", (event) => {
  const card = event.target.closest("[data-strength-id]");

  if (!card) return;
  selectStrength(card.dataset.strengthId);
});

serveGrid.addEventListener("click", (event) => {
  const card = event.target.closest("[data-serve-id]");

  if (!card) return;
  selectServeStyle(card.dataset.serveId);
});

brewButton.addEventListener("click", brewSlice);
refreshSignalsButton?.addEventListener("click", refreshPreparedSignals);

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const hash = link.getAttribute("href");
    if (!hash || hash === "#") return;

    event.preventDefault();
    window.history.replaceState(null, "", window.location.pathname);

    if (hash === "#top") {
      scrollToSection("top", { offset: 0 });
      return;
    }

    if (hash === "#signals" || hash === "#signal-flow-anchor") {
      enterSignalsShelf();
      return;
    }

    scrollToSection(hash);
  });
});

if (heroOrderButton) {
  heroOrderButton.addEventListener("click", () => {
    pulseCodeCup("is-ordering", 1800);
  });
}

window.addEventListener("resize", () => {
  window.clearTimeout(window.codeCupResizeTimer);
  window.codeCupResizeTimer = window.setTimeout(renderCodeCupVisual, 160);
});

printButton.onclick = printCurrent50x70Label;

resetButton.addEventListener("click", () => {
  window.history.replaceState(null, "", window.location.pathname);
  resetDemoFlow();
  scrollToSection("top", { offset: 0 });
});

resetPagePositionOnLoad();
resetDemoFlow({ render: false });
renderShelves();
renderSignals();
renderIdentities();
renderStrengths();
renderServeStyles();
renderPickup50x70LabelPreview();
renderDevLabel50x70Preview();
renderCodeCupVisual();

window.addEventListener("load", () => {
  resetPagePositionOnLoad();
});
