// Save this file as: public/chatbot-widget.js in your Vercel project

(function() {
  const WIDGET_ID = 'claude-chatbot-widget';
  const API_ENDPOINT = '/api/chat'; // Your Vercel API endpoint
  
  // Create widget styles
  const styles = `
    #${WIDGET_ID}-container {
      position: fixed;
      bottom: 20px;
      right: 20px;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      z-index: 9999;
    }

    #${WIDGET_ID}-button {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
      color: white;
      border: none;
      font-size: 28px;
      cursor: pointer;
      box-shadow: 0 4px 12px rgba(99, 102, 241, 0.4);
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s ease;
    }

    #${WIDGET_ID}-button:hover {
      transform: scale(1.1);
      box-shadow: 0 6px 16px rgba(99, 102, 241, 0.6);
    }

    #${WIDGET_ID}-button.active {
      display: none;
    }

    #${WIDGET_ID}-window {
      position: absolute;
      bottom: 80px;
      right: 0;
      width: 400px;
      height: 600px;
      background: #0f172a;
      border-radius: 12px;
      box-shadow: 0 5px 40px rgba(0, 0, 0, 0.6);
      display: none;
      flex-direction: column;
      overflow: hidden;
      border: 1px solid #334155;
    }

    #${WIDGET_ID}-window.active {
      display: flex;
    }

    #${WIDGET_ID}-header {
      padding: 16px;
      background: linear-gradient(180deg, #1e293b 0%, #0f172a 100%);
      border-bottom: 1px solid #334155;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    #${WIDGET_ID}-header h3 {
      margin: 0;
      font-size: 18px;
      background: linear-gradient(135deg, #6366f1 0%, #f59e0b 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    #${WIDGET_ID}-close {
      background: none;
      border: none;
      color: #cbd5e1;
      font-size: 20px;
      cursor: pointer;
      padding: 0;
      width: 30px;
      height: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: color 0.2s;
    }

    #${WIDGET_ID}-close:hover {
      color: #f1f5f9;
    }

    #${WIDGET_ID}-messages {
      flex: 1;
      overflow-y: auto;
      padding: 16px;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    #${WIDGET_ID}-messages::-webkit-scrollbar {
      width: 6px;
    }

    #${WIDGET_ID}-messages::-webkit-scrollbar-track {
      background: transparent;
    }

    #${WIDGET_ID}-messages::-webkit-scrollbar-thumb {
      background: #334155;
      border-radius: 3px;
    }

    .${WIDGET_ID}-message {
      display: flex;
      gap: 8px;
      animation: slideIn 0.3s ease-out;
    }

    @keyframes slideIn {
      from {
        opacity: 0;
        transform: translateY(10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .${WIDGET_ID}-message.user {
      justify-content: flex-end;
    }

    .${WIDGET_ID}-message-avatar {
      width: 28px;
      height: 28px;
      border-radius: 6px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 600;
      font-size: 12px;
      flex-shrink: 0;
    }

    .${WIDGET_ID}-message.user .${WIDGET_ID}-message-avatar {
      background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
      color: white;
      order: 2;
    }

    .${WIDGET_ID}-message.assistant .${WIDGET_ID}-message-avatar {
      background: linear-gradient(135deg, #10b981 0%, #059669 100%);
      color: white;
    }

    .${WIDGET_ID}-message-content {
      max-width: 70%;
      padding: 10px 14px;
      border-radius: 10px;
      line-height: 1.4;
      font-size: 13px;
      word-wrap: break-word;
    }

    .${WIDGET_ID}-message.user .${WIDGET_ID}-message-content {
      background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
      color: white;
      border-bottom-right-radius: 3px;
    }

    .${WIDGET_ID}-message.assistant .${WIDGET_ID}-message-content {
      background: #1e293b;
      color: #f1f5f9;
      border: 1px solid #334155;
      border-bottom-left-radius: 3px;
    }

    .${WIDGET_ID}-typing {
      display: flex;
      gap: 4px;
      padding: 10px 14px;
      background: #1e293b;
      border: 1px solid #334155;
      border-radius: 10px;
      width: fit-content;
    }

    .${WIDGET_ID}-typing-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: #cbd5e1;
      animation: typing 1.4s infinite;
    }

    .${WIDGET_ID}-typing-dot:nth-child(2) {
      animation-delay: 0.2s;
    }

    .${WIDGET_ID}-typing-dot:nth-child(3) {
      animation-delay: 0.4s;
    }

    @keyframes typing {
      0%, 60%, 100% {
        opacity: 0.3;
      }
      30% {
        opacity: 1;
      }
    }

    #${WIDGET_ID}-input-area {
      padding: 12px;
      border-top: 1px solid #334155;
      background: #1e293b;
      display: flex;
      gap: 8px;
    }

    #${WIDGET_ID}-input-container {
      flex: 1;
      display: flex;
      background: #0f172a;
      border: 1px solid #334155;
      border-radius: 20px;
      padding: 2px;
      transition: border-color 0.2s;
    }

    #${WIDGET_ID}-input-container:focus-within {
      border-color: #6366f1;
    }

    #${WIDGET_ID}-input {
      flex: 1;
      border: none;
      background: transparent;
      color: #f1f5f9;
      padding: 10px 12px;
      font-size: 13px;
      outline: none;
    }

    #${WIDGET_ID}-input::placeholder {
      color: #64748b;
    }

    #${WIDGET_ID}-send {
      background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
      color: white;
      border: none;
      border-radius: 50%;
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      margin-right: 2px;
      transition: all 0.2s;
      font-size: 16px;
      flex-shrink: 0;
    }

    #${WIDGET_ID}-send:hover:not(:disabled) {
      transform: scale(1.05);
    }

    #${WIDGET_ID}-send:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    @media (max-width: 480px) {
      #${WIDGET_ID}-window {
        width: calc(100vw - 20px);
        height: 70vh;
        bottom: 80px;
        right: 10px;
      }

      .${WIDGET_ID}-message-content {
        max-width: 85%;
      }
    }
  `;

  // Initialize widget
  function init() {
    // Check if already initialized
    if (document.getElementById(WIDGET_ID + '-container')) {
      return;
    }

    // Create container
    const container = document.createElement('div');
    container.id = WIDGET_ID + '-container';

    // Create button
    const button = document.createElement('button');
    button.id = WIDGET_ID + '-button';
    button.innerHTML = '💬';
    button.title = 'Chat with us';

    // Create chat window
    const chatWindow = document.createElement('div');
    chatWindow.id = WIDGET_ID + '-window';
    chatWindow.innerHTML = `
      <div id="${WIDGET_ID}-header">
        <h3>Chat Assistant</h3>
        <button id="${WIDGET_ID}-close">✕</button>
      </div>
      <div id="${WIDGET_ID}-messages"></div>
      <div id="${WIDGET_ID}-input-area">
        <div id="${WIDGET_ID}-input-container">
          <input 
            type="text" 
            id="${WIDGET_ID}-input" 
            placeholder="Ask anything..." 
            autocomplete="off"
          >
          <button id="${WIDGET_ID}-send">➤</button>
        </div>
      </div>
    `;

    // Add to container and document
    container.appendChild(button);
    container.appendChild(chatWindow);
    document.body.appendChild(container);

    // Add styles
    const styleSheet = document.createElement('style');
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);

    // Initialize functionality
    setupEventListeners();
  }

  let conversationHistory = [];

  function setupEventListeners() {
    const button = document.getElementById(WIDGET_ID + '-button');
    const closeBtn = document.getElementById(WIDGET_ID + '-close');
    const input = document.getElementById(WIDGET_ID + '-input');
    const sendBtn = document.getElementById(WIDGET_ID + '-send');
    const chatWindow = document.getElementById(WIDGET_ID + '-window');

    button.addEventListener('click', () => {
      chatWindow.classList.add('active');
      button.classList.add('active');
      input.focus();
    });

    closeBtn.addEventListener('click', () => {
      chatWindow.classList.remove('active');
      button.classList.remove('active');
    });

    sendBtn.addEventListener('click', sendMessage);
    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
      }
    });
  }

  async function sendMessage() {
    const input = document.getElementById(WIDGET_ID + '-input');
    const sendBtn = document.getElementById(WIDGET_ID + '-send');
    const messagesDiv = document.getElementById(WIDGET_ID + '-messages');
    
    const message = input.value.trim();
    if (!message || sendBtn.disabled) return;

    // Add user message
    addMessage('user', message);
    input.value = '';

    // Disable send button
    sendBtn.disabled = true;

    try {
      // Add to history
      conversationHistory.push({
        role: 'user',
        content: message
      });

      // Show typing indicator
      showTypingIndicator();

      // Call API
      const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: message,
          conversationHistory: conversationHistory
        })
      });

      // Remove typing indicator
      const typingId = WIDGET_ID + '-typing';
      const typingEl = document.getElementById(typingId);
      if (typingEl) typingEl.remove();

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to get response');
      }

      const data = await response.json();
      const assistantMessage = data.message;

      // Add to history
      conversationHistory.push({
        role: 'assistant',
        content: assistantMessage
      });

      // Add assistant message
      addMessage('assistant', assistantMessage);

    } catch (error) {
      console.error('Error:', error);
      addMessage('assistant', '❌ Sorry, something went wrong. Please try again.');
    } finally {
      sendBtn.disabled = false;
      document.getElementById(WIDGET_ID + '-input').focus();
    }
  }

  function addMessage(role, content) {
    const messagesDiv = document.getElementById(WIDGET_ID + '-messages');
    
    const messageEl = document.createElement('div');
    messageEl.className = `${WIDGET_ID}-message ${role}`;

    const avatar = document.createElement('div');
    avatar.className = `${WIDGET_ID}-message-avatar`;
    avatar.textContent = role === 'user' ? '👤' : '🤖';

    const contentEl = document.createElement('div');
    contentEl.className = `${WIDGET_ID}-message-content`;
    contentEl.textContent = content;

    messageEl.appendChild(avatar);
    messageEl.appendChild(contentEl);
    messagesDiv.appendChild(messageEl);

    // Scroll to bottom
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
  }

  function showTypingIndicator() {
    const messagesDiv = document.getElementById(WIDGET_ID + '-messages');
    
    const messageEl = document.createElement('div');
    messageEl.className = `${WIDGET_ID}-message assistant`;
    messageEl.id = WIDGET_ID + '-typing';

    const avatar = document.createElement('div');
    avatar.className = `${WIDGET_ID}-message-avatar`;
    avatar.textContent = '🤖';

    const typing = document.createElement('div');
    typing.className = `${WIDGET_ID}-typing`;
    typing.innerHTML = `
      <div class="${WIDGET_ID}-typing-dot"></div>
      <div class="${WIDGET_ID}-typing-dot"></div>
      <div class="${WIDGET_ID}-typing-dot"></div>
    `;

    messageEl.appendChild(avatar);
    messageEl.appendChild(typing);
    messagesDiv.appendChild(messageEl);

    messagesDiv.scrollTop = messagesDiv.scrollHeight;
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
