import { useState } from 'react';
import { Send, Key } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (userMessage: string, apiKey: string, developerMessage: string) => void;
  isLoading: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isLoading }) => {
  const [userMessage, setUserMessage] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [developerMessage, setDeveloperMessage] = useState('You are a helpful AI assistant.');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userMessage.trim() || !apiKey.trim()) return;
    
    onSendMessage(userMessage, apiKey, developerMessage);
    setUserMessage('');
  };

  return (
    <div className="chat-input-container">
      <form onSubmit={handleSubmit} className="chat-form">
        <div className="input-group">
          <label htmlFor="api-key" className="input-label">
            <Key size={16} />
            OpenAI API Key
          </label>
          <input
            id="api-key"
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="Enter your OpenAI API key"
            className="input-field"
            required
          />
        </div>
        
        <div className="input-group">
          <label htmlFor="developer-message" className="input-label">
            System Message
          </label>
          <textarea
            id="developer-message"
            value={developerMessage}
            onChange={(e) => setDeveloperMessage(e.target.value)}
            placeholder="Enter system message for the AI"
            className="input-field textarea"
            rows={2}
          />
        </div>
        
        <div className="input-group">
          <label htmlFor="user-message" className="input-label">
            Your Message
          </label>
          <div className="message-input-container">
            <textarea
              id="user-message"
              value={userMessage}
              onChange={(e) => setUserMessage(e.target.value)}
              placeholder="Type your message here..."
              className="input-field textarea message-input"
              rows={3}
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !userMessage.trim() || !apiKey.trim()}
              className="send-button"
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}; 