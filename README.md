# sqrGame

A sliding-block maze puzzle. Slide the green square into the white one; it only
stops when it hits a wall, a block or another square.

## Running

It's a static site with no build step. Serve the folder and open it in a browser:

```sh
python3 -m http.server 8000
```

- http://localhost:8000/ — the game
- http://localhost:8000/edit.html — the level editor

## Deployment

Pushes to `master` deploy to GitHub Pages via `.github/workflows/pages.yml`
(it can also be run manually from the Actions tab).

## Files

| File | |
|---|---|
| `levels.js` | Level data (format documented at the top) |
| `game-board.js` | Board cells and walls: collision queries and drawing |
| `pieces.js` | Player, goal and slider squares |
| `main.js` | Game state, level loading, rendering and win check |
| `input.js` | Keyboard, mouse and touch controls |
| `level-edit.js` | Level editor (used by `edit.html`) |
