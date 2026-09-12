export const SHAPES = ["circle", "square", "triangle", "star"];
export const COLOURS = ["red", "blue", "yellow", "green"];
export const normaliseWord = (v) =>
  String(v ?? "")
    .trim()
    .toLowerCase();
export const isMatch = (a, b) => normaliseWord(a) === normaliseWord(b);
export const clampScore = (score, total) =>
  Math.min(Math.max(0, Number(score) || 0), Math.max(0, Number(total) || 0));
export function completionMessage(score, total) {
  if (total <= 0) return "Ready to play!";
  const r = score / total;
  if (r === 1) return "Perfect";
  if (r >= 0.7) return "Brilliant";
  if (r >= 0.4) return "Great";
  return "Keep exploring";
}
