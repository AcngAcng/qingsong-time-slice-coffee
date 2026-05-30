import { C, bg, footer, kicker, miniPersonaLabel, rect, title, txt } from "./common.mjs";

export async function slide06(presentation, ctx) {
  const slide = presentation.slides.add();
  bg(slide, ctx, C.paper);
  kicker(slide, ctx, "DEMO", 72, 50, false, "06");
  title(slide, ctx, "One Signal,\nSix Different Values", "同一条信号，六种不同价值", 72, 96, 560, false);
  txt(slide, ctx, "同一条 Raw Signal，被翻译成六种可带走的个人意义。", 74, 250, 660, 34, {
    size: 22,
    color: C.ink,
  });

  rect(slide, ctx, 430, 336, 420, 142, C.espresso, C.espresso, 1);
  txt(slide, ctx, "RAW SIGNAL", 458, 364, 120, 20, { size: 13, color: C.red, bold: true, face: "Aptos Mono" });
  txt(slide, ctx, "A new model or workflow shift changes what people can learn, build, fund, design, or use.", 458, 400, 314, 52, {
    size: 20,
    color: C.paper,
    bold: true,
    face: "Aptos",
  });
  rect(slide, ctx, 398, 405, 32, 2, C.red);
  rect(slide, ctx, 850, 405, 32, 2, C.red);

  const labels = [
    ["Student", "What should I learn next?", C.cyan, 72, 306],
    ["Designer", "How will experience change?", C.cyanDark, 72, 424],
    ["Founder", "Where is the opportunity?", C.redDark, 72, 542],
    ["Builder", "What can I build with this?", C.red, 948, 306],
    ["VC", "What market shift is happening?", C.espresso, 948, 424],
    ["Everyday Person", "What does this mean for my life?", C.red, 948, 542],
  ];
  labels.forEach((label) => {
    miniPersonaLabel(slide, ctx, label[3], label[4], 260, 94, label[0], label[1], label[2]);
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
