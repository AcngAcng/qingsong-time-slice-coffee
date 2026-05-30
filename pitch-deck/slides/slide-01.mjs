import { C, asset, bg, coreLine, footer, kicker, labelSticker, rect, txt } from "./common.mjs";

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
  txt(slide, ctx, "Time Slice\nCoffee", 72, 126, 500, 142, {
    size: 62,
    color: C.espresso,
    bold: true,
    face: "Georgia",
  });
  txt(slide, ctx, "你今日 fo 了 mo？", 74, 304, 500, 54, {
    size: 35,
    color: C.red,
    bold: true,
  });
  coreLine(slide, ctx, "把今天真正重要的一则变化，\n装进一杯咖啡里。", 76, 382, 492, false);
  labelSticker(slide, ctx, 78, 494, 280, 116, {
    brand: "TODAY'S\nINFORMATION SLICE",
    no: "TS-001",
    rows: [
      ["SHELF", "AI FRONTIER"],
      ["IDENTITY", "BUILDER"],
    ],
  });
  txt(slide, ctx, "Not another AI SaaS.\nAn information consumer product for the AI age.", 390, 510, 186, 74, {
    size: 14,
    color: C.ink,
    face: "Aptos",
  });
  footer(slide, ctx, 1);
  return slide;
}

