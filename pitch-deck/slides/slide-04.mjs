import { C, bg, chip, coreLine, footer, kicker, rect, txt } from "./common.mjs";

export async function slide04(presentation, ctx) {
  const slide = presentation.slides.add();
  bg(slide, ctx, C.espresso);
  kicker(slide, ctx, "PRODUCT", 72, 54, true, "04");
  txt(slide, ctx, "An Information\nCoffee Bar", 72, 116, 438, 112, {
    size: 42,
    color: C.paper,
    bold: true,
    face: "Georgia",
  });
  txt(slide, ctx, "for the AI Age", 72, 242, 438, 52, {
    size: 42,
    color: C.paper,
    bold: true,
    face: "Georgia",
  });
  txt(slide, ctx, "AI 时代的信息咖啡吧", 76, 314, 380, 28, {
    size: 21,
    color: "#D8CDBE",
    bold: true,
  });
  coreLine(slide, ctx, "Time Slice Coffee 把真实信息流中的重要变化，\n萃取成不同身份可理解、可带走的时代信息切片咖啡。", 76, 392, 486, true);
  txt(slide, ctx, "We turn reading information into ordering a cup.", 78, 526, 420, 34, {
    size: 20,
    color: "#D8CDBE",
    face: "Aptos",
  });

  rect(slide, ctx, 594, 78, 560, 516, "#F8F0E6", "#6B5748", 2);
  rect(slide, ctx, 594, 78, 560, 70, "#241913");
  txt(slide, ctx, "TODAY'S MENU", 624, 100, 210, 28, { size: 22, color: C.paper, bold: true, face: "Aptos Mono" });
  txt(slide, ctx, "6 shelves × identity × density × serve", 860, 106, 244, 20, { size: 12, color: "#CDBFAE", face: "Aptos Mono", align: "right" });

  const shelves = [
    ["AI Frontier", "AI 前沿"],
    ["Build & Workflow", "构建工作流"],
    ["Design & Creation", "设计创作"],
    ["Market & Capital", "市场资本"],
    ["Self Upgrade", "自我升级"],
    ["Life Signals", "生活信号"],
  ];
  shelves.forEach((s, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = 628 + col * 252;
    const y = 178 + row * 76;
    rect(slide, ctx, x, y, 218, 50, "#FFF9EF", C.creamLine, 1);
    rect(slide, ctx, x, y, 5, 50, i % 2 ? C.cyan : C.red);
    txt(slide, ctx, s[0], x + 15, y + 8, 186, 18, { size: 15, color: C.espresso, bold: true, face: "Aptos" });
    txt(slide, ctx, s[1], x + 15, y + 28, 186, 16, { size: 11, color: C.taupe });
  });

  txt(slide, ctx, "ORDER LAYERS", 628, 424, 160, 18, { size: 12, color: C.red, bold: true, face: "Aptos Mono" });
  chip(slide, ctx, "Student / Builder / Designer / Founder / VC / Everyday", 628, 454, 468, false, C.red);
  chip(slide, ctx, "Light / Regular / Double", 628, 494, 230, false, C.cyan);
  chip(slide, ctx, "Served Hot / Served Iced", 874, 494, 222, false, C.red);
  footer(slide, ctx, 4, true);
  return slide;
}
