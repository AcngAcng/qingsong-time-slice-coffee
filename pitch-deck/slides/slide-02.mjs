import { C, asset, bg, coreLine, footer, kicker, rect, title, txt } from "./common.mjs";

export async function slide02(presentation, ctx) {
  const slide = presentation.slides.add();
  bg(slide, ctx, C.espresso);
  await ctx.addImage(slide, {
    path: asset(ctx, "problem-feed-pressure.png"),
    x: 0,
    y: 0,
    w: ctx.W,
    h: ctx.H,
    fit: "cover",
    alt: "A person surrounded by floating information signals",
  });
  rect(slide, ctx, 0, 0, 600, ctx.H, "#15100DE8");
  rect(slide, ctx, 0, 0, ctx.W, ctx.H, "#15100D22");
  kicker(slide, ctx, "PROBLEM", 72, 54, true, "02");
  title(slide, ctx, "Every Signal\nPretends to Matter", "每一条信息都装作自己很重要", 72, 122, 500, true);
  coreLine(slide, ctx, "AI 时代的问题不是信息不够，\n而是每天都有太多数据信号在制造 FOMO。", 74, 338, 488, true);
  rect(slide, ctx, 76, 468, 420, 1, "#6B5748");
  txt(slide, ctx, "People fear missing out, falling behind, or being replaced. The pressure comes from too many signals pretending to be urgent.", 76, 494, 416, 78, {
    size: 18,
    color: "#D8CDBE",
    face: "Aptos",
  });
  txt(slide, ctx, "AI UPDATE\nMARKET ALERT\nWORKFLOW SHIFT\nMODEL RELEASE", 996, 94, 184, 104, {
    size: 13,
    color: "#F8F0E6",
    bold: true,
    face: "Aptos Mono",
    fill: "#15100DA8",
    lineFill: "#6B5748",
    lineWidth: 1,
    inset: 12,
  });
  footer(slide, ctx, 2, true);
  return slide;
}

