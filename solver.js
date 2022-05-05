const { SudokuSolver } = require('@jlguenego/sudoku-generator');

let grid = SudokuSolver.generate();
grid = SudokuSolver.carve(grid, 55);
grid = grid.flat();

console.log(grid);


function isValidBoard(board) {
  // board is an array
  // function returns true or false

  //rows 
  for (let i = 0; i < 9; i++) {
    const rowSet = new Set();
    for (let j = 0; j < 9; j++) {
      const el = board[i * 9 + j];
      if (el === 0) continue;
      if (rowSet.has(el)) return false;
      rowSet.add(el);
    }
  }

  // columns
  for (let i = 0; i < 9; i++) {
    const colSet = new Set();
    for (let j = 0; j < 9; j++) {
      const el = board[9 * j + i];
      if (el === 0) continue;
      if (colSet.has(el)) return false;
      colSet.add(el);
    }
  }

  // squares;
  for (let i = 0; i < 9; i++) {
    const squareSet = new Set();
    for (let j = 0; j < 9; j++) {
      const el = board[Math.floor(j / 3) * 3 + (j % 3) + (i * 3)];
      if (el === 0) continue;
      if (squareSet.has(el)) return false;
      squareSet.add(el);
    }
  }

  return true;
}

function findNextEmpty(board) {
  // return index of next null value in board
  // if no non-null value return -1


}