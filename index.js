
gameoflife();
$('.control_panel').change(function(){
	gameoflife();
});

function gameoflife(){
	var GEN = 0;
	const canvas = document.querySelector('canvas');
	const ctx = canvas.getContext('2d');
var boxSize = parseInt($('input[name="resol"]').val());//resolution
const COLS = parseInt($('input[name="cols"]').val());// No. of Columns
const ROWS = parseInt($('input[name="rows"]').val());// No. of Rows
const MODE = $('select[name="mode"]').val();
canvas.width = COLS*boxSize;
canvas.height = ROWS*boxSize;
ctx.clearRect(0, 0,canvas.width, canvas.height);
let grid ;
if(MODE=="manual"){
	grid = buildGrid();
	canvas.addEventListener('click', handleClick);
	canvas.addEventListener('mousemove', handleClick);
}else{
	grid = buildGrid(1);
}
render(grid);
$('#startbutton').click(function(){
	grid = nextGen(grid);
	console.log(grid);
	render(grid);
	requestAnimationFrame(update);
	update();
	canvas.removeEventListener('click', handleClick);
	canvas.removeEventListener('mousemove', handleClick);
});


function handleClick(e) {
	ctx.fillStyle = "#0aa59e";
	var x = Math.floor(e.offsetX / boxSize); // x index of grid box
	var y =  Math.floor(e.offsetY / boxSize); // y index of grid box
	grid[x][y]=1;//get grid box number
	ctx.fillRect(x * boxSize, y * boxSize, boxSize, boxSize);
	console.log("("+x+","+y+")");
	console.log("BoxSize"+boxSize);
}


function buildGrid(x){//takes parameter 1 if random data 
	if(x==1){
		return new Array(COLS).fill(null)
		.map(() => new Array(ROWS).fill(null)
			.map(() => Math.floor(Math.random() * 2)));
	}else{
		return new Array(COLS).fill(null)
		.map(() => new Array(ROWS).fill(null)
			.map(() => 0));
	}
	
}

function nextGen(grid) {
	const nextGen = grid.map(arr => [...arr]);

	for (let col = 0; col < grid.length; col++) {
		for (let row = 0; row < grid[col].length; row++) {
			const cell = grid[col][row];
			let numNeighbours = 0;
			for (let i = -1; i < 2; i++) {
				for (let j = -1; j < 2; j++) {
					if (i === 0 && j === 0) {
						continue;
					}
					const x_cell = col + i;
					const y_cell = row + j;

					if (x_cell >= 0 && y_cell >= 0 && x_cell < COLS && y_cell < ROWS) {
						const currentNeighbour = grid[col + i][row + j];
						numNeighbours += currentNeighbour;
					}
				}
			}

      // rules
      if (cell === 1 && numNeighbours < 2) {
      	nextGen[col][row] = 0;
      } else if (cell === 1 && numNeighbours > 3) {
      	nextGen[col][row] = 0;
      } else if (cell === 0 && numNeighbours === 3) {
      	nextGen[col][row] = 1;
      }
  }
}
return nextGen;
}



function update() {
	grid = nextGen(grid);
	render(grid);
	requestAnimationFrame(update);
	$('#gen').html(GEN);
}

function isEqual(a,b) 
{ 
  // if length is not equal 
  if(a.length!=b.length) 
  	return 0; 
  else{ 
  // comapring each element of array 
  for(var i=0;i<a.length;i++){
  	for(var j=0;j<b.length;j++){
  		if(a[i][j]!=b[i][j]){
  			return 0;
  		}
  	}
  } 
}
return 1; 
} 


function render(grid) {
	for (let col = 0; col < grid.length; col++) {
		for (let row = 0; row < grid[col].length; row++) {
			const cell = grid[col][row];
			var x = col * boxSize;
			var y = row * boxSize;
			ctx.beginPath();

			ctx.rect(x, y, boxSize, boxSize);

			ctx.fillStyle = cell ? '#0aa59e' : 'white';
			ctx.fill();
			// ctx.stroke();
		}
	}
	// console.log("BoxSize:"+boxSize);
	GEN++;
}
}
