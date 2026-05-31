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

function getLabelCopyLimits(intensity) {
  if (intensity === "light") {
    return {
      sliceTitle: 18,
      identityValue: 18,
      todayFocus: 0,
    };
  }

  if (intensity === "double") {
    return {
      sliceTitle: 22,
      identityValue: 30,
      todayFocus: 20,
    };
  }

  return {
    sliceTitle: 22,
    identityValue: 28,
    todayFocus: 0,
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
  const noteCoreShift = getCleanNoteField(signal, "coreShift");
  if (noteCoreShift) return ensureLabelSentence(noteCoreShift);

  const context = getSignalContextText(signal, candidateTitle);

  if (/客服|工单/.test(context) && /agent|Agent|AI/.test(context)) {
    return "AI agent 正在进入客服工单流程。";
  }

  if (/Claude Code|Claude|代码|编程|开发|IDE/.test(context) && /验证|交付|测试|运行|agent|Agent|AI|补全/.test(context)) {
    return "AI 编程正在从补全代码走向交付验证。";
  }

  if (/视频|影像|剪辑|成片|短片/.test(context) && /AI|生成|模型|创作/.test(context)) {
    return "AI 视频创作正在从成片生成走向过程证明。";
  }

  if (/设计|视觉稿|Figma|交付|创作流程/.test(context)) {
    return "设计交付正在从视觉稿走向可追溯流程。";
  }

  if (isStructuralSliceTitle(candidateTitle)) {
    return ensureLabelSentence(candidateTitle);
  }

  if (isStructuralSliceTitle(signal?.sliceTitle)) {
    return ensureLabelSentence(signal.sliceTitle);
  }

  const fallbackByShelf = {
    "ai-frontier": "AI 能力正在进入具体业务流程。",
    "build-workflow": "工具正在进入连续交付流程。",
    "design-creation": "内容生产正在从生成走向判断。",
    "market-capital": "市场信号正在从热度走向定价。",
    "self-upgrade": "学习方式正在从答案走向判断。",
    "life-signals": "日常选择正在被系统重新分流。",
  };

  return fallbackByShelf[signal?.shelfId] || "一个具体流程正在发生变化。";
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
  return safeLabelTitleForPrint(candidateTitle, signal);
}

function buildExtractionIdentityValue(identity, signal) {
  const notes = getSignalExtractionNotes(signal);
  if (!notes) return "";

  const coreShift = cleanLabelCopy(notes.coreShift);
  const whyToday = cleanLabelCopy(notes.whyToday);
  const possibleUserValue = cleanLabelCopy(notes.possibleUserValue);
  const noiseToIgnore = cleanLabelCopy(notes.noiseToIgnore);
  const shortWhyToday = trimSentenceEnd(trimNoteCopy(whyToday, 14));
  const shortNoiseToIgnore = trimSentenceEnd(trimNoteCopy(noiseToIgnore, 10));

  const lines = {
    student: whyToday || coreShift,
    builder: possibleUserValue || coreShift,
    designer: possibleUserValue || coreShift,
    founder: possibleUserValue || whyToday || coreShift,
    vc: whyToday || noiseToIgnore || coreShift,
    everyday: noiseToIgnore || coreShift,
  };

  return lines[identity?.id] || possibleUserValue || whyToday || coreShift;
}

function buildLabelIdentityFallback(identity, signal) {
  const noteValue = buildExtractionIdentityValue(identity, signal);
  if (noteValue) return ensureLabelSentence(noteValue);

  const subject = getSignalPurposeSubject(signal, 10);
  const lines = {
    student: `理解${subject}带来的关键变化。`,
    builder: `从${subject}影响的流程开始调整。`,
    designer: `把${subject}转成一个表达入口。`,
    founder: `看${subject}对应的需求场景。`,
    vc: `用${subject}判断是否继续跟进。`,
    everyday: `记住${subject}，其余先放下。`,
  };

  return lines[identity?.id] || "先判断这条变化与你有什么关系。";
}

function buildLabelFocusFallback(identity) {
  const lines = {
    student: "记下一个要理解的问题。",
    builder: "找一个新的做法。",
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
    signal?.shelfTitle,
    notes?.labelPotential,
    notes?.coreShift,
  ].map(cleanLabelCopy).filter(Boolean).join(" ");
  const rules = [
    ["Claude Code", /Claude Code/i],
    ["Cursor", /Cursor/i],
    ["Supabase", /Supabase/i],
    ["MCP", /\bMCP\b/i],
    ["Figma", /Figma/i],
    ["Firefly", /Firefly|Adobe/i],
    ["GPU", /\bGPU\b|NVIDIA/i],
    ["Power", /电力|变压器|power/i],
    ["Agent", /Agent|agent/i],
    ["Research", /研究|research/i],
    ["Workflow", /工作流|workflow/i],
    ["Provenance", /provenance|来源证明|Content Credentials/i],
    ["Financing", /融资|贷款|债券|financing/i],
  ];
  const keywords = rules
    .filter(([, pattern]) => pattern.test(source))
    .map(([keyword]) => keyword);
  const merged = [...keywords, ...fallbackKeywords].filter(Boolean);

  return Array.from(new Set(merged)).slice(0, 3);
}

function getPurposeBrewCopy(identity, signal, label) {
  const subject = getSignalPurposeSubject(signal, 14);
  const notes = getSignalExtractionNotes(signal);
  const noteTitle = notes ? trimSentenceEnd(notes.labelPotential || notes.coreShift) : "";
  const identityValue = buildLabelIdentityFallback(identity, signal);
  const todayFocus = getCleanNoteField(signal, "coreShift") || buildLabelFocusFallback(identity);
  const keywords = buildSignalKeywords(signal);
  const copyByIdentity = {
    student: {
      title: noteTitle || "先理解这一点",
      whyImportant: `从${subject}里看今天该学什么。`,
      relationToYou: identityValue,
      focusNow: todayFocus,
      keywords: buildSignalKeywords(signal, ["Learn", "Skill", "Signal"]),
    },
    builder: {
      title: noteTitle || "看见新的做法",
      whyImportant: `从${subject}里看下一步怎么做。`,
      relationToYou: identityValue,
      focusNow: todayFocus,
      keywords: buildSignalKeywords(signal, ["Build", "Workflow", "Action"]),
    },
    designer: {
      title: noteTitle || "找到一个表达角度",
      whyImportant: `从${subject}里看表达可以怎么变。`,
      relationToYou: identityValue,
      focusNow: todayFocus,
      keywords: buildSignalKeywords(signal, ["Create", "Design", "Judgment"]),
    },
    founder: {
      title: noteTitle || "机会可能在这里",
      whyImportant: `从${subject}里看需求入口在哪里。`,
      relationToYou: identityValue,
      focusNow: todayFocus,
      keywords: buildSignalKeywords(signal, ["Opportunity", "Need", "Entry"]),
    },
    vc: {
      title: noteTitle || "值不值得继续看",
      whyImportant: `从${subject}里看是否值得跟进。`,
      relationToYou: identityValue,
      focusNow: todayFocus,
      keywords: buildSignalKeywords(signal, ["Decision", "Risk", "Follow"]),
    },
    everyday: {
      title: noteTitle || "今天先带走这一点",
      whyImportant: `从${subject}里只留真正相关的一点。`,
      relationToYou: identityValue,
      focusNow: todayFocus,
      keywords: buildSignalKeywords(signal, ["Signal", "Focus", "Calm"]),
    },
  };

  return {
    ...(copyByIdentity[identity?.id] || copyByIdentity.everyday),
    keywords: (copyByIdentity[identity?.id] || copyByIdentity.everyday).keywords || keywords,
    coreLine: label?.sliceTitle || getCleanNoteField(signal, "coreShift") || signal?.coreJudgment || signal?.sliceTitle || "",
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
    student: "将从关键变化和需要理解的问题来萃取。",
    builder: "将从流程、工具和执行方式来萃取。",
    designer: "将从表达、创作和判断方式来萃取。",
    founder: "将从需求入口和产品场景来萃取。",
    vc: "将从证据、风险和跟进价值来萃取。",
    everyday: "将从真正相关的一点来萃取。",
  };

  return directionByIdentity[identityId] || directionByIdentity.everyday;
}

function getReceiptResultLines({ forceComplete = false } = {}) {
  if (!selectedSignal) return null;

  const structuralTitle = getStructuralSliceTitle(selectedSignal, selectedSignal.sliceTitle);
  const structuralCore = trimSentenceEnd(structuralTitle);
  const subject = getSignalPurposeSubject(selectedSignal, 12);
  const identityId = selectedIdentity?.id || "everyday";
  const serveStyle = normalizeLabelServeStyle(selectedServeStyle?.id);
  const intensity = normalizeLabelIntensity(selectedStrength?.id);
  const canShowStrength = hasSelectedStrength || forceComplete;
  const canShowServe = hasSelectedServeStyle || forceComplete;
  const hotTone = canShowServe && serveStyle === "hot";
  const notes = getSignalExtractionNotes(selectedSignal);

  if (notes) {
    const whyToday = cleanLabelCopy(notes.whyToday);
    const possibleUserValue = cleanLabelCopy(notes.possibleUserValue);
    const noiseToIgnore = cleanLabelCopy(notes.noiseToIgnore);
    const noteIdentityValue = buildExtractionIdentityValue(selectedIdentity, selectedSignal);
    const copyByNotes = {
      student: {
        core: whyToday || structuralCore,
        reason: structuralCore,
        detail: noiseToIgnore ? `先忽略：${noiseToIgnore}` : "记下一个要理解的问题。",
      },
      builder: {
        core: possibleUserValue || structuralCore,
        reason: structuralCore,
        detail: noiseToIgnore ? `先忽略：${noiseToIgnore}` : "选一个步骤做小测试。",
      },
      designer: {
        core: possibleUserValue || structuralCore,
        reason: structuralCore,
        detail: noiseToIgnore ? `先忽略：${noiseToIgnore}` : "留下一个不能外包的判断。",
      },
      founder: {
        core: possibleUserValue || whyToday || structuralCore,
        reason: structuralCore,
        detail: noiseToIgnore ? `先忽略：${noiseToIgnore}` : "选一个可测试的入口。",
      },
      vc: {
        core: whyToday || structuralCore,
        reason: noiseToIgnore ? `判断时先避开：${noiseToIgnore}` : structuralCore,
        detail: "留下一个跟进依据。",
      },
      everyday: {
        core: noteIdentityValue || structuralCore,
        reason: noiseToIgnore ? `先不用追：${noiseToIgnore}` : "其他噪音可以先不用追。",
        detail: structuralCore,
      },
    };
    const noteCopy = copyByNotes[identityId] || copyByNotes.everyday;

    if (!canShowStrength) return [];
    if (intensity === "light") return [ensureLabelSentence(noteCopy.core)];
    if (intensity === "double") return [noteCopy.core, noteCopy.reason, noteCopy.detail].map(ensureLabelSentence);

    return [noteCopy.core, noteCopy.reason].map(ensureLabelSentence);
  }

  const copyByIdentity = {
    student: {
      core: hotTone ? `先带走：${structuralCore}。` : `今天值得理解的是：${structuralCore}。`,
      reason: `从${subject}里看今天该学什么。`,
      detail: "记下一个要理解的问题。",
    },
    builder: {
      core: hotTone ? `下一步可以这样做：从${subject}影响的流程开始。` : `它可能改变的做事方式是：从${subject}影响的流程开始调整。`,
      reason: hotTone ? "先找一个新的做法。" : "看清哪一步会被工具、协作或执行方式改变。",
      detail: "选一个步骤做小测试。",
    },
    designer: {
      core: hotTone ? `可以带走一个表达入口：${subject}。` : `它给创作表达带来的变化是：把${subject}转成表达入口。`,
      reason: "看表达、取舍和内容生产方式怎么变。",
      detail: "留下一个不能外包的判断。",
    },
    founder: {
      core: hotTone ? `机会可能落在：${subject}对应的需求场景。` : `机会可能落在：${subject}背后的需求、场景或产品入口。`,
      reason: "先看谁会因为它更省事、更快或更确定。",
      detail: "选一个可测试的入口。",
    },
    vc: {
      core: hotTone ? `先判断：${subject}是否值得继续跟进。` : `判断它值不值得跟进，要看：${subject}是否形成持续需求。`,
      reason: "看证据、成本变化和真实使用，不只看热度。",
      detail: "留下一个跟进依据。",
    },
    everyday: {
      core: hotTone ? `今天只需要带走：${subject}。` : `今天只需要带走：${subject}这个重点。`,
      reason: "其他噪音可以先不用追。",
      detail: "只保留一个真实判断。",
    },
  };
  const copy = copyByIdentity[identityId] || copyByIdentity.everyday;

  if (!canShowStrength) return [];
  if (intensity === "light") return [copy.core];
  if (intensity === "double") return [copy.core, copy.reason, copy.detail];

  return [copy.core, copy.reason];
}

function buildSliceReceiptCopy({ forceComplete = false } = {}) {
  if (!selectedSignal) return null;
  const rawHeadline = getRawSignalHeadline(selectedSignal);
  const structuralTitle = getStructuralSliceTitle(selectedSignal, selectedSignal.sliceTitle);
  const selectionParts = getReceiptSelectionParts({ forceComplete });
  const resultLines = getReceiptResultLines({ forceComplete }) || [];
  const meta = [`#${selectedSignal.id || "000"}`, getLabelShelfShort(getLabelShelf(selectedSignal) || selectedSignal.shelfTitle)].filter(Boolean).join(" · ");

  return {
    rawHeadline,
    structuralTitle,
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
    <h3>${escapeHtml(receipt.rawHeadline)}</h3>
    <div class="slice-receipt-layer">
      <span>提炼切片</span>
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
    ${receipt.resultLines.length ? `
      <div class="slice-receipt-result">
        ${receipt.resultLines.map((line) => `<p>${escapeHtml(line)}</p>`).join("")}
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
  const resultLines = receipt.resultLines.length
    ? receipt.resultLines
    : [value.relationToYou || value.whyImportant || value.coreLine].filter(Boolean);

  return `
    <article class="slice-receipt-complete">
      <div class="slice-receipt-kicker">TIME SLICE RECEIPT</div>
      <div class="slice-receipt-meta">
        <span>${escapeHtml(getReceiptCompletionMeta(receipt))}</span>
      </div>
      <h4>${escapeHtml(receipt.rawHeadline)}</h4>
      <div class="slice-receipt-layer">
        <span>提炼切片</span>
        <p>${escapeHtml(receipt.structuralTitle)}</p>
      </div>
      <div class="slice-receipt-result">
        ${resultLines.map((line) => `<p>${escapeHtml(line)}</p>`).join("")}
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
  const noteValue = buildExtractionIdentityValue(identity, signal);
  const fallback = normalizedIntensity === "light"
    ? noteValue || "一句今天要带走的判断。"
    : buildLabelIdentityFallback(identity, signal);

  return fitLabelSentence(fallback, limits.identityValue, fallback);
}

function buildLabelTodayFocus(identity, signal, intensity, serveStyle) {
  const normalizedIntensity = normalizeLabelIntensity(intensity);
  if (normalizedIntensity !== "double") return "";

  const limits = getLabelCopyLimits(normalizedIntensity);
  const fallback = getCleanNoteField(signal, "coreShift") || buildLabelFocusFallback(identity);
  const servePrompt = normalizeLabelServeStyle(serveStyle) === "iced" ? "看清证据。" : "";

  return fitLabelSentence(`${fallback.replace(/[。]+$/g, "")}${servePrompt}`, limits.todayFocus, fallback);
}

function fitTimeSliceLabelCopy(label, identity = selectedIdentity, signal = selectedSignal) {
  const intensity = normalizeLabelIntensity(label?.intensity);
  const serveStyle = normalizeLabelServeStyle(label?.serveStyle);
  const limits = getLabelCopyLimits(intensity);
  const sliceTitle = buildLabelSliceTitle(signal, intensity, label?.sliceTitle);
  const noteIdentityValue = buildExtractionIdentityValue(identity, signal);
  const fitCopySentence = getSignalExtractionNotes(signal) ? fitNoteSentence : fitLabelSentence;
  const identityFallback = intensity === "light"
    ? noteIdentityValue || "一句今天要带走的判断。"
    : noteIdentityValue || "先判断这条变化与你有什么关系。";
  const identityValue = intensity === "light"
    ? fitCopySentence(label?.identityValue || identityFallback, limits.identityValue, identityFallback)
    : fitCopySentence(label?.identityValue, limits.identityValue, identityFallback);
  const todayFocus = intensity === "double"
    ? fitCopySentence(label?.todayFocus, limits.todayFocus, getCleanNoteField(signal, "coreShift") || "保留一个真实判断。")
    : "";
  const fittedLabel = {
    ...label,
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

  return fitTimeSliceLabelCopy({
    labelNo: signalId,
    shelf: selectedSignal?.shelfTitle || getLabelShelf(selectedSignal) || "TIME SLICE",
    source: selectedSignal?.source || "LOCAL FALLBACK",
    date: formatLabelDate(selectedSignal?.fetchedAt || "TODAY"),
    sourceSignal: getSignalRawTitle(selectedSignal) || "No source signal available",
    sliceTitle: selectedSignal?.sliceTitle || "今天只看一条关键变化。",
    identity,
    identityValue: intensity === "light"
      ? buildExtractionIdentityValue(selectedIdentity, selectedSignal) || "一句今天要带走的判断。"
      : buildLabelIdentityFallback(selectedIdentity, selectedSignal),
    todayFocus: intensity === "double" ? getCleanNoteField(selectedSignal, "coreShift") || buildLabelFocusFallback(selectedIdentity) : "",
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

  return fitTimeSliceLabelCopy({
    labelNo: fallback.labelNo,
    shelf: getLabelShelf(selectedSignal) || fallback.shelf,
    source: selectedSignal.source || fallback.source,
    date: formatLabelDate(selectedSignal.fetchedAt || fallback.date),
    sourceSignal: getShortRawSignalTitle(selectedSignal) || fallback.sourceSignal,
    sliceTitle: selectedSignal.sliceTitle || fallback.sliceTitle,
    identity: identityName,
    identityValue: buildLabelIdentityValue(base, selectedIdentity, selectedSignal, intensity) || fallback.identityValue,
    todayFocus: buildLabelTodayFocus(selectedIdentity, selectedSignal, intensity, serveStyle) || fallback.todayFocus,
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
  const purposeIdentityValue = buildLabelIdentityValue(null, selectedIdentity, selectedSignal, fallback.intensity);
  const purposeTodayFocus = buildLabelTodayFocus(selectedIdentity, selectedSignal, fallback.intensity, fallback.serveStyle);
  const candidateMatchesCurrent =
    candidate?.identity === fallback.identity &&
    candidate?.intensity === fallback.intensity &&
    candidate?.serveStyle === fallback.serveStyle;

  return fitTimeSliceLabelCopy({
    labelNo: fallback.labelNo,
    shelf: fallback.shelf,
    source: fallback.source,
    date: fallback.date,
    sourceSignal: fallback.sourceSignal,
    sliceTitle: candidateMatchesCurrent && candidate?.sliceTitle ? candidate.sliceTitle : fallback.sliceTitle,
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
  const receipt = buildSliceReceiptCopy({ forceComplete: true });
  activeRewrite = value;
  valueTitle.textContent = receipt?.rawHeadline || getRawSignalHeadline(selectedSignal);
  valuePanel.innerHTML = getReceiptCompletionMarkup(value);
}

function renderTimeSliceLabel(rewrite = activeRewrite) {
  const value = normalizeRewrite(rewrite);
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

function normalizeDevLabel50x70(label) {
  const source = label || devLabel50x70Sample;
  const intensity = normalizeLabelIntensity(source.intensity);
  const shelf = cleanLabelCopy(source.shelf) || "TIME SIGNAL";
  const identityValueFallback = intensity === "light"
    ? "一句今天要带走的判断。"
    : "先判断这条变化与你有什么关系。";
  const todayFocusFallback = intensity === "double" ? "保留一个真实判断。" : "";

  return {
    labelNo: cleanLabelCopy(source.labelNo) || "#000",
    shelf,
    source: cleanLabelCopy(source.source) || "SIGNAL SOURCE",
    date: cleanLabelCopy(source.date) || getTodayLabelDate(),
    sliceTitle: cleanLabelCopy(source.sliceTitle) || "今天只看一条关键变化。",
    identity: cleanLabelCopy(source.identity) || "READER",
    identityValue: cleanLabelCopy(source.identityValue) || identityValueFallback,
    todayFocus: cleanLabelCopy(source.todayFocus) || todayFocusFallback,
    intensity,
    serveStyle: normalizeLabelServeStyle(source.serveStyle),
  };
}

function getDevLabel50x70Markup(label, { printable = false } = {}) {
  const shelfShort = getLabelShelfShort(label.shelf);
  const brewLine = `BREW ${label.intensity.toUpperCase()} / ${shelfShort}`;
  const serveLine = getDevLabelServeFooter(label.serveStyle);
  const identityForLabel = getIdentityForLabel(selectedIdentity?.id, label.identity);
  const printAttribute = printable ? ` data-print-label="true"` : "";
  const headerMeta = label.intensity === "light"
    ? ""
    : `<span>${escapeHtml(label.source)} &middot; ${escapeHtml(label.date)}</span>`;
  const bodyValue = label.intensity === "light" || label.identityValue
    ? `<section class="label-test-body" aria-label="current identity">
        <span>${escapeHtml(identityForLabel)}</span>
        ${label.identityValue ? `<p>${escapeHtml(label.identityValue)}</p>` : ""}
      </section>`
    : "";
  const focusValue = label.intensity === "double"
    ? `<section class="label-test-focus" aria-label="current today focus">
        <span>TODAY'S FOCUS</span>
        <p>${escapeHtml(label.todayFocus)}</p>
      </section>`
    : "";

  return `
    <article class="label-paper-50x70 label-paper-${escapeHtml(label.intensity)}"${printAttribute}>
      <div class="label-safe-area">
        <header class="label-test-header">
          <strong>TIME SLICE COFFEE</strong>
          <span>${escapeHtml(label.labelNo)} / ${escapeHtml(shelfShort)}</span>
          ${headerMeta}
        </header>

        <h3>${escapeHtml(label.sliceTitle)}</h3>

        ${bodyValue}
        ${focusValue}

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

  const hasGeneratedLabel = Boolean(label);
  const safeLabel = normalizeDevLabel50x70(label);
  if (devLabel50x70CurrentMeta) {
    devLabel50x70CurrentMeta.innerHTML = getDevLabel50x70MetaMarkup(safeLabel, hasGeneratedLabel);
  }
  devLabel50x70Current.innerHTML = getDevLabel50x70Markup(safeLabel);

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

  const safeLabel = normalizeDevLabel50x70(label);
  pickupLabel50x70Preview.innerHTML = "";
  pickupLabel50x70Preview.innerHTML = getDevLabel50x70Markup(safeLabel);
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
    }

    .label-safe-area {
      width: 42mm !important;
      max-width: 42mm !important;
      height: 60mm !important;
      margin: 4mm auto 6mm !important;
      padding: 0 !important;
      display: flex !important;
      flex-direction: column !important;
      overflow: hidden !important;
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
      font-size: 11.8pt !important;
      line-height: 1.1 !important;
      margin: 2.2mm 0 2mm !important;
      font-weight: 750 !important;
      letter-spacing: 0 !important;
    }

    .label-paper-light h3 {
      font-size: 12.8pt !important;
      margin: 3.4mm 0 2.4mm !important;
    }

    .label-paper-double h3 {
      font-size: 10.8pt !important;
      line-height: 1.08 !important;
      margin: 1.8mm 0 1.5mm !important;
    }

    .label-test-body {
      display: flex !important;
      flex-direction: column !important;
      gap: 0.9mm !important;
      padding-top: 1.4mm !important;
      border-top: 0.5px solid #000000 !important;
    }

    .label-test-body span,
    .label-test-focus span {
      font-size: 5.6pt !important;
      font-weight: 700 !important;
      line-height: 1.16 !important;
      letter-spacing: 0 !important;
    }

    .label-test-body p {
      margin: 0 !important;
      font-size: 7.2pt !important;
      font-weight: 700 !important;
      line-height: 1.28 !important;
      letter-spacing: 0 !important;
    }

    .label-test-focus {
      display: flex !important;
      flex-direction: column !important;
      gap: 0.7mm !important;
      margin-top: 1.4mm !important;
      padding-left: 1.2mm !important;
      border-left: 0.5px solid #000000 !important;
    }

    .label-test-focus p {
      margin: 0 !important;
      font-size: 6.8pt !important;
      font-weight: 700 !important;
      line-height: 1.24 !important;
      letter-spacing: 0 !important;
    }

    .label-test-brew {
      margin-top: auto !important;
      padding-top: 1.1mm !important;
      border-top: 0.5px solid #000000 !important;
      font-size: 5.8pt !important;
      font-weight: 700 !important;
      line-height: 1.16 !important;
      letter-spacing: 0 !important;
    }

    footer {
      margin-top: 1.1mm !important;
      padding-top: 1.1mm !important;
      border-top: 0.5px solid #000000 !important;
      font-size: 6.1pt !important;
      font-weight: 700 !important;
      line-height: 1.16 !important;
      letter-spacing: 0 !important;
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
  activeRewrite = null;
  heroCodeCup?.classList.remove("is-brewing", "is-ordering", "is-complete");
  valueSection.classList.add("is-disabled");
  labelSection.classList.add("is-disabled");
}

function resetDemoFlow({ render = true } = {}) {
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
  generatedLabel = renderTimeSliceLabel(activeRewrite);
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
    generatedLabel = renderTimeSliceLabel(rewrite || { timeSliceLabel: buildFallbackTimeSliceLabel() });
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
    generatedLabel = renderTimeSliceLabel(fallback);
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
