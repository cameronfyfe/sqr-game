
debugModeOn = true;

class Editor {
	constructor() {
		this.x = 0;
		this.y = 0;
        this.color1 = 'gold';
        this.color2 = 'black';
        this.cell_pad_base = 0.25;
        this.cell_pad = 0.25;
        this.radius = 2;
	}

    draw() {
        this.cell_pad = this.cell_pad_base;
		ctx.fillStyle = this.color1;
		var x_left = (this.x+this.cell_pad)*cellWidth;
		var y_top = (this.y+this.cell_pad)*cellHeight;
		var width = (1-2*this.cell_pad)*cellWidth;
		var height = (1-2*this.cell_pad)*cellHeight;
		roundRect(ctx,x_left,y_top,width,height,this.radius);

        this.cell_pad *= 1.2;
		ctx.fillStyle = this.color2;
		x_left = (this.x+this.cell_pad)*cellWidth;
		y_top = (this.y+this.cell_pad)*cellHeight;
	    width = (1-2*this.cell_pad)*cellWidth;
		height = (1-2*this.cell_pad)*cellHeight;
		roundRect(ctx,x_left,y_top,width,height,this.radius);

        this.cell_pad *= 1.2;
		ctx.fillStyle = this.color1;
		x_left = (this.x+this.cell_pad)*cellWidth;
		y_top = (this.y+this.cell_pad)*cellHeight;
	    width = (1-2*this.cell_pad)*cellWidth;
		height = (1-2*this.cell_pad)*cellHeight;
		roundRect(ctx,x_left,y_top,width,height,this.radius);
	}

    moveLeft() {
        this.x--;
    }

    moveRight() {
        this.x++;
    }

    moveUp() {
        this.y--;
    }

    moveDown() {
        this.y++;
    }
   
    toggleBlock() {
        if (block[this.x][this.y] === 'O') {
            block[this.x][this.y] = ' ';
        }
        else {
            if (isShapeBlockedOnBottom(block[this.x][this.y]) === true) {
                this.toggleBottom();
            }
            if (isShapeBlockedOnTop(block[this.x][this.y]) === true) {
                this.toggleTop();
            }
            if (isShapeBlockedOnLeft(block[this.x][this.y]) === true) {
                this.toggleLeft();
            }
            if (isShapeBlockedOnRight(block[this.x][this.y]) === true) {
                this.toggleRight();
            }
            block[this.x][this.y] = 'O';
        }
        refreshBoard();
        refreshTextMap();
    }

    toggleBottom() {
        if (block[this.x][this.y] === 'O' || block[this.x][this.y+1] === 'O') {
            return;
        }
        block[this.x][this.y] = getToggledBottom(block[this.x][this.y]);
        if (this.y < level.M-1) {
            block[this.x][this.y+1] = getToggledTop(block[this.x][this.y+1]);
        }
        refreshBoard();
        refreshTextMap();
    }

    toggleTop() {
        if (block[this.x][this.y] === 'O' || block[this.x][this.y-1] === 'O') {
            return;
        }
        block[this.x][this.y] = getToggledTop(block[this.x][this.y]);
        if (this.y > 0) {
            block[this.x][this.y-1] = getToggledBottom(block[this.x][this.y-1]);
        }
        refreshBoard();
        refreshTextMap();
    }

    toggleLeft() {
        if (block[this.x][this.y] === 'O' || block[this.x-1][this.y] === 'O') {
            return;
        }
        block[this.x][this.y] = getToggledLeft(block[this.x][this.y]);
        if (this.x > 0) {
            block[this.x-1][this.y] = getToggledRight(block[this.x-1][this.y]);
        }
        refreshBoard();
        refreshTextMap();
    }

    toggleRight() {
        if (block[this.x][this.y] === 'O' || block[this.x+1][this.y] === 'O') {
            return;
        }
        block[this.x][this.y] = getToggledRight(block[this.x][this.y]);
        if (this.x < level.N-1) {
            block[this.x+1][this.y] = getToggledLeft(block[this.x+1][this.y]);
        }
        refreshBoard();
        refreshTextMap();
    }

    placeGoal() {
        goalSqr.x = this.x;
        goalSqr.y = this.y;
    }

