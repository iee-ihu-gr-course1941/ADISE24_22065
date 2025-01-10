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

if ($conn->connect_error) {
    die(json_encode(["success" => false, "message" => "Database connection failed."]));
}
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    
    $username = isset($_POST['username']) ? trim($_POST['username']) : '';
    if (empty($username)) {
        http_response_code(400);
        echo json_encode(['error' => 'All fields are required.']);
        exit;
    }
    $_SESSION['username'] = $username;
    
    $usersql = "INSERT INTO users (username) VALUES ('$username')";
    
    $result = $conn->query($usersql);

    $data = [];
    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
    
    
    echo json_encode(['message' => 'Login was successful.']);
    $conn->close();
    exit;
    
    
}   else {
    // Respond with an error if the request is not POST
    http_response_code(405);
    echo json_encode(['error' => 'Invalid request method.']);
    exit;
}



?>
