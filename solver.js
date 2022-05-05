// const { SudokuSolver } = require('@jlguenego/sudoku-generator');

// let grid = SudokuSolver.generate();
// grid = SudokuSolver.carve(grid, 55);
// grid = grid.flat();

const grid = [
  0, 0, 3, 0, 7, 0, 4, 0, 0, 0, 0, 0,
  0, 8, 5, 0, 0, 6, 0, 5, 0, 0, 0, 0,
  0, 7, 0, 0, 0, 7, 0, 4, 0, 0, 0, 0,
  2, 0, 0, 7, 0, 3, 0, 0, 0, 0, 4, 0,
  0, 0, 0, 1, 2, 7, 0, 0, 5, 0, 2, 6,
  9, 3, 0, 0, 2, 1, 0, 5, 0, 0, 0, 0,
  0, 0, 0, 8, 0, 0, 0, 4, 0
]

const gridNice = [
  [0, 0, 3, 0, 7, 0, 4, 0, 0], 
  [0, 0, 0, 0, 8, 5, 0, 0, 6],
  [0, 5, 0, 0, 0, 0, 0, 7, 0],
  [0, 0, 7, 0, 4, 0, 0, 0, 0],
  [2, 0, 0, 7, 0, 3, 0, 0, 0],
  [0, 4, 0, 0, 0, 0, 1, 2, 7], 
  [0, 0, 5, 0, 2, 6, 9, 3, 0], 
  [0, 2, 1, 0, 5, 0, 0, 0, 0],
  [0, 0, 0, 8, 0, 0, 0, 4, 0]
]

console.log(grid);

console.log(isValidBoard(grid));

const solution = depthFirstSolver(grid);

console.log(solution);

// console.log(isValidBoard(solution));

function depthFirstSolver(board) {
  const stack = [];

  // get first nodes and add to stack;
  const index = board.indexOf(0);

  for (let i = 1; i <= 9; i++) {
    let newBoard = board.slice();
    newBoard[index] = i;

    if (isValidBoard(newBoard)) {
      stack.push(newBoard);
    } 
  }

  while (stack.length > 0) {
    const currentBoard = stack.pop();
    const indexNextEmpty = currentBoard.indexOf(0);

    // if all positions non-zero, this return solution
    if (indexNextEmpty === -1) return currentBoard;

    // add new boards to stack
    for (let i = 1; i <= 9; i++) {
      let newBoard = currentBoard.slice();
      newBoard[indexNextEmpty] = i;
  
      if (isValidBoard(newBoard)) {
        stack.push(newBoard);
      } 
    }
  }
}


function isValidBoard(board) {
  // board is an array
  // function returns true or false

  //rows 
  for (let i = 0; i < 9; i++) {
    const rowSet = new Set();
    for (let j = 0; j < 9; j++) {
      const el = board[i * 9 + j];
      if (el === 0) continue;
      if (rowSet.has(el)) {
        // console.log(`Invalid row at ${i * 9 + j}`);
        return false;
      }
      rowSet.add(el);
    }
  }

  // columns
  for (let i = 0; i < 9; i++) {
    const colSet = new Set();
    for (let j = 0; j < 9; j++) {
      const el = board[9 * j + i];
      if (el === 0) continue;
      if (colSet.has(el)) {
        // console.log(`Invalid col at ${9 * j + i}`);
        return false;
      }
      colSet.add(el);
    }
  }

  // squares;
  for (let i = 0; i < 9; i++) {
    const squareSet = new Set();
    for (let j = 0; j < 9; j++) {
      const el = board[Math.floor(j / 3) * (3 ** 2) + (j % 3) + 
        Math.floor(i / 3) * (3 ** 3) + (i % 3) * 3];
      if (el === 0) continue;
      if (squareSet.has(el)) {
        // console.log(`Invalid square at ${Math.floor(j / 3) * (3 ** 2) + (j % 3) + 
        //   Math.floor(i / 3) * (3 ** 3) + (i % 3) * 3}`);
        return false;
      }
      squareSet.add(el);
    }
  }

  return true;
}
