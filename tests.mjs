import assert from "node:assert/strict";
import fs from "node:fs";
import { SHAPES, COLOURS, COUNTS, same, nextCountSequence, sortRule } from "./logic.js";

let n=0;
const t=(name,fn)=>{fn();n++;console.log("✓",name)};

t("required shapes only",()=>assert.deepEqual(SHAPES,["circle","square","triangle"]));
t("three colours",()=>assert.equal(COLOURS.length,3));
t("counts 1-3",()=>assert.deepEqual(COUNTS,[1,2,3]));
t("same matches strings",()=>assert.equal(same(2,"2"),true));
t("count 3 sequence",()=>assert.deepEqual(nextCountSequence(3),[1,2,3]));
t("sort by shape",()=>assert.equal(sortRule({shape:"triangle",colour:"red"},"shape"),"triangle"));
t("sort by colour",()=>assert.equal(sortRule({shape:"triangle",colour:"red"},"colour"),"red"));

const html=fs.readFileSync("index.html","utf8");
const css=fs.readFileSync("styles.css","utf8");
const app=fs.readFileSync("app.js","utf8");

t("three activities present",()=>["shapeActivity","sortActivity","countActivity"].forEach(x=>assert.ok(html.includes(x))));
t("mute control present",()=>assert.ok(html.includes("soundToggle")));
t("visual live feedback present",()=>assert.ok(html.includes('aria-live="polite"')));
t("speech starts only from interaction paths",()=>assert.ok(app.includes("speechSynthesis")));
t("tap alternative sorting",()=>assert.ok(app.includes('b.addEventListener("click"')));
t("64px minimum controls",()=>assert.ok(css.includes("min-height:64px")&&css.includes("min-width:64px")));
t("reduced motion",()=>assert.ok(css.includes("prefers-reduced-motion")));
t("responsive breakpoint",()=>assert.ok(css.includes("@media(max-width:760px)")));

console.log(`GARDEN_TESTS_OK ${n}`);
