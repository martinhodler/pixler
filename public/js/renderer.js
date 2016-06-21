class Renderer {

  constructor() {
    this.cellSize = 16;
    this.pointStart = new Point(0, 0);
  }

  drawCells(ctx, cells) {
    for (var y = 0; y < cells.length; y++) {
      for (var x = 0; x < cells[y].length; x++) {
        ctx.fillStyle = cells[y][x];
        ctx.fillRect(this.pointStart.x + (x * this.cellSize), this.pointStart.y + (y * this.cellSize), this.cellSize, this.cellSize);
      }
    }
  }

  drawPalette(ctx, palette) {
    for (var y = 0; y < palette.height; y++) {
      for (var x = 0; x < palette.width; x++) {
        ctx.fillStyle = palette.colors[y * palette.width + x];
        ctx.fillRect(this.pointStart.x + (x * this.cellSize), this.pointStart.y + (y * this.cellSize), this.cellSize, this.cellSize);
      }
    }
  }

  drawGrid(ctx, size) {

    var pointEnd = { x: this.pointStart.x + (this.cellSize * size.width), y: this.pointStart.y + (this.cellSize * size.height) };

    ctx.strokeStyle = "#444";
    ctx.lineWidth = 1;

    ctx.beginPath();
    for (var y = 0; y < size.height + 1; y++) {
        ctx.moveTo(this.pointStart.x, this.pointStart.y + y * this.cellSize);
        ctx.lineTo(pointEnd.x, this.pointStart.y + y * this.cellSize);
    }

    for (var x = 0; x < size.width + 1; x++) {
        ctx.moveTo(this.pointStart.x + x * this.cellSize, this.pointStart.y);
        ctx.lineTo(this.pointStart.x + x * this.cellSize, pointEnd.y);
    }
    ctx.stroke();
  }

  drawBrush(ctx, brush) {

    ctx.fillStyle = brush.color;
    ctx.fillRect(this.pointStart.x + (brush.position.x * this.cellSize) + 4, this.pointStart.y + (brush.position.y * this.cellSize) + 4, this.cellSize - 8, this.cellSize - 8);


  }

  drawSelection(ctx, position) {
    ctx.strokeStyle = "#fff";
    ctx.lineWidth = 2;
    ctx.strokeRect(this.pointStart.x + (position.x * this.cellSize), this.pointStart.y + (position.y * this.cellSize), this.cellSize, this.cellSize);
  }

}
