var c = document.getElementById("board");
var ctx = c.getContext("2d");
// c.width  = window.innerWidth;
// c.height = window.innerHeight;

var N = 6;
var M = 6;
var width = 720;
var height = 1080;

var block = new Array();


refreshLevel(0);


function refreshBoard() {

	ctx.clearRect(0,0,width,height);
	for (var i=0; i<level.N; i++) {
		for (var j=0; j<level.M; j++) {
			var b = block[i][j];
			var below = 'O', above = 'O', left = 'O', right = 'O';
			if (i != 0)
				left = block[i-1][j];
			if (i != level.N-1)
				right = block[i+1][j];
			if (j != 0)
				above = block[i][j-1];
			if (j != level.M-1)
				below = block[i][j+1];
			if (b == 'O') {
				// Draw block
				ctx.fillStyle = 'black';
				var blockRadius = {tl: 0, tr: 0, br: 0, bl: 0};
				if (cellHasOutsideCornerTL(i, j) === true) {
					blockRadius.tl = cellHeight/5;
				}
				if (cellHasOutsideCornerTR(i, j) === true) {
					blockRadius.tr = cellHeight/5;
				}
				if (cellHasOutsideCornerBR(i, j) === true) {
					blockRadius.br = cellHeight/5;
				}
				if (cellHasOutsideCornerBL(i, j) === true) {
					blockRadius.bl = cellHeight/5;
				}

				roundRect(ctx,(i-EDGE_THICKNESS)*cellWidth,(j-EDGE_THICKNESS)*cellHeight,(1+2*EDGE_THICKNESS)*cellWidth,(1+2*EDGE_THICKNESS)*cellHeight, blockRadius);
			}
			else {
				// Draw inside corners
				ctx.fillStyle = 'black';
				if (cellHasInsideCornerTL(i, j) === true) {
					drawTopLeftInsideCorner(ctx, i, j, cellHeight/5);
				}
				if (cellHasInsideCornerTR(i, j) === true) {
					drawTopRightInsideCorner(ctx, i, j, cellHeight/5);
				}
				if (cellHasInsideCornerBR(i, j) === true) {
					drawBottomRightInsideCorner(ctx, i, j, cellHeight/5);
				}
				if (cellHasInsideCornerBL(i, j) === true) {
					drawBottomLeftInsideCorner(ctx, i, j, cellHeight/5);
				}
			}
			//Bottom
			if (b == '_' || b == 'L' || b === 'J' || b == '=' || b == 'U' || b == '<' || b == '>' || b == '0') {
				ctx.fillStyle = 'black';
				ctx.fillRect((i-EDGE_THICKNESS)*cellWidth,(j+1-EDGE_THICKNESS)*cellHeight,(1+2*EDGE_THICKNESS)*cellWidth,EDGE_THICKNESS*cellHeight);
			}
			//Top
			if (b == '-' || b == 'F' || b === 'T' || b == '=' || b == '^' || b == '<' || b == '>' || b == '0') {
				ctx.fillStyle = 'black';
				ctx.fillRect((i-EDGE_THICKNESS)*cellWidth,j*cellHeight,(1+2*EDGE_THICKNESS)*cellWidth,EDGE_THICKNESS*cellHeight);
			}
			//Left
			if (b == '[' || b == 'F' || b === 'L' || b == '|' || b == '^' || b == '<' || b == 'U' || b == '0') {
				ctx.fillStyle = 'black';
				ctx.fillRect(i*cellWidth,j*cellHeight,EDGE_THICKNESS*cellWidth,cellHeight);
			}
			//Right
			if (b == ']' || b == 'T' || b === 'J' || b == '|' || b == '^' || b == '>' || b == 'U' || b == '0') {
				ctx.fillStyle = 'black';
				ctx.fillRect((i+1-EDGE_THICKNESS)*cellWidth,j*cellHeight,cellWidth*EDGE_THICKNESS,cellHeight);
			}
		}
	}
	
	goalSqr.draw();
	player_sqr.draw();
	
	// Draw all horizontal sliders
	for (var u=0; u < level.numOfHorizontalSliders; u++) {
		horizontalSlider[u].draw();
	}

	// Draw all vertical sliders
	for (var u=0; u < level.numOfVerticalSliders; u++) {
		verticalSlider[u].draw();
	}


	if (player_sqr.x == goalSqr.x && player_sqr.y == goalSqr.y) {
		goalSqr.x = -13;
		if (level.index == numberOfLevels-1) {
			setTimeout('refreshLevel(0);',500);
		}
		else {
			setTimeout('refreshLevel(level.index+1);',500);
		}
	}
}

