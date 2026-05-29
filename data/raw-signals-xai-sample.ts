export type XaiRawSignalSample = {
  id: string;
  shelfId: string;
  shelfTitle: string;
  rawTitle: string;
  rawTitleZh: string;
  rawSummary: string;
  rawSummaryZh: string;
  rawUrl: string;
  source: "X / Grok Search";
  whyWorthWatching: string;
  whyWorthWatchingZh: string;
  fetchedAt: string;
};

export { rawSignalsXaiSample } from "./raw-signals-xai-sample.js";
