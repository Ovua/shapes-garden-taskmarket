export const SHAPES = ["circle","square","triangle"];
export const COLOURS = ["red","blue","yellow"];
export const COUNTS = [1,2,3];

export const same = (a,b) => String(a) === String(b);

export function nextCountSequence(n){
  const x = Number(n);
  if(!COUNTS.includes(x)) throw new Error("count must be 1, 2, or 3");
  return Array.from({length:x},(_,i)=>i+1);
}

export function sortRule(item, mode){
  if(!["shape","colour"].includes(mode)) throw new Error("invalid sort mode");
  return item[mode];
}
