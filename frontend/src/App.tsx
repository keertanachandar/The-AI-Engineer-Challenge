import { useState, useRef, useEffect } from 'react';
import { ChatMessage } from './components/ChatMessage';
import { ChatInput } from './components/ChatInput';
import { ChatAPI } from './api';
import { ChatMessage as ChatMessageType, ChatState } from './types';
import './App.css';

function App() {
  const [chatState, setChatState] = useState<ChatState>({
    messages: [],
    isLoading: false,
    error: null,
  });
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatState.messages]);

  const handleSendMessage = async (
    userMessage: string,
    apiKey: string,
    developerMessage: string
  ) => {
    // Add user message to chat
    const userChatMessage: ChatMessageType = {
      id: Date.now().toString(),
      role: 'user',
      content: userMessage,
      timestamp: new Date(),
    };

    setChatState(prev => ({
      ...prev,
      messages: [...prev.messages, userChatMessage],
      isLoading: true,
      error: null,
    }));

    try {
      // Create assistant message placeholder
      const assistantMessageId = (Date.now() + 1).toString();
      const assistantChatMessage: ChatMessageType = {
        id: assistantMessageId,
        role: 'assistant',
        content: '',
        timestamp: new Date(),
      };

      setChatState(prev => ({
        ...prev,
        messages: [...prev.messages, assistantChatMessage],
      }));

      // Stream the response
      const stream = await ChatAPI.sendMessage({
        developer_message: developerMessage,
        user_message: userMessage,
        api_key: apiKey,
      });

      const reader = stream.getReader();
      const decoder = new TextDecoder();
      let accumulatedContent = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        accumulatedContent += chunk;

        setChatState(prev => ({
          ...prev,
          messages: prev.messages.map(msg =>
            msg.id === assistantMessageId
              ? { ...msg, content: accumulatedContent }
              : msg
          ),
        }));
      }
    } catch (error) {
      setChatState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'An error occurred',
      }));
    } finally {
      setChatState(prev => ({
        ...prev,
        isLoading: false,
      }));
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>🤖 AI Chat Interface</h1>
        <p>Connect with OpenAI's GPT models through your FastAPI backend</p>
      </header>

      <main className="chat-container">
        <div className="messages-container">
          {chatState.messages.length === 0 && (
            <div className="empty-state">
              <h3>Welcome to AI Chat! 🚀</h3>
              <p>Enter your OpenAI API key and start chatting below.</p>
            </div>
          )}
          
          {chatState.messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
          
          {chatState.error && (
            <div className="error-message">
              <p>❌ Error: {chatState.error}</p>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        <ChatInput
          onSendMessage={handleSendMessage}
          isLoading={chatState.isLoading}
        />
      </main>
    </div>
  );
}

export default App; 