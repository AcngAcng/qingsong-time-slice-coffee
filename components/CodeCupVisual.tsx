import { useMemo } from "react";
import type { CSSProperties } from "react";

type CodeCupVisualProps = {
  isBrewing?: boolean;
  isComplete?: boolean;
};

const TOKENS = [
  "0",
  "1",
  "/",
  "{",
  "}",
  "[",
  "]",
  "<",
  ">",
  ":",
  ";",
  "=",
  ".",
  "signal",
  "slice",
  "value",
  "label",
  "fetch",
  "parse",
  "rewrite",
  "emit",
];

function seededRandom(seed: number) {
  const value = Math.sin(seed * 999.91) * 10000;

  return value - Math.floor(value);
}

function getCupBodyEdge(y: number) {
  const t = Math.max(0, Math.min(1, (y - 30) / 58));

  return {
    center: 47,
    half: 23 - t * 8,
  };
}

function getCodeCupPoint(x: number, y: number, seed: number) {
  const random = seededRandom(seed);
  const cap = y >= 15 && y <= 25 && Math.abs(x - 44) < 15 + (y - 15) * 0.52;
  const rim = y >= 24 && y <= 32 && Math.abs(x - 45) < 32 - Math.abs(y - 28) * 1.4;
  const bodyEdge = getCupBodyEdge(y);
  const body = y >= 30 && y <= 88 && Math.abs(x - bodyEdge.center) < bodyEdge.half;
  const rightEdge = bodyEdge.center + bodyEdge.half;
  const edgeMist = y >= 18 && y <= 76 && x > rightEdge && x < rightEdge + 16 && random < 0.11 - (x - rightEdge) * 0.004;

  if (!cap && !rim && !body && !edgeMist) return null;

  const leftShadow = x < bodyEdge.center - bodyEdge.half * 0.38 ? 0.24 : 0;
  const edgeShadow = body && Math.abs(Math.abs(x - bodyEdge.center) - bodyEdge.half) < 2.2 ? 0.18 : 0;
  const rimShadow = rim ? 0.28 : 0;
  const capShadow = cap && x < 43 ? 0.18 : 0;
  const rightFade = x > bodyEdge.center + bodyEdge.half * 0.34 ? -0.18 : 0;
  const baseOpacity = edgeMist
    ? 0.2 + random * 0.22
    : Math.max(0.32, Math.min(0.76, 0.42 + leftShadow + edgeShadow + rimShadow + capShadow + rightFade + random * 0.16));

  return {
    baseOpacity,
    peakOpacity: Math.min(1, baseOpacity + 0.24),
    isCore: body && x > 38 && x < 56 && y > 38 && y < 68,
    isEdge: edgeMist,
  };
}

export function CodeCupVisual({ isBrewing = false, isComplete = false }: CodeCupVisualProps) {
  const points = useMemo(() => {
    const rows = 54;
    const cols = 36;
    const nextPoints = [];

    for (let row = 0; row < rows; row += 1) {
      for (let col = 0; col < cols; col += 1) {
        const seed = row * 101 + col * 17 + 7;
        const jitterX = (seededRandom(seed + 1) - 0.5) * 1.15;
        const jitterY = (seededRandom(seed + 2) - 0.5) * 0.9;
        const x = 16 + (col / (cols - 1)) * 70 + jitterX;
        const y = 12 + (row / (rows - 1)) * 78 + jitterY;
        const point = getCodeCupPoint(x, y, seed);

        if (!point) continue;

        const densityGate = point.isEdge ? 0.74 : point.isCore ? 0.05 : 0.18;
        if (seededRandom(seed + 3) < densityGate) continue;
        if (nextPoints.length > 690) break;

        const token = TOKENS[Math.floor(seededRandom(seed + 4) * TOKENS.length)];

        nextPoints.push({
          ...point,
          token,
          x,
          y,
          seed,
          tokenSize: 6.2 + seededRandom(seed + 8) * (token.length > 1 ? 1.4 : 4.6),
        });
      }
    }

    return nextPoints;
  }, []);

  return (
    <div className={`code-cup-visual${isBrewing ? " is-brewing" : ""}${isComplete ? " is-complete" : ""}`} aria-label="Code characters forming a Time Slice Coffee cup">
      <div className="code-cup-field" aria-hidden="true">
        {points.map((point) => (
          <span
            className={`code-token${point.token.length <= 1 ? " is-dot" : ""}${point.isCore ? " is-core" : ""}${point.isEdge ? " is-edge" : ""}`}
            key={`${point.seed}-${point.token}`}
            style={
              {
                "--x": point.x.toFixed(2),
                "--y": point.y.toFixed(2),
                "--base-opacity": point.baseOpacity.toFixed(2),
                "--peak-opacity": point.peakOpacity.toFixed(2),
                "--delay": `${(seededRandom(point.seed + 5) * -5).toFixed(2)}s`,
                "--duration": `${(2 + seededRandom(point.seed + 6) * 3).toFixed(2)}s`,
                "--drift": `${(0.45 + seededRandom(point.seed + 7) * 1.55).toFixed(2)}px`,
                "--token-size": `${point.tokenSize.toFixed(2)}px`,
              } as CSSProperties
            }
          >
            {point.token}
          </span>
        ))}
      </div>
      <div className="code-cup-scan" aria-hidden="true" />
      <div className="code-cup-status" aria-hidden="true">
        <span>Extracting signal...</span>
        <span>Rewriting value...</span>
        <span>Brewing your slice...</span>
      </div>
      <div className="code-cup-label" aria-hidden="true">
        <span>TIME SLICE COFFEE</span>
        <strong>#024</strong>
        <small>Today&apos;s Information Slice.</small>
      </div>
    </div>
  );
}
