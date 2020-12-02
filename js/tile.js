// make these const
var ctx = document.getElementById("game").getContext("2d");
ctx.font = "bold 10pt sans serif"
var tileW = 25, tileH = 25;
//var mapW = 10, mapH = 10;
var mapW = 24, mapH = 8;

// var gameMap = [
//   0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
//   0, 1, 1, 1, 0, 1, 1, 1, 1, 0,
//   0, 1, 0, 0, 0, 1, 0, 0, 0, 0,
//   0, 1, 1, 1, 1, 1, 1, 1, 1, 0,
//   0, 1, 0, 1, 0, 0, 0, 1, 1, 0,
//   0, 1, 0, 1, 0, 1, 0, 0, 1, 0,
//   0, 1, 1, 1, 1, 1, 1, 1, 1, 0,
//   0, 1, 0, 0, 0, 0, 0, 1, 0, 0,
//   0, 1, 1, 1, 0, 1, 1, 1, 1, 0,
//   0, 0, 0, 0, 0, 0, 0, 0, 0, 0
// ];

var gameMap = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0],
  [0, 1, 0, 1, 0, 0, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0],
  [0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1, 1, 0, 0, 1, 0, 1, 1, 1, 0],
  [0, 1, 0, 1, 1, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];

function drawGame() {
  var sec = Math.floor(Date.now()/1000);
  if (sec!=currentSecond)  {
    currentSecond = sec;
    framesLastSecond = frameCount;
    frameCount = 1;
  }
  else { 
    frameCount++; 
  }
  for (var y = 0; y < mapH; y++) {
    for (var x = 0; x < mapW; x++) {
      switch(gameMap[y][x]) {
        case 0:
          ctx.fillStyle = "#999999";
          break;
        default:
          ctx.fillStyle = "#eeeeee";
      }
      ctx.fillRect(x*tileW,y*tileH,tileW,tileH);
    }
  }

  ctx.fillStyle = "#ff0000";
  ctx.fillText("FPS:" + framesLastSecond, 10, 20);

  requestAnimationFrame(drawGame)
}

requestAnimationFrame(drawGame)