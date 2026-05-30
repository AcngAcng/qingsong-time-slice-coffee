import { C, bg, coffeeCup, coreLine, footer, kicker, rect, title, txt } from "./common.mjs";

export async function slide06(presentation, ctx) {
  const slide = presentation.slides.add();
  bg(slide, ctx, C.paper);
  kicker(slide, ctx, "DEMO", 72, 50, false, "06");
  title(slide, ctx, "One Signal,\nSix Different Values", "同一条信号，六种不同价值", 72, 96, 560, false);
  coreLine(slide, ctx, "同一条 Raw Signal，对六种身份产生六种不同价值。", 74, 250, 660, false);

  rect(slide, ctx, 84, 366, 318, 142, C.espresso, C.espresso, 1);
  txt(slide, ctx, "RAW SIGNAL", 108, 392, 120, 20, { size: 13, color: C.red, bold: true, face: "Aptos Mono" });
  txt(slide, ctx, "A new model or workflow shift changes what people can learn, build, fund, design, or use.", 108, 428, 246, 60, {
    size: 18,
    color: C.paper,
    bold: true,
    face: "Aptos",
  });
  rect(slide, ctx, 386, 434, 108, 3, C.red);

  const cups = [
    ["Student", "What should I learn?", C.cyan],
    ["Builder", "What can I build?", C.red],
    ["Designer", "How does experience change?", C.cyanDark],
    ["Founder", "Where is the opportunity?", C.redDark],
    ["VC", "How is structure changing?", C.espresso],
    ["Everyday", "What changes in life?", C.red],
  ];
  cups.forEach((c, i) => {
    const col = i % 3;
    const row = Math.floor(i / 3);
    const x = 548 + col * 200;
    const y = 306 + row * 152;
    coffeeCup(slide, ctx, x, y, 96, 94, c[0], c[2]);
  });
  txt(slide, ctx, "The value is not making information shorter. It is translating the same change into different personal meanings.", 76, 610, 840, 28, {
    size: 15,
    color: C.ink,
    face: "Aptos",
  });
  footer(slide, ctx, 6);
  return slide;
}
