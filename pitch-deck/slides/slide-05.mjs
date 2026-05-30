import { C, asset, bg, footer, kicker, rect, title, txt } from "./common.mjs";

function stage(slide, ctx, label, x, y, w, accent = C.red) {
  rect(slide, ctx, x, y, w, 34, "#FFF9EFF0", C.espresso, 1);
  rect(slide, ctx, x, y, 5, 34, accent);
  txt(slide, ctx, label, x + 14, y + 9, w - 22, 16, {
    size: 11,
    color: C.espresso,
    bold: true,
    face: "Aptos Mono",
    valign: "middle",
  });
}

function outputLabel(slide, ctx, x, y, w, h) {
  rect(slide, ctx, x, y, w, h, "#FFF9EFF4", C.espresso, 1.1);
  for (let gy = y + 38; gy < y + h - 20; gy += 32) {
    rect(slide, ctx, x + 12, gy, w - 24, 0.8, C.creamLine);
  }
  txt(slide, ctx, "TIME SLICE COFFEE", x + 14, y + 12, w - 28, 14, {
    size: 8.5,
    color: C.espresso,
    bold: true,
    face: "Aptos Mono",
  });
  txt(slide, ctx, "TS-042 / AI FRONTIER", x + 14, y + 30, w - 28, 12, {
    size: 7,
    color: C.taupe,
    bold: true,
    face: "Aptos Mono",
  });
  txt(slide, ctx, "Brew Result", x + 14, y + 60, w - 28, 22, {
    size: 18,
    color: C.espresso,
    bold: true,
    face: "Georgia",
  });
  txt(slide, ctx, "FOR BUILDER", x + 14, y + 104, w - 28, 12, {
    size: 8,
    color: C.taupe,
    bold: true,
    face: "Aptos Mono",
  });
  txt(slide, ctx, "TODAY'S FOCUS", x + 14, y + 140, w - 28, 12, {
    size: 8,
    color: C.taupe,
    bold: true,
    face: "Aptos Mono",
  });
  txt(slide, ctx, "BREW REGULAR / SERVED HOT", x + 14, y + h - 28, w - 28, 12, {
    size: 7.5,
    color: C.taupe,
    bold: true,
    face: "Aptos Mono",
  });
  rect(slide, ctx, x + w - 30, y + h - 32, 12, 18, C.red);
}

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

  rect(slide, ctx, 68, 240, 900, 36, "#F8F0E6D8");
  txt(slide, ctx, "Raw Signal → Extracted Slice → Persona → Density → Served Mode → Brew Result → Label", 74, 248, 874, 30, {
    size: 17,
    color: C.espresso,
    bold: true,
    face: "Aptos Mono",
  });
  txt(slide, ctx, "Extraction + identity translation + concentration control + serving mode + packaging", 74, 282, 650, 22, {
    size: 13.5,
    color: C.ink,
    face: "Aptos Mono",
  });

  stage(slide, ctx, "RAW SIGNAL", 120, 548, 172, C.red);
  stage(slide, ctx, "EXTRACTED SLICE", 458, 548, 172, C.espresso);
  stage(slide, ctx, "BREW RESULT", 810, 548, 172, C.cyanDark);
  stage(slide, ctx, "LABEL", 1032, 548, 172, C.red);

  stage(slide, ctx, "PERSONA", 486, 326, 96, C.cyan);
  stage(slide, ctx, "DENSITY", 608, 326, 96, C.red);
  stage(slide, ctx, "SERVED MODE", 730, 326, 128, C.cyanDark);
  outputLabel(slide, ctx, 958, 300, 184, 230);

  footer(slide, ctx, 5);
  return slide;
}
