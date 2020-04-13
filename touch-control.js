document.addEventListener('touchstart', handleTouchStart, false);        
document.addEventListener('touchmove', handleTouchMove, false);


var xDown = null;                                                        
var yDown = null;  

function handleTouchStart(evt) {  
    var rect = board.getBoundingClientRect();   
                                  
    xDown = 1.0 * (evt.touches[0].clientX-rect.left) * c.width / board.clientWidth;                                   
    yDown = 1.0 * (evt.touches[0].clientY-rect.top) * c.height / board.clientHeight;
}                                             

function handleTouchMove(evt) {

    evt.preventDefault();

    if ( ! xDown || ! yDown ) {
        return;
    }
    var rect = board.getBoundingClientRect();
    var xUp = 1.0 * (evt.touches[0].clientX-rect.left) * c.width / board.clientWidth;                                   
    var yUp = 1.0 * (evt.touches[0].clientY-rect.top) * c.height / board.clientHeight;

    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;

    if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
        if ( xDiff > 0 ) {
            player_sqr.moveLeft();
        } else {
            player_sqr.moveRight();
        }                       
    } else {
        if ( yDiff > 0 ) {
            player_sqr.moveUp();
        } else { 
            player_sqr.moveDown();
        }    
    }                                                             
	setTimeout(function() {
      pause(200);
      refreshBoard();
    }, 20);

    /* reset values */
    xDown = null;
    yDown = null;                                             
}

var mouse_x_tmp, mouse_y_tmp;

function mouseDown(e) {

	active = 1;
    var pos = getMousePos(board, e);
    mouse_x_tmp = pos.x;
    mouse_y_tmp = pos.y;
}


function mouseUp(e) {

    var pos = getMousePos(board, e);
	
	var dx = pos.x - mouse_x_tmp;
	var dy = pos.y - mouse_y_tmp;
	
	if (Math.abs(dx) <= 20 && Math.abs(dy) <= 20) {
		for (var i=0; i<level.numOfHorizontalSliders; i++) {
			if (horizontalSlider[i].x*cellWidth < pos.x && pos.x < (horizontalSlider[i].x+1)*cellWidth && horizontalSlider[i].y*cellHeight < pos.y && pos.y < (horizontalSlider[i].y+1)*cellHeight) {
				horizontalSlider[i].move();
			}
		}
		for (var i=0; i<level.numOfVerticalSliders; i++) {
			if (verticalSlider[i].x*cellWidth < pos.x && pos.x < (verticalSlider[i].x+1)*cellWidth && verticalSlider[i].y*cellHeight < pos.y && pos.y < (verticalSlider[i].y+1)*cellHeight) {
				verticalSlider[i].move();
			}
		}
	}
	
	setTimeout(function() {
      pause(200);
      refreshBoard();
    }, 20);

	active = 0;
}

function getMousePos(board, evt) {
    var rect = board.getBoundingClientRect();
	var xxx = 1.0 * (evt.clientX-rect.left) * c.width / board.clientWidth;
	var yyy = 1.0 * (evt.clientY-rect.top) * c.height / board.clientHeight;

    return {
      x: xxx,
      y: yyy
    };
}