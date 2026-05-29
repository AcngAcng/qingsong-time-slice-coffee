export type TimeSliceLabel = {
  labelNo: string;
  shelf: string;
  source: string;
  date: string;
  sourceSignal: string;
  sliceTitle: string;
  identity: string;
  identityValue: string;
  todayFocus: string;
  intensity: "light" | "regular" | "double";
  serveStyle: "hot" | "iced";
  signalMark:
    | "ai-frontier"
    | "build-workflow"
    | "design-creation"
    | "market-capital"
    | "self-upgrade"
    | "life-signals";
};
