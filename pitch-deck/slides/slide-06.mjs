import { C, bg, coffeeCup, coreLine, footer, kicker, rect, title, txt } from "./common.mjs";

export async function slide06(presentation, ctx) {
  const slide = presentation.slides.add();
  bg(slide, ctx, C.paper);
  kicker(slide, ctx, "DEMO", 72, 50, false, "06");
  title(slide, ctx, "One Signal,\nSix Different Values", "同一条信号，六种不同价值", 72, 96, 560, false);
  coreLine(slide, ctx, "同一条 Raw Signal，对 Student、Builder、Designer、Founder、VC、Everyday Person 会产生完全不同的意义。", 74, 250, 780, false);

  rect(slide, ctx, 84, 354, 318, 156, C.espresso, C.espresso, 1);
  txt(slide, ctx, "RAW SIGNAL", 108, 382, 120, 20, { size: 13, color: C.red, bold: true, face: "Aptos Mono" });
  txt(slide, ctx, "A new model or workflow shift changes what people can learn, build, fund, design, or use.", 108, 422, 246, 60, {
    size: 22,
    color: C.paper,
    bold: true,
    face: "Aptos",
  });
  rect(slide, ctx, 386, 430, 108, 3, C.red);

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
    const x = 538 + col * 202;
    const y = 270 + row * 180;
    coffeeCup(slide, ctx, x, y, 110, 112, c[0], c[2]);
    txt(slide, ctx, c[1], x - 20, y + 148, 150, 28, { size: 12, color: C.taupe, align: "center", face: "Aptos" });
  });
  txt(slide, ctx, "The value is not making information shorter. It is translating the same change into different personal meanings.", 76, 596, 840, 40, {
    size: 18,
    color: C.ink,
    face: "Aptos",
  });
  footer(slide, ctx, 6);
  return slide;
}

