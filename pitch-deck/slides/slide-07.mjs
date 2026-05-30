import { C, bg, chip, footer, kicker, rect, title, txt } from "./common.mjs";

export async function slide07(presentation, ctx) {
  const slide = presentation.slides.add();
  bg(slide, ctx, C.espresso);
  kicker(slide, ctx, "TECHNOLOGY", 72, 50, true, "07");
  title(slide, ctx, "Stable Today,\nReal-Time Tomorrow", "今天稳定演示，未来实时接入", 72, 100, 620, true);
  txt(slide, ctx, "当前采用预置 xAI / Grok signal bank 保证现场演示稳定，未来可接入实时 Grok / X API。", 76, 254, 560, 62, {
    size: 23,
    color: C.paper,
  });

  rect(slide, ctx, 94, 378, 440, 174, "#241913", "#5F5147", 1.2);
  rect(slide, ctx, 94, 378, 12, 174, C.red);
  txt(slide, ctx, "Plan B / Stable Demo", 126, 404, 256, 30, { size: 24, color: C.paper, bold: true, face: "Georgia" });
  chip(slide, ctx, "Preloaded xAI / Grok signal bank", 126, 454, 322, true, C.red);
  chip(slide, ctx, "6 shelves × 9 raw signals", 126, 494, 260, true, C.cyan);

  rect(slide, ctx, 660, 120, 452, 432, "#F8F0E6", "#5F5147", 1.5);
  rect(slide, ctx, 660, 120, 452, 58, "#FFF9EF", C.creamLine, 1);
  txt(slide, ctx, "DEMO STACK", 690, 140, 160, 20, { size: 13, color: C.red, bold: true, face: "Aptos Mono" });
  const stack = ["Extracted Slice", "Persona / Density / Hot-Iced", "Brew Result", "Label / Pick Up page"];
  stack.forEach((s, i) => {
    rect(slide, ctx, 702, 214 + i * 52, 300, 34, i % 2 ? "#FFF9EF" : "#EEE4D6", C.creamLine, 1);
    txt(slide, ctx, s, 722, 222 + i * 52, 260, 18, { size: 14, color: C.espresso, bold: true, face: "Aptos Mono" });
  });
  rect(slide, ctx, 848, 424, 2, 46, C.creamLine);
  txt(slide, ctx, "Plan A / Real-Time Future", 690, 484, 280, 24, { size: 20, color: C.espresso, bold: true, face: "Georgia" });
  txt(slide, ctx, "Future Grok / X API\nFuture 50×70mm label printing module", 690, 516, 330, 40, { size: 14, color: C.taupe, face: "Aptos" });
  footer(slide, ctx, 7, true);
  return slide;
}

