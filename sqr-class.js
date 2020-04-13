

const wall_thickness = 1/24;
const EDGE_THICKNESS = wall_thickness/2;
const mainFrac = EDGE_THICKNESS*3;
const goalFrac = EDGE_THICKNESS*2;

class Sqr {
	constructor(x, y, color, cell_pad, radius) {
		this.x = x;
		this.y = y;
		this.color = color;
		this.cell_pad = cell_pad;
		this.radius = radius;
	}

	draw() {
		ctx.fillStyle = this.color;
		var x_left = (this.x+this.cell_pad)*cellWidth;
		var y_top = (this.y+this.cell_pad)*cellHeight;
		var width = (1-2*this.cell_pad)*cellWidth;
		var height = (1-2*this.cell_pad)*cellHeight;
		roundRect(ctx,x_left,y_top,width,height,this.radius);
	}
	
	drawMove(x_old, y_old) {
		ctx.fillStyle = this.color;
		var x_left = (Math.min(this.x, x_old)+this.cell_pad)*cellWidth;
		var width = (Math.abs(this.x - x_old)+1-2*this.cell_pad)*cellWidth;
		var y_top = (Math.min(this.y, y_old)+this.cell_pad)*cellHeight;
		var height = (Math.abs(this.y - y_old)+1-2*this.cell_pad)*cellHeight;
		roundRect(ctx,x_left,y_top,width,height,this.radius);
	}
	
	moveLeft() {
		if (this.x === 0) {
			return;
		}
		var x_old = this.x;
		var y_old = this.y;
		
		while (isCellBlockedOnRight(this.x-1, this.y) == false) {
			this.x--;
			if (this.x === 0) {
				break;
			}
		}

		this.drawMove(x_old, y_old);
	}
	
	moveRight() {
		if (this.x === level.N-1) {
			return;
		}
		var x_old = this.x;
		var y_old = this.y;
		
		while (isCellBlockedOnLeft(this.x+1, this.y) == false) {
			this.x++;
			if (this.x === level.N-1) {
				break;
			}
		}

		this.drawMove(x_old, y_old);
	}
	
	moveUp() {
		if (this.y === 0) {
			return;
		}
		var x_old = this.x;
		var y_old = this.y;
		
		while (isCellBlockedOnBottom(this.x, this.y-1) == false) {
			this.y--;
			if (this.y === 0) {
				break;
			}
		}
		
		this.drawMove(x_old, y_old);
	}
	
	moveDown() {
		if (this.y === level.M-1) {
			return;
		}
		var x_old = this.x;
		var y_old = this.y;
		
		while (isCellBlockedOnTop(this.x, this.y+1) == false) {
			this.y++;
			if (this.y === level.M-1) {
				break;
			}
		}

		this.drawMove(x_old, y_old);
	}
}


class GoalSqr extends Sqr {
	constructor(x, y) {
		super(x, y, 'white', goalFrac, cellHeight/5);
	}
}


class PlayerSqr extends Sqr {
	constructor(x, y) {
		super(x, y, 'green', mainFrac, cellHeight/5);
	}
}


class Slider extends Sqr {
	constructor(x, y, start_direction) {
		super(x, y, 'orange', mainFrac, cellHeight/5);
		this.nextDirection = start_direction;
	}
}


class HorizontalSliderSqr extends Slider {

	draw() {
		super.draw();
		
		this.drawArrow(this.x, this.x);
	}
	
	move() {
		var xx = this.x;
		var yy = this.y;
		
		if (this.x == N-1) {
			this.nextDirection = 0;
		}
		else {
			if (isCellBlockedOnLeft(this.x+1, this.y) == true) {
				this.nextDirection = 0;
			}
		}
		
		if (this.x == 0) {
			this.nextDirection = 1;
		}
		else {
			if (isCellBlockedOnRight(this.x-1, this.y) == true) {
				this.nextDirection = 1;
			}
		}

		if (this.nextDirection == 1) {
			this.moveRight();
			this.nextDirection = 0;
		}
		else {
			this.moveLeft();
			this.nextDirection = 1;
		}
		
		this.drawArrow(Math.min(this.x, xx), Math.max(this.x, xx))
	}
	
