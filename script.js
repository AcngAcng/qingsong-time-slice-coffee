import { preparedSignals } from "./data/prepared-signals.js";
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
const printButton = document.querySelector("#print-button");
const resetButton = document.querySelector("#reset-button");
const brewButton = document.querySelector("#brew-button");
const refreshSignalsButton = document.querySelector("#refresh-signals-button");
const signalRefreshStatus = document.querySelector("#signal-refresh-status");
const heroCodeCup = document.querySelector("#hero-code-cup");
const codeCupField = document.querySelector("#code-cup-field");
const heroOrderButton = document.querySelector(".hero-actions .primary");
const SHOW_CUP_OVERLAY_LABEL = true;

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

let selectedSignal = null;
let selectedShelfId = null;
let selectedIdentity = null;
let selectedStrength = strengths[1];
let selectedServeStyle = serveStyles[0];
let activeRewrite = null;
let activeSignals = preparedSignals;
let isPreparingSignals = false;
let signalRoundIndex = 0;

const signalMarkByShelf = {
  "ai-work": "build-workflow",
  learning: "self-upgrade",
  creation: "design-creation",
  "life-consumption": "life-signals",
  "climate-agriculture": "life-signals",
  "trust-society": "life-signals",
};

const labelShelfByShelf = {
  "ai-work": "AI FRONTIER / BUILD & WORKFLOW",
  learning: "SELF-UPGRADE / LEARNING",
  creation: "DESIGN & CREATION",
  "life-consumption": "LIFE SIGNALS / CONSUMPTION",
  "climate-agriculture": "LIFE SIGNALS / CLIMATE",
  "trust-society": "LIFE SIGNALS / TRUST",
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
    labelNumber.textContent = `#${selectedSignal.id}`;
  }

  heroCodeCup.classList.remove("is-brewing", "is-ordering");
  heroCodeCup.classList.add("is-complete");
}

function scrollToSection(section) {
  section.scrollIntoView({ behavior: "smooth", block: "start" });
}

function scrollAfterRender(element, block = "start") {
  window.setTimeout(() => {
    element?.scrollIntoView({ behavior: "smooth", block });
  }, 0);
}

function enableSection(section) {
  section.classList.remove("is-disabled");
}

function getSelectedShelf() {
  return signalShelves.find((shelf) => shelf.shelfId === selectedShelfId);
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
  activeSignals = Array.isArray(nextSignals) && nextSignals.length ? nextSignals : preparedSignals;
  selectedSignal = null;
  selectedIdentity = null;
  renderSignals();
  renderIdentities();
  identitySection.classList.add("is-disabled");
  brewSection.classList.add("is-disabled");
  serveSection.classList.add("is-disabled");
  resetBrewResult();
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
  return signal.rawTitle || signal.rawTitleZh || "";
}

function getSignalRawSummary(signal) {
  return signal.rawSummary || signal.rawSummaryZh || signal.whyWorthWatching || signal.whyWorthWatchingZh || "";
}

function getSignalWorthWatching(signal) {
  return signal.whyWorthWatching || signal.whyWorthWatchingZh || "";
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
        </button>
      `,
    )
    .join("")}
    </div>
  `;
}

