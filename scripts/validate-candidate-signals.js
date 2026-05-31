const fs = require("fs");
const path = require("path");
const vm = require("vm");

const repoRoot = path.resolve(__dirname, "..");
const candidateFile = path.join(repoRoot, "data", "candidate-signals-expanded.js");

const shelfExpectations = {
  "ai-frontier": { expected: 12, arrayName: "aiFrontierSignals" },
  "build-workflow": { expected: 12, arrayName: "buildWorkflowSignals" },
  "design-creation": { expected: 12, arrayName: "designCreationSignals" },
  "market-capital": { expected: 12, arrayName: "marketCapitalSignals" },
  "self-upgrade": { expected: 12, arrayName: "selfUpgradeSignals" },
  "life-signals": { expected: 12, arrayName: "lifeSignalsSignals" },
};

const requiredFields = [
  "id",
  "shelfId",
  "shelfTitle",
  "rawTitle",
  "rawTitleZh",
  "rawSummary",
  "rawSummaryZh",
  "whyWorthWatching",
  "whyWorthWatchingZh",
  "source",
  "rawUrl",
  "fetchedAt",
  "extractionNotes",
];

const requiredExtractionNotesFields = [
  "coreShift",
  "whyToday",
  "possibleUserValue",
  "noiseToIgnore",
  "labelPotential",
];

const lengthLimits = [
  ["rawTitleZh", 60],
  ["rawSummaryZh", 120],
  ["whyWorthWatchingZh", 100],
  ["extractionNotes.coreShift", 80],
  ["extractionNotes.labelPotential", 28],
];

function loadCandidateSignals() {
  const source = fs.readFileSync(candidateFile, "utf8");
  const runnableSource = `${source.replace(/\bexport\s+const\s+/g, "const ")}
({
  aiFrontierSignals,
  buildWorkflowSignals,
  designCreationSignals,
  marketCapitalSignals,
  selfUpgradeSignals,
  lifeSignalsSignals,
  candidateSignalsExpanded,
});`;

  return vm.runInNewContext(runnableSource, {}, { filename: candidateFile });
}

function getValueByPath(signal, fieldPath) {
  return fieldPath.split(".").reduce((value, key) => {
    if (value && typeof value === "object") return value[key];
    return undefined;
  }, signal);
}

function isPresent(value) {
  return value !== undefined && value !== null && value !== "";
}

