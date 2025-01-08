// Αρχικοποίηση πλέγματος 7x7
const boardSize = 7;
const board = Array.from({ length: boardSize }, () => Array(boardSize).fill(null));

// Παίκτες
const PLAYER_ONE = "X";
const PLAYER_TWO = "O";

const redOwns = document.querySelector(".left span");
const yellowOwns = document.querySelector(".right span");

// Λειτουργία για την καταμέτρηση των τετραγώνων που κατέχει κάθε παίκτης
function countPlayerSquares(player) {
  let count = 0;
  board.forEach(row => {
    row.forEach(cell => {
      if (cell === player) {
        count++;
      }
    });
  });
  return count;
}

// Ενημέρωση της οθόνης με τους αριθμούς των κατειλημμένων τετραγώνων
function updateOwnershipDisplay() {
    const redCount = countPlayerSquares(PLAYER_ONE); // Αριθμός τετραγώνων για τον κόκκινο παίκτη
    const yellowCount = countPlayerSquares(PLAYER_TWO); // Αριθμός τετραγώνων για τον κίτρινο παίκτη
  
    // Ενημέρωση των HTML στοιχείων με τους αριθμούς
    document.getElementById("red-owns").textContent = `Red owns: ${redCount}`;
    document.getElementById("yellow-owns").textContent = `Yellow owns: ${yellowCount}`;
}

// Αρχική τοποθέτηση
board[0][0] = PLAYER_ONE;
board[boardSize - 1][boardSize - 1] = PLAYER_ONE;
board[0][boardSize - 1] = PLAYER_TWO;
board[boardSize - 1][0] = PLAYER_TWO;

// Εμφάνιση πλέγματος
function printBoard() {
  console.clear();
  board.forEach(row => console.log(row.map(cell => cell || ".").join(" ")));
}

// Έλεγχος αν μια θέση είναι έγκυρη
function isValidPosition(x, y) {
  return x >= 0 && y >= 0 && x < boardSize && y < boardSize;
}

// Κίνηση (αναπαραγωγή ή άλμα)
function movePiece(player, fromX, fromY, toX, toY) {
  // Βεβαιώσου ότι η αρχική και τελική θέση είναι έγκυρες
  if (!isValidPosition(fromX, fromY) || !isValidPosition(toX, toY)) {
    console.log("Μη έγκυρη θέση.");
    return false;
  }

  // Έλεγχος ότι η αρχική θέση ανήκει στον παίκτη
  if (board[fromX][fromY] !== player) {
    console.log("Η θέση δεν ανήκει στον παίκτη.");
    return false;
  }

  // Έλεγχος ότι η τελική θέση είναι κενή
  if (board[toX][toY] !== null) {
    console.log("Η τελική θέση δεν είναι κενή.");
    return false;
  }

  // Υπολογισμός απόστασης
  const dx = Math.abs(toX - fromX);
  const dy = Math.abs(toY - fromY);

  // Αναπαραγωγή (απόσταση 1)
  if (dx <= 1 && dy <= 1) {
    board[toX][toY] = player;
  }
  // Άλμα (απόσταση 2)
  else if (dx <= 2 && dy <= 2) {
    board[toX][toY] = player;
    board[fromX][fromY] = null;
  } else {
    console.log("Μη έγκυρη κίνηση.");
    return false;
  }

  // Μετατροπή γειτονικών κομματιών
  capturePieces(player, toX, toY);

  // Ενημέρωση της οθόνης με τις αλλαγές
  updateOwnershipDisplay();

  return true;
}

// Μετατροπή γειτονικών κομματιών
function capturePieces(player, x, y) {
  const directions = [
    [-1, -1], [-1, 0], [-1, 1],
    [0, -1],         [0, 1],
    [1, -1], [1, 0], [1, 1]
  ];

  directions.forEach(([dx, dy]) => {
    const nx = x + dx;
    const ny = y + dy;
    if (isValidPosition(nx, ny) && board[nx][ny] !== null && board[nx][ny] !== player) {
      board[nx][ny] = player;
    }
  });
}

// Έλεγχος για τέλος παιχνιδιού
function isGameOver() {
  let playerOneCount = 0;
  let playerTwoCount = 0;
  let emptyCount = 0;

  board.forEach(row => row.forEach(cell => {
    if (cell === PLAYER_ONE) playerOneCount++;
    else if (cell === PLAYER_TWO) playerTwoCount++;
    else emptyCount++;
  }));

  if (emptyCount === 0 || playerOneCount === 0 || playerTwoCount === 0) {
    console.log("Το παιχνίδι τελείωσε!");
    console.log(`Παίκτης 1: ${playerOneCount}, Παίκτης 2: ${playerTwoCount}`);
    return true;
  }
  return false;
}

// Παράδειγμα χρήσης
printBoard();
movePiece(PLAYER_ONE, 0, 0, 1, 1); // Αναπαραγωγή
printBoard();
movePiece(PLAYER_TWO, boardSize - 1, 0, boardSize - 3, 2); // Άλμα
printBoard();
isGameOver();
