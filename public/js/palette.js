class Palette {

  constructor(fileName) {
    if (arguments.length > 0) {
      this.load(fileName);
    } else {
      this.name = "palette";
      this.width = 8;
      this.height = 16;
      this.colors = [];
    }
  }

  load(fileName) {
    var palette = require(fileName);

    this.name = palette.name;
    this.width = palette.width;
    this.height = palette.height;
    this.colors = palette.colors;
  }
}
