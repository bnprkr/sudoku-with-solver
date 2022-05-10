import { grid, depthFirstSolver, isValidBoard } from './modules/solver.js';

// console.log(grid);

window.addEventListener('DOMContentLoaded', (e) => {

  // add html for board
  const boardElement = document.getElementById('sudoku-board');
  for (let i = 1; i <= 81; i++) {
    boardElement.innerHTML += `
      <div class="sudoku-board-cell">
        <input type="text" pattern="\\d*" id="${i}" maxlength="1">
      </div>
    `
  }

  const inputs = document.querySelectorAll('.sudoku-board-cell>input');
  inputs.forEach(input => {
    input.addEventListener('focusout', (e) => {
      if (!input.validity.valid) input.value = '';
    })
  });
  
  grid.forEach((el, i) => {
    if (el !== 0) {
      const element = document.getElementById(String(i + 1));
      element.value = el;
      element.readOnly = true;
    }
  });

  const solveButton = document.getElementById('solve-button');
  solveButton.addEventListener('click', (e) => {
    const [solution, path] = depthFirstSolver(grid);
    // solution.forEach((el, i) => {
    //   const element = document.getElementById(String(i + 1));
    //   element.innerHTML = el;
    // });

    path.forEach((el, i) => {
      const [val, pos] = el;
      const element = document.getElementById(String(pos + 1));
      
      setTimeout(() => {
        if (val === 0) {
          element.value = '';
          element.classList.remove("added");
          // element.classList.add("removed");
        } else {
          element.value = val;
          // element.classList.remove("removed");
          element.classList.add("added");
        }
      }, i * 0.05);
    });
  });


});