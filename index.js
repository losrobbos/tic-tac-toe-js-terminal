const readline = require("readline-sync");

let board = [
  [" ", " ", " "],
  [" ", " ", " "],
  [" ", " ", " "],
];

// do move:
// choose row and column

// do compuer move:
// choose randow row and column until we got a field not occupied so far

const symbols = ["X", "O"];
let gameOver = false;
let movesCount = 0;

const checkCancel = (choice) => {
  if (choice === -1) process.exit();
};

const displayBoard = () => {
  board.forEach((r) => {
    console.log(r);
  });
};

const clearBoard = () => {
  board = [
    [" ", " ", " "],
    [" ", " ", " "],
    [" ", " ", " "],
  ];
};

const checkWonLost = () => {
  const winner = determineWinner();
  if (winner) {
    displayBoard();
    console.log();
    console.log(winner === "O" ? "YOU WON!" : "YOU LOST! ");
    console.log();
    process.exit();
  }
};

const determineWinner = () => {
  // 1. check both diagonals
  symbolCount = 0;
  console.log();
  if (board[0][0] !== " " && board[0][0] === board[1][1] && board[1][1] === board[2][2])
    return board[0][0];
  if (board[1][1] !== " " && board[0][2] === board[1][1] && board[1][1] === board[2][0])
    return board[1][1];

  // for player and opponent => check streak
  for (let s = 0; s < symbols.length; s++) {
    const symbol = symbols[s];

    for (let r = 0; r < board.length; r++) {
      let symbolCount = 0;
      // 1. check row
      for (let c = 0; c < board[r].length; c++) {
        if (board[r][c] === symbol) symbolCount++;
      }
      // whole row matches symbol? return!
      if (symbolCount === board.length) {
        // return winning symbol
        return symbol;
      }
      // 2. check column
      symbolCount = 0;
      for (let c = 0; c < board[r].length; c++) {
        if (board[c][r] === symbol) symbolCount++;
      }
      // whole column matches symbol? return!
      if (symbolCount === board.length) {
        // return winning symbol
        return symbol;
      }
    }
  }
  return false;
};

const checkBoardFull = () => {
  // board filled completely? Game over!
  if (movesCount === board.length * board.length) {
    console.log();
    console.log("GAME OVER! NO WINNER");
    console.log();
    return process.exit();
  }
};

// GAME BEGINS HERE:..

console.log("Let's play TIC TAC TOE, you loser. Begin...");

do {
  // pick row
  const row = readline.keyInSelect([1, 2, 3], "Place at row:");
  checkCancel(row);
  const col = readline.keyInSelect([1, 2, 3], "Place at column:");
  checkCancel(col);

  // check if move invalid...
  if (board[row][col] != " ") {
    console.log();
    console.log(
      "MOVE INVALID! Already an item placed there! Take more care, buddy!"
    );
    displayBoard();
    continue;
  }

  // move valid => place item
  board[row][col] = "O";
  movesCount++;

  // check if WON!
  checkWonLost();

  checkBoardFull();

  // random row col from "enemy"
  let rowEnemy, colEnemy;
  do {
    rowEnemy = Math.floor(Math.random() * 3);
    colEnemy = Math.floor(Math.random() * 3);
  } while (board[rowEnemy][colEnemy] != " ");

  // do enemy move...
  board[rowEnemy][colEnemy] = "X";
  movesCount++;

  checkWonLost();
  checkBoardFull();

  displayBoard();
} while (!gameOver);
