const SCALE = 30;
export class DOMDisplay {
  static create(parentNode, matrix) {
    return new DOMDisplay(parentNode, matrix);
  }

  constructor(parentNode, matrix) {
    this.matrix = matrix;
    this.checkboxes = matrix.map((row) => row.map(createCheckbox));
    this.update();
    this.initDom(parentNode);
  }

  initDom(parentNode) {
    const gridContainer = document.createElement("DIV");
    gridContainer.className = "grid";

    this.checkboxes.forEach((row, y) => {
      const rowEl = document.createElement("DIV");
      rowEl.className = "row";
      row.forEach((checkbox, x) => {
        checkbox.dataset.y = y;
        checkbox.dataset.x = x;
        rowEl.appendChild(checkbox);
      });
      gridContainer.appendChild(rowEl);
    });

    const wrapper = document.createElement("DIV");
    wrapper.style.width = `${SCALE * this.checkboxes[0].length}px`;
    wrapper.appendChild(gridContainer);
    wrapper.appendChild(createControls());

    wrapper.addEventListener("click", (event) => {
      if (event.target.value === "next") {
        this.matrix = this.matrix.next();
        this.update();
      } else if (event.target.value === "reset") {
        this.matrix = this.matrix.clear();
        this.update();
      } else if (event.target.value === "random") {
        this.matrix = this.matrix.random();
        this.update();
      }
    });

    wrapper.addEventListener("change", (event) => {
      const { x, y } = event.target.dataset;
      this.matrix.toggleCell(parseInt(x), parseInt(y));
    });

    parentNode.appendChild(wrapper);
  }

  values() {
    return this.checkboxes.map((row) =>
      row.map((checkbox) => (checkbox.checked ? 1 : 0))
    );
  }

  update() {
    for (let y = 0; y < this.checkboxes.length; y += 1) {
      for (let x = 0; x < this.checkboxes[y].length; x += 1) {
        this.checkboxes[y][x].checked = this.matrix.isAlive(x, y);
      }
    }
  }
}

function createCheckbox(val, x) {
  const el = document.createElement("INPUT");
  el.className = "cell";
  el.style = `width: ${SCALE}px; height: ${SCALE}px;`;
  el.type = "checkbox";
  return el;
}

function createControls() {
  const container = document.createElement("DIV");
  container.className = "controls";

  const buttons = [];
  buttons.push(createButtonEl({ text: "next", type: "next", value: "next" }));
  buttons.push(
    createButtonEl({
      text: "random",
      type: "default",
      value: "random",
    })
  );
  buttons.push(
    createButtonEl({
      text: "reset",
      type: "reset",
      value: "reset",
    })
  );

  buttons.forEach((b) => container.appendChild(b));

  return container;
}

function createButtonEl({ text, type, value }) {
  const el = document.createElement("BUTTON");
  el.classList = `btn btn_${type}`;
  el.value = value;
  el.textContent = text.toUpperCase();
  return el;
}