function renderSignals() {
  const shelf = getSelectedShelf();
  const shelfSignals = getRoundSignals().filter((signal) => signal.shelfId === selectedShelfId);

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
      ${shelfSignals
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
          <span class="signal-number">#${signal.id}</span>
          <span class="bean-label">RAW SIGNAL</span>
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
    .join("")}
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
        <h4>${escapeHtml(selectedSignal.sliceTitle)}</h4>
        <p>${escapeHtml(selectedSignal.sliceReason)}</p>
        <div class="selected-signal-meta">
          <span>Shelf / ${escapeHtml(selectedSignal.shelfTitle)}</span>
          <span>Relation / ${escapeHtml(selectedSignal.relation)}</span>
        </div>
      </div>
      <button class="button primary continue-signal-button" id="continue-signal-button" type="button">
        Continue to Lens / 选择今日视角
      </button>
    </article>
  `;
}

function renderIdentities() {
  identityGrid.innerHTML = identities
    .map(
      (identity) => `
        <button class="identity-card${identity.id === selectedIdentity?.id ? " is-selected" : ""}" data-identity-id="${identity.id}" type="button">
          <span>${identity.name}</span>
          <strong>${identity.en}</strong>
          <small>${identity.label}</small>
        </button>
      `,
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
              title: selectedSignal.sliceTitle,
              persona: selectedIdentity?.label || "FOR TODAY",
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
  const src = serveStyle === "iced" ? "public/images/cup-iced-clean.png" : "public/images/cup-hot-clean.png";
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

function buildMockTimeSliceLabel() {
  const base = valueRewrites[selectedIdentity.id];
  const identityName = selectedIdentity.en.toUpperCase();
  const intensity = selectedStrength.id;
  const serveStyle = selectedServeStyle.id;
  const rawTitle = getSignalRawTitle(selectedSignal);
  const focusByIntensity = {
    light: base.coreLine,
    regular: base.focusNow,
    double: `${base.focusNow} 先看一个可验证的具体场景。`,
  };

  return {
    labelNo: `#${selectedSignal.id}`,
    shelf: getLabelShelf(selectedSignal),
    source: selectedSignal.source || "X / Grok Search",
    date: formatLabelDate(selectedSignal.fetchedAt),
    sourceSignal: getShortText(rawTitle, 46),
    sliceTitle: selectedSignal.sliceTitle,
    identity: identityName,
    identityValue: base.relationToYou,
    todayFocus: focusByIntensity[intensity] || base.focusNow,
    intensity,
    serveStyle,
    signalMark: getSignalMark(selectedSignal),
  };
}

function getMockValueRewrite() {
  const base = valueRewrites[selectedIdentity.id];
  const timeSliceLabel = buildMockTimeSliceLabel();

  return {
    ...base,
    todayChange: selectedSignal.sliceReason,
    keywords: selectedSignal.keywords,
    coreLine: selectedSignal.coreJudgment,
    timeSliceLabel,
  };
}

function normalizeTimeSliceLabel(rewrite) {
  const fallback = buildMockTimeSliceLabel();
  const candidate = rewrite?.timeSliceLabel || rewrite;

  return {
    labelNo: candidate?.labelNo || fallback.labelNo,
    shelf: candidate?.shelf || fallback.shelf,
    source: candidate?.source || fallback.source,
    date: formatLabelDate(candidate?.date || fallback.date),
    sourceSignal: candidate?.sourceSignal || fallback.sourceSignal,
    sliceTitle: candidate?.sliceTitle || fallback.sliceTitle,
    identity: candidate?.identity || fallback.identity,
    identityValue: candidate?.identityValue || fallback.identityValue,
    todayFocus: candidate?.todayFocus || fallback.todayFocus,
    intensity: candidate?.intensity || fallback.intensity,
    serveStyle: candidate?.serveStyle || fallback.serveStyle,
    signalMark: candidate?.signalMark || fallback.signalMark,
  };
}

function normalizeRewrite(rewrite) {
  const fallback = getMockValueRewrite();
  const timeSliceLabel = normalizeTimeSliceLabel(rewrite);

  return {
    title: rewrite?.title || fallback.title,
    todayChange: rewrite?.todayChange || selectedSignal.sliceReason || fallback.todayChange,
    whyImportant: rewrite?.whyImportant || timeSliceLabel.identityValue || fallback.whyImportant,
    relationToYou: rewrite?.relationToYou || timeSliceLabel.identityValue || fallback.relationToYou,
    focusNow: rewrite?.focusNow || timeSliceLabel.todayFocus || fallback.focusNow,
    keywords: Array.isArray(rewrite?.keywords) && rewrite.keywords.length ? rewrite.keywords.slice(0, 3) : fallback.keywords,
    coreLine: rewrite?.coreLine || timeSliceLabel.sliceTitle || fallback.coreLine,
    timeSliceLabel,
  };
}

