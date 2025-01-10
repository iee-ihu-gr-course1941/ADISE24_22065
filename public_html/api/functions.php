<?php

$servername = "localhost";
$username = "u150579979_mariana";
$password = "/1pbuK#R";
$dbname = "u150579979_ataxx";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
    return $conn;


// Function to register a user
function registerUser($username, $password) {
    global $conn;

    // Check if username already exists
    $stmt = $conn->prepare("SELECT * FROM users WHERE username = ?");
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        return ["success" => false, "message" => "Username already exists"];
    }

    // Insert new user
    $hashedPassword = password_hash($password, PASSWORD_BCRYPT);
    $stmt = $conn->prepare("INSERT INTO users (username, password) VALUES (?, ?)");
    $stmt->bind_param("ss", $username, $hashedPassword);
    if ($stmt->execute()) {
        return ["success" => true, "message" => "Registration successful"];
    } else {
        return ["success" => false, "message" => "Error during registration"];
    }
}

// Function to login a user
function loginUser($username, $password) {
    global $conn;

    $stmt = $conn->prepare("SELECT * FROM users WHERE username = ?");
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows === 0) {
        return ["success" => false, "message" => "Invalid username or password"];
    }

    $user = $result->fetch_assoc();

    if (password_verify($password, $user['password'])) {
        return ["success" => true, "message" => "Login successful"];
    } else {
        return ["success" => false, "message" => "Invalid username or password"];
    }
}
?>