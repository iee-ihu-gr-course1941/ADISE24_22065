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
    
    if (!isset($_SESSION['roomid']) || empty($_SESSION['roomid'])) {
        http_response_code(401);
        echo json_encode(["error" => "Room not joined."]);
        exit();
    }

    $roomid = $_SESSION['roomid'];
    $player = $_SESSION['username'];
   

    
    $roomcodeql = "SELECT * FROM rooms_game_state
                    WHERE room_id = '$roomid'";
    $result = $conn->query($roomcodeql);
    
    if (!$result) {
        echo json_encode(['message' => 'Room does not exists.']);
        $conn->close();
        exit;
    }
    
    
    $data = [];
    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
    
    
    echo json_encode(['success' => true, 'room' => $data[0]]);
    $conn->close();
    exit;
}
?>
