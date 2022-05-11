import { depthFirstSolver, isValidBoard, isValidEntry } from './modules/solver.js';
import { boards } from './modules/boards.js';

function generateBoard(boards) {
  const board = boards[Math.floor(Math.random() * boards.length)];

  board.forEach((el, i) => {
    const element = document.getElementById(String(i + 1));
    element.parentElement.classList.remove('invalid');
    if (el === 0) {
      element.value = ''; 
      element.readOnly = false;
      element.classList.add('free');
    } else {
      element.value = el;
      element.readOnly = true;
      element.classList.remove('free');
    }
  });
}

function resetBoard() {
  const inputs = document.querySelectorAll('.sudoku-board-cell>input');

  inputs.forEach(input => {
    input.parentElement.classList.remove("added");
    input.parentElement.classList.remove('invalid');
    if (input.readOnly !== true) {
      input.value = '';
    }
  });
}

function getCurrentBoard() {
  const board = [];
  const inputs = document.querySelectorAll('.sudoku-board-cell>input');

  inputs.forEach(input => {
    const val = input.value;
    if (val === '') board.push(0);
    else board.push(parseInt(val));
  });

  return board;
}

window.addEventListener('DOMContentLoaded', (e) => {
  // add html for board
  const boardElement = document.getElementById('sudoku-board');
  for (let i = 1; i <= 81; i++) {
    boardElement.innerHTML += `
      <div class="sudoku-board-cell">
        <input type="text" pattern="^[1-9]$" id="${i}" maxlength="1">
      </div>
    `
  }
  
  // generate first board;
  generateBoard(boards);

  const inputs = document.querySelectorAll('.sudoku-board-cell>input.free');
  inputs.forEach(input => {
    // check validity of input on focusout and remove if not valid
    input.addEventListener('focusout', (e) => {
      if (input.value === '') {
        input.parentElement.classList.remove('invalid');
        return;
      }

      if (!input.validity.valid) {
        input.value = '';
        input.parentElement.classList.remove('invalid');
        return;
      }
    });

    // check validity of entry on keyup and highlight red if not valid
    input.addEventListener('keyup', (e) => {
      // check if number 1-9 else return
      const regex = new RegExp('^[1-9]$');
      if (!regex.test(input.value)) return;

      const board = getCurrentBoard();
      const valid = isValidEntry(board, input.id - 1);

      if (!valid) {
        input.parentElement.classList.add('invalid');
      } else {
        input.parentElement.classList.remove('invalid');
      }
    });
  });

  // generate button generates a new board at random 
  const generateButton = document.getElementById('button-generate');
  generateButton.addEventListener('click', (e) => {
    generateBoard(boards);
  });

  // reset button resets board to original state
  const resetButton = document.getElementById('button-reset');
  resetButton.addEventListener('click', (e) => {
    resetBoard();
  });

  // solve button checks validity of board and attempts to solve if valid
  const solveButton = document.getElementById('button-solve');
  solveButton.addEventListener('click', (e) => {
    // check for invalid entries before attempting to solve
    const board = getCurrentBoard();
    const valid = isValidBoard(board);

    if (!valid) {
      alert('Please remove invalid entries (highlighted in red) before attempting to solve.');
      return;
    }

    const [solution, path] = depthFirstSolver(board);

    // alert if no solution possible
    if (solution === null) {
      alert('No solution is possible from the current board');
      return;
    }

    path.forEach((el, i) => {
      setTimeout(() => {
        const [val, pos] = el;
        const element = document.getElementById(String(pos + 1));
        if (val === 0) {
          element.value = '';
          element.parentElement.classList.remove("added");
        } else {
          element.parentElement.classList.remove("added");
          setTimeout(() => {
            element.parentElement.classList.add("added");
            element.value = val;
          }, 1);
        }
      }, i * (10000 / path.length));
    });
  });

});