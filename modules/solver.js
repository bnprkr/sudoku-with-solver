function isValidEntry(board, entryIndex) {
  // get row (zero indexed)
  const row = Math.floor(entryIndex / 9);

  // get column (zero indexed)
  const col = Math.floor(entryIndex % 9);

  // get square (zero indexed)
  const square = Math.floor(entryIndex / (3 ** 3)) * 3 + Math.floor((entryIndex % 9) / 3);

  //rows 
  const rowSet = new Set();
  for (let j = 0; j < 9; j++) {
    const el = board[row * 9 + j];
    if (el === 0) continue;
    if (rowSet.has(el)) {
      return false;
    }
    rowSet.add(el);
  }
  
  // columns
  const colSet = new Set();
  for (let j = 0; j < 9; j++) {
    const el = board[9 * j + col];
    if (el === 0) continue;
    if (colSet.has(el)) {
      return false;
    }
    colSet.add(el);
  }


  // squares;
  const squareSet = new Set();
  for (let j = 0; j < 9; j++) {
    const el = board[Math.floor(j / 3) * (3 ** 2) + (j % 3) + 
      Math.floor(square / 3) * (3 ** 3) + (square % 3) * 3];
    if (el === 0) continue;
    if (squareSet.has(el)) {
      return false;
    }
    squareSet.add(el);
  }

  return true;
}

function depthFirstSolver(board) {
  const stack = [];
  const path = [];

  // get first nodes and add to stack;
  const index = board.indexOf(0);

  // save index so know when backtracked
  let prevIndex = index;

  for (let i = 1; i <= 9; i++) {
    let newBoard = board.slice();
    newBoard[index] = i;

    if (isValidBoard(newBoard)) {
      stack.push([newBoard, [i, index]]);
    } 
  }

  while (stack.length > 0) {
    const [currentBoard, change] = stack.pop();
    const indexNextEmpty = currentBoard.indexOf(0);

    // if index is before previous index, add removals to path
    if (change[1] < prevIndex) {
      for (let i = prevIndex; i > change[1]; i--) {
        if (board[i] === 0) {
          path.push([0, i]);
        }
      }
    }

    // add current change to path
    path.push([change[0], change[1]]);

    // update prevIndex
    prevIndex = change[1];

    // if all positions non-zero, this return solution and path
    if (indexNextEmpty === -1) return [currentBoard, path];

    // add new boards to stack
    for (let i = 1; i <= 9; i++) {
      let newBoard = currentBoard.slice();
      newBoard[indexNextEmpty] = i;
  
      if (isValidBoard(newBoard)) {
        stack.push([newBoard, [i, indexNextEmpty]]);
      } 
    }
  }

  // if no solution return null
  return [null, null];
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
        return false;
      }
      squareSet.add(el);
    }
  }

  return true;
}

function printGrid(board) {
  const printBoard = new Array(9).fill(null).map(() => Array(9));
  
  for (let i = 0; i < board.length; i++) {
    printBoard[Math.floor(i / 9)][i % 9] = board[i];
  }

  return printBoard;
}

export { depthFirstSolver, isValidBoard, isValidEntry };