function getVisibleRows(value) {
  const baseRows = [
    ["标题", value.title],
    ["今日变化", value.todayChange],
  ];

  if (selectedStrength.id === "light") {
    return [["核心判断", value.coreLine], ...baseRows];
  }

  if (selectedStrength.id === "double") {
    return [
      ...baseRows,
      ["为什么重要", value.whyImportant],
      ["与你的关系", value.relationToYou],
      ["现在真正该关注什么", value.focusNow],
    ];
  }

  return [...baseRows, ["为什么重要", value.whyImportant], ["与你的关系", value.relationToYou]];
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
  const rows = getVisibleRows(value);
  activeRewrite = value;
  valueTitle.textContent = "这杯信息咖啡的味道";

  valuePanel.innerHTML = `
    ${rows
      .map(
        ([label, text]) => `
          <div class="value-row">
            <span>${label}</span>
            <p>${text}</p>
          </div>
        `,
      )
      .join("")}
    <div class="value-row">
      <span>关键词</span>
      <div class="keyword-row">${value.keywords.map((keyword) => `<b>${keyword}</b>`).join("")}</div>
    </div>
  `;
}

function renderTimeSliceLabel(rewrite = activeRewrite) {
  const value = normalizeRewrite(rewrite);
  const label = value.timeSliceLabel;
  activeRewrite = value;

  printLabel.innerHTML = `
    <div class="print-label-top">
      <span>TIME SLICE COFFEE</span>
      <span>${escapeHtml(label.labelNo)}</span>
    </div>
    <p class="label-subtitle">TODAY’S INFORMATION SLICE</p>
    <div class="label-meta-line">
      <span>${escapeHtml(label.labelNo)} / ${escapeHtml(label.shelf)}</span>
      <span>${escapeHtml(label.source)} · ${escapeHtml(label.date)}</span>
    </div>
    <h3>${escapeHtml(label.sliceTitle)}</h3>
    <div class="label-value-block">
      <span>FOR ${escapeHtml(label.identity)}</span>
      <p>${escapeHtml(label.identityValue)}</p>
    </div>
    <div class="label-focus-block">
      <span>TODAY’S FOCUS</span>
      <p>${escapeHtml(label.todayFocus)}</p>
    </div>
    <div class="label-source-block">
      <span>SOURCE SIGNAL</span>
      <p>${escapeHtml(label.sourceSignal)}</p>
    </div>
    <div class="print-label-bottom">
      <span>SIGNAL → SLICE → VALUE → LABEL</span>
      <span>${escapeHtml(label.signalMark)}</span>
    </div>
  `;

  renderProductPreview(value);
}

function renderProductPreview(value) {
  const label = value.timeSliceLabel || buildMockTimeSliceLabel();

  productPreview.innerHTML = `
    <div class="preview-scene">
      ${getCupPreviewMarkup(selectedServeStyle.id, {
        number: selectedSignal.id,
        title: label.sliceTitle,
        persona: `FOR ${label.identity} / ${label.intensity.toUpperCase()}`,
        coreLine: label.todayFocus,
        variant: "pickup",
        showOverlayLabel: SHOW_CUP_OVERLAY_LABEL,
      })}
      <p>${selectedServeStyle.label} · ${selectedServeStyle.vessel}</p>
    </div>
  `;
}

