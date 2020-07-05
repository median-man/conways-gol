class Conway {
  static create(width, height) {
    return new Conway(Array(width * height).fill(false), width, height);
  }
  constructor(values, width, height) {
    this.width = width;
    this.height = height;
    this.values = values;
  }
  next() {
    const values = [];
    for (let i = 0; i < this.values.length; i += 1) {
      const neighbors = this.countAliveNeighborsAt(i);
      if (neighbors < 2 || neighbors > 3) {
        values.push(false);
      } else if (neighbors === 2) {
        values.push(this.values[i]);
      } else {
        values.push(true);
      }
    }
    return new Conway(values, this.width, this.height);
  }
  countAliveNeighborsAt(index) {
    const y = Math.floor(index / this.width);
    const x = index % this.width;
    let count = 0;
    for (let currentY = y - 1; currentY <= y + 1; currentY += 1) {
      for (let currentX = x - 1; currentX <= x + 1; currentX += 1) {
        if (this.valueAt(currentX, currentY)) {
          count += 1;
        }
      }
    }
    // remove count for subject cell cell
    if (this.valueAt(x, y)) {
      count -= 1;
    }
    return count;
  }
  valueAt(x, y) {
    if (x < 0 || y < 0 || y >= this.height || x >= this.width) {
      return;
    }
    const index = y * this.width + x;
    return this.values[index];
  }
}

export { Conway };
