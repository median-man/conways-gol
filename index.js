import { Matrix } from "./modules/matrix.js";
import { DOMDisplay } from "./modules/dom-display.js";
const matrix = Matrix.create(10, 10);
const display = DOMDisplay.create(document.body, matrix);
