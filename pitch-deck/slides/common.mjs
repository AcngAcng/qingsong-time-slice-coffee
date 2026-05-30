import path from "node:path";

export const C = {
  espresso: "#15100D",
  ink: "#241913",
  paper: "#F8F0E6",
  milk: "#FFF9EF",
  oat: "#EEE4D6",
  taupe: "#8C8175",
  red: "#B5482E",
  redDark: "#8F321F",
  cyan: "#3BA7A1",
  cyanDark: "#1F706D",
  creamLine: "#D5C8B8",
};

export function asset(ctx, name) {
  return path.join(ctx.assetDir, name);
}

export function bg(slide, ctx, fill = C.paper) {
  ctx.addShape(slide, { x: 0, y: 0, w: ctx.W, h: ctx.H, fill, line: ctx.line("#00000000", 0) });
}

export function rect(slide, ctx, x, y, w, h, fill, lineFill = "#00000000", lineWidth = 0, name) {
  return ctx.addShape(slide, { x, y, w, h, fill, line: ctx.line(lineFill, lineWidth), name });
}

export function txt(slide, ctx, text, x, y, w, h, opts = {}) {
  const {
    size = 24,
    color = C.ink,
    bold = false,
    face = "Microsoft YaHei UI",
    align = "left",
    valign = "top",
    fill = "#00000000",
    lineFill = "#00000000",
    lineWidth = 0,
    inset = 0,
    name,
  } = opts;
  return ctx.addText(slide, {
    text,
    x,
    y,
    w,
    h,
    size,
    color,
    bold,
    face,
    align,
    valign,
    fill,
    line: ctx.line(lineFill, lineWidth),
    insets: { left: inset, right: inset, top: inset, bottom: inset },
    name,
  });
}

export function kicker(slide, ctx, label, x = 72, y = 44, dark = false, id = "01") {
  rect(slide, ctx, x, y + 10.5, 28, 3, C.red, "#00000000", 0, `kicker-${id}-marker`);
  txt(slide, ctx, label, x + 40, y, 360, 24, {
    size: 12,
    color: dark ? C.paper : C.espresso,
    bold: true,
    face: "Aptos Mono",
    valign: "middle",
    name: `kicker-${id}-label`,
  });
}

export function title(slide, ctx, english, chinese, x = 72, y = 76, w = 720, dark = false) {
  txt(slide, ctx, english, x, y, w, 112, {
    size: 44,
    color: dark ? C.paper : C.espresso,
    bold: true,
    face: "Georgia",
  });
  if (chinese) {
    txt(slide, ctx, chinese, x + 2, y + 112, w, 34, {
      size: 21,
      color: dark ? "#D8CDBE" : C.red,
      bold: true,
    });
  }
}

export function coreLine(slide, ctx, text, x, y, w, dark = false) {
  txt(slide, ctx, text, x, y, w, 82, {
    size: 23,
    color: dark ? C.paper : C.ink,
  });
}

export function footer(slide, ctx, n, dark = false) {
  const color = dark ? "#BEB4A8" : C.taupe;
  rect(slide, ctx, 72, 662, 36, 2, dark ? "#59483E" : C.creamLine);
  txt(slide, ctx, "TIME SLICE COFFEE", 116, 652, 210, 22, {
    size: 10,
    color,
    bold: true,
    face: "Aptos Mono",
  });
  txt(slide, ctx, String(n).padStart(2, "0"), 1136, 652, 72, 24, {
    size: 12,
    color,
    bold: true,
    face: "Aptos Mono",
    align: "right",
  });
}

export function labelSticker(slide, ctx, x, y, w, h, opts = {}) {
  const top = Math.max(42, h * 0.22);
  const bottomReserved = h < 150 ? 26 : 54;
  rect(slide, ctx, x, y, w, h, opts.fill || C.milk, C.espresso, 1.4);
  rect(slide, ctx, x, y, w, top, C.espresso);
  txt(slide, ctx, opts.brand || "TIME SLICE\nCOFFEE", x + 16, y + 10, w * 0.62, top - 12, {
    size: Math.min(22, top * 0.34),
    color: C.paper,
    bold: true,
    face: "Aptos",
  });
  rect(slide, ctx, x + w - 50, y + 12, 26, 26, C.red);
  if (opts.no !== false) {
    txt(slide, ctx, opts.no || "TS-042", x + w - 116, y + top - 28, 92, 18, {
    size: 11,
    color: C.paper,
    bold: true,
    face: "Aptos Mono",
    align: "right",
    });
  }
  const rows = opts.rows || [
    ["SHELF", "AI FRONTIER"],
    ["IDENTITY", "BUILDER"],
    ["DENSITY", "REGULAR"],
    ["SERVE", "HOT"],
  ];
  const rowH = (h - top - bottomReserved) / rows.length;
  rows.forEach((row, i) => {
    const ry = y + top + i * rowH;
    rect(slide, ctx, x, ry, w, 1, C.creamLine);
    txt(slide, ctx, row[0], x + 14, ry + 9, w * 0.34, 16, {
      size: 8,
      color: C.taupe,
      bold: true,
      face: "Aptos Mono",
    });
    txt(slide, ctx, row[1], x + w * 0.36, ry + 6, w * 0.56, 22, {
      size: 13,
      color: C.espresso,
      bold: true,
      face: "Aptos",
    });
  });
  const by = y + h - 34;
  for (let i = 0; i < 15; i += 1) {
    rect(slide, ctx, x + 16 + i * 6, by, i % 3 === 0 ? 4 : 2, 22, C.espresso);
  }
  rect(slide, ctx, x + w - 44, y + h - 38, 18, 26, C.red);
}

export function chip(slide, ctx, text, x, y, w, dark = false, accent = C.red) {
  rect(slide, ctx, x, y, w, 30, dark ? "#2A211B" : "#FFF8EE", dark ? "#5F5147" : C.creamLine, 1);
  rect(slide, ctx, x, y, 4, 30, accent);
  txt(slide, ctx, text, x + 12, y + 6, w - 18, 18, {
    size: 12,
    color: dark ? C.paper : C.espresso,
    bold: true,
    face: "Aptos Mono",
    valign: "middle",
  });
}

export function coffeeCup(slide, ctx, x, y, w, h, label, accent = C.red) {
  rect(slide, ctx, x + w * 0.16, y + 5, w * 0.68, 14, C.espresso);
  rect(slide, ctx, x + w * 0.22, y + 20, w * 0.56, h - 24, C.milk, C.espresso, 1);
  rect(slide, ctx, x + w * 0.29, y + h * 0.42, w * 0.42, h * 0.24, "#F7F1E8", C.espresso, 0.8);
  rect(slide, ctx, x + w * 0.29, y + h * 0.42, w * 0.42, 8, C.espresso);
  rect(slide, ctx, x + w * 0.33, y + h * 0.55, w * 0.14, 3, C.creamLine);
  rect(slide, ctx, x + w * 0.33, y + h * 0.61, w * 0.22, 3, C.creamLine);
  rect(slide, ctx, x + w * 0.62, y + h * 0.51, w * 0.04, h * 0.12, accent);
  txt(slide, ctx, label, x - 10, y + h + 8, w + 20, 26, {
    size: 14,
    color: C.espresso,
    bold: true,
    align: "center",
  });
}
