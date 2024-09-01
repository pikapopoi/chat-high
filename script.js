// Initialize set to store unique usernames
let userSet = new Set();
let activeUser = '';

// Function to sanitize user input
function sanitize(input) {
    const element = document.createElement('div');
    element.innerText = input;
    return element.innerHTML;
}

// Function to update the active user list
function updateUserList() {
    const userList = document.getElementById('userList');
    userList.innerHTML = '';
    userSet.forEach(user => {
        const li = document.createElement('li');
        li.textContent = user;
        userList.appendChild(li);
    });
}

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
            document.getElementById('usernameError').textContent = ''; // Clear error message
            document.getElementById('usernameSection').style.display = 'none';
            document.getElementById('chatSection').style.display = 'block';
            document.getElementById('chatBox').innerHTML += `<div class="message"><p><strong>System:</strong> ${sanitize(activeUser)} joined the chat.</p></div>`;
            updateUserList(); // Update the list of active users
        }
    };

    // Handle the submission of the chat message form
    document.getElementById('chatForm').onsubmit = function(event) {
        event.preventDefault();
        const messageInput = document.getElementById('chat-input');
        const chatContainer = document.getElementById('chatBox');

        // Add message if the input is not empty
        if (messageInput.value.trim() !== '') {
            const timestamp = new Date().toLocaleTimeString();
            const messageElement = document.createElement('div');
            messageElement.className = 'message';
            messageElement.innerHTML = `<p><strong>${sanitize(activeUser)}:</strong> ${sanitize(messageInput.value)} <span class="timestamp">${timestamp}</span></p>`;
            chatContainer.appendChild(messageElement);
            messageInput.value = '';
            chatContainer.scrollTop = chatContainer.scrollHeight; // Scroll to the bottom
        }
    };

    // Handle the submission of the feedback form
    document.getElementById('feedbackForm').onsubmit = function(event) {
        event.preventDefault();
        alert('Thank you for your feedback!');
        document.getElementById('feedbackForm').reset(); // Reset the form after submission
    };
});
