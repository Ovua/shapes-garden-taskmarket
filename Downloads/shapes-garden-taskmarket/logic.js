export const SHAPES=["circle","square","triangle","star"];
export const COLOURS=["red","blue","yellow","green"];
export const normaliseWord=v=>String(v??"").trim().toLowerCase();
export const isMatch=(a,b)=>normaliseWord(a)===normaliseWord(b);
export const clampScore=(score,total)=>Math.min(Math.max(0,Number(score)||0),Math.max(0,Number(total)||0));
export function completionMessage(score,total){if(total<=0)return "Ready to play!";const r=score/total;if(r===1)return "Perfect garden! 🌟";if(r>=.7)return "Brilliant sorting! 🌼";if(r>=.4)return "Great growing! 🌱";return "Keep exploring! 🐞";}
