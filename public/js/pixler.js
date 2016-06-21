var Pixler = new (function Pixler() {

    this.readyHandler = [];

    this.editor = undefined;
    this.palette = undefined;
    this.preview = undefined;

    this.ready = function(callback) {
      this.readyHandler.push(callback);
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

      this.readyHandler.forEach(function(cb) {
        cb();
      });
    };

})();

window.addEventListener("load", function() { Pixler.init(); }, false);
