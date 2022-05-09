import { grid, depthFirstSolver, isValidBoard } from './modules/solver.js';

// console.log(grid);

window.addEventListener('DOMContentLoaded', (e) => {
  
  grid.forEach((el, i) => {
    if (el !== 0) {
      const element = document.getElementById(String(i + 1));
      element.innerHTML = el;
    }
  });

  const solveButton = document.getElementById('solve-button');
  solveButton.addEventListener('click', (e) => {
    const solution = depthFirstSolver(grid);
    solution.forEach((el, i) => {
      const element = document.getElementById(String(i + 1));
      element.innerHTML = el;
    });
  });


});