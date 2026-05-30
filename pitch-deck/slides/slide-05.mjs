import { C, asset, bg, footer, kicker, receiptStep, rect, timeSliceLabel, title, txt } from "./common.mjs";

export async function slide05(presentation, ctx) {
  const slide = presentation.slides.add();
  bg(slide, ctx, C.paper);
  await ctx.addImage(slide, {
    path: asset(ctx, "workflow-raw-signal-brew.png"),
    x: 0,
    y: 0,
    w: ctx.W,
    h: ctx.H,
    fit: "cover",
    alt: "Raw signal cards being brewed into a coffee cup with data label",
  });
  rect(slide, ctx, 0, 0, ctx.W, 228, "#F8F0E6EA");
  rect(slide, ctx, 0, 0, 86, ctx.H, "#F8F0E6A8");
  kicker(slide, ctx, "WORKFLOW", 72, 42, false, "05");
  title(slide, ctx, "From Raw Signal\nto Brew Result", "从原始信号到一杯信息咖啡", 72, 86, 620, false);
  rect(slide, ctx, 68, 240, 846, 36, "#F8F0E6D8");
  txt(slide, ctx, "Raw Signal → Extracted Slice → Persona → Density → Served Mode → Brew Result → Label", 74, 248, 820, 30, {
    size: 18,
    color: C.espresso,
    bold: true,
    face: "Aptos Mono",
  });
  txt(slide, ctx, "Extraction + identity translation + concentration control + serving mode + packaging", 74, 282, 650, 22, {
    size: 13.5,
    color: C.ink,
    face: "Aptos Mono",
  });
  receiptStep(slide, ctx, "PERSONA", 456, 322, 112, C.cyan);
  receiptStep(slide, ctx, "DENSITY", 596, 322, 112, C.red);
  receiptStep(slide, ctx, "SERVED MODE", 736, 322, 136, C.cyanDark);

  const tags = [
    ["RAW SIGNAL", 120, 548, C.red],
    ["EXTRACTED SLICE", 458, 548, C.espresso],
    ["BREW RESULT", 810, 548, C.cyanDark],
    ["LABEL", 1032, 548, C.red],
  ];
  tags.forEach(([label, x, y, accent]) => {
    rect(slide, ctx, x, y, 172, 36, "#FFF9EFF0", C.espresso, 1);
    rect(slide, ctx, x, y, 6, 36, accent);
    txt(slide, ctx, label, x + 16, y + 9, 138, 18, { size: 12, color: C.espresso, bold: true, face: "Aptos Mono" });
  });
  timeSliceLabel(slide, ctx, 948, 302, 198, 214, {
    no: "TS-042",
    fill: "#FFF9EF",
    rows: [
      ["EXTRACTED SLICE", "What changed"],
      ["PERSONA", "Builder"],
      ["DENSITY", "Regular"],
      ["SERVED", "Hot"],
      ["BREW RESULT", "For you"],
    ],
    boldValues: true,
  });
  footer(slide, ctx, 5);
  return slide;
}
