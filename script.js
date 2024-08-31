// Initialize set to store unique usernames
let userSet = new Set();
let activeUser = '';

// Ensure DOM is fully loaded before executing the script
document.addEventListener('DOMContentLoaded', function() {

    // Handle the submission of the username form
    document.getElementById('usernameForm').onsubmit = function(event) {
        event.preventDefault();
        const username = document.getElementById('usernameInput').value.trim();

        // Check if the username already exists
        if (userSet.has(username)) {
            document.getElementById('usernameError').textContent = 'Username is taken. Try another one.';
        } else {
            userSet.add(username);
            activeUser = username;
            document.getElementById('usernameSection').style.display = 'none';
            document.getElementById('chatSection').style.display = 'block';
            document.getElementById('chatBox').innerHTML += `<div class="message"><p><strong>System:</strong> ${activeUser} joined the chat.</p></div>`;
        }
    };

    // Handle the submission of the chat message form
    document.getElementById('chatForm').onsubmit = function(event) {
        event.preventDefault();
        const messageInput = document.getElementById('chat-input');
        const chatContainer = document.getElementById('chatBox');

        // Add message if the input is not empty
        if (messageInput.value.trim() !== '') {
            const messageElement = document.createElement('div');
            messageElement.className = 'message';
            messageElement.innerHTML = `<p><strong>${activeUser}:</strong> ${messageInput.value}</p>`;
            chatContainer.appendChild(messageElement);
            messageInput.value = '';
            chatContainer.scrollTop = chatContainer.scrollHeight;
        }
    };
});
