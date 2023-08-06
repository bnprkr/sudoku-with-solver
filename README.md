# Sudoku with solver

## Introduction

Sudoku game with solver algorithm (depth first search; described below), solver visualisation and highlighting of invalid entries (i.e. the same entry already exists in the current row, column or 3x3 square).

## Live demo

https://sudoku.benparker.net

## Solver algorithm

The current board can be solved with the “solve” button, which applies depth first search with backtracking to search for the solution. This algorithm starts from the top left and works left to right, top to bottom through each board square as follows:

1. Calculate the valid entries for the current single square (note this is a function of the entries in the current column, row and current 3x3 square, hence the number of valid entries and corresponding search space will decrease as the algorithm progresses)
2. Randomly select a valid entry and proceed to the next square, repeating steps 1 and 2
3. If there are no valid entries for the current square, backtrack to the first previous square with remaining valid entries, and go back to step 1
4. Continue until all squares contain a valid entry

## Technologies

This project is implemented in HTML, CSS and vanilla JavaScript with a responsive design.

## Motivation

This was a simple project with a nice visualisation of a popular algorithm (depth first search).

## Future features

There are a number of potential improvements to the game itself such as easy/medium/hard boards and modifying the way input is entered, particularly on mobile.

The visualisation uses CSS classes and a fade animation to add/remove the background color when a square is modified. The number of steps needed to solve the board varies depending on the board and so the visualisation time is standardised to take 10 seconds for all boards. It would be interesting to use the Canvas API for the visualisation for faster rendering which might improve the visualisation and lead to a more consistent experience across different devices.

It would also be interesting to implement alternative algorithms for the solver (e.g. simulated annealing) and allow the user to choose an algorithm and see visualisations for how different algorithms solve the same board.
