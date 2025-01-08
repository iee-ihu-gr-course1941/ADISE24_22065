const boardElement = document.getElementById("board");
const playerIndicator = document.getElementById("player-indicator"); // Για την ενημέρωση της σειράς

// Ενημέρωση πλέγματος στον browser
function renderBoard() {
  boardElement.innerHTML = "";

  for (let x = 0; x < boardSize; x++) {
    for (let y = 0; y < boardSize; y++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.dataset.x = x;
      cell.dataset.y = y;

      if (board[x][y] === PLAYER_ONE) {
        cell.classList.add("player1");
        cell.textContent = "X";
      } else if (board[x][y] === PLAYER_TWO) {
        cell.classList.add("player2");
        cell.textContent = "O";
      }

      cell.addEventListener("click", () => handleCellClick(x, y));
      boardElement.appendChild(cell);
    }
  }

  // Ενημέρωση τρέχοντος παίκτη
  playerIndicator.textContent = currentPlayer === PLAYER_ONE ? "X" : "O";
}

let selectedPiece = null;
let currentPlayer = PLAYER_ONE;

function handleCellClick(x, y) {
  if (selectedPiece) {
    const [fromX, fromY] = selectedPiece;
    if (movePiece(currentPlayer, fromX, fromY, x, y)) {
      currentPlayer = currentPlayer === PLAYER_ONE ? PLAYER_TWO : PLAYER_ONE;
      selectedPiece = null;
      renderBoard();
      if (isGameOver()) {
        alert("Το παιχνίδι τελείωσε!");
      }
    } else {
      alert("Μη έγκυρη κίνηση!");
    }
  } else if (board[x][y] === currentPlayer) {
    selectedPiece = [x, y];
  }
}

// Αρχική εμφάνιση πλέγματος
renderBoard();