	drawArrow(x_left, x_right) {
		ctx.lineWidth = cellWidth / 20;
		ctx.beginPath();
		ctx.moveTo((x_left+1/4)*cellWidth,(this.y+1/2)*cellHeight);
		ctx.lineTo((x_right+3/4)*cellWidth,(this.y+1/2)*cellHeight);
		ctx.moveTo((x_right+5/8)*cellWidth,(this.y+3/8)*cellHeight);
		ctx.lineTo((x_right+3/4)*cellWidth,(this.y+1/2)*cellHeight);
		ctx.lineTo((x_right+5/8)*cellWidth,(this.y+5/8)*cellHeight);
		ctx.moveTo((x_left+3/8)*cellWidth,(this.y+3/8)*cellHeight);
		ctx.lineTo((x_left+1/4)*cellWidth,(this.y+1/2)*cellHeight);
		ctx.lineTo((x_left+3/8)*cellWidth,(this.y+5/8)*cellHeight);
		ctx.stroke();	
	}
}


class VerticalSliderSqr extends Slider {
	
	draw() {
		super.draw();
		
		this.drawArrow(this.y, this.y);
	}
	
	move() {
		var xx = this.x;
		var yy = this.y;
		
		if (this.y == M-1) {
			this.nextDirection = 0;
		}
		else {
			if (isCellBlockedOnTop(this.x, this.y+1) == true) {
				this.nextDirection = 0;
			}
		}
		
		if (this.y == 0) {
			this.nextDirection = 1;
		}
		else {
			if (isCellBlockedOnBottom(this.x, this.y-1) == true) {
				this.nextDirection = 1;
			}
		}

		if (this.nextDirection == 1) {
			this.moveDown();
			this.nextDirection = 0;
		}
		else {
			this.moveUp();
			this.nextDirection = 1;
		}
		
		this.drawArrow(Math.min(this.y, yy), Math.max(this.y, yy))
	}
	
	drawArrow(y_top, y_bottom) {
		ctx.lineWidth = cellWidth / 20;
		ctx.beginPath();
		ctx.moveTo((this.x+1/2)*cellHeight,(y_top+1/4)*cellWidth);
		ctx.lineTo((this.x+1/2)*cellHeight,(y_bottom+3/4)*cellWidth);
		ctx.moveTo((this.x+3/8)*cellHeight,(y_bottom+5/8)*cellWidth);
		ctx.lineTo((this.x+1/2)*cellHeight,(y_bottom+3/4)*cellWidth);
		ctx.lineTo((this.x+5/8)*cellHeight,(y_bottom+5/8)*cellWidth);
		ctx.moveTo((this.x+3/8)*cellHeight,(y_top+3/8)*cellWidth);
		ctx.lineTo((this.x+1/2)*cellHeight,(y_top+1/4)*cellWidth);
		ctx.lineTo((this.x+5/8)*cellHeight,(y_top+3/8)*cellWidth);
		ctx.stroke();	
	}
}