    addHorizontalSliderSqr() {

        if (deleteSqrsHere(this.x, this.y) === true) {
            return;
        }

        // No sqr was here so add horizontal slider
        level.numOfHorizontalSliders++;
        horizontalSlider.length = level.numOfHorizontalSliders;
        horizontalSlider[level.numOfHorizontalSliders-1] = new HorizontalSliderSqr(this.x, this.y, 1);
        tempMap[level.index][this.x][this.y] = '@';
        refreshBoard();
        refreshTextMap();
    }

    addVerticalSliderSqr() {

        if (deleteSqrsHere(this.x, this.y) === true) {
            return;
        }

        level.numOfVerticalSliders++;
        verticalSlider.length = level.numOfVerticalSliders;
        verticalSlider[level.numOfVerticalSliders-1] = new VerticalSliderSqr(this.x, this.y, 1);
        tempMap[level.index][this.x][this.y] = '@';
        refreshBoard();
        refreshTextMap();
    }
}


function getToggledBottom(shape) {

    var top = isShapeBlockedOnTop(shape);
    var bottom = isShapeBlockedOnBottom(shape);
    var left = isShapeBlockedOnLeft(shape);
    var right = isShapeBlockedOnRight(shape);

    if (bottom === true) {
        bottom = false;
    }
    else {
        bottom = true;
    }

    return getShape(top, bottom, left, right);
}

function getToggledTop(shape) {

    var top = isShapeBlockedOnTop(shape);
    var bottom = isShapeBlockedOnBottom(shape);
    var left = isShapeBlockedOnLeft(shape);
    var right = isShapeBlockedOnRight(shape);

    if (top === true) {
        top = false;
    }
    else {
        top = true;
    }

    return getShape(top, bottom, left, right);
}

function getToggledLeft(shape) {

    var top = isShapeBlockedOnTop(shape);
    var bottom = isShapeBlockedOnBottom(shape);
    var left = isShapeBlockedOnLeft(shape);
    var right = isShapeBlockedOnRight(shape);

    if (left === true) {
        left = false;
    }
    else {
        left = true;
    }

    return getShape(top, bottom, left, right);
}

function getToggledRight(shape) {

    var top = isShapeBlockedOnTop(shape);
    var bottom = isShapeBlockedOnBottom(shape);
    var left = isShapeBlockedOnLeft(shape);
    var right = isShapeBlockedOnRight(shape);

    if (right === true) {
        right = false;
    }
    else {
        right = true;
    }

    return getShape(top, bottom, left, right);
}

function isShapeBlockedOnTop(b) {
	if (b != 'O' && b != '-' && b != 'F' && b != 'T' && b != '=' && b != '^' && b != '<' && b != '>' && b != '0') {
		return false;
	}
	return true;
}

function isShapeBlockedOnBottom(b) {
	if (b != 'O' && b != '_' && b != 'L' && b != 'J' && b != '=' && b != 'U' && b != '<' && b != '>' && b != '0') {
		return false;
	}
	return true;
}

function isShapeBlockedOnLeft(b) {
	if (b != 'O' && b != '[' && b != 'F' && b != 'L' && b != '|' && b != '^' && b != '<' && b != 'U' && b != '0') {
		return false;
	}
	return true;
}

function isShapeBlockedOnRight(b) {
	if (b != 'O' && b != ']' && b != 'T' && b != 'J' && b != '|' && b != '^' && b != '>' && b != 'U' && b != '0') {
		return false;
	}
	return true;
}


function getShape(top, bottom, left, right) {

    if (top == false && bottom == false && left == false && right == false) {
        return ' ';
    }
    if (top == false && bottom == false && left == false && right == true) {
        return ']';
    }
    if (top == false && bottom == false && left == true && right == false) {
        return '[';
    }
    if (top == false && bottom == false && left == true && right == true) {
        return '|';
    }
    if (top == false && bottom == true && left == false && right == false) {
        return '_';
    }
    if (top == false && bottom == true && left == false && right == true) {
        return 'J';
    }
    if (top == false && bottom == true && left == true && right == false) {
        return 'L';
    }
    if (top == false && bottom == true && left == true && right == true) {
        return 'U';
    }
    if (top == true && bottom == false && left == false && right == false) {
        return '-';
    }
    if (top == true && bottom == false && left == false && right == true) {
        return 'T';
    }
    if (top == true && bottom == false && left == true && right == false) {
        return 'F';
    }
    if (top == true && bottom == false && left == true && right == true) {
        return '^';
    }
    if (top == true && bottom == true && left == false && right == false) {
        return '=';
    }
    if (top == true && bottom == true && left == false && right == true) {
        return '>';
    }
    if (top == true && bottom == true && left == true && right == false) {
        return '<';
    }
    if (top == true && bottom == true && left == true && right == true) {
        return '0';
    }
}

