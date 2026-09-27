// The board: a grid of cells, each either a solid block or an open cell with
// thin walls on some of its sides. board[x][y] holds the map character.

const TOP = 1, BOTTOM = 2, LEFT = 4, RIGHT = 8;
const ALL_SIDES = TOP | BOTTOM | LEFT | RIGHT;

const SOLID = 'O';

// Map character -> which sides of the cell have a wall.
const WALL_SHAPES = {
	' ': 0,
	'-': TOP,
	'_': BOTTOM,
	'[': LEFT,
	']': RIGHT,
	'=': TOP | BOTTOM,
	'|': LEFT | RIGHT,
	'F': TOP | LEFT,
	'T': TOP | RIGHT,
	'L': BOTTOM | LEFT,
	'J': BOTTOM | RIGHT,
	'^': TOP | LEFT | RIGHT,
	'U': BOTTOM | LEFT | RIGHT,
	'<': TOP | BOTTOM | LEFT,
	'>': TOP | BOTTOM | RIGHT,
	'0': ALL_SIDES,
	[SOLID]: ALL_SIDES,
};

const EDGE_THICKNESS = 1 / 48; // Wall thickness on each side of a cell edge, as a fraction of a cell

function shapeFromWalls(walls) {
	return Object.keys(WALL_SHAPES).find(ch => ch !== SOLID && WALL_SHAPES[ch] === walls);
}

function inBounds(x, y) {
	return x >= 0 && x < cols && y >= 0 && y < rows;
}

function isSolid(x, y) {
	return board[x][y] === SOLID;
}

function hasWall(x, y, side) {
	return (WALL_SHAPES[board[x][y]] & side) !== 0;
}

// The side of the neighbouring cell at (x+dx, y+dy) that faces back towards (x, y).
function facingSide(dx, dy) {
	if (dx > 0) return LEFT;
	if (dx < 0) return RIGHT;
	if (dy > 0) return TOP;
	return BOTTOM;
}

const CORNERS = [
	{ name: 'tl', dx: -1, dy: -1 },
	{ name: 'tr', dx: 1, dy: -1 },
	{ name: 'br', dx: 1, dy: 1 },
	{ name: 'bl', dx: -1, dy: 1 },
];

// A solid block's corner is rounded when nothing is attached to it from outside.
function hasOutsideCorner(x, y, { dx, dy }) {
	if (!inBounds(x + dx, y + dy)) {
		return false;
	}
	return !isSolid(x, y + dy)
		&& !isSolid(x + dx, y)
		&& !hasWall(x + dx, y + dy, facingSide(0, dy))
		&& !hasWall(x + dx, y + dy, facingSide(dx, 0));
}

// An open cell gets a fillet where two walls meet at one of its corners.
function hasInsideCorner(x, y, { dx, dy }) {
	if (!inBounds(x + dx, y + dy)) {
		return false;
	}
	return hasWall(x, y + dy, facingSide(0, dy)) && hasWall(x + dx, y, facingSide(dx, 0));
}

function drawBoard() {
	ctx.fillStyle = 'black';
	for (let x = 0; x < cols; x++) {
		for (let y = 0; y < rows; y++) {
			if (isSolid(x, y)) {
				drawBlock(x, y);
			}
			else {
				drawWalls(x, y);
			}
		}
	}
}

function drawBlock(x, y) {
	const radius = {};
	for (const corner of CORNERS) {
		radius[corner.name] = hasOutsideCorner(x, y, corner) ? cornerRadius : 0;
	}
	roundRect((x - EDGE_THICKNESS) * cellWidth, (y - EDGE_THICKNESS) * cellHeight,
		(1 + 2 * EDGE_THICKNESS) * cellWidth, (1 + 2 * EDGE_THICKNESS) * cellHeight, radius);
}

function drawWalls(x, y) {
	for (const corner of CORNERS) {
		if (hasInsideCorner(x, y, corner)) {
			drawInsideCorner(x, y, corner);
		}
	}

	const wideX = (x - EDGE_THICKNESS) * cellWidth;
	const wideW = (1 + 2 * EDGE_THICKNESS) * cellWidth;
	const edgeW = EDGE_THICKNESS * cellWidth;
	const edgeH = EDGE_THICKNESS * cellHeight;
	if (hasWall(x, y, BOTTOM)) {
		ctx.fillRect(wideX, (y + 1 - EDGE_THICKNESS) * cellHeight, wideW, edgeH);
	}
	if (hasWall(x, y, TOP)) {
		ctx.fillRect(wideX, y * cellHeight, wideW, edgeH);
	}
	if (hasWall(x, y, LEFT)) {
		ctx.fillRect(x * cellWidth, y * cellHeight, edgeW, cellHeight);
	}
	if (hasWall(x, y, RIGHT)) {
		ctx.fillRect((x + 1 - EDGE_THICKNESS) * cellWidth, y * cellHeight, edgeW, cellHeight);
	}
}

function drawInsideCorner(x, y, { dx, dy }) {
	// Corner point just inside the walls, and the direction back into the cell
	const px = (x + (dx < 0 ? EDGE_THICKNESS : 1 - EDGE_THICKNESS)) * cellWidth;
	const py = (y + (dy < 0 ? EDGE_THICKNESS : 1 - EDGE_THICKNESS)) * cellHeight;
	const r = cornerRadius;
	ctx.beginPath();
	ctx.moveTo(px, py - dy * r);
	ctx.lineTo(px, py);
	ctx.lineTo(px - dx * r, py);
	ctx.quadraticCurveTo(px, py, px, py - dy * r);
	ctx.closePath();
	ctx.fill();
}

// Fill a rectangle with rounded corners. radius is a number or {tl, tr, br, bl}.
function roundRect(x, y, width, height, radius) {
	if (typeof radius === 'number') {
		radius = { tl: radius, tr: radius, br: radius, bl: radius };
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
