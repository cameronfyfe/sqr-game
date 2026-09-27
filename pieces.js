// The squares that sit on the board: the player, the goal and the sliders.

class Sqr {
	constructor(x, y, color, padding) {
		this.x = x;
		this.y = y;
		this.color = color;
		this.padding = padding; // Gap between the square and its cell edges, as a fraction of a cell
	}

	draw() {
		this.drawSpan(this.x, this.y);
	}

	// Draw the square stretched from (fromX, fromY) to its current cell, as a motion trail.
	drawSpan(fromX, fromY) {
		ctx.fillStyle = this.color;
		const x = (Math.min(this.x, fromX) + this.padding) * cellWidth;
		const y = (Math.min(this.y, fromY) + this.padding) * cellHeight;
		const width = (Math.abs(this.x - fromX) + 1 - 2 * this.padding) * cellWidth;
		const height = (Math.abs(this.y - fromY) + 1 - 2 * this.padding) * cellHeight;
		roundRect(x, y, width, height, cornerRadius);
	}

	canStep(dx, dy) {
		const x = this.x + dx, y = this.y + dy;
		return inBounds(x, y) && !isCellBlocked(x, y, facingSide(dx, dy));
	}

	// Slide in a direction until hitting a wall, block or another square.
	slide(dx, dy) {
		if (!inBounds(this.x + dx, this.y + dy)) {
			return;
		}
		const fromX = this.x, fromY = this.y;
		while (this.canStep(dx, dy)) {
			this.x += dx;
			this.y += dy;
		}
		this.drawSpan(fromX, fromY);
	}
}


class GoalSqr extends Sqr {
	constructor(x, y) {
		super(x, y, 'white', 1 / 24);
	}
}


class PlayerSqr extends Sqr {
	constructor(x, y) {
		super(x, y, 'green', 1 / 16);
	}
}


// An orange square that slides back and forth along one axis when clicked.
class Slider extends Sqr {
	constructor(x, y, dir, axisX, axisY) {
		super(x, y, 'orange', 1 / 16);
		this.dir = dir; // 1 = next move is right/down, 0 = left/up
		this.axisX = axisX;
		this.axisY = axisY;
	}

	draw() {
		super.draw();
		this.drawArrow(this.x, this.y, this.x, this.y);
	}

	move() {
		const { axisX: ax, axisY: ay } = this;
		if (!this.canStep(ax, ay)) {
			this.dir = 0;
		}
		if (!this.canStep(-ax, -ay)) {
			this.dir = 1;
		}

		const fromX = this.x, fromY = this.y;
		const sign = this.dir === 1 ? 1 : -1;
		this.slide(sign * ax, sign * ay);
		this.dir = 1 - this.dir;

		this.drawArrow(Math.min(this.x, fromX), Math.min(this.y, fromY),
			Math.max(this.x, fromX), Math.max(this.y, fromY));
	}

	// Double-headed arrow along the slider's axis, spanning cells (x0, y0) to (x1, y1).
	drawArrow(x0, y0, x1, y1) {
		const horizontal = this.axisX !== 0;
		const start = horizontal ? x0 : y0;
		const end = horizontal ? x1 : y1;
		// Canvas point from a position along the axis and a fraction across the cell
		const point = (along, across) => horizontal
			? [along * cellWidth, (this.y + across) * cellHeight]
			: [(this.x + across) * cellWidth, along * cellHeight];

		ctx.lineWidth = cellWidth / 20;
		ctx.beginPath();
		ctx.moveTo(...point(start + 1 / 4, 1 / 2));
		ctx.lineTo(...point(end + 3 / 4, 1 / 2));
		ctx.moveTo(...point(end + 5 / 8, 3 / 8));
		ctx.lineTo(...point(end + 3 / 4, 1 / 2));
		ctx.lineTo(...point(end + 5 / 8, 5 / 8));
		ctx.moveTo(...point(start + 3 / 8, 3 / 8));
		ctx.lineTo(...point(start + 1 / 4, 1 / 2));
		ctx.lineTo(...point(start + 3 / 8, 5 / 8));
		ctx.stroke();
	}
}

class HorizontalSlider extends Slider {
	constructor(x, y, dir) {
		super(x, y, dir, 1, 0);
	}
}

class VerticalSlider extends Slider {
	constructor(x, y, dir) {
		super(x, y, dir, 0, 1);
	}
}


function isCellOccupied(x, y) {
	return [player, ...sliders].some(sqr => sqr.x === x && sqr.y === y);
}

// Can a square enter cell (x, y) through the given side?
function isCellBlocked(x, y, side) {
	return hasWall(x, y, side) || isCellOccupied(x, y);
}
