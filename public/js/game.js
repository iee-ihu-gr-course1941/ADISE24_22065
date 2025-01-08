// game.js

let socket = io();

// Διαχείριση πίνακα
let board = document.getElementById('board');
let currentPlayer = 'player1'; // Μπορείς να το αντικαταστήσεις με μια δυναμική τιμή
let gameState = [
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null]
];

// Δημιουργία του πίνακα
function createBoard() {
    for (let row = 0; row < 7; row++) {
        for (let col = 0; col < 7; col++) {
            let cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.row = row;
            cell.dataset.col = col;
            cell.addEventListener('click', makeMove);
            board.appendChild(cell);
        }
    }
}

// Κίνηση του παίκτη
function makeMove(e) {
    let row = e.target.dataset.row;
    let col = e.target.dataset.col;
    
    // Εάν η θέση είναι κενή, κάνε την κίνηση
    if (gameState[row][col] === null) {
        gameState[row][col] = currentPlayer;
        e.target.classList.add(currentPlayer);
        socket.emit('playerMove', { row, col, player: currentPlayer });
        
        // Εναλλαγή παίκτη
        currentPlayer = (currentPlayer === 'player1') ? 'player2' : 'player1';
        updatePlayerInfo();
    }
}

// Ενημέρωση του παίκτη που παίζει
function updatePlayerInfo() {
    document.getElementById('current-player').textContent = `Τρέχων Παίκτης: ${currentPlayer}`;
}

// Λήψη κίνησης από τον server
socket.on('moveMade', (data) => {
    let cell = document.querySelector(`[data-row="${data.row}"][data-col="${data.col}"]`);
    cell.classList.add(data.player);
    gameState[data.row][data.col] = data.player;
    currentPlayer = (currentPlayer === 'player1') ? 'player2' : 'player1';
    updatePlayerInfo();
});

// Δημιουργία του πίνακα όταν φορτώνει η σελίδα
createBoard();
