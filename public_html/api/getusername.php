<?php
session_start();

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    
    // Check if the session has the game ID
    if (!isset($_SESSION['username'])) {
        echo json_encode(['error' => 'No username found.']);
        exit;
    }
    
    $username = $_SESSION['username'];
    
    $response = [
    'username' => $username
    ];

    // Output the response as JSON
    echo json_encode($response);
}   else {
    // Respond with an error if the request is not POST
    http_response_code(405);
    echo json_encode(['error' => 'Invalid request method.']);
}

exit;
?>
