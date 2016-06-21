var Pixler = new (function Pixler() {

    this.readyHandler = [];

    this.imgSize = { width: 16, height: 16 };
    this.cells = [];
    this.imgStart = { x: 0, y: 0 };
    this.imgEnd = { x: 0, y: 0 };

    this.canvasOffset = { x: 0, y: 0 };
    this.brushPos = { x: 0, y: 0 };


    this.palettePos = { x: 0, y: 0 };
    this.paletteSize = { width: 8, height: 16 };

    this.cellSize = 1;
    this.editor = undefined;
    this.palette = undefined;
    this.preview = undefined;
    this.ctx = undefined;
    this.ctxPalette = undefined;

    this.brushActive = false;

    this.ready = function(callback) {
      this.readyHandler.push(callback);
    }

    this.setSize = function(width, height) {

      this.imgSize.width = width;
      this.imgSize.height = height;
      this.cells = new Array(height);

      for (var y = 0; y < height; y++) {
        this.cells[y] = new Array(width);
        for (var x = 0; x < width; x++) {
          this.cells[y][x] = "transparent";
        }
      }

      this.resize();
      this.draw();
    };

    this.setPaletteSize = function(width, height) {
      this.paletteSize.width = width;
      this.paletteSize.height = height;
      this.paletteCells = new Array(height);

      for (var y = 0; y < height; y++) {
        this.paletteCells[y] = new Array(width);
        for (var x = 0; x < width; x++) {
          this.paletteCells[y][x] = "transparent";
        }
      }

      this.drawPalette();
    };


    this.translate = function() {
      var offsetX = this.canvasOffset.x + ((this.editor.width / 2) - this.canvasOffset.x);
      var offsetY = this.canvasOffset.y + ((this.editor.height / 2) - this.canvasOffset.y);

      this.canvasOffset.x = offsetX;
      this.canvasOffset.y = offsetY;
    };

    this.resize = function() {
        if (this.editor !== undefined) {
            var parent = this.editor.parentElement;

            var width = parent.clientWidth;
            var height = parent.clientHeight;

            this.editor.width = width;
            this.editor.height = height;

            if (this.editor.width > this.editor.height) {
              this.cellSize = this.editor.height / (this.imgSize.height + 2);
            } else {
              this.cellSize = this.editor.width / (this.imgSize.width + 2);
            }

            this.imgStart = { x: -(this.imgSize.width / 2) * this.cellSize, y: -(this.imgSize.height / 2) * this.cellSize };
            this.imgEnd = { x: (this.imgSize.width / 2) * this.cellSize, y: (this.imgSize.height / 2) * this.cellSize };

            this.translate();
        }

        if (this.palette !== undefined) {
          var parent = this.palette.parentElement;

          var width = parent.clientWidth;
          var height = parent.clientHeight;

          this.palette.width = width;
          this.palette.height = height;
        }

        this.draw();
        this.drawPalette();
    };


    this.keyDown = function(e) {

      var key = e.keyCode | e.key;

      switch (key) {
        case 87: // up (W)
          this.brushPos.y -= 1;
          if (this.brushPos.y < 0) this.brushPos.y = this.imgSize.height - 1;
          this.draw();
          break;
        case 83: // down (S)
          this.brushPos.y += 1;
          if (this.brushPos.y >= this.imgSize.height) this.brushPos.y = 0;
          this.draw();
          break;
        case 65: // left (A)
          this.brushPos.x -= 1;
          if (this.brushPos.x < 0) this.brushPos.x = this.imgSize.width - 1;
          this.draw();
          break;
        case 68: // right (D)
          this.brushPos.x += 1;
          if (this.brushPos.x >= this.imgSize.width) this.brushPos.x = 0;
          this.draw();
          break;

        case 38: // up
          this.palettePos.y -= 1;
          if (this.palettePos.y < 0) this.palettePos.y = 15;
          this.drawPalette();
          break;
        case 40: // down
          this.palettePos.y += 1;
          if (this.palettePos.y >= 16) this.palettePos.y = 0;
          this.drawPalette();
          break;
        case 37: // left
          this.palettePos.x -= 1;
          if (this.palettePos.x < 0) this.palettePos.x = 7;
          this.drawPalette();
          break;
        case 39: // right
          this.palettePos.x += 1;
          if (this.palettePos.x >= 8) this.palettePos.x = 0;
          this.drawPalette();
          break;

        case 32: // space
          this.brushActive = true;
          this.eraserActivate = false;
          break;
        case 16: // shift
          this.eraserActivate = true;
          this.brushActive = false;
          break;
      }

      if (this.brushActive) {
        this.setPixel(this.brushPos.x, this.brushPos.y, this.paletteCells[this.palettePos.y][this.palettePos.x]);
      }
      if (this.eraserActivate) {
        this.setPixel(this.brushPos.x, this.brushPos.y, "transparent");
      }

    };

    this.keyUp = function(e) {
      var key = e.keyCode | e.key;

      switch (key) {
        case 32:
          this.brushActive = false;
          break;
        case 16:
          this.eraserActivate = false;
          break;
      }
    }

    this.setPixel = function(x, y, color) {
      this.cells[y][x] = color;
      this.draw();
    }

    this.save = function(link) {
      this.preview.width = this.imgSize.width;
      this.preview.height = this.imgSize.height;

      var ctx = this.preview.getContext('2d');

      for (var y = 0; y < this.imgSize.height; y++) {
        for (var x = 0; x < this.imgSize.width; x++) {
          ctx.fillStyle = this.cells[y][x];
          ctx.fillRect(x, y, 1, 1);
        }
      }

      link.href = this.preview.toDataURL();
      link.download = "pixler.png";
    }


    /*
     *  DRAW LOGIC
     */

    this.draw = function() {
      this.editor.width = this.editor.width;
      this.ctx.translate(this.canvasOffset.x, this.canvasOffset.y);

      this.drawPixels(this.ctx, this.imgStart, this.imgSize, this.cells, this.cellSize);
      this.drawGrid(this.ctx, this.imgStart, this.imgSize, this.cellSize);
      this.drawBrush(this.ctx, this.brushPos, this.imgStart, this.cellSize);
    };

    this.drawPalette = function() {
      this.palette.width = this.palette.width;
      var size = { width: 8, height: 16 };
      var start = { x: 0, y: 0 };

      this.drawPixels(this.ctxPalette, start, this.paletteSize, this.paletteCells, 16);
      this.drawGrid(this.ctxPalette, start, this.paletteSize, 16);
      this.drawBrush(this.ctxPalette, this.palettePos, { x: 0, y: 0 }, 16);

      this.draw();
    }

    this.drawPixels = function(ctx, start, size, cells, cellSize) {
      for (var y = 0; y < size.height; y++) {
        for (var x = 0; x < size.width; x++) {
          ctx.fillStyle = cells[y][x];
          ctx.fillRect(start.x + (x * cellSize), start.y + (y * cellSize), cellSize, cellSize);
        }
      }

    };

    this.drawGrid = function(ctx, start, size, cellSize) {

      end = { x: start.x + (cellSize * size.width), y: start.y + (cellSize * size.height) };

      ctx.strokeStyle = "#444";
      ctx.lineWidth = 1;

      ctx.beginPath();
      for (var y = 0; y < size.height + 1; y++) {
          ctx.moveTo(start.x, start.y + y * cellSize);
          ctx.lineTo(end.x, start.y + y * cellSize);
      }

      for (var x = 0; x < size.width + 1; x++) {
          ctx.moveTo(start.x + x * cellSize, start.y);
          ctx.lineTo(start.x + x * cellSize, end.y);
      }
      ctx.stroke();
    }


    this.drawBrush = function(ctx, brushPos, start, cellSize) {

      if (this.paletteCells !== undefined) {
        ctx.fillStyle = this.paletteCells[this.palettePos.y][this.palettePos.x];
        ctx.fillRect(start.x + (brushPos.x * cellSize) + 4, start.y + (brushPos.y * cellSize) + 4, cellSize - 8, cellSize - 8);
      }
      ctx.strokeStyle = "#fff";
      ctx.lineWidth = 2;
      ctx.strokeRect(start.x + (brushPos.x * cellSize), start.y + (brushPos.y * cellSize), cellSize, cellSize);

    };

    this.init = function() {
      var win = nw.Window.get();
      win.width = 800;
      win.height = 600;

      this.editor = new EditorView('pixler-editor');
      this.palette = new PaletteView('pixler-editor-palette');

      this.brush = new Brush(0, 0, "transparent");

      this.palette.setBrush(this.brush);
      this.editor.setBrush(this.brush);

      this.palette.draw();

/*
      this.editor = document.getElementById('pixler-editor');
      this.palette = document.getElementById('pixler-editor-palette');
      this.preview = document.getElementById('pixler-editor-preview');
      this.preview.style.display = "none";

      var pixler = this;
      var saveLink = document.getElementById('pixler-editor-save');
      saveLink.addEventListener('click', function() { pixler.save(saveLink); }, false);

      this.ctx = this.editor.getContext('2d');
      this.ctxPalette = this.palette.getContext('2d');

      window.addEventListener("resize", function() { this.resize(); }, false);
      window.addEventListener("keydown", function(e) { this.keyDown(e); }, false);
      window.addEventListener("keyup", function(e) { this.keyUp(e); }, false);

      this.setSize(16, 16);
      this.setPaletteSize(8, 16);
      this.draw();
*/
      this.readyHandler.forEach(function(cb) {
        cb();
      });
    };

})();

window.addEventListener("load", function() { Pixler.init(); }, false);
