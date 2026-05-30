import { C, bg, chip, footer, kicker, rect, title, txt } from "./common.mjs";

export async function slide07(presentation, ctx) {
  const slide = presentation.slides.add();
  bg(slide, ctx, C.espresso);
  kicker(slide, ctx, "TECHNOLOGY", 72, 50, true, "07");
  title(slide, ctx, "Stable Today,\nReal-Time Tomorrow", "今天稳定演示，未来实时接入", 72, 100, 540, true);
  txt(slide, ctx, "The demo is stable today; the architecture points toward real-time information coffee menus.", 76, 254, 560, 48, {
    size: 22,
    color: C.paper,
    face: "Aptos",
  });

  const columns = [
    {
      x: 94,
      title: "Plan B: Stable Demo Today",
      marker: C.red,
      rows: ["Preloaded xAI / Grok signal bank", "6 shelves × 9 raw signals", "Full demo flow already works"],
    },
    {
      x: 686,
      title: "Plan A: Real-Time Tomorrow",
      marker: C.cyan,
      rows: ["Grok / X API integration", "Dynamic daily signal menu", "Future 50×70mm label printing module"],
    },
  ];
  columns.forEach((col) => {
    rect(slide, ctx, col.x, 358, 500, 214, "#F8F0E6", "#5F5147", 1.5);
    rect(slide, ctx, col.x, 358, 12, 214, col.marker);
    rect(slide, ctx, col.x, 358, 500, 54, "#FFF9EF", C.creamLine, 1);
    txt(slide, ctx, col.title, col.x + 32, 376, 390, 24, {
      size: 20,
      color: C.espresso,
      bold: true,
      face: "Georgia",
    });
    col.rows.forEach((row, i) => {
      chip(slide, ctx, row, col.x + 32, 442 + i * 38, 390, false, i % 2 ? C.cyan : C.red);
    });
  });
  txt(slide, ctx, "Hackathon-safe now. Menu-native later.", 78, 606, 520, 24, {
    size: 18,
    color: "#D8CDBE",
    face: "Aptos",
  });
  footer(slide, ctx, 7, true);
  return slide;
}
