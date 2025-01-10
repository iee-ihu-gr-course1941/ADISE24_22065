<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

session_start();

// Σύνδεση με τη βάση δεδομένων
$servername = "localhost";
$username = "u150579979_mariana";
$password = "/1pbuK#R";
$dbname = "u150579979_ataxx";

$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(["error" => "Database connection failed."]);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Check if user is logged in
    if (!isset($_SESSION['username']) || empty($_SESSION['username'])) {
        http_response_code(401);
        echo json_encode(["error" => "User not logged in."]);
        exit();
    }

    // Get the username from the session
    $playerOne = $_SESSION['username'];


    $roomcodeql = "SELECT room_id FROM rooms_game_state
    WHERE (player_one = '$playerOne' OR player_two = '$playerOne') AND status = 'in_progress' ";
    $result = $conn->query($roomcodeql);

    if ($result && $result->num_rows > 0) {
        $row = $result->fetch_assoc(); // Fetch the first row directly
        $_SESSION['roomid'] = $row['room_id']; // Access room_id directly
        echo json_encode(['message' => 'Room already exists.']);
        $conn->close();
        exit;
    }
    
    // New room
    do {
        // Generate a new room code
        $roomCode = generateRoomCode();
    
        $roomcodeql = "SELECT 1 FROM rooms_game_state WHERE room_id = '$roomCode'";
        $result = $conn->query($roomcodeql);
    } while ($result && $result->num_rows > 0);
    $_SESSION['roomid'] = $roomCode;
    
    $board = json_encode(initializeBoard());
    
    $roomsql = "INSERT INTO rooms_game_state (room_id, status, player_one, player_two, board_state, current_turn) VALUES ('$roomCode', 'in_progress', '{$_SESSION['username']}', NULL, '$board', 'player_one')";

    $conn->query($roomsql);
    
    $conn->close();
    echo json_encode(['message' => 'Room created.']);
    exit;
}

// Initialize the board state (replace with your game's logic)
function initializeBoard() {
    return [
        ["X", "-", "-", "-", "-", "-", "O"],
        ["-", "-", "-", "-", "-", "-", "-"],
        ["-", "-", "-", "-", "-", "-", "-"],
        ["-", "-", "-", "-", "-", "-", "-"],
        ["-", "-", "-", "-", "-", "-", "-"],
        ["-", "-", "-", "-", "-", "-", "-"],
        ["O", "-", "-", "-", "-", "-", "X"]
    ];
}

function generateRoomCode() {
    $characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    $roomCode = '';
    $length = 5;

    for ($i = 0; $i < $length; $i++) {
        $roomCode .= $characters[rand(0, strlen($characters) - 1)];
    }

    return $roomCode;
}
?>