class HorizontalSliderWall extends HorizontalSliderSqr {
	constructor(x, y, start_direction, shape) {
		super(x, y, start_direction);
		this.bodyColor = 'aquamarine';
		this.borderColor = 'blue';
		this.shape = shape;
	}
	draw() {
		ctx.fillStyle = this.bodyColor;
		var x_left = (this.x+this.cell_pad)*cellWidth;
		var y_top = (this.y+this.cell_pad)*cellHeight;
		var width = (1-2*this.cell_pad)*cellWidth;
		var height = (1-2*this.cell_pad)*cellHeight;
		roundRect(ctx,x_left,y_top,width,height,this.radius);

		ctx.fillStyle = this.borderColor;

		var b = this.shape;
		//Bottom
		if (b == '_' || b == 'L' || b === 'J' || b == '=' || b == 'U' || b == '<' || b == '>') {
			ctx.fillRect((this.x+EDGE_THICKNESS)*cellWidth,(this.y+1-this.cell_pad)*cellHeight,(1-2*EDGE_THICKNESS)*cellWidth,(this.cell_pad-EDGE_THICKNESS)*cellHeight);
		}
		//Top
		if (b == '-' || b == 'F' || b === 'T' || b == '=' || b == '^' || b == '<' || b == '>') {
			ctx.fillRect((this.x+EDGE_THICKNESS)*cellWidth,(this.y+EDGE_THICKNESS)*cellHeight,(1-2*EDGE_THICKNESS)*cellWidth,(this.cell_pad-EDGE_THICKNESS)*cellHeight);
		}
		//Left
		if (b == '[' || b == 'F' || b === 'L' || b == '|' || b == '^' || b == '<' || b == 'U') {
			ctx.fillRect((this.x+EDGE_THICKNESS)*cellWidth,(this.y+EDGE_THICKNESS)*cellHeight,(this.cell_pad-EDGE_THICKNESS)*cellWidth,(1-2*EDGE_THICKNESS)*cellHeight);
		}
		//Right
		if (b == ']' || b == 'T' || b === 'J' || b == '|' || b == '^' || b == '>' || b == 'U') {
			ctx.fillRect((this.x+1-this.cell_pad)*cellWidth,(this.y+EDGE_THICKNESS)*cellHeight,(this.cell_pad-EDGE_THICKNESS)*cellWidth,(1-2*EDGE_THICKNESS)*cellHeight);
		}
		this.drawArrow(this.x, this.x);
	}
	
	move() {
		super.color = this.bodyColor;
		super.move();
	}

}

function roundRect(ctx, x, y, width, height, radius) {

	if (typeof radius === 'undefined') {
		radius = 5;
	}
	if (typeof radius === 'number') {
		radius = {tl: radius, tr: radius, br: radius, bl: radius};
	} else {
		var defaultRadius = {tl: 0, tr: 0, br: 0, bl: 0};
		for (var side in defaultRadius) {
			radius[side] = radius[side] || defaultRadius[side];
		}
	}
	ctx.beginPath();
	ctx.moveTo(x + radius.tl, y);
	ctx.lineTo(x + width - radius.tr, y);
	ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
	ctx.lineTo(x + width, y + height - radius.br);
	ctx.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height);
	ctx.lineTo(x + radius.bl, y + height);
	ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
	ctx.lineTo(x, y + radius.tl);
	ctx.quadraticCurveTo(x, y, x + radius.tl, y);
	ctx.closePath();
	ctx.fill();
}

function drawTopLeftInsideCorner(ctx, x, y, radius) {

	ctx.beginPath();
	ctx.moveTo((x+EDGE_THICKNESS)*cellWidth, (y+EDGE_THICKNESS)*cellHeight+radius);
	ctx.lineTo((x+EDGE_THICKNESS)*cellWidth, (y+EDGE_THICKNESS)*cellHeight);
	ctx.lineTo((x+EDGE_THICKNESS)*cellWidth+radius, (y+EDGE_THICKNESS)*cellHeight);
	ctx.quadraticCurveTo((x+EDGE_THICKNESS)*cellWidth, (y+EDGE_THICKNESS)*cellHeight, (x+EDGE_THICKNESS)*cellWidth, (y+EDGE_THICKNESS)*cellHeight+radius);
	ctx.closePath();
	ctx.fill();
}


function drawTopRightInsideCorner(ctx, x, y, radius) {

	ctx.beginPath();
	ctx.moveTo((x+1-EDGE_THICKNESS)*cellWidth, (y+EDGE_THICKNESS)*cellHeight+radius);
	ctx.lineTo((x+1-EDGE_THICKNESS)*cellWidth, (y+EDGE_THICKNESS)*cellHeight);
	ctx.lineTo((x+1-EDGE_THICKNESS)*cellWidth-radius, (y+EDGE_THICKNESS)*cellHeight);
	ctx.quadraticCurveTo((x+1-EDGE_THICKNESS)*cellWidth, (y+EDGE_THICKNESS)*cellHeight, (x+1-EDGE_THICKNESS)*cellWidth, (y+EDGE_THICKNESS)*cellHeight+radius);
	ctx.closePath();
	ctx.fill();
}

