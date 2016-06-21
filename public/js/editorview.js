class EditorView extends CanvasView {

  constructor(canvasID) {
    super(canvasID);

    this.brush = undefined;
    this.offset = new Point(0, 0);
    this.size = new Size(16, 16);
    this.cells = [];
    this.initCells();
  }

  initCells() {
    this.cells = new Array(this.size.height);

    for (var y = 0; y < this.size.height; y++) {
      this.cells[y] = new Array(this.size.width);

      for (var x = 0; x < this.size.width; x++) {
        this.cells[y][x] = "transparent";
      }
    }
  }

  key(down, key) {
    if (this.brush === undefined)
      return;

    if (down) {
      switch (key) {
        case "W":
          this.brush.position.y -= 1;
          if (this.brush.position.y < 0)
            this.brush.position.y = this.size.height - 1;
          break;
        case "S":
          this.brush.position.y += 1;
          if (this.brush.position.y >= this.size.height)
            this.brush.position.y = 0;
          break;
        case "A":
          this.brush.position.x -= 1;
          if (this.brush.position.x < 0)
            this.brush.position.x = this.size.width - 1;
          break;
        case "D":
          this.brush.position.x += 1;
          if (this.brush.position.x >= this.size.width)
            this.brush.position.x = 0;
          break;
        case "SPACE":
          this.brush.isPainting = true;
          break;
        case "SHIFT":
          this.brush.isErasing = true;
          break;
      }
    } else {
      switch (key) {
        case "SPACE":
          this.brush.isPainting = false;
          break;
        case "SHIFT":
          this.brush.isErasing = false;
          break;
      }
    }

    if (this.brush.isPainting) this.paint();
    if (this.brush.isErasing) this.erase();
  }

  setBrush(brush) {
    this.brush = brush;

    let that = this;
    this.brush.onChange(function() { that.draw(); })
  }

  paint() {
    this.cells[this.brush.position.y][this.brush.position.x] = this.brush.color;
  }

  erase() {
    this.cells[this.brush.position.y][this.brush.position.x] = "transparent";
  }

  draw() {
    this.canvas.width = this.canvas.width;

    var sizex = this.canvas.width / (this.size.width + 2);
    var sizey = this.canvas.height / (this.size.height + 2);

    var size = Math.min(sizex, sizey);
    this.renderer.cellSize = size;
    this.renderer.pointStart = new Point((this.canvas.width - ((this.size.width) * size)) / 2, (this.canvas.height - ((this.size.height) * size)) / 2);

    this.renderer.drawCells(this.context2D, this.cells);
    this.renderer.drawGrid(this.context2D, this.size);
    this.renderer.drawBrush(this.context2D, this.brush);
    this.renderer.drawSelection(this.context2D, this.brush.position);
  }

}
