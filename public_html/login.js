$(document).ready(function () {
document.getElementById('login').addEventListener('click', function () {
        const username = document.getElementById('username').value.trim();

        if (!username) {
            return;
        }
        $.ajax({
            url: 'login.php',
            type: 'POST',
            data: {
                username: username
            },
            success: function () {
                window.location.href = 'create-room.html';
            },
            error: function (xhr, status, error) {
                console.error('Error starting game:', error);
            }
        });
    });

});
