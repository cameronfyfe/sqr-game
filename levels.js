// Level data.
//
// map:      one string per row. 'O' is a solid block; every other character is
//           an open cell, optionally with thin walls on some of its sides (see
//           WALL_SHAPES in game-board.js). The map must be square.
// player:   starting cell of the green square.
// goal:     cell the player has to reach.
// hSliders: orange squares that slide left/right when clicked.
// vSliders: orange squares that slide up/down when clicked.
//           dir is the direction a slider moves first when it's free to move
//           either way (1 = right/down, 0 = left/up).
//
// The level editor (edit.html) prints levels in this format.

const LEVELS = [
	// Level 0
	{
		map: [
			'OOOOOO',
			'O    O',
			'O    O',
			'O    O',
			'O    O',
			'OOOOOO',
		],
		player: { x: 2, y: 3 },
		goal: { x: 1, y: 1 },
	},
	// Level 1
	{
		map: [
			'OOOOOO',
			'OO   O',
			'O    O',
			'O    O',
			'OOO  O',
			'OOOOOO',
		],
		player: { x: 4, y: 4 },
		goal: { x: 4, y: 2 },
	},
	// Level 2
	{
		map: [
			'OOOOOOOOOOOO',
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
			'OOOOOOOOOOOO',
		],
		player: { x: 5, y: 3 },
		goal: { x: 6, y: 3 },
	},
	// Level 3
	{
		map: [
			'OOOOOOOOOOOOOOOO',
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
			'OOOOOOOOOOOOOOOO',
		],
		player: { x: 2, y: 11 },
		goal: { x: 13, y: 5 },
	},
	// Level 4
	{
		map: [
			'OOOOOOOOOOOOOOO',
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
			'OOOOOOOOOOOOOOO',
		],
		player: { x: 1, y: 2 },
		goal: { x: 11, y: 1 },
	},
	// Level 5
	{
		map: [
			'OOOOOOOOOOOO',
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
			'OOOOOOOOOOOO',
		],
		player: { x: 1, y: 1 },
		goal: { x: 2, y: 2 },
	},
	// Level 6
	{
		map: [
			'OOOOOO',
			'O    O',
			'O   OO',
			'OO   O',
			'O    O',
			'OOOOOO',
		],
		player: { x: 1, y: 1 },
		goal: { x: 2, y: 1 },
		hSliders: [{ x: 4, y: 4, dir: 0 }],
	},
	// Level 7
	{
		map: [
			'OOOOOO',
			'O __ O',
			'O == O',
			'O == O',
			'O -- O',
			'OOOOOO',
		],
		player: { x: 2, y: 3 },
		goal: { x: 3, y: 2 },
		vSliders: [{ x: 1, y: 4, dir: 0 }, { x: 4, y: 1, dir: 1 }],
	},
	// Level 8
	{
		map: [
			'OOOOOOOOOO',
			'OOOOOO OOO',
			'OOO O   OO',
			'O        O',
			'O        O',
			'O        O',
			'OO   O   O',
			'OO     OOO',
			'O    OOOOO',
			'OOOOOOOOOO',
		],
		player: { x: 8, y: 6 },
		goal: { x: 3, y: 2 },
		hSliders: [{ x: 1, y: 5, dir: 1 }],
	},
	// Level 9
	{
		map: [
			'OOOOOOOOOOOO',
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
			'OOOOOOOOOOOO',
		],
		player: { x: 3, y: 2 },
		goal: { x: 4, y: 5 },
		hSliders: [{ x: 2, y: 9, dir: 1 }],
	},
	// Level 10
	{
		map: [
			'OOOOOOOOOOOOOOOO',
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
			'OOOOOOOOOOOOOOOO',
		],
		player: { x: 2, y: 12 },
		goal: { x: 4, y: 12 },
	},
];
