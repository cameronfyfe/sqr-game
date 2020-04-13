const MAX_NUM_OF_SLIDERS = 10;

var numberOfLevels = 11;

var blockMap = new Array(numberOfLevels);
var tempMap = new Array(numberOfLevels);
var mapN = new Array(numberOfLevels);
var mapM = new Array(numberOfLevels);
var xPlayer = new Array(numberOfLevels);
var yPlayer = new Array(numberOfLevels);
var xGoal = new Array(numberOfLevels);
var yGoal = new Array(numberOfLevels);
var numOfHoriSliders = new Array(numberOfLevels);
var numOfVertSliders = new Array(numberOfLevels);
var dHoriSlider = new Array(numberOfLevels);
var dVertSlider = new Array(numberOfLevels);
var xHoriSlider = new Array(numberOfLevels);
var yHoriSlider = new Array(numberOfLevels);
var xVertSlider = new Array(numberOfLevels);
var yVertSlider = new Array(numberOfLevels);
for (var i=0; i<numberOfLevels; i++) {
	blockMap[i] = new Array(16);
	tempMap[i] = new Array(16);
	numOfHoriSliders[i] = 0;
	numOfVertSliders[i] = 0;
	xHoriSlider[i] = new Array(MAX_NUM_OF_SLIDERS);
	yHoriSlider[i] = new Array(MAX_NUM_OF_SLIDERS);
	xVertSlider[i] = new Array(MAX_NUM_OF_SLIDERS);
	yVertSlider[i] = new Array(MAX_NUM_OF_SLIDERS);
	dHoriSlider[i] = new Array(MAX_NUM_OF_SLIDERS);
	dVertSlider[i] = new Array(MAX_NUM_OF_SLIDERS);
	for (var j=0; j<16; j++) {
		tempMap[i][j] = new Array(16);
	}
}
var k;


k =/* LEVEL */ 0 /* */;
blockMap[k] = [	'OOOOOO',
				'O    O',
				'O    O',
				'O    O',
				'O    O',
				'OOOOOO'];
mapN[k] = 6;
mapM[k] = 6;
xPlayer[k] = 2;
yPlayer[k] = 3;
xGoal[k] = 1;
yGoal[k] = 1;


k =/* LEVEL */ 1 /* */;
blockMap[k] = [	'OOOOOO',
				'OO   O',
				'O    O',
				'O    O',
				'OOO  O',
				'OOOOOO'];
mapN[k] = 6;
mapM[k] = 6;
xPlayer[k] = 4;
yPlayer[k] = 4;
xGoal[k] = 4;
yGoal[k] = 2;
		

k =/* LEVEL */ 2 /* */;
blockMap[k] = [	'OOOOOOOOOOOO',
				'OOOOOOOOOOOO',
				'OOO  ][  OOO',
				'OO  _JL_ OOO',
				'OO  -TF-  OO',
				'OO   ][   OO',
				'OO        OO',
				'OOO      OOO',
				'OOOO    OOOO',
				'OOOOOOOOOOOO',
				'OOOOOOOOOOOO',
				'OOOOOOOOOOOO'];
mapN[k] = 12;
mapM[k] = 12;
xPlayer[k] = 5;
yPlayer[k] = 3;
xGoal[k] = 6;
yGoal[k] = 3;


k =/* LEVEL */ 3 /* */;
blockMap[k] = ['OOOOOOOOOOOOOOOO',
               'OOOOOOOOOOOOOOOO',
               'OO         O  OO',
               'OO  O   O     OO',
               'OO    O      OOO',
               'OO            OO',
               'OO           OOO',
               'OOO           OO',
               'OO            OO',
               'OO O   O      OO',
               'OO   O      O OO',
               'OO O       O  OO',
               'OO       O   OOO',
               'OO            OO',
               'OOOOOOOOOOOOOOOO',
               'OOOOOOOOOOOOOOOO'];
mapN[k] = 16;
mapM[k] = 16;
xPlayer[k] = 2;
yPlayer[k] = 11;
xGoal[k] = 13;
yGoal[k] = 5;


k =/* LEVEL */ 4 /* */;
blockMap[k] = ['OOOOOOOOOOOOOOO',
               'OO   OOO  O O O',
               'O             O',
               'OO      O     O',
               'O O          OO',
               'O O       O   O',
               'O       OO O  O',
               'O           O O',
               'O   O       O O',
               'OO       O O  O',
               'O  O          O',
               'O    O      O O',
               'O            OO',
               'OOOOOOOOOOOOOOO',
               'OOOOOOOOOOOOOOO'];
mapN[k] = 15;
mapM[k] = 15;
xPlayer[k] = 1;
yPlayer[k] = 2;
xGoal[k] = 11;
yGoal[k] = 1;


