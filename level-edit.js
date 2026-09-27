// Level editor, used by edit.html. Loaded after main.js.

const SIDE_DIRS = {
	[TOP]: [0, -1],
	[BOTTOM]: [0, 1],
	[LEFT]: [-1, 0],
	[RIGHT]: [1, 0],
};

class Editor {
	constructor() {
		this.x = 0;
		this.y = 0;
	}

	handleKey(key) {
		switch (key) {
			case 'p': this.moveCursor(0, -1); break;
			case 'l': this.moveCursor(-1, 0); break;
			case ';': this.moveCursor(0, 1); break;
			case "'": this.moveCursor(1, 0); break;
			case 'b': this.toggleBlock(); break;
			case 'r': this.placeGoal(); break;
			case 'z': this.toggleSlider(HorizontalSlider); break;
			case 'x': this.toggleSlider(VerticalSlider); break;
			case 't': this.toggleWall(TOP); break;
			case 'g': this.toggleWall(BOTTOM); break;
			case 'f': this.toggleWall(LEFT); break;
			case 'h': this.toggleWall(RIGHT); break;
		}
	}

	// Cursor: a gold/black/gold target in the selected cell
	draw() {
		const colors = ['gold', 'black', 'gold'];
		let padding = 0.25;
		for (const color of colors) {
			ctx.fillStyle = color;
			roundRect((this.x + padding) * cellWidth, (this.y + padding) * cellHeight,
				(1 - 2 * padding) * cellWidth, (1 - 2 * padding) * cellHeight, 2);
			padding *= 1.2;
		}
	}

	moveCursor(dx, dy) {
		if (inBounds(this.x + dx, this.y + dy)) {
			this.x += dx;
			this.y += dy;
		}
	}

	toggleBlock() {
		const { x, y } = this;
		if (isSolid(x, y)) {
			board[x][y] = ' ';
			return;
		}
		// Remove this cell's walls (and the matching walls on its neighbours) first
		for (const side of [TOP, BOTTOM, LEFT, RIGHT]) {
			if (hasWall(x, y, side)) {
				this.toggleWall(side);
			}
		}
		board[x][y] = SOLID;
	}

	// Toggle the wall on one side of the cell, keeping the neighbour's matching wall in sync.
	toggleWall(side) {
		const { x, y } = this;
		const [dx, dy] = SIDE_DIRS[side];
		const hasNeighbour = inBounds(x + dx, y + dy);
		if (isSolid(x, y) || (hasNeighbour && isSolid(x + dx, y + dy))) {
			return;
		}
		board[x][y] = shapeFromWalls(WALL_SHAPES[board[x][y]] ^ side);
		if (hasNeighbour) {
			const n = board[x + dx];
			n[y + dy] = shapeFromWalls(WALL_SHAPES[n[y + dy]] ^ facingSide(dx, dy));
		}
	}

	placeGoal() {
		goal.x = this.x;
		goal.y = this.y;
	}

	// Remove the slider under the cursor, or add one of the given type if there isn't one.
	toggleSlider(SliderType) {
		const index = sliders.findIndex(s => s.x === this.x && s.y === this.y);
		if (index !== -1) {
			sliders.splice(index, 1);
		}
		else {
			sliders.push(new SliderType(this.x, this.y, 1));
		}
	}

	resize(size) {
		const oldBoard = board;
		board = [];
		for (let x = 0; x < size; x++) {
			board[x] = [];
			for (let y = 0; y < size; y++) {
				board[x][y] = (oldBoard[x] && oldBoard[x][y]) || ' ';
			}
		}
		cols = rows = size;
		resizeCells();

		const clamp = sqr => {
			sqr.x = Math.min(sqr.x, size - 1);
			sqr.y = Math.min(sqr.y, size - 1);
		};
		clamp(this);
		clamp(player);
		clamp(goal);
		sliders = sliders.filter(s => inBounds(s.x, s.y));
		update();
	}

	// Print the level in the format used by levels.js.
	showLevelCode() {
		const rowStrings = [];
		for (let y = 0; y < rows; y++) {
			rowStrings.push(board.map(column => column[y]).join(''));
		}
		const formatSliders = type => sliders
			.filter(s => s instanceof type)
			.map(s => `{ x: ${s.x}, y: ${s.y}, dir: ${s.dir} }`)
			.join(', ');
		const hSliders = formatSliders(HorizontalSlider);
		const vSliders = formatSliders(VerticalSlider);

		const lines = [
			'\t{',
			'\t\tmap: [',
			...rowStrings.map(row => `\t\t\t'${row}',`),
			'\t\t],',
			`\t\tplayer: { x: ${player.x}, y: ${player.y} },`,
			`\t\tgoal: { x: ${goal.x}, y: ${goal.y} },`,
		];
		if (hSliders) lines.push(`\t\thSliders: [${hSliders}],`);
		if (vSliders) lines.push(`\t\tvSliders: [${vSliders}],`);
		lines.push('\t},');

		document.getElementById('level-code').value = lines.join('\n');
	}
}


editor = new Editor();

const sizeSelect = document.getElementById('mapsize');
sizeSelect.value = cols;
sizeSelect.addEventListener('change', () => editor.resize(Number(sizeSelect.value)));

update();
