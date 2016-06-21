class Brush {
  constructor(x, y, color) {
    this._position = new Point(x, y);
    this._color = color;
    this.isPainting = false;
    this.isErasing = false;

    this.changeListener = [];
  }

  onChange(callback) {
    listeners.push(callback);
  }

  change(element) {
    listeners.forEach(function(cb) {
      cb(element);
    });
  }

  get position() { return this._position; }
  set position(value) { this._position = value; this.change('position'); }

  get color() { return this._color; }
  set color(value) { this._color = value; this.change('color'); }


}
