// Keyboard, mouse and touch controls.

const MOVE_KEYS = {
	w: [0, -1],
	a: [-1, 0],
	s: [0, 1],
	d: [1, 0],
};

const CLICK_TOLERANCE = 20; // Max drag distance (canvas px) that still counts as a click

let keyHeld = false;

document.addEventListener('keydown', e => {
	if (keyHeld || e.ctrlKey || e.metaKey || e.altKey) {
		return;
	}
	keyHeld = true;
	const key = e.key.toLowerCase();
	if (MOVE_KEYS[key]) {
		movePlayer(...MOVE_KEYS[key]);
	}
	else if (editor) {
		editor.handleKey(key);
	}
});

document.addEventListener('keyup', () => {
	keyHeld = false;
	update();
});

function movePlayer(dx, dy) {
	if (!levelComplete) {
		player.slide(dx, dy);
	}
}


// Clicking a slider moves it.

let mouseDownPos;

canvas.addEventListener('mousedown', e => {
	mouseDownPos = toCanvasPos(e);
});

canvas.addEventListener('mouseup', e => {
	const pos = toCanvasPos(e);
	if (mouseDownPos && Math.abs(pos.x - mouseDownPos.x) <= CLICK_TOLERANCE && Math.abs(pos.y - mouseDownPos.y) <= CLICK_TOLERANCE) {
		const x = Math.floor(pos.x / cellWidth);
		const y = Math.floor(pos.y / cellHeight);
		const slider = sliders.find(s => s.x === x && s.y === y);
		if (slider) {
			slider.move();
		}
	}
	mouseDownPos = null;
	updateAfterMove();
});


// Swiping anywhere on the page moves the player.

let touchStartPos = null;

document.addEventListener('touchstart', e => {
	touchStartPos = toCanvasPos(e.touches[0]);
});

document.addEventListener('touchmove', e => {
	e.preventDefault(); // Don't scroll the page while swiping
	if (!touchStartPos) {
		return;
	}
	const pos = toCanvasPos(e.touches[0]);
	const dx = pos.x - touchStartPos.x;
	const dy = pos.y - touchStartPos.y;
	if (dx === 0 && dy === 0) {
		return;
	}
	if (Math.abs(dx) > Math.abs(dy)) {
		movePlayer(Math.sign(dx), 0);
	}
	else {
		movePlayer(0, Math.sign(dy));
	}
	touchStartPos = null;
	updateAfterMove();
}, { passive: false });


// Convert a mouse or touch position to canvas coordinates.
function toCanvasPos({ clientX, clientY }) {
	const rect = canvas.getBoundingClientRect();
	return {
		x: (clientX - rect.left) * canvas.width / rect.width,
		y: (clientY - rect.top) * canvas.height / rect.height,
	};
}
