import { C, asset, bg, footer, kicker, rect, timeSliceLabel, txt } from "./common.mjs";

export async function slide08(presentation, ctx) {
  const slide = presentation.slides.add();
  bg(slide, ctx, C.paper);
  await ctx.addImage(slide, {
    path: asset(ctx, "closing-pickup-cups.png"),
    x: 0,
    y: 0,
    w: ctx.W,
    h: ctx.H,
    fit: "cover",
    alt: "Fictional hot and iced cups with information labels",
  });
  rect(slide, ctx, 0, 0, 650, ctx.H, "#F8F0E6EA");
  rect(slide, ctx, 0, 0, 90, ctx.H, "#F8F0E6");
  kicker(slide, ctx, "CLOSING", 72, 56, false, "08");
  txt(slide, ctx, "Don’t Read\nthe Age.\nDrink It.", 72, 120, 538, 202, {
    size: 58,
    color: C.espresso,
    bold: true,
    face: "Georgia",
  });
  txt(slide, ctx, "不要只是阅读时代，把它喝下去", 76, 344, 498, 32, { size: 24, color: C.red, bold: true });
  txt(slide, ctx, "order → extract → personalize → brew → label → pick up", 76, 406, 310, 44, {
    size: 18,
    color: C.ink,
    bold: true,
    face: "Aptos Mono",
  });
  txt(slide, ctx, "Time Slice Coffee 让人们不只是刷到信息，而是带走一杯属于自己的时代切片。", 76, 470, 300, 64, {
    size: 18,
    color: C.ink,
  });
  timeSliceLabel(slide, ctx, 410, 394, 214, 226, {
    no: "PICK UP",
    rows: [
      ["SHELF", "AI Frontier"],
      ["PERSONA", "Builder"],
      ["DENSITY", "Regular"],
      ["SERVED", "Iced"],
      ["BREW RESULT", "What it means"],
      ["TAKEAWAY", "Carry it away"],
    ],
    boldValues: true,
  });
  txt(slide, ctx, "你今日 fo 了\nmo？", 78, 548, 310, 82, { size: 34, color: C.red, bold: true });
  footer(slide, ctx, 8);
  return slide;
}
