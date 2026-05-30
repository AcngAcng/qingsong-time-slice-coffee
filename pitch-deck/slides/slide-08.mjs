import { C, asset, bg, footer, kicker, rect, txt } from "./common.mjs";

function pickupLabel(slide, ctx, x, y, w, h) {
  rect(slide, ctx, x, y, w, h, "#FFF9EFF2", C.espresso, 1.1);
  for (let gy = y + 34; gy < y + h - 24; gy += 31) {
    rect(slide, ctx, x + 12, gy, w - 24, 0.8, C.creamLine);
  }
  txt(slide, ctx, "TIME SLICE COFFEE", x + 14, y + 12, w - 28, 14, {
    size: 8.5,
    color: C.espresso,
    bold: true,
    face: "Aptos Mono",
  });
  txt(slide, ctx, "PICK UP / AI FRONTIER", x + 14, y + 32, w - 28, 12, {
    size: 7,
    color: C.taupe,
    bold: true,
    face: "Aptos Mono",
  });
  txt(slide, ctx, "FOR BUILDER", x + 14, y + 64, w - 28, 12, {
    size: 8,
    color: C.taupe,
    bold: true,
    face: "Aptos Mono",
  });
  txt(slide, ctx, "What it means", x + 14, y + 88, w - 28, 18, {
    size: 15,
    color: C.espresso,
    bold: true,
    face: "Georgia",
  });
  txt(slide, ctx, "TODAY'S FOCUS", x + 14, y + 126, w - 28, 12, {
    size: 8,
    color: C.taupe,
    bold: true,
    face: "Aptos Mono",
  });
  txt(slide, ctx, "BREW REGULAR / SERVED ICED", x + 14, y + h - 30, w - 28, 12, {
    size: 7.4,
    color: C.taupe,
    bold: true,
    face: "Aptos Mono",
  });
  rect(slide, ctx, x + w - 30, y + h - 32, 12, 18, C.red);
}

function cupMaskLabel(slide, ctx, x, y, w, h, small = false) {
  rect(slide, ctx, x, y, w, h, "#FFF9EFF4", "#00000000", 0);
  rect(slide, ctx, x + 6, y + 6, w - 12, h - 12, "#FFF9EFEF", C.espresso, 0.8);
  txt(slide, ctx, "TIME SLICE COFFEE", x + 14, y + 16, w - 28, 12, {
    size: small ? 5.7 : 7,
    color: C.espresso,
    bold: true,
    face: "Aptos Mono",
  });
  txt(slide, ctx, small ? "TS-058" : "TS-042 / AI FRONTIER", x + 14, y + 32, w - 28, 10, {
    size: small ? 5.2 : 6.4,
    color: C.taupe,
    bold: true,
    face: "Aptos Mono",
  });
  for (let i = 0; i < 4; i += 1) {
    rect(slide, ctx, x + 14, y + 52 + i * (small ? 17 : 22), w - 28, 0.7, C.creamLine);
  }
  txt(slide, ctx, small ? "FOR VC" : "FOR BUILDER", x + 14, y + (small ? 58 : 62), w - 28, 10, {
    size: small ? 5.5 : 6.6,
    color: C.taupe,
    bold: true,
    face: "Aptos Mono",
  });
  txt(slide, ctx, small ? "FOCUS" : "TODAY'S FOCUS", x + 14, y + (small ? 86 : 104), w - 28, 10, {
    size: small ? 5.3 : 6.2,
    color: C.taupe,
    bold: true,
    face: "Aptos Mono",
  });
  rect(slide, ctx, x + w - 22, y + h - 26, small ? 7 : 10, small ? 12 : 16, C.red);
}

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
    alt: "Fictional hot and iced cups with pickup labels",
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
  txt(slide, ctx, "order → extract → personalize → brew →\nlabel → pick up", 76, 406, 310, 48, {
    size: 18,
    color: C.ink,
    bold: true,
    face: "Aptos Mono",
  });
  txt(slide, ctx, "Time Slice Coffee\n让人们不只是刷到信息，而是带走一杯属于自己的时代切片。", 76, 472, 300, 66, {
    size: 18,
    color: C.ink,
  });

  pickupLabel(slide, ctx, 410, 382, 214, 242);
  cupMaskLabel(slide, ctx, 782, 314, 144, 238, false);
  cupMaskLabel(slide, ctx, 1016, 338, 112, 194, true);

  txt(slide, ctx, "你今日 fo 了\nmo？", 78, 548, 310, 82, { size: 34, color: C.red, bold: true });
  footer(slide, ctx, 8);
  return slide;
}
