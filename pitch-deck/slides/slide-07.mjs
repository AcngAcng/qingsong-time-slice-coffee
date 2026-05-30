import { C, bg, footer, kicker, rect, txt } from "./common.mjs";

function card(slide, ctx, x, y, w, h, eyebrow, heading, rows, accent) {
  rect(slide, ctx, x, y, w, h, "#F8F0E6", "#5F5147", 1.3);
  rect(slide, ctx, x, y, w, 54, "#FFF9EF", C.creamLine, 1);
  rect(slide, ctx, x, y, 10, h, accent);
  txt(slide, ctx, eyebrow, x + 28, y + 14, w - 54, 14, {
    size: 9,
    color: accent,
    bold: true,
    face: "Aptos Mono",
  });
  txt(slide, ctx, heading, x + 28, y + 30, w - 54, 18, {
    size: 15,
    color: C.espresso,
    bold: true,
    face: "Georgia",
  });
  rows.forEach((row, i) => {
    const ry = y + 78 + i * 34;
    rect(slide, ctx, x + 28, ry, w - 56, 24, "#FFF9EF", C.creamLine, 1);
    rect(slide, ctx, x + 28, ry, 4, 24, i % 2 ? C.cyan : C.red);
    txt(slide, ctx, row, x + 42, ry + 6, w - 84, 12, {
      size: 9.5,
      color: C.espresso,
      bold: true,
      face: "Aptos",
      valign: "middle",
    });
  });
}

export async function slide07(presentation, ctx) {
  const slide = presentation.slides.add();
  bg(slide, ctx, C.espresso);
  kicker(slide, ctx, "TECHNOLOGY", 72, 50, true, "07");
  txt(slide, ctx, "Live Signal First,\nDemo-Safe Fallback", 72, 104, 620, 106, {
    size: 40,
    color: C.paper,
    bold: true,
    face: "Georgia",
  });
  txt(slide, ctx, "实时信号优先，演示稳定兜底", 76, 218, 540, 28, {
    size: 21,
    color: "#D8CDBE",
    bold: true,
  });
  txt(slide, ctx, "Designed for real-time Grok / X signal ingestion.\nBacked by a curated xAI / Grok signal bank for stable hackathon demos.", 76, 268, 560, 48, {
    size: 17,
    color: C.paper,
    face: "Aptos",
  });
  txt(slide, ctx, "首选接入实时 Grok / X 信息流；现场演示使用预置 xAI / Grok signal bank 作为稳定兜底。", 76, 322, 560, 24, {
    size: 14,
    color: "#CDBFAE",
    face: "Microsoft YaHei UI",
  });

  card(slide, ctx, 64, 380, 332, 214, "PRIMARY PRODUCT MODE", "Live Signal Stream", [
    "Designed for Grok / X API ingestion",
    "Target live signal stream",
    "Dynamic information shelves",
    "Fresh raw signals from today",
  ], C.cyan);

  card(slide, ctx, 474, 348, 332, 266, "SAME BREWING PIPELINE", "One pipeline for both inputs", [
    "Extracted Slice",
    "Persona",
    "Density",
    "Served Hot / Iced",
    "Brew Result",
    "Label / Pick Up",
  ], C.red);

  card(slide, ctx, 884, 380, 332, 214, "DEMO-SAFE FALLBACK", "Curated Signal Bank", [
    "Preloaded xAI / Grok signals",
    "6 shelves × 9 raw signals",
    "No network / API risk on stage",
    "Same output experience",
  ], C.redDark);

  rect(slide, ctx, 396, 480, 78, 3, C.cyan);
  rect(slide, ctx, 806, 480, 78, 3, C.redDark);
  txt(slide, ctx, "input", 410, 458, 42, 14, { size: 9, color: "#CDBFAE", bold: true, face: "Aptos Mono", align: "center" });
  txt(slide, ctx, "fallback input", 812, 458, 72, 14, { size: 9, color: "#CDBFAE", bold: true, face: "Aptos Mono", align: "center" });
  footer(slide, ctx, 7, true);
  return slide;
}
