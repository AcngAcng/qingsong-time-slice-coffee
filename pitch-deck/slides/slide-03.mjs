import { C, bg, footer, kicker, rect, title, txt } from "./common.mjs";

function stage(slide, ctx, x, y, label, detail, accent, n) {
  rect(slide, ctx, x, y, 150, 150, "#FFF9EF", C.creamLine, 1);
  rect(slide, ctx, x + 18, y + 20, 44, 44, accent);
  txt(slide, ctx, String(n), x + 30, y + 31, 20, 20, { size: 15, color: C.milk, bold: true, align: "center" });
  txt(slide, ctx, label, x + 18, y + 78, 114, 24, { size: 18, color: C.espresso, bold: true, face: "Georgia" });
  txt(slide, ctx, detail, x + 18, y + 108, 114, 26, { size: 12, color: C.taupe, face: "Aptos" });
}

export async function slide03(presentation, ctx) {
  const slide = presentation.slides.add();
  bg(slide, ctx, C.paper);
  kicker(slide, ctx, "INSIGHT", 72, 54, false, "03");
  title(slide, ctx, "Understanding\nBecomes a Product", "理解，正在变成一种消费品", 72, 112, 620, false);
  txt(slide, ctx, "过去，\n人们买水是为了解渴。\n\n后来，\n人们购买品牌、身份和生活方式。\n\n而 AI 时代，\n人们开始购买：\n对这个时代的理解。", 76, 300, 444, 266, {
    size: 27,
    color: C.espresso,
    bold: true,
  });
  rect(slide, ctx, 552, 360, 532, 3, C.creamLine);
  stage(slide, ctx, 578, 254, "Water", "解渴", C.cyanDark, 1);
  stage(slide, ctx, 756, 254, "Brand", "身份", C.redDark, 2);
  stage(slide, ctx, 934, 254, "Coffee", "生活方式", C.red, 3);
  stage(slide, ctx, 756, 448, "Info Coffee", "时代理解", C.espresso, 4);
  rect(slide, ctx, 1096, 298, 46, 2, C.red);
  rect(slide, ctx, 1096, 492, 46, 2, C.red);
  txt(slide, ctx, "People no longer only consume content.\nThey consume packaged understanding.", 578, 594, 530, 48, {
    size: 20,
    color: C.ink,
    face: "Aptos",
  });
  footer(slide, ctx, 3);
  return slide;
}

