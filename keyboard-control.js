document.onkeypress = move;
document.onkeyup = postmove;

var active = 0;

var mouse_x_tmp, mouse_y_tmp;

function move(e) {
	
	if (active || (player_sqr.x == goalSqr.x && player_sqr.y == goalSqr.y))
		return;
	active = 1;
	var evtobj=window.event? event : e //distinguish between IE's explicit event object (window.event) and Firefox's implicit.
	var unicode=evtobj.charCode? evtobj.charCode : evtobj.keyCode
	var actualkey=String.fromCharCode(unicode)
	if (actualkey=="s")
		player_sqr.moveDown();
	if (actualkey=="w")
		player_sqr.moveUp();
	if (actualkey=="d")
		player_sqr.moveRight();
	if (actualkey=="a")
		player_sqr.moveLeft();

	// Edit commands
	if (actualkey == ";") {
		editor.moveDown();
	}
	if (actualkey == "p") {
		editor.moveUp();
	}
	if (actualkey == "'") {
		editor.moveRight();
	}
	if (actualkey == "l") {
		editor.moveLeft();
	}
	if (actualkey == "b") {
		editor.toggleBlock();
	}
	if (actualkey == "r") {
		editor.placeGoal();
	}
	if (actualkey == "z") {
		editor.addHorizontalSliderSqr();
	}
	if (actualkey == "x") {
		editor.addVerticalSliderSqr();
	}
	if (actualkey == "g") {
		editor.toggleBottom();
	}
	if (actualkey == "t") {
		editor.toggleTop();
	}
	if (actualkey == "f") {
		editor.toggleLeft();
	}
	if (actualkey == "h") {
		editor.toggleRight();
	}
}

function postmove(e) {

	refreshBoard();
	if (debugModeOn === true) {
		refreshTextMap();
		editor.draw();
	}
	active = 0;
}