function deleteSqrsHere (x, y) {
    var sqrFlag;

    // Is a horizontal slider here?
    sqrFlag = -1;
    for (var i=0; i<level.numOfHorizontalSliders; i++) {
        if (x === horizontalSlider[i].x && y === horizontalSlider[i].y) {
            sqrFlag = i;
        }
    }

    // Delete horizontal slider
    if (sqrFlag !== -1) {
        level.numOfHorizontalSliders--;
        for (var i=sqrFlag; i<level.numOfHorizontalSliders; i++) {
            horizontalSlider[i].x = horizontalSlider[i+1].x;
            horizontalSlider[i].y = horizontalSlider[i+1].y;
        }
        horizontalSlider.length = level.numOfHorizontalSliders;
        tempMap[level.index][x][y] = ' ';
        return true;
    }

     // Is vertical slider here?
    var sqrFlag = -1;
    for (var i=0; i<level.numOfVerticalSliders; i++) {
        if (x === verticalSlider[i].x && y === verticalSlider[i].y) {
            sqrFlag = i;
        }
    }

    // Delete vertical slider
    if (sqrFlag !== -1) {
        level.numOfVerticalSliders--;
        for (var i=sqrFlag; i<level.numOfVerticalSliders; i++) {
            verticalSlider[i].x = verticalSlider[i+1].x;
            verticalSlider[i].y = verticalSlider[i+1].y;
        }
        verticalSlider.length = level.numOfVerticalSliders;
        tempMap[level.index][x][y] = ' ';
        return true;
    }

    return false;
}


