let usernames = new Set();
let currentUser = '';

document.getElementById('usernameForm').onsubmit = function(event) {
    event.preventDefault();
    const usernameInput = document.getElementById('usernameInput').value.trim();

    if (usernames.has(usernameInput)) {
        document.getElementById('usernameError').textContent = 'Username is already taken. Please choose another one.';
    } else {
        usernames.add(usernameInput);
        currentUser = usernameInput;
        document.getElementById('usernameSection').style.display = 'none';
        document.getElementById('chatSection').style.display = 'block';
        document.getElementById('chatBox').innerHTML += `<div class="message"><p><strong>System:</strong> ${currentUser} joined the chat.</p></div>`;
    }
};

document.getElementById('chatForm').onsubmit = function(event) {
    event.preventDefault();
    const chatInput = document.getElementById('chat-input');
    const chatBox = document.getElementById('chatBox');

    if (chatInput.value.trim() !== '') {
        const newMessage = document.createElement('div');
        newMessage.className = 'message';
        newMessage.innerHTML = `<p><strong>${currentUser}:</strong> ${chatInput.value}</p>`;
        chatBox.appendChild(newMessage);
        chatInput.value = '';
        chatBox.scrollTop = chatBox.scrollHeight;
    }
};
