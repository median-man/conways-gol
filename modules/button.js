import { createElement } from "./dom-util.js";

export function createNextButton(value) {
  return createButton("next", "NEXT >>", value);
}

export function createRandomButton(value) {
  return createButton("default", "RANDOM", value);
}

export function createResetButton(value) {
  return createButton("reset", "RESET", value);
}

export function createPlayButton(value) {
  return createButton("play", "PLAY", value);
}

export function createPauseButton(value) {
  const btn = createButton("play", "PAUSE", value);
  btn.classList.add("btn_play__playing");
  return btn;
}

export function createBackButton(value) {
  return createButton("next", "<< BACK", value);
}

function createButton(type, text, value) {
  const attr = { class: `btn btn_${type}`, value };
  const children = [text];
  return createElement("BUTTON", { attr, children });
}
