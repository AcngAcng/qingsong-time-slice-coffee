import { C, bg, footer, kicker, rect, title, txt } from "./common.mjs";

function stage(slide, ctx, x, y, label, detail, accent, n, final = false) {
  const w = final ? 190 : 150;
  const h = final ? 168 : 150;
  rect(slide, ctx, x, y, w, h, "#FFF9EF", final ? C.espresso : C.creamLine, final ? 1.8 : 1);
  if (final) {
    rect(slide, ctx, x, y, w, 34, C.espresso);
    txt(slide, ctx, "NEW CATEGORY", x + 18, y + 10, 112, 14, { size: 9, color: C.paper, bold: true, face: "Aptos Mono" });
  }
  rect(slide, ctx, x + 18, y + (final ? 50 : 20), 44, 44, accent);
  txt(slide, ctx, String(n), x + 30, y + (final ? 61 : 31), 20, 20, { size: 15, color: C.milk, bold: true, align: "center" });
  txt(slide, ctx, label, x + 18, y + (final ? 106 : 78), w - 36, 24, { size: final ? 21 : 18, color: C.espresso, bold: true, face: "Georgia" });
  txt(slide, ctx, detail, x + 18, y + (final ? 134 : 108), w - 36, 26, { size: final ? 13 : 12, color: final ? C.red : C.taupe, bold: final, face: "Aptos" });
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
  stage(slide, ctx, 736, 436, "Info Coffee", "时代理解", C.espresso, 4, true);
  rect(slide, ctx, 1096, 298, 46, 2, C.red);
  rect(slide, ctx, 1096, 492, 46, 2, C.red);
  txt(slide, ctx, "Packaged understanding becomes a product.", 578, 620, 530, 26, {
    size: 18,
    color: C.ink,
    face: "Aptos",
  });
  footer(slide, ctx, 3);
  return slide;
}
