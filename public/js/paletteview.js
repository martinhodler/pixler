class PaletteView extends CanvasView {

  constructor(id) {
    super(id);

    this.selection = new Point(0, 0);
    this.brush = undefined;
    this.palette = new Palette('./palettes/nes.json');
  }

  setBrush(brush) {
    this.brush = brush;
    this.brush.color = this.getSelectedColor();
  }

  key(down, key) {
    if (down) {
      var redraw = true;

      switch(key) {
        case "ARROW_UP":
          this.selection.y -= 1;
          if (this.selection.y < 0)
            this.selection.y = this.palette.height - 1;
          break;
        case "ARROW_DOWN":
          this.selection.y += 1;
          if (this.selection.y >= this.palette.height)
            this.selection.y = 0;
          break;
        case "ARROW_LEFT":
          this.selection.x -= 1;
          if (this.selection.x < 0)
            this.selection.x = this.palette.width - 1;
          break;
        case "ARROW_RIGHT":
          this.selection.x += 1;
          if (this.selection.x >= this.palette.width)
            this.selection.x = 0;
          break;
        default:
          redraw = false;
          break;
      }

      if (redraw) {
        this.brush.color = this.getSelectedColor();

        this.draw();
      }
    }
  }

  getSelectedColor() {
    return this.palette.colors[this.selection.y * this.palette.width + this.selection.x];
  }

  draw() {
    this.canvas.width = this.canvas.width;

    var sizex = this.canvas.width / this.palette.width;
    var sizey = this.canvas.height / this.palette.height;

    var blockSize = Math.floor(Math.min(sizex, sizey));
    this.renderer.cellSize = blockSize;

    this.renderer.drawPalette(this.context2D, this.palette);
    this.renderer.drawGrid(this.context2D, new Size(this.palette.width, this.palette.height));
    this.renderer.drawSelection(this.context2D, this.selection);
  }

}
