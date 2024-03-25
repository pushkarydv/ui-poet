const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');
const conversation = document.querySelector('.conversation');

sendBtn.addEventListener('click', sendMessage);
userInput.addEventListener('keyup', function(event) {
  if (event.key === 'Enter') {
    sendMessage();
  }
});

function sendMessage() {
  const message = userInput.value;
  if (message.trim() !== '') {
    addMessageToConversation('user', message);
    userInput.value = '';
    
    // Simulating bot response after 1 second
    setTimeout(function() {
      const botResponse = generateBotResponse(message);
      addMessageToConversation('bot', botResponse);
    }, 1000);
  }
}

function addMessageToConversation(sender, message) {
  const messageElement = document.createElement('div');
  messageElement.classList.add('message');
  
  if (sender === 'user') {
    messageElement.classList.add('user-message');
    messageElement.innerHTML = `<p>${message}</p>`;
  } else {
    messageElement.classList.add('bot-message');
    messageElement.innerHTML = `
      <img src="bot-avatar.png" alt="Bot Avatar">
      <p>${message}</p>
    `;
  }
  
  conversation.appendChild(messageElement);
  conversation.scrollTop = conversation.scrollHeight;
}

function generateBotResponse(userMessage) {
  // This is a placeholder function that should be replaced with actual bot logic
  return `You said: ${userMessage}. I am still learning and will have a better response soon!`;
}