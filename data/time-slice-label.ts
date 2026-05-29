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
  signalMark: string;
};

export const timeSliceLabelFieldOrder = [
  "labelNo",
  "shelf",
  "source",
  "date",
  "sourceSignal",
  "sliceTitle",
  "identity",
  "identityValue",
  "todayFocus",
  "intensity",
  "serveStyle",
  "signalMark",
] as const;

export type TimeSliceLabelField = (typeof timeSliceLabelFieldOrder)[number];

export const timeSliceLabelPreviewSections: Array<{
  id: string;
  label: string;
  fields: TimeSliceLabelField[];
}> = [
  {
    id: "meta",
    label: "Meta",
    fields: ["labelNo", "shelf", "source", "date"],
  },
  {
    id: "core-slice",
    label: "Core Slice",
    fields: ["sliceTitle"],
  },
  {
    id: "identity-value",
    label: "Identity Value",
    fields: ["identity", "identityValue"],
  },
  {
    id: "today-focus",
    label: "Today's Focus",
    fields: ["todayFocus"],
  },
  {
    id: "source-signal",
    label: "Source Signal",
    fields: ["sourceSignal"],
  },
  {
    id: "serve-style",
    label: "Serve Style",
    fields: ["intensity", "serveStyle", "signalMark"],
  },
  {
    id: "footer",
    label: "Flow",
    fields: [],
  },
];
