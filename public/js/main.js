// main.js

let socket = io();

document.addEventListener("DOMContentLoaded", function() {
    // Σύνδεση του χρήστη στον server όταν φορτώνει η σελίδα
    socket.emit('joinGame', { userId: 'player' });

    // Ανάλογα με την επιλογή στο index.html, θα κατευθυνθείς στο game
    // Αργότερα θα προστεθούν event listeners και για την επιλογή του δωματίου
});

// Ενέργειες που σχετίζονται με το παιχνίδι, όπως join, δημιουργία κ.λπ.
