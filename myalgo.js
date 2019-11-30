const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const boxSize = 40; //size of one box or resolution
const ROWS = 25;
const COLS = 15;
var canvas_height = ROWS*boxSize;
var canvas_width = COLS*boxSize;

canvas.height = canvas_height;
canvas.width = canvas_width;

function buildGrid(x){//takes parameter 1 if random data 
	if(x==1){
		return new Array(COLS).fill(null)
		.map(() => new Array(ROWS).fill(null)
			.map(() => Math.floor(Math.random() * 2)));
	}else{
		return new Array(COLS).fill(null)
		.map(() => new Array(ROWS).fill(0));
	}
	
}

var grid = buildGrid(0);//building grid of 0

console.log(grid);

// function drawBox() {
// 	ctx.beginPath();
// 	ctx.fillStyle = "white";
// 	ctx.lineWidth = 3;
// 	ctx.strokeStyle = 'black';
// 	for (var row = 0; row < ROWS; row++) {
// 		for (var column = 0; column < COLS; column++) {
// 			var x = column * boxSize;
// 			var y = row * boxSize;
// 			ctx.rect(x, y, boxSize, boxSize);
// 			ctx.fill();
// 			ctx.stroke();
// 		}
// 	}
// 	ctx.closePath();
// }
// drawBox();


