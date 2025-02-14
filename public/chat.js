// chat.js
(function () {
    class ChatWidget {
        constructor(config) {
            this.config = config;
            this.isOpen = false;
            this.messages = [];
            this.isLoading = false;
            this.init();
        }

        init() {
            this.createStyles();
            this.createWidget();
            this.attachEventListeners();
        }

        createStyles() {
            const style = document.createElement('style');
            style.textContent = `
                .chat-widget-container {
                    position: fixed;
                    bottom: 20px;
                    ${this.config.style.position}: 20px;
                    z-index: 1000;
                    font-family: Arial, sans-serif;
                }
                .chat-widget {
                    width: 350px;
                    height: 60px;
                    background-color: ${this.config.style.backgroundColor};
                    border-radius: 10px;
                    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                    overflow: hidden;
                    transition: height 0.3s ease;
                }
                .chat-widget.open {
                    height: 500px;
                }
                .chat-header {
                    background-color: ${this.config.style.primaryColor};
                    padding: 15px;
                    color: #fff;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    cursor: pointer;
                }
                .chat-logo {
                    width: 30px;
                    height: 30px;
                    object-fit: contain;
                }
                .chat-messages {
                    height: calc(100% - 120px);
                    overflow-y: auto;
                    padding: 15px;
                }
                .chat-message {
                    margin-bottom: 10px;
                    padding: 8px 12px;
                    border-radius: 8px;
                    max-width: 80%;
                }
                .user-message {
                    background-color: ${this.config.style.primaryColor};
                    color: #fff;
                    margin-left: auto;
                }
                .bot-message {
                    background-color: ${this.config.style.secondaryColor};
                    color: #fff;
                }
                .chat-input-container {
                    padding: 15px;
                    border-top: 1px solid #eee;
                }
                .chat-input {
                    width: 100%;
                    padding: 8px 12px;
                    border-radius: 20px;
                    border: 1px solid ${this.config.style.primaryColor};
                    outline: none;
                    box-sizing: border-box;
                }
            `;
            document.head.appendChild(style);
        }

        createWidget() {
            const container = document.createElement('div');
            container.className = 'chat-widget-container';

            container.innerHTML = `
                <div class="chat-widget">
                    <div class="chat-header">
                        ${this.config.branding.logo ?
                    `<img src="${this.config.branding.logo}" alt="logo" class="chat-logo">` :
                    ''}
                        <div>
                            <div>${this.config.branding.name}</div>
                            <small>${this.config.branding.welcomeText}</small>
                        </div>
                    </div>
                    <div class="chat-messages">
                        <div class="welcome-message" style="text-align: center; color: #666;">
                            ${this.config.branding.welcomeText}<br>
                            <small>${this.config.branding.responseTimeText}</small>
                        </div>
                    </div>
                    <form class="chat-input-container">
                        <input type="text" class="chat-input" placeholder="Escribe tu mensaje...">
                    </form>
                </div>
            `;

            document.body.appendChild(container);
            this.widget = container.querySelector('.chat-widget');
            this.messagesContainer = container.querySelector('.chat-messages');
            this.input = container.querySelector('.chat-input');
        }

        attachEventListeners() {
            this.widget.querySelector('.chat-header').addEventListener('click', () => {
                this.toggleWidget();
            });

            this.widget.querySelector('form').addEventListener('submit', (e) => {
                e.preventDefault();
                this.sendMessage();
            });
        }

        toggleWidget() {
            this.isOpen = !this.isOpen;
            this.widget.classList.toggle('open');
        }

        async sendMessage() {
            const message = this.input.value.trim();
            if (!message) return;

            this.addMessage(message, 'user');
            this.input.value = '';
            this.isLoading = true;
            this.updateLoadingState();

            try {
                const response = await fetch(`${this.config.webhook.url}/${this.config.webhook.route}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ message }),
                });

                const data = await response.json();
                this.addMessage(data.response, 'bot');
            } catch (error) {
                console.error('Error sending message:', error);
                this.addMessage('Lo siento, ha ocurrido un error. Por favor, intenta de nuevo más tarde.', 'bot');
            } finally {
                this.isLoading = false;
                this.updateLoadingState();
            }
        }

        addMessage(content, type) {
            const messageDiv = document.createElement('div');
            messageDiv.className = `chat-message ${type}-message`;
            messageDiv.textContent = content;
            this.messagesContainer.appendChild(messageDiv);
            this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
        }

        updateLoadingState() {
            const loadingDiv = this.messagesContainer.querySelector('.loading');
            if (this.isLoading) {
                if (!loadingDiv) {
                    const div = document.createElement('div');
                    div.className = 'loading';
                    div.style.textAlign = 'center';
                    div.style.color = '#666';
                    div.textContent = 'Escribiendo...';
                    this.messagesContainer.appendChild(div);
                }
            } else if (loadingDiv) {
                loadingDiv.remove();
            }
        }
    }

    // Initialize the widget when the config is available
    if (window.ChatWidgetConfig) {
        new ChatWidget(window.ChatWidgetConfig);
    } else {
        console.error('Chat widget configuration not found');
    }
})();