k =/* LEVEL */ 5 /* */;
blockMap[k] = ['OOOOOOOOOOOO',
               'O _  ]|[ _ O',
               'O]F  ][  T[O',
               'O          O',
               'O_        _O',
               'O-   JL ][-O',
               'O  ][TF  _ O',
               'O   _    T[O',
               'O   T[  _  O',
               'O]L     -J[O',
               'O -      - O',
               'OOOOOOOOOOOO'];
mapN[k] = 12;
mapM[k] = 12;
xPlayer[k] = 1;
yPlayer[k] = 1;
xGoal[k] = 2;
yGoal[k] = 2;


k =/* LEVEL */ 6 /* */;
blockMap[k] = [	'OOOOOO',
				'O    O',
				'O   OO',
				'OO   O',
				'O    O',
				'OOOOOO'];
mapN[k] = 6;
mapM[k] = 6;
xPlayer[k] = 1;
yPlayer[k] = 1;
xGoal[k] = 2;
yGoal[k] = 1;

numOfHoriSliders[k] = 1;
dHoriSlider[k][0] = 0;
xHoriSlider[k][0] = 4;
yHoriSlider[k][0] = 4;


k =/* LEVEL */ 7 /* */;
blockMap[k] = ['OOOOOO',
               'O __ O',
               'O == O',
               'O == O',
               'O -- O',
               'OOOOOO'];
mapN[k] = 6;
mapM[k] = 6;
xPlayer[k] = 2;
yPlayer[k] = 3;
xGoal[k] = 3;
yGoal[k] = 2;

numOfVertSliders[k] = 2;
xVertSlider[k][0] = 1;
yVertSlider[k][0] = 4;
dVertSlider[k][0] = 0;
xVertSlider[k][1] = 4;
yVertSlider[k][1] = 1;
dVertSlider[k][1] = 1;


k =/* LEVEL */ 8 /* */;
blockMap[k] = ['OOOOOOOOOO',
               'OOOOOO OOO',
               'OOO O   OO',
               'O        O',
               'O        O',
               'O        O',
               'OO   O   O',
               'OO     OOO',
               'O    OOOOO',
               'OOOOOOOOOO'];
mapN[k] = 10;
mapM[k] = 10;
xPlayer[k] = 8;
yPlayer[k] = 6;
xGoal[k] = 3;
yGoal[k] = 2;

numOfHoriSliders[k] = 1;
xHoriSlider[k][0] = 1;
yHoriSlider[k][0] = 5;
dHoriSlider[k][0] = 1;




k =/* LEVEL */ 9 /* */;
blockMap[k] = [	'OOOOOOOOOOOO',
				'OOOOOOOOOOOO',
				'OO        OO',
				'OO        OO',
				'OO  O     OO',
				'OO O O    OO',
				'OO        OO',
				'OOO       OO',
				'OOO      OOO',
				'OO        OO',
				'OOOOOOOOOOOO',
				'OOOOOOOOOOOO'];
mapN[k] = 12;
mapM[k] = 12;
xPlayer[k] = 3;
yPlayer[k] = 2;
xGoal[k] = 4;
yGoal[k] = 5;

numOfHoriSliders[k] = 1;
dHoriSlider[k][0] = 1;
xHoriSlider[k][0] = 2;
yHoriSlider[k][0] = 9;



k =/* LEVEL */ 10 /* */;
blockMap[k] = [	'OOOOOOOOOOOOOOOO',
				'OO        _    O',
				'O  ][     -_   O',
				'O   ][     -   O',
				'O ][ _    J[_  O',
				'O   ]F __ - T[ O',
				'O     ]FT[     O',
				'O            _ O',
				'O][    ][    - O',
				'O      OO   _  O',
				'O][_     ][ -][O',
				'O  -           O',
				'O _ _     ][ _ O',
				'O -]F _  __  - O',
				'O   ][-  --  OOO',
				'OOOOOOOOOOOOOOOO'];
mapN[k] = 16;
mapM[k] = 16;
xPlayer[k] = 2;
yPlayer[k] = 12;
xGoal[k] = 4;
yGoal[k] = 12;



class Level {
	constructor(index) {
		this.index = index;
		this.N = mapN[index];
		this.M = mapM[index];
		this.xPlayer = xPlayer[index];
		this.yPlayer = yPlayer[index];
		this.xGoal = xGoal[index];
		this.yGoal = yGoal[index];
		this.numOfHorizontalSliders = numOfHoriSliders[index];
		this.numOfVerticalSliders = numOfVertSliders[index];
		this.horizontalSlider = new Array (numOfHoriSliders);
		for (i=0; i<numOfHoriSliders; i++) {
			this.horizontalSlider[i] = new HorizontalSliderSqr(xHoriSlider[index][i],yHorislider[index][i], dHoriSlider[index][i]);
		}
	}
}


function getLevel(i) {

	level = new Level(i);

	return level;
}