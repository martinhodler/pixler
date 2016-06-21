Pixler.paletteNES = function() {
  Pixler.paletteCells[0][3] = "#8B9296";
  Pixler.paletteCells[0][2] = "#C7CBCE";
  Pixler.paletteCells[0][1] = "#FDFAFD";
  Pixler.paletteCells[0][0] = "#FFFFFF";

  Pixler.paletteCells[1][3] = "#0532FD";
  Pixler.paletteCells[1][2] = "#008FFD";
  Pixler.paletteCells[1][1] = "#41CCFD";
  Pixler.paletteCells[1][0] = "#B1ECFD";

  Pixler.paletteCells[2][3] = "#0327D0";
  Pixler.paletteCells[2][2] = "#009DFD";
  Pixler.paletteCells[2][1] = "#7B9EFD";
  Pixler.paletteCells[2][0] = "#C8C7FD";

  Pixler.paletteCells[3][3] = "#5243CF";
  Pixler.paletteCells[3][2] = "#7D66FD";
  Pixler.paletteCells[3][1] = "#AD92FD";
  Pixler.paletteCells[3][0] = "#E4C7FD";

  Pixler.paletteCells[4][3] = "#A7259D";
  Pixler.paletteCells[4][2] = "#E637DC";
  Pixler.paletteCells[4][1] = "#FF94FD";
  Pixler.paletteCells[4][0] = "#FEC8FC";

  Pixler.paletteCells[5][3] = "#BD1B35";
  Pixler.paletteCells[5][2] = "#EC2873";
  Pixler.paletteCells[5][1] = "#FF73AC";
  Pixler.paletteCells[5][0] = "#F7CDE6";

  Pixler.paletteCells[6][3] = "#BC2200";
  Pixler.paletteCells[6][2] = "#FF5000";
  Pixler.paletteCells[6][1] = "#FF8E6B";
  Pixler.paletteCells[6][0] = "#F7D9C1";

  Pixler.paletteCells[7][3] = "#A02700";
  Pixler.paletteCells[7][2] = "#EC761E";
  Pixler.paletteCells[7][1] = "#FEAF59";
  Pixler.paletteCells[7][0] = "#FDE5C1";

  Pixler.paletteCells[8][3] = "#643F00";
  Pixler.paletteCells[8][2] = "#BB9200";
  Pixler.paletteCells[8][1] = "#FEC300";
  Pixler.paletteCells[8][0] = "#FDDE96";

  Pixler.paletteCells[9][3] = "#008700";
  Pixler.paletteCells[9][2] = "#00C000";
  Pixler.paletteCells[9][1] = "#C6F51C";
  Pixler.paletteCells[9][0] = "#E2F78B";

  Pixler.paletteCells[10][3] = "#007900";
  Pixler.paletteCells[10][2] = "#00B300";
  Pixler.paletteCells[10][1] = "#65DB6B";
  Pixler.paletteCells[10][0] = "#C2F68A";

  Pixler.paletteCells[11][3] = "#006900";
  Pixler.paletteCells[11][2] = "#00B35A";
  Pixler.paletteCells[11][1] = "#63F5AC";
  Pixler.paletteCells[11][0] = "#BCF2E0";

  Pixler.paletteCells[12][3] = "#00516B";
  Pixler.paletteCells[12][2] = "#0099A5";
  Pixler.paletteCells[12][1] = "#00EBEA";
  Pixler.paletteCells[12][0] = "#00F8FD";

  Pixler.paletteCells[13][3] = "#000000";
  Pixler.paletteCells[13][2] = "#292929";
  Pixler.paletteCells[13][1] = "#676767";
  Pixler.paletteCells[13][0] = "#D6CFCF";

  Pixler.paletteCells[14][3] = "#000000";
  Pixler.paletteCells[14][2] = "#000000";
  Pixler.paletteCells[14][1] = "#000000";
  Pixler.paletteCells[14][0] = "#000000";

  Pixler.paletteCells[15][3] = "#000000";
  Pixler.paletteCells[15][2] = "#000000";
  Pixler.paletteCells[15][1] = "#000000";
  Pixler.paletteCells[15][0] = "#000000";

  Pixler.drawPalette();
};

Pixler.ready(function() {
  Pixler.paletteNES();
});