function classifyRawUrl(rawUrl) {
  if (typeof rawUrl !== "string" || rawUrl.trim() === "") return "invalid";
  if (/^https?:\/\//i.test(rawUrl)) return "http";
  if (/^grok-search:\/\//i.test(rawUrl)) return "grok";
  return "invalid";
}

function main() {
  let moduleData;
  try {
    moduleData = loadCandidateSignals();
  } catch (error) {
    console.error("Failed to load candidate signals file.");
    console.error(error.message);
    process.exitCode = 1;
    return;
  }

  const signals = Array.isArray(moduleData.candidateSignalsExpanded)
    ? moduleData.candidateSignalsExpanded
    : [];
  const shelfCounts = Object.fromEntries(Object.keys(shelfExpectations).map((shelfId) => [shelfId, 0]));
  const ids = new Map();
  const duplicateIds = new Set();
  const invalidShelfIds = [];
  const missingFieldIssues = [];
  const extractionNotesIssues = [];
  const lengthWarnings = [];
  const rawUrlStats = { http: 0, grok: 0, invalid: 0 };

  signals.forEach((signal, index) => {
    const signalLabel = signal?.id || `index:${index}`;

    if (shelfExpectations[signal?.shelfId]) {
      shelfCounts[signal.shelfId] += 1;
    } else {
      invalidShelfIds.push({ id: signalLabel, shelfId: signal?.shelfId });
    }

    if (isPresent(signal?.id)) {
      if (ids.has(signal.id)) duplicateIds.add(signal.id);
      ids.set(signal.id, true);
    }

    requiredFields.forEach((field) => {
      if (!isPresent(signal?.[field])) missingFieldIssues.push(`${signalLabel}: ${field}`);
    });

    requiredExtractionNotesFields.forEach((field) => {
      if (!isPresent(signal?.extractionNotes?.[field])) {
        extractionNotesIssues.push(`${signalLabel}: extractionNotes.${field}`);
      }
    });

    rawUrlStats[classifyRawUrl(signal?.rawUrl)] += 1;

    lengthLimits.forEach(([fieldPath, limit]) => {
      const value = getValueByPath(signal, fieldPath);
      if (typeof value === "string" && value.length > limit) {
        lengthWarnings.push(`${signalLabel}: ${fieldPath} ${value.length}/${limit}`);
      }
    });
  });

  const totalExpected = 72;
  const total = signals.length;
  const shelfCountFailures = Object.entries(shelfExpectations).filter(
    ([shelfId, config]) => shelfCounts[shelfId] !== config.expected,
  );
  const hasErrors =
    total !== totalExpected ||
    shelfCountFailures.length > 0 ||
    duplicateIds.size > 0 ||
    invalidShelfIds.length > 0 ||
    missingFieldIssues.length > 0 ||
    extractionNotesIssues.length > 0 ||
    rawUrlStats.invalid > 0;
  const isWaitingForData = total === 0;

  console.log(`Candidate signals total: ${total} / ${totalExpected}`);
  Object.entries(shelfExpectations).forEach(([shelfId, config]) => {
    console.log(`${shelfId}: ${shelfCounts[shelfId]} / ${config.expected}`);
  });
  console.log("");
  console.log(`Missing field issues: ${missingFieldIssues.length}`);
  console.log(`Extraction notes issues: ${extractionNotesIssues.length}`);
  console.log(`Duplicate ids: ${duplicateIds.size ? Array.from(duplicateIds).join(", ") : "none"}`);
  console.log(`Invalid shelf ids: ${invalidShelfIds.length}`);
  console.log(`rawUrl http/https: ${rawUrlStats.http}`);
  console.log(`rawUrl grok-search://: ${rawUrlStats.grok}`);
  console.log(`rawUrl empty/invalid: ${rawUrlStats.invalid}`);
  console.log(`Length warnings: ${lengthWarnings.length}`);

  if (missingFieldIssues.length) {
    console.log("");
    console.log("Missing fields:");
    missingFieldIssues.slice(0, 20).forEach((issue) => console.log(`- ${issue}`));
    if (missingFieldIssues.length > 20) console.log(`- ... ${missingFieldIssues.length - 20} more`);
  }

  if (extractionNotesIssues.length) {
    console.log("");
    console.log("Extraction notes issues:");
    extractionNotesIssues.slice(0, 20).forEach((issue) => console.log(`- ${issue}`));
    if (extractionNotesIssues.length > 20) console.log(`- ... ${extractionNotesIssues.length - 20} more`);
  }

  if (invalidShelfIds.length) {
    console.log("");
    console.log("Invalid shelf ids:");
    invalidShelfIds.slice(0, 20).forEach((issue) => console.log(`- ${issue.id}: ${issue.shelfId}`));
    if (invalidShelfIds.length > 20) console.log(`- ... ${invalidShelfIds.length - 20} more`);
  }

  if (lengthWarnings.length) {
    console.log("");
    console.log("Length warnings:");
    lengthWarnings.slice(0, 20).forEach((warning) => console.log(`- ${warning}`));
    if (lengthWarnings.length > 20) console.log(`- ... ${lengthWarnings.length - 20} more`);
  }

  console.log("");
  if (isWaitingForData) {
    console.log("Status: waiting for signal data");
  } else if (hasErrors) {
    console.log("Status: failed");
    process.exitCode = 1;
  } else {
    console.log("Status: passed");
  }
}

main();
