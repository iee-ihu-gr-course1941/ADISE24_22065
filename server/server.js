const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

// Δημιουργία του Express app
const app = express();

// Δημιουργία του HTTP server
const server = http.createServer(app);

// Δημιουργία του Socket.io instance
const io = socketIo(server);

// Εξυπηρετούμε τα static αρχεία (όπως τα HTML, CSS, JS)
app.use(express.static('public'));

// Επικοινωνία μέσω του socket
io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });

    // Ακούει για κινήσεις παικτών
    socket.on('playerMove', (data) => {
        console.log('Player move:', data);
        // Ενημερώνουμε όλους τους χρήστες για τη νέα κίνηση
        io.emit('moveMade', data);
    });

    // Όταν ο παίκτης δημιουργεί ένα δωμάτιο
    socket.on('createRoom', (data) => {
        console.log(`Room created: ${data.roomCode}`);
        // Υποθέτουμε ότι το δωμάτιο δημιουργείται στον server
        io.emit('roomCreated', data);
    });

    // Όταν ο παίκτης ενώνει ένα δωμάτιο
    socket.on('joinRoom', (data) => {
        console.log(`Player joined room: ${data.roomCode}`);
        io.emit('joinedRoom', data);
    });
});

// Εκκινεί τον server στον θύρα 3000
server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
