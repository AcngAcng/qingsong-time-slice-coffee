import { C, bg, footer, kicker, rect, title, txt } from "./common.mjs";

function personaOutput(slide, ctx, x, y, w, h, persona, value, focus, accent) {
  rect(slide, ctx, x, y, w, h, C.milk, C.espresso, 1);
  for (let gx = x + w / 5; gx < x + w - 1; gx += w / 5) {
    rect(slide, ctx, gx, y + 1, 0.45, h - 2, "#E7DCCB");
  }
  rect(slide, ctx, x + 10, y + 26, w - 20, 0.8, C.creamLine);
  rect(slide, ctx, x + 10, y + 72, w - 20, 0.8, C.creamLine);
  rect(slide, ctx, x + 10, y + 37, 3, 24, accent);
  txt(slide, ctx, "TIME SLICE", x + 10, y + 8, 84, 12, {
    size: 7.5,
    color: C.espresso,
    bold: true,
    face: "Aptos Mono",
  });
  txt(slide, ctx, "TS-042 / AI FRONTIER", x + w - 132, y + 8, 122, 12, {
    size: 6.8,
    color: C.taupe,
    bold: true,
    face: "Aptos Mono",
    align: "right",
  });
  txt(slide, ctx, `FOR ${persona.toUpperCase()}`, x + 20, y + 34, w - 32, 12, {
    size: 7.8,
    color: C.taupe,
    bold: true,
    face: "Aptos Mono",
  });
  txt(slide, ctx, value, x + 20, y + 48, w - 32, 20, {
    size: 9.2,
    color: C.espresso,
    bold: true,
    face: "Aptos",
  });
  txt(slide, ctx, "TODAY'S FOCUS", x + 10, y + 78, w - 20, 10, {
    size: 7,
    color: C.taupe,
    bold: true,
    face: "Aptos Mono",
  });
  txt(slide, ctx, focus, x + 10, y + 90, w - 20, 14, {
    size: 8.2,
    color: C.espresso,
    face: "Aptos",
  });
}

export async function slide06(presentation, ctx) {
  const slide = presentation.slides.add();
  bg(slide, ctx, C.paper);
  kicker(slide, ctx, "DEMO", 72, 50, false, "06");
  title(slide, ctx, "One Signal,\nSix Different Values", "同一条信号，六种不同价值", 72, 96, 560, false);
  txt(slide, ctx, "同一条 Raw Signal，被翻译成六种可带走的个人意义。", 74, 250, 660, 34, {
    size: 22,
    color: C.ink,
  });

  rect(slide, ctx, 430, 328, 420, 150, C.espresso, C.espresso, 1);
  txt(slide, ctx, "RAW SIGNAL", 458, 356, 120, 20, { size: 13, color: C.red, bold: true, face: "Aptos Mono" });
  txt(slide, ctx, "A new model or workflow shift changes what people can learn, build, fund, design, or use.", 458, 392, 314, 58, {
    size: 20,
    color: C.paper,
    bold: true,
    face: "Aptos",
  });
  rect(slide, ctx, 398, 405, 32, 2, C.red);
  rect(slide, ctx, 850, 405, 32, 2, C.red);

  const labels = [
    ["Student", "What should I learn next?", "Pick one skill path", C.cyan, 72, 300],
    ["Designer", "How will experience change?", "Watch one UX shift", C.cyanDark, 72, 420],
    ["Founder", "Where is the opportunity?", "Test one market wedge", C.redDark, 72, 540],
    ["Builder", "What can I build with this?", "Find one human edge", C.red, 948, 300],
    ["VC", "What market shift is happening?", "Keep one verifiable signal", C.espresso, 948, 420],
    ["Everyday Person", "What does this mean for my life?", "Choose one daily implication", C.red, 948, 540],
  ];
  labels.forEach(([persona, value, focus, accent, x, y]) => {
    personaOutput(slide, ctx, x, y, 260, 104, persona, value, focus, accent);
  });

  rect(slide, ctx, 378, 518, 524, 56, "#FFF9EF", C.creamLine, 1);
  txt(slide, ctx, "Not shorter information.", 402, 530, 210, 18, {
    size: 14,
    color: C.red,
    bold: true,
    face: "Aptos Mono",
  });
  txt(slide, ctx, "The value is translating the same change into different personal meanings.", 402, 552, 456, 18, {
    size: 13,
    color: C.ink,
    face: "Aptos",
  });
  footer(slide, ctx, 6);
  return slide;
}
