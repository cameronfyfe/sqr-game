const canvas = document.getElementById('board');
const ctx = canvas.getContext('2d');

let levelIndex;
let board;          // board[x][y] is the map character for that cell
let cols, rows;
let cellWidth, cellHeight, cornerRadius;
let player, goal;
let sliders = [];
let levelComplete = false;
let editor = null;  // Set by level-edit.js on the editor page


function loadLevel(index) {
	const level = LEVELS[index];
	levelIndex = index;
	levelComplete = false;

	rows = level.map.length;
	cols = level.map[0].length;
	board = [];
	for (let x = 0; x < cols; x++) {
		board[x] = level.map.map(row => row[x]);
	}
	resizeCells();

	goal = new GoalSqr(level.goal.x, level.goal.y);
	player = new PlayerSqr(level.player.x, level.player.y);
	sliders = [
		...(level.hSliders || []).map(s => new HorizontalSlider(s.x, s.y, s.dir)),
		...(level.vSliders || []).map(s => new VerticalSlider(s.x, s.y, s.dir)),
	];

	update();
}

function resizeCells() {
	cellWidth = canvas.width / cols;
	cellHeight = canvas.height / rows;
	cornerRadius = cellHeight / 5;
}

function render() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	drawBoard();
	goal.draw();
	player.draw();
	for (const slider of sliders) {
		slider.draw();
	}
	if (editor) {
		editor.draw();
	}
}

// Redraw, then move on to the next level if the player has reached the goal.
function update() {
	render();
	if (editor) {
		editor.showLevelCode();
		return;
	}
	if (!levelComplete && player.x === goal.x && player.y === goal.y) {
		levelComplete = true;
		setTimeout(() => loadLevel((levelIndex + 1) % LEVELS.length), 500);
	}
}

// Redraw shortly after a move, so its motion trail stays visible for a moment.
function updateAfterMove() {
	setTimeout(update, 200);
}


loadLevel(0);
