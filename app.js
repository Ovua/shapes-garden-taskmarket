import { SHAPES, COLOURS, COUNTS, same, nextCountSequence, sortRule } from "./logic.js";

const $ = (s,r=document)=>r.querySelector(s);
const $$ = (s,r=document)=>[...r.querySelectorAll(s)];
let soundOn = true;

function speak(text){
  if(!soundOn || !("speechSynthesis" in window)) return;
  speechSynthesis.cancel();
  speechSynthesis.speak(new SpeechSynthesisUtterance(text));
}
function feedback(el, ok, good, retry){
  el.className = "feedback " + (ok ? "good" : "try");
  el.textContent = ok ? good : retry;
  speak(el.textContent);
}

$("#soundToggle").addEventListener("click",e=>{
  soundOn = !soundOn;
  e.currentTarget.setAttribute("aria-pressed", String(soundOn));
  e.currentTarget.textContent = soundOn ? "🔊 Sound on" : "🔇 Sound off";
});
$("#resetAll").addEventListener("click",()=>location.reload());

/* Shape matching */
let shapeTarget = SHAPES[Math.floor(Math.random()*SHAPES.length)];
const target = $("#shapeTarget");
target.innerHTML = `<span class="shape ${shapeTarget}" aria-hidden="true"></span>`;
target.setAttribute("aria-label", `Target shape: ${shapeTarget}`);
$(".shape-choice").focus?.();

$$(".shape-choice").forEach(btn=>btn.addEventListener("click",()=>{
  const ok = same(btn.dataset.shape, shapeTarget);
  feedback($("#shapeFeedback"), ok, "Yes! That matches.", "Good try. Look at the garden sign and try again.");
}));

/* Sorting */
let sortMode = "shape";
let selectedItem = null;
const items = [
  {id:"i1",shape:"circle",colour:"red",symbol:"●",colourWord:"Red"},
  {id:"i2",shape:"square",colour:"blue",symbol:"■",colourWord:"Blue"},
  {id:"i3",shape:"triangle",colour:"yellow",symbol:"▲",colourWord:"Yellow"}
];

function renderSort(){
  const itemBox = $("#sortItems");
  const basketBox = $("#sortBaskets");
  itemBox.innerHTML = "";
  basketBox.innerHTML = "";
  selectedItem = null;

  items.forEach(item=>{
    const b=document.createElement("button");
    b.className="sort-item";
    b.dataset.id=item.id;
    b.dataset.shape=item.shape;
    b.dataset.colour=item.colour;
    b.setAttribute("aria-label", `${item.colourWord} ${item.shape}`);
    b.innerHTML = `<span aria-hidden="true">${item.symbol}</span> <span>${item.colourWord}</span>`;
    b.addEventListener("click",()=>{
      $$(".sort-item").forEach(x=>x.classList.remove("selected"));
      b.classList.add("selected");
      selectedItem=item;
      $("#sortFeedback").textContent="Now choose a basket.";
      speak("Now choose a basket.");
    });
    itemBox.appendChild(b);
  });

  const groups = sortMode==="shape" ? SHAPES : COLOURS;
  groups.forEach(group=>{
    const b=document.createElement("button");
    b.className="basket";
    b.dataset.group=group;
    b.innerHTML = `<strong>${group}</strong><br><span>basket</span>`;
    b.addEventListener("click",()=>{
      if(!selectedItem){
        feedback($("#sortFeedback"), false, "", "Choose an item first.");
        return;
      }
      const ok = same(sortRule(selectedItem, sortMode), group);
      if(ok){
        const el = $(`.sort-item[data-id="${selectedItem.id}"]`);
        if(el) el.remove();
        feedback($("#sortFeedback"), true, "That belongs there. Nice sorting!", "");
        selectedItem = null;
      }else{
        feedback($("#sortFeedback"), false, "", "Almost. Try another basket.");
      }
    });
    basketBox.appendChild(b);
  });
}
$$(".mode-btn").forEach(btn=>btn.addEventListener("click",()=>{
  sortMode=btn.dataset.mode;
  $$(".mode-btn").forEach(x=>{x.classList.remove("selected");x.setAttribute("aria-pressed","false")});
  btn.classList.add("selected");btn.setAttribute("aria-pressed","true");
  $("#sortFeedback").textContent="";
  renderSort();
}));
renderSort();

/* Counting */
let countTarget = COUNTS[Math.floor(Math.random()*COUNTS.length)];
const seq = $("#countSequence");

function buildCount(){
  seq.innerHTML="";
  nextCountSequence(countTarget).forEach((n)=>{
    const d=document.createElement("div");
    d.className="count-dot";
    d.textContent="🌼";
    d.setAttribute("aria-label", `Flower ${n}`);
    seq.appendChild(d);
  });
}
function showCount(){
  const dots=$$(".count-dot",seq);
  dots.forEach(d=>d.classList.remove("active"));
  if(window.matchMedia("(prefers-reduced-motion: reduce)").matches){
    dots.forEach(d=>d.classList.add("active"));
    speak(`Count ${countTarget}`);
    return;
  }
  dots.forEach((d,i)=>setTimeout(()=>d.classList.add("active"), i*450));
  setTimeout(()=>speak(`Count ${countTarget}`), 120);
}
buildCount();
$("#showCount").addEventListener("click",showCount);
$$(".count-choice").forEach(btn=>btn.addEventListener("click",()=>{
  const ok = same(btn.dataset.count,countTarget);
  feedback($("#countFeedback"), ok, `Yes, ${countTarget}!`, "Good try. Count the flowers and try again.");
}));
