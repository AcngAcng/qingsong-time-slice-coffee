import { candidateSignalsExpanded } from "./data/candidate-signals-expanded.js";
import { preparedSignals } from "./data/prepared-signals.js";

const root = document.querySelector("#source-root");
const params = new URLSearchParams(window.location.search);
const sourceId = params.get("id") || "";
const bankParam = params.get("bank") || "default";
const bank = bankParam === "candidate" ? "candidate" : "prepared";
const signalBank = bank === "candidate" ? candidateSignalsExpanded : preparedSignals;

function cleanText(value) {
  return String(value || "").trim();
}

function escapeHtml(value) {
  return cleanText(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function decodeGrokQuery(rawUrl) {
  const rawQuery = cleanText(rawUrl).replace(/^grok-search:\/\//i, "").replace(/^\/+/, "");
  const query = rawQuery.replace(/\+/g, " ");

  try {
    return decodeURIComponent(query);
  } catch {
    return query;
  }
}

function normalizeLookupId(value) {
  return cleanText(value).replace(/^#/, "");
}

function getSignalLabelNo(signal, index) {
  if (signal.labelNo) return normalizeLookupId(signal.labelNo);
  if (/^\d+$/.test(cleanText(signal.id))) return normalizeLookupId(signal.id);
  return String(index + 1).padStart(3, "0");
}

function findSourceSignal(id) {
  const normalizedId = normalizeLookupId(id);
  if (!normalizedId) return null;

  return signalBank.find((signal, index) => {
    const signalId = normalizeLookupId(signal.id);
    const labelNo = getSignalLabelNo(signal, index);

    return signalId === normalizedId ||
      labelNo === normalizedId ||
      normalizeLookupId(signal.labelNo) === normalizedId;
  }) || null;
}

function getSourceLinkMarkup(rawUrl) {
  const url = cleanText(rawUrl);
  if (!url) {
    return `<p class="empty">No raw URL attached.</p>`;
  }

  if (/^https?:\/\//i.test(url)) {
    return `
      <p><a href="${escapeHtml(url)}" target="_blank" rel="noreferrer">Open Original Source</a></p>
      <p>${escapeHtml(url)}</p>
    `;
  }

  if (/^grok-search:\/\//i.test(url)) {
    return `
      <h2>Grok Search Query</h2>
      <pre>${escapeHtml(decodeGrokQuery(url))}</pre>
    `;
  }

  return `<p>${escapeHtml(url)}</p>`;
}

function getNotesMarkup(notes = {}) {
  const rows = [
    ["Core Shift", notes.coreShift],
    ["Why Today", notes.whyToday],
    ["Possible User Value", notes.possibleUserValue],
    ["Noise To Ignore", notes.noiseToIgnore],
  ];

  return rows
    .filter(([, value]) => cleanText(value))
    .map(([label, value]) => `
      <section>
        <h2>${escapeHtml(label)}</h2>
        <p>${escapeHtml(value)}</p>
      </section>
    `)
    .join("");
}

function renderSignal(signal) {
  const notes = signal.extractionNotes || {};

  root.innerHTML = `
    <div class="brand">
      <strong>Time Slice Coffee</strong>
      <span>Source Signal</span>
    </div>

    <h1>${escapeHtml(signal.rawTitleZh || signal.rawTitle || "Untitled Source Signal")}</h1>

    <div class="meta">
      <span>${escapeHtml(signal.id || sourceId || "UNKNOWN")}</span>
      <span>${escapeHtml(signal.shelfTitle || signal.shelfId || "TIME SIGNAL")}</span>
      <span>${escapeHtml(signal.source || "SOURCE")}</span>
      <span>${escapeHtml(signal.fetchedAt || "")}</span>
      <span>${escapeHtml(bankParam.toUpperCase())}</span>
    </div>

    <section>
      <h2>Raw Summary</h2>
      <p>${escapeHtml(signal.rawSummaryZh || signal.rawSummary || "No summary attached.")}</p>
    </section>

    <section>
      <h2>Why Worth Watching</h2>
      <p>${escapeHtml(signal.whyWorthWatchingZh || signal.whyWorthWatching || "No reason attached.")}</p>
    </section>

    ${getNotesMarkup(notes)}

    <section>
      <h2>Raw URL</h2>
      ${getSourceLinkMarkup(signal.rawUrl)}
    </section>
  `;
}

const signal = findSourceSignal(sourceId);

if (signal) {
  renderSignal(signal);
} else {
  root.innerHTML = `
    <div class="brand">
      <strong>Time Slice Coffee</strong>
      <span>Source Signal</span>
    </div>
    <h1>Source signal not found</h1>
    <div class="meta">
      <span>${escapeHtml(sourceId || "NO ID")}</span>
      <span>${escapeHtml(bankParam.toUpperCase())}</span>
    </div>
    <section>
      <h2>Check URL</h2>
      <p class="empty">Use source.html?id=SIGNAL_ID&amp;bank=candidate or source.html?id=SIGNAL_ID&amp;bank=prepared.</p>
    </section>
  `;
}
