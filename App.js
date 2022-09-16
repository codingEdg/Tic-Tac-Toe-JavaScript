const X_CLASS = "x";
const CIRCLE_CLASS = "o";
const WINNING_COMBINATION = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// select all child elements by query selector-all
const cellElements = document.querySelectorAll("[data-cell]");
const restartBTN = document.querySelector("#restartButton");
const winningMessageTextElement = document.querySelector(
  ".data-winning-message-text"
);
const winningMessageElement = document.querySelector("#winningMessage");
let circleTurn;

let board = document.getElementById("board");

// Loop through all elemeents to addEventListener on click of each cell
// set object property ({once : true}): once we click on a cell to fire event it will fire event only once
startGame();
restartButton.addEventListener("click", startGame);

function startGame() {
  circleTurn = false;
  cellElements.forEach((cell) => {
    cell.classList.remove(X_CLASS);
    cell.classList.remove(CIRCLE_CLASS);
    cell.removeEventListener("click", handleClick);
    cell.addEventListener("click", handleClick, { once: true });
  });
  setBoardHoverClass();
  winningMessageElement.classList.remove("show");
}

function handleClick(e) {
  const cell = e.target;
  const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
  placeMark(cell, currentClass);
  //check for win
  if (checkWin(currentClass)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    swapTurns();
    setBoardHoverClass();
  }
  // check for draw
  // check whose turn it is
  // for hover functionality
}

function isDraw() {
  console.log("is draw has called");
  return [...cellElements].every((cell) => {
    return (
      cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
    );
  });
}

function endGame(draw) {
  if (draw) {
    winningMessageTextElement.innerText = "Draw";
  } else {
    winningMessageTextElement.innerText = `${
      circleTurn ? "O" : "X"
    } wins the game`;
  }
  winningMessageElement.classList.add("show");
}

// place mark
function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
}

function swapTurns() {
  circleTurn = !circleTurn;
}

function setBoardHoverClass() {
  board.classList.remove(X_CLASS);
  board.classList.remove(CIRCLE_CLASS);
  circleTurn ? board.classList.add(CIRCLE_CLASS) : board.classList.add(X_CLASS);
}

function checkWin(currentClass) {
  // check if any of the combination is having the same class
  return WINNING_COMBINATION.some((combination) => {
    return combination.every((index) => {
      return cellElements[index].classList.contains(currentClass);
    });
  });
}
