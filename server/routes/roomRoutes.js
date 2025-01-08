const express = require('express');
const router = express.Router();
const { createRoom, joinRoom } = require('../controllers/roomController');

router.post('/createRoom', createRoom);
router.post('/joinRoom', joinRoom);

module.exports = router;
