import { GridView } from "./modules/grid-view.js";
import {
  createNextButton,
  createRandomButton,
  createResetButton,
  createPlayButton,
  createPauseButton,
  createBackButton,
} from "./modules/button.js";
import { createElement } from "./modules/dom-util.js";
import { Conway } from "./modules/conway.js";

let intervalId;
let isPlaying = false;
let playBtn;
let pauseBtn;
const height = 10;
const width = 8;
const conway = Conway.create(width, height);
const gridView = GridView.create(document.body, {
  height,
  width,
  values: conway.values,
});
const history = [conway.values.slice(0)];

initControls();

function initControls() {
  playBtn = createPlayButton("play");
  pauseBtn = createPauseButton("play");
  pauseBtn.classList.toggle("hide");
  const buttons = [
    playBtn,
    pauseBtn,
    createNextButton("next"),
    createBackButton("back"),
    createRandomButton("random"),
    createResetButton("reset"),
  ];
  const controls = createElement("DIV", {
    attr: { class: "controls" },
    children: buttons,
  });
  document.body.appendChild(controls);

  document.addEventListener("click", (event) => {
    if (event.target.value === "random") {
      randomGrid();
    }
    if (event.target.value === "next") {
      nextGrid();
    }
    if (event.target.value === "reset") {
      reset();
    }
    if (event.target.value === "play") {
      togglePlaying();
    }
    if (event.target.value === "back") {
      back();
    }
  });
}

function randomGrid() {
  if (isPlaying) {
    togglePlaying();
  }
  const values = conway.values.map(() => Math.floor(Math.random() < 0.5));
  history.push(values.slice(0));
  gridView.values = values;
}

function nextGrid() {
  const values = gridView.values;
  history.push(values.slice(0));
  gridView.values = new Conway(values, width, height).next().values;
}

function reset() {
  if (isPlaying) {
    togglePlaying();
  }
  history.push(conway.values.slice(0))
  gridView.values = conway.values;
}

function togglePlaying() {
  clearInterval(intervalId);
  isPlaying = !isPlaying;
  playBtn.classList.toggle("hide");
  pauseBtn.classList.toggle("hide");
  if (isPlaying) {
    intervalId = setInterval(() => {
      nextGrid();
    }, 500);
  }
}

function back() {
  if (!isPlaying && history.length > 0) {
    gridView.values = history.pop();
  }
}
