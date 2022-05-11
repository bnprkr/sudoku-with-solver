import { grid, depthFirstSolver, isValidBoard, isValidEntry } from './modules/solver.js';

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

  grid.forEach((el, i) => {
    if (el !== 0) {
      const element = document.getElementById(String(i + 1));
      element.value = el;
      element.readOnly = true;
    }
  });

  const inputs = document.querySelectorAll('.sudoku-board-cell>input');
  inputs.forEach(input => {
    // check validity of input on focusout and remove if not valid
    input.addEventListener('focusout', (e) => {
      if (input.value === '') {
        input.parentElement.classList.remove('invalid');
        return;
      }

      if (!input.validity.valid) {
        input.value = '';
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

  getCurrentBoard();
  
  const solveButton = document.getElementById('solve-button');
  solveButton.addEventListener('click', (e) => {
    const [solution, path] = depthFirstSolver(grid);

    path.forEach((el, i) => {
      const [val, pos] = el;
      const element = document.getElementById(String(pos + 1));
      
      setTimeout(() => {
        if (val === 0) {
          element.value = '';
          element.classList.remove("added");
        } else {
          element.value = val;
          element.classList.add("added");
        }
      }, i * 0.05);
    });
  });

});