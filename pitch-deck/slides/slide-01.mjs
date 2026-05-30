import { C, asset, bg, coreLine, footer, kicker, rect, timeSliceLabel, txt } from "./common.mjs";

export async function slide01(presentation, ctx) {
  const slide = presentation.slides.add();
  bg(slide, ctx, C.paper);
  await ctx.addImage(slide, {
    path: asset(ctx, "cover-coffee-label.png"),
    x: 0,
    y: 0,
    w: ctx.W,
    h: ctx.H,
    fit: "cover",
    alt: "Fictional Time Slice Coffee cup with information label",
  });
  rect(slide, ctx, 0, 0, 620, ctx.H, "#F8F0E6E8");
  rect(slide, ctx, 0, 0, 80, ctx.H, "#F8F0E6");
  kicker(slide, ctx, "HACKATHON PITCH", 72, 58, false, "01");
  txt(slide, ctx, "Time Slice\nCoffee", 72, 112, 500, 132, {
    size: 58,
    color: C.espresso,
    bold: true,
    face: "Georgia",
  });
  txt(slide, ctx, "你今日 fo 了 mo？", 74, 278, 500, 66, {
    size: 44,
    color: C.red,
    bold: true,
  });
  coreLine(slide, ctx, "把今天真正重要的一则变化，\n装进一杯咖啡里。", 76, 360, 492, false);
  timeSliceLabel(slide, ctx, 78, 476, 330, 142, {
    compact: true,
    no: "TS-001",
    rows: [
      ["SHELF", "AI Frontier"],
      ["PERSONA", "Builder"],
      ["DENSITY", "Regular"],
      ["SERVED", "Hot"],
      ["TODAY'S SLICE", "What changed"],
    ],
    boldValues: true,
  });
  txt(slide, ctx, "An information consumer product\nfor the AI age.", 428, 514, 150, 58, {
    size: 14,
    color: C.ink,
    face: "Aptos",
  });
  footer(slide, ctx, 1);
  return slide;
}
