export class Matrix {
  static create(width, height, initValue = () => 0) {
    const values = Array(height)
      .fill()
      .map((_, y) =>
        Array(width)
          .fill(0)
          .map((_, x) => (initValue(x, y) ? 1 : 0))
      );
    return new Matrix(values);
  }

  constructor(values) {
    this.values = values;
  }
  get height() {
    return this.values.length;
  }
  get width() {
    return this.values[0].length;
  }

  map(cb) {
    return this.values.map(cb);
  }
  forEach(cb) {
    return this.values.forEach(cb);
  }
  isAlive(x, y) {
    if (this.values[y]) {
      return this.values[y][x] === 1;
    }
    return false;
  }
  toggleCell(x, y) {
    this.values[y][x] = this.isAlive(x, y) ? 0 : 1;
  }
  setValueAt(x, y, value) {
    if (this.values[y]) {
      this.values[y][x] = value;
    }
  }
  clear() {
    return Matrix.create(this.width, this.height);
  }

  random() {
    return Matrix.create(this.width, this.height, () => Math.random() < 0.5);
  }
  next() {
    const prevMatrix = this;
    const nextMatrix = new Matrix([...this.values.map((r) => [...r])]);
    const maxY = prevMatrix.values.length;
    const maxX = prevMatrix.values[0].length;
    for (let y = 0; y < maxY; y += 1) {
      for (let x = 0; x < maxX; x += 1) {
        const liveNeighbors = prevMatrix.countLiveNeighborsAt(x, y);
        let value = 0;
        if (liveNeighbors === 3) {
          value = 1;
        } else if (liveNeighbors === 2) {
          value = prevMatrix.isAlive(x, y) ? 1 : 0;
        }
        nextMatrix.setValueAt(x, y, value);
      }
    }
    return nextMatrix;
  }
  countLiveNeighborsAt(x, y) {
    const neighborCells = [
      // row above
      [x - 1, y - 1],
      [x, y - 1],
      [x + 1, y - 1],

      // left and right
      [x - 1, y],
      [x + 1, y],

      // row below
      [x - 1, y + 1],
      [x, y + 1],
      [x + 1, y + 1],
    ];
    return neighborCells.filter((pos) => this.isAlive(...pos)).length;
  }
}
