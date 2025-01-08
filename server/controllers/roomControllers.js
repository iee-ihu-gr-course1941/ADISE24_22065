const pool = require('../db');

async function createRoom(data, socket) {
    const { roomCode } = data;

    // Ελέγχουμε αν το δωμάτιο υπάρχει ήδη
    const result = await pool.query('SELECT * FROM rooms WHERE code = $1', [roomCode]);

    if (result.rowCount === 0) {
        await pool.query('INSERT INTO rooms (code) VALUES ($1)', [roomCode]);
        socket.emit('roomCreated', { roomCode });
    } else {
        socket.emit('roomError', { message: 'Room already exists' });
    }
}

async function joinRoom(data, socket) {
    const { roomCode } = data;

    // Ελέγχουμε αν το δωμάτιο υπάρχει
    const result = await pool.query('SELECT * FROM rooms WHERE code = $1', [roomCode]);

    if (result.rowCount > 0) {
        socket.emit('joinedRoom', { roomCode });
    } else {
        socket.emit('roomError', { message: 'Room not found' });
    }
}

module.exports = { createRoom, joinRoom };
