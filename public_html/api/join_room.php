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
    $playerTwo = $_SESSION['username'];
    if (!isset($_POST['room_id'])) {
        echo json_encode(['error' => 'Winner not specified.']);
        exit;
    }

    $roomid = $_POST['room_id'];
    $_SESSION['roomid'] = $roomid;
    
    $roomcodeql = "UPDATE rooms_game_state
    SET player_two = '$playerTwo' WHERE room_id = '$roomid' ";
    $conn->query($roomcodeql);
    
    $conn->close();
    echo json_encode(['message' => 'Joined room.']);
    exit;
}
?>
