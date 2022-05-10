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
          element.innerHTML = '';
          element.classList.remove("added");
          element.classList.add("removed");
        } else {
          element.innerHTML = val;
          element.classList.remove("removed");
          element.classList.add("added");
        }
      }, i * 0.05);
    });
  });


});