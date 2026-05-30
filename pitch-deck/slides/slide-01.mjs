import { C, asset, bg, coreLine, footer, kicker, rect, txt } from "./common.mjs";

function coverInfoCard(slide, ctx, x, y, w, h) {
  rect(slide, ctx, x, y, w, h, "#FFF9EFF2", C.espresso, 1.1);

  for (let gx = x + w / 6; gx < x + w - 1; gx += w / 6) {
    rect(slide, ctx, gx, y + 1, 0.45, h - 2, "#E5D9C8", "#00000000", 0);
  }
  for (let gy = y + 30; gy < y + h - 8; gy += 28) {
    rect(slide, ctx, x + 12, gy, w - 24, 0.8, C.creamLine);
  }

  txt(slide, ctx, "TIME SLICE COFFEE", x + 14, y + 10, w * 0.52, 16, {
    size: 9,
    color: C.espresso,
    bold: true,
    face: "Aptos Mono",
  });
  txt(slide, ctx, "TS-001 / AI FRONTIER", x + w - 146, y + 10, 132, 16, {
    size: 8,
    color: "#5F6B72",
    bold: true,
    face: "Aptos Mono",
    align: "right",
  });

  txt(slide, ctx, "FOR BUILDER", x + 14, y + 40, 120, 14, {
    size: 8,
    color: "#5F6B72",
    bold: true,
    face: "Aptos Mono",
  });
  txt(slide, ctx, "TODAY'S SLICE", x + 14, y + 71, 126, 14, {
    size: 8,
    color: "#5F6B72",
    bold: true,
    face: "Aptos Mono",
  });
  txt(slide, ctx, "What changed", x + 156, y + 69, 132, 18, {
    size: 12,
    color: C.espresso,
    bold: true,
    face: "Aptos",
  });
  txt(slide, ctx, "BREW REGULAR", x + 14, y + 102, 126, 14, {
    size: 8,
    color: "#5F6B72",
    bold: true,
    face: "Aptos Mono",
  });
  txt(slide, ctx, "SERVED HOT", x + 156, y + 102, 112, 14, {
    size: 8,
    color: "#5F6B72",
    bold: true,
    face: "Aptos Mono",
  });
  rect(slide, ctx, x + w - 34, y + h - 26, 14, 18, C.red);
}

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
  rect(slide, ctx, 0, 0, 620, ctx.H, "#F8F0E6EE");
  rect(slide, ctx, 0, 0, 80, ctx.H, "#F8F0E6");
  rect(slide, ctx, 618, 0, 1, ctx.H, "#E2D5C4");

  kicker(slide, ctx, "HACKATHON PITCH", 72, 58, false, "01");
  txt(slide, ctx, "Time Slice\nCoffee", 72, 112, 500, 132, {
    size: 58,
    color: C.espresso,
    bold: true,
    face: "Georgia",
  });
  txt(slide, ctx, "TODAY'S QUESTION", 78, 270, 210, 18, {
    size: 10,
    color: C.taupe,
    bold: true,
    face: "Aptos Mono",
  });
  txt(slide, ctx, "你今日 fo 了 mo？", 74, 292, 516, 72, {
    size: 50,
    color: C.red,
    bold: true,
  });
  coreLine(slide, ctx, "把今天真正重要的一则变化，\n装进一杯咖啡里。", 76, 384, 492, false);

  coverInfoCard(slide, ctx, 78, 496, 330, 128);
  txt(slide, ctx, "An information consumer product\nfor the AI age.", 430, 528, 150, 58, {
    size: 14,
    color: C.ink,
    face: "Aptos",
  });

  footer(slide, ctx, 1);
  return slide;
}