function refreshTextMap() {


    var gridSize = parseInt(document.getElementById("mapsize").value);
	var oldGridSize;
	
	if (level.N != gridSize) {
		oldGridSize = level.N;
		level.N = gridSize;
		level.M = gridSize*3/2;
		cellWidth = width/level.N;
		cellHeight = height/level.M;
		mainR = cellHeight/5;
		
		block.length = level.N;

		for (var i = 0; i < level.N; i++) {
			if (i >= oldGridSize) {
				block[i] = new Array(M);
				maxSize = i+1;
			}
			else {
				block[i].length = level.M;
			}
			for (j = oldGridSize; j < level.M; j++) {
				//if (block[i][j] != ' ' && block[i][j] != 'O') {
				block[i][j] = ' ';
				//}
			}
		}
	}



    var levelInfo = new Array(6);
    for (var i=0; i<levelInfo.length; i++) {
        levelInfo[i] = new Array(3);
        levelInfo[i][2] = ';\n';
    }
    levelInfo[0][0] = "mapN[k] = ";
    levelInfo[0][1] = level.N;
    levelInfo[1][0] = "mapM[k] = ";
    levelInfo[1][1] = level.M;
    levelInfo[2][0] = "xPlayer[k] = ";
    levelInfo[2][1] = player_sqr.x;
    levelInfo[3][0] = "yPlayer[k] = ";
    levelInfo[3][1] = player_sqr.y;
    levelInfo[4][0] = "xGoal[k] = ";
    levelInfo[4][1] = goalSqr.x;
    levelInfo[5][0] = "yGoal[k] = ";
    levelInfo[5][1] = goalSqr.y;

    if (level.numOfHorizontalSliders > 0) {
        levelInfo.length++;
        levelInfo[levelInfo.length-1] = new Array(4);
        levelInfo[levelInfo.length-1][0] = "\n";
        levelInfo[levelInfo.length-1][1] = "numOfHoriSliders[k] = ";
        levelInfo[levelInfo.length-1][2] = level.numOfHorizontalSliders;
        levelInfo[levelInfo.length-1][3] = ';\n';
    }

    for (var i=0; i<level.numOfHorizontalSliders; i++) {
        levelInfo.length++;
        levelInfo[7+i] = new Array(15);

        levelInfo[7+i][0] = "xHoriSlider[k][";
        levelInfo[7+i][1] = i;
        levelInfo[7+i][2] = "] = ";
        levelInfo[7+i][3] = horizontalSlider[i].x;
        levelInfo[7+i][4] = ";\n";

        levelInfo[7+i][5] = "yHoriSlider[k][";
        levelInfo[7+i][6] = i;
        levelInfo[7+i][7] = "] = ";
        levelInfo[7+i][8] = horizontalSlider[i].y;
        levelInfo[7+i][9] = ";\n";

        levelInfo[7+i][10] = "dHoriSlider[k][";
        levelInfo[7+i][11] = i;
        levelInfo[7+i][12] = "] = ";
        levelInfo[7+i][13] = horizontalSlider[i].nextDirection;
        levelInfo[7+i][14] = ";\n";
    }

    if (level.numOfVerticalSliders > 0) {
        levelInfo.length++;
        levelInfo[levelInfo.length-1] = new Array(4);
        levelInfo[levelInfo.length-1][0] = "\n";
        levelInfo[levelInfo.length-1][1] = "numOfVertSliders[k] = ";
        levelInfo[levelInfo.length-1][2] = level.numOfVerticalSliders;
        levelInfo[levelInfo.length-1][3] = ';\n';
    }
    var len_old = levelInfo.length;
    for (var i=0; i<level.numOfVerticalSliders; i++) {
        levelInfo.length++;
        levelInfo[len_old+i] = new Array(15);

        levelInfo[len_old+i][0] = "xVertSlider[k][";
        levelInfo[len_old+i][1] = i;
        levelInfo[len_old+i][2] = "] = ";
        levelInfo[len_old+i][3] = verticalSlider[i].x;
        levelInfo[len_old+i][4] = ";\n";

        levelInfo[len_old+i][5] = "yVertSlider[k][";
        levelInfo[len_old+i][6] = i;
        levelInfo[len_old+i][7] = "] = ";
        levelInfo[len_old+i][8] = verticalSlider[i].y;
        levelInfo[len_old+i][9] = ";\n";

        levelInfo[len_old+i][10] = "dVertSlider[k][";
        levelInfo[len_old+i][11] = i;
        levelInfo[len_old+i][12] = "] = ";
        levelInfo[len_old+i][13] = verticalSlider[i].nextDirection;
        levelInfo[len_old+i][14] = ";\n";
    }

    for (var i=0; i<levelInfo.length; i++) {
        levelInfo[i] = levelInfo[i].join('');
    }

    var blockPrint = new Array(level.N);
    for (var i = 0; i < level.N; i++) {
        blockPrint[i] = new Array(level.N);
        for (var j = 0; j < level.N; j++) {
            blockPrint[i][j] = block[j][i];
        }
        blockPrint[i] = blockPrint[i].join('');
    }
    var textbox3 = document.getElementById('textbox3');

    var formatPrint = new Array(3);
    formatPrint[0] = "blockMap[k] = ['";
    formatPrint[1] = blockPrint.join("',\n               '");
    formatPrint[2] = "'];";

    var levelPrint = new Array(3);
    levelPrint[0] = "k =/* LEVEL */ # /* */;";
    levelPrint[1] = formatPrint.join('');
    levelPrint[2] = levelInfo.join('');

    textbox3.value = levelPrint.join('\n');
}

function moveBoardDown()
{
	for (var j=level.M-1; j>0; j--) {
		for (var i=0; i<level.N; i++) {
			block[i][j] = block[i][j-1];
		}
	}
	for (var i=0; i<level.N; i++) {
		block[i][0] = ' ';
	}
	refreshBoard();
}


function moveBoardUp()
{
	for (var j=0; j<level.M-1; j++) {
		for (var i=0; i<level.N; i++) {
			block[i][j] = block[i][j+1];
		}
	}
	for (var i=0; i<level.N; i++) {
		block[i][level.M-1] = ' ';
	}
	refreshBoard();
}


function moveBoardLeft()
{
	for (var j=0; j<level.M; j++) {
		for (var i=0; i<level.N-1; i++) {
			block[i][j] = block[i+1][j];
		}
	}
	for (var j=0; j<level.M; j++) {
		block[level.N-1][j] = ' ';
	}
	refreshBoard();
}


function moveBoardRight()
{
	for (var j=0; j<level.M; j++) {
		for (var i=level.N-1; i>0; i--) {
			block[i][j] = block[i-1][j];
		}
	}
	for (var j=0; j<level.M; j++) {
		block[0][j] = ' ';
	}
	refreshBoard();
}