async function fetchAiRewrite() {
  const response = await fetch("/api/rewrite", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      signal: {
        id: selectedSignal.id,
        slice: selectedSignal.sliceTitle,
        shortReason: selectedSignal.sliceReason,
        rawTitle: getSignalRawTitle(selectedSignal),
        rawSummary: getSignalRawSummary(selectedSignal),
        whyWorthWatching: getSignalWorthWatching(selectedSignal),
        source: selectedSignal.source,
        fetchedAt: selectedSignal.fetchedAt,
        shelf: getLabelShelf(selectedSignal),
        signalMark: getSignalMark(selectedSignal),
      },
      identity: {
        id: selectedIdentity.id,
        name: selectedIdentity.name,
        en: selectedIdentity.en,
        label: selectedIdentity.label,
      },
      intensity: selectedStrength.id,
      serveStyle: selectedServeStyle.id,
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

function selectSignal(signalId) {
  selectedSignal = getRoundSignals().find((signal) => signal.id === signalId) || activeSignals.find((signal) => signal.id === signalId);
  selectedIdentity = null;
  renderSignals();
  renderIdentities();
  identitySection.classList.add("is-disabled");
  brewSection.classList.add("is-disabled");
  serveSection.classList.add("is-disabled");
  resetBrewResult();
  scrollAfterRender(selectedSignalPanel, "center");
}

function selectShelf(shelfId) {
  selectedShelfId = shelfId;
  selectedSignal = null;
  selectedIdentity = null;
  renderShelves();
  renderSignals();
  renderIdentities();
  identitySection.classList.add("is-disabled");
  brewSection.classList.add("is-disabled");
  serveSection.classList.add("is-disabled");
  resetBrewResult();
  scrollAfterRender(signalBeanStage, "start");
}

function continueToLens() {
  if (!selectedSignal) return;

  enableSection(identitySection);
  scrollToSection(identitySection);
}

function selectIdentity(identityId) {
  selectedIdentity = identities.find((identity) => identity.id === identityId);
  renderIdentities();
  renderStrengths();
  renderServeStyles();
  enableSection(brewSection);
  enableSection(serveSection);
  resetBrewResult();
  scrollToSection(brewSection);
}

function selectStrength(strengthId) {
  selectedStrength = strengths.find((strength) => strength.id === strengthId);
  renderStrengths();
  renderServeStyles();
  enableSection(serveSection);
  scrollToSection(serveSection);

  if (activeRewrite) {
    renderValueRewrite(activeRewrite);
    renderTimeSliceLabel(activeRewrite);
  }
}

function selectServeStyle(serveId) {
  selectedServeStyle = serveStyles.find((serveStyle) => serveStyle.id === serveId);
  renderServeStyles();

  if (activeRewrite) {
    renderTimeSliceLabel(activeRewrite);
  }
}

async function brewSlice() {
  if (!selectedSignal || !selectedIdentity) return;

  enableSection(valueSection);
  enableSection(labelSection);
  setCodeCupBrewing(true);
  renderLoading();
  renderTimeSliceLabel(getMockValueRewrite());
  scrollToSection(valueSection);

  try {
    const aiRewrite = await fetchAiRewrite();
    renderValueRewrite(aiRewrite);
    renderTimeSliceLabel(aiRewrite);
    setCodeCupComplete();
  } catch (error) {
    console.error("OpenAI rewrite failed; using mock fallback.", error);
    const fallback = getMockValueRewrite();
    renderValueRewrite(fallback);
    renderTimeSliceLabel(fallback);
    setCodeCupComplete();
  }
}

async function refreshPreparedSignals() {
  if (isPreparingSignals) return;

  signalRoundIndex += 1;
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
          limit: 20,
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

if (heroOrderButton) {
  heroOrderButton.addEventListener("click", () => {
    pulseCodeCup("is-ordering", 1800);
  });
}

window.addEventListener("resize", () => {
  window.clearTimeout(window.codeCupResizeTimer);
  window.codeCupResizeTimer = window.setTimeout(renderCodeCupVisual, 160);
});

printButton.addEventListener("click", () => {
  window.print();
});

resetButton.addEventListener("click", () => {
  selectedSignal = null;
  selectedShelfId = null;
  selectedIdentity = null;
  selectedStrength = strengths[1];
  selectedServeStyle = serveStyles[0];
  activeRewrite = null;
  signalRoundIndex = 0;
  heroCodeCup?.classList.remove("is-brewing", "is-ordering", "is-complete");
  renderShelves();
  renderSignals();
  renderIdentities();
  renderStrengths();
  renderServeStyles();
  brewSection.classList.add("is-disabled");
  serveSection.classList.add("is-disabled");
  valueSection.classList.add("is-disabled");
  labelSection.classList.add("is-disabled");
  scrollToSection(document.querySelector("#signals"));
});

renderShelves();
renderSignals();
renderIdentities();
renderStrengths();
renderServeStyles();
renderCodeCupVisual();