function refreshLevel(k) {

	var level = getLevel(k);
	
	cellWidth = width/level.N;
	cellHeight = height/level.M;

	for (var i = 0; i < level.N; i++) {
		block[i] = new Array(M);
		for (var j = 0; j < level.M; j++) {
			block[i][j] = blockMap[k][j][i];
		}
	}

	goalSqr = new GoalSqr(level.xGoal, level.yGoal);
	player_sqr = new PlayerSqr(level.xPlayer, level.yPlayer);
	
	horizontalSlider = new Array(level.numOfHorizontalSliders);
	for (var u=0; u < level.numOfHorizontalSliders; u++) {
		horizontalSlider[u] = new HorizontalSliderSqr(xHoriSlider[k][u], yHoriSlider[k][u], dHoriSlider[k][u]);
	}

	verticalSlider = new Array(level.numOfVerticalSliders);
	for (var u=0; u < level.numOfVerticalSliders; u++) {
		verticalSlider[u] = new VerticalSliderSqr(xVertSlider[k][u], yVertSlider[k][u], dVertSlider[k][u]);
	}

	if (debugModeOn === true) {
		editor = new Editor();
	}

	refreshBoard();
}


function cellHasOutsideCornerTL(i, j) {
	if (i === 0 || j === 0) {
		return false;
	}
	if (isBoardCellOccupied(i,j-1) === true) {
		return false;
	}
	if (isBoardCellOccupied(i-1,j) === true) {
		return false;
	}
	if (isBoardCellBlockedOnBottom(i-1,j-1) === true) {
		return false;
	}
	if (isBoardCellBlockedOnRight(i-1,j-1) === true) {
		return false;
	}

	return true;
}

function cellHasOutsideCornerTR(i, j) {
	if (i === level.N-1 || j === 0) {
		return false;
	}
	if (isBoardCellOccupied(i,j-1) === true) {
		return false;
	}
	if (isBoardCellOccupied(i+1,j) === true) {
		return false;
	}
	if (isBoardCellBlockedOnBottom(i+1,j-1) === true) {
		return false;
	}
	if (isBoardCellBlockedOnLeft(i+1,j-1) === true) {
		return false;
	}

	return true;
}

function cellHasOutsideCornerBR(i, j) {
	if (i === level.N-1 || j === level.M-1) {
		return false;
	}
	if (isBoardCellOccupied(i,j+1) === true) {
		return false;
	}
	if (isBoardCellOccupied(i+1,j) === true) {
		return false;
	}
	if (isBoardCellBlockedOnTop(i+1,j+1) === true) {
		return false;
	}
	if (isBoardCellBlockedOnLeft(i+1,j+1) === true) {
		return false;
	}

	return true;
}

function cellHasOutsideCornerBL(i, j) {
	if (i === 0 || j === level.M-1) {
		return false;
	}
	if (isBoardCellOccupied(i,j+1) === true) {
		return false;
	}
	if (isBoardCellOccupied(i-1,j) === true) {
		return false;
	}
	if (isBoardCellBlockedOnTop(i-1,j+1) === true) {
		return false;
	}
	if (isBoardCellBlockedOnRight(i-1,j+1) === true) {
		return false;
	}

	return true;
}

function cellHasInsideCornerTL(i, j) {
	if (i === 0 || j === 0) {
		return false;
	}
	if (isBoardCellBlockedOnBottom(i,j-1) === true && isBoardCellBlockedOnRight(i-1,j) === true) {
		return true;
	}
	return false;
}
function cellHasInsideCornerTR(i, j) {
	if (i === level.N-1 || j === 0) {
		return false;
	}
	if (isBoardCellBlockedOnBottom(i,j-1) === true && isBoardCellBlockedOnLeft(i+1,j) === true) {
		return true;
	}
	return false;
}
function cellHasInsideCornerBR(i, j) {
	if (i === level.N-1 || j === level.M-1) {
		return false;
	}
	if (isBoardCellBlockedOnTop(i,j+1) === true && isBoardCellBlockedOnLeft(i+1,j) === true) {
		return true;
	}
	return false;
}
function cellHasInsideCornerBL(i, j) {
	if (i === 0 || j === level.M-1) {
		return false;
	}
	if (isBoardCellBlockedOnTop(i,j+1) === true && isBoardCellBlockedOnRight(i-1,j) === true) {
		return true;
	}
	return false;
}

function isBoardCellBlockedOnRight(x, y) {

	var b = block[x][y];
	if (b === 'O' || b === ']' || b === 'T' || b === 'J' || b === '|' || b === '^' || b === '>' || b === 'U' || b === '0') {
		return true;
	}
	return false;
}

function isBoardCellBlockedOnLeft(x, y) {

	var b = block[x][y];
	if (b === 'O' || b === '[' || b === 'F' || b === 'L' || b === '|' || b === '^' || b === '<' || b === 'U' || b=== '0') {
		return true;
	}
	return false;
}

function isBoardCellBlockedOnBottom(x, y) {

	var b = block[x][y];
	if (b === 'O' || b === '_' || b === 'L' || b === 'J' || b === '=' || b === 'U' || b === '<' || b === '>' || b === '0') {
		return true;
	}
	return false;
}

function isBoardCellBlockedOnTop(x, y) {

	var b = block[x][y];
	if (b === 'O' || b === '-' || b === 'F' || b === 'T' || b === '=' || b === '^' || b === '<' || b === '>' || b === '0') {
		return true;
	}
	return false;
}


function pause(milliseconds) {
	var dt = new Date();
	while ((new Date()) - dt <= milliseconds) { /* Do nothing */ }
}