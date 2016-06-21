class CanvasView {

  constructor(canvasID) {
    this.canvas = document.getElementById(canvasID);
    this.parent = this.canvas.parentElement;
    this.context2D = this.canvas.getContext('2d');

    this.renderer = new Renderer();

    let that = this;
    window.addEventListener('resize', function() { that.resize(); }, false);
    KeyHandler.register(function(down, key) { that.key(down, key); });
  }

  resize() {
    var width = this.parent.clientWidth;
    var height = this.parent.clientHeight;

    this.canvas.width = width;
    this.canvas.height = height;

    this.draw();
  }

  draw() { }

  key(down, key) { }

}
