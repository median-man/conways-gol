import { createElement } from "./dom-util.js";
class GridView {
  static create(parentNode, state) {
    return new GridView(parentNode, state);
  }
  constructor(parentNode, { values, height, width }) {
    if (values.length !== height * width) {
      throw new Error("Invalid height/width");
    }
    this.parentNode = parentNode;
    this.height = height;
    this.width = width;
    this.checkboxes = values.map(createCheckbox);
    this.init();
  }
  init() {
    const rows = [];
    for (let rowIndex = 0; rowIndex < this.height; rowIndex += 1) {
      const start = rowIndex * this.width;
      const end = start + this.width;
      const children = this.checkboxes.slice(start, end);
      rows.push(createRow(children));
    }
    this.parentNode.append(createGrid(rows));
  }
  get values() {
    return this.checkboxes.map((input) => input.checked);
  }
  set values(values) {
    if (values.length !== this.checkboxes.length) {
      throw new Error("Count of values and checkboxes must be the same.");
    }
    for (let i = 0; i < this.checkboxes.length; i += 1) {
      this.checkboxes[i].checked = values[i];
    }
  }
}

function createGrid(children) {
  const attr = { class: "grid" };
  return createElement("DIV", { children, attr });
}

function createRow(children) {
  const attr = { class: "row" };
  return createElement("DIV", { children, attr });
}

function createCheckbox(scale) {
  const attr = { class: "cell", type: "checkbox" };
  return createElement("INPUT", { attr });
}

export { GridView };

// Example Usage:
// const gridView = GridView.create(document.body, {
//   values: Array(25).fill(0),
//   height: 5,
//   width: 5,
// });
// // print array of checkbox values
// console.log(gridView.values);

// // checks all checkboxes
// gridView.values = Array(25).fill(1);