function drawBottomRightInsideCorner(ctx, x, y, radius) {

	ctx.beginPath();
	ctx.moveTo((x+1-EDGE_THICKNESS)*cellWidth, (y+1-EDGE_THICKNESS)*cellHeight-radius);
	ctx.lineTo((x+1-EDGE_THICKNESS)*cellWidth, (y+1-EDGE_THICKNESS)*cellHeight);
	ctx.lineTo((x+1-EDGE_THICKNESS)*cellWidth-radius, (y+1-EDGE_THICKNESS)*cellHeight);
	ctx.quadraticCurveTo((x+1-EDGE_THICKNESS)*cellWidth, (y+1-EDGE_THICKNESS)*cellHeight, (x+1-EDGE_THICKNESS)*cellWidth, (y+1-EDGE_THICKNESS)*cellHeight-radius);
	ctx.closePath();
	ctx.fill();
}

function drawBottomLeftInsideCorner(ctx, x, y, radius) {

	ctx.beginPath();
	ctx.moveTo((x+EDGE_THICKNESS)*cellWidth, (y+1-EDGE_THICKNESS)*cellHeight-radius);
	ctx.lineTo((x+EDGE_THICKNESS)*cellWidth, (y+1-EDGE_THICKNESS)*cellHeight);
	ctx.lineTo((x+EDGE_THICKNESS)*cellWidth+radius, (y+1-EDGE_THICKNESS)*cellHeight);
	ctx.quadraticCurveTo((x+EDGE_THICKNESS)*cellWidth, (y+1-EDGE_THICKNESS)*cellHeight, (x+EDGE_THICKNESS)*cellWidth, (y+1-EDGE_THICKNESS)*cellHeight-radius);
	ctx.closePath();
	ctx.fill();
}


function isCellBlockedOnRight(x, y) {

	var b = block[x][y];
	if (b === 'O' || b === ']' || b === 'T' || b === 'J' || b === '|' || b === '^' || b === '>' || b === 'U' || b === '0') {
		return true;
	}

	if (isCellOccupied(x, y) === true) {
		return true;
	}

	return false;
}

function isCellBlockedOnLeft(x, y) {

	var b = block[x][y];
	if (b === 'O' || b === '[' || b === 'F' || b === 'L' || b === '|' || b === '^' || b === '<' || b === 'U' || b=== '0') {
		return true;
	}

	if (isCellOccupied(x, y) === true) {
		return true;
	}

	return false;
}

function isCellBlockedOnBottom(x, y) {

	var b = block[x][y];
	if (b === 'O' || b === '_' || b === 'L' || b === 'J' || b === '=' || b === 'U' || b === '<' || b === '>' || b === '0') {
		return true;
	}

	if (isCellOccupied(x, y) === true) {
		return true;
	}

	return false;
}

function isCellBlockedOnTop(x, y) {

	var b = block[x][y];
	if (b === 'O' || b === '-' || b === 'F' || b === 'T' || b === '=' || b === '^' || b === '<' || b === '>' || b === '0') {
		return true;
	}

	if (isCellOccupied(x, y) === true) {
		return true;
	}

	return false;
}


function isCellOccupied(x, y) {
	if (x === player_sqr.x && y === player_sqr.y) {
		return true;
	}

	for (var i=0; i<level.numOfHorizontalSliders; i++) {
		if (x === horizontalSlider[i].x && y === horizontalSlider[i].y) {
			return true;
		}
	}

	for (var i=0; i<level.numOfVerticalSliders; i++) {
		if (x === verticalSlider[i].x && y === verticalSlider[i].y) {
			return true;
		}
	}

	return false;
}


function isBoardCellOccupied(x, y) {

	if (block[x][y] === 'O') {
		return true;
	}

	return false;
}

