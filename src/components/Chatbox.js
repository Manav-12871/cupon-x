import React, { useState, useEffect, useRef } from 'react';
import { Form, InputGroup, Button } from 'react-bootstrap';

const Chatbox = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Welcome to CouponX! How can I help you find the perfect deal today?' }
  ]);
  const [userInput, setUserInput] = useState('');
  const chatMessagesEndRef = useRef(null);

  const scrollToBottom = () => {
    chatMessagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (userInput.trim() === '') return;

    const newMessages = [...messages, { sender: 'user', text: userInput }];
    setMessages(newMessages);
    setUserInput('');

    // Simulate bot response
    setTimeout(() => {
      setMessages([...newMessages, { sender: 'bot', text: "Thanks for your message! I'm currently a demo, but I'm learning to find great deals for you." }]);
    }, 1000);
  };

  return (
    <>
      <style type="text/css">
        {`
          /* --- CHATBOX STYLES --- */
          .chatbox-container { position: fixed; bottom: 120px; right: 30px; width: 350px; height: 500px; background-color: rgba(13, 2, 33, 0.85); border: 1px solid rgba(0, 255, 255, 0.3); border-radius: 15px; backdrop-filter: blur(10px); display: flex; flex-direction: column; z-index: 1000; transition: opacity 0.3s ease, transform 0.3s ease; opacity: 0; transform: translateY(20px); pointer-events: none; }
          .chatbox-container.open { opacity: 1; transform: translateY(0); pointer-events: all; }
          .chatbox-header { padding: 1rem; background-color: rgba(0, 255, 255, 0.1); border-bottom: 1px solid rgba(0, 255, 255, 0.3); color: white; font-family: 'Exo 2', sans-serif; display: flex; justify-content: space-between; align-items: center; }
          .chatbox-header .close-btn { background: none; border: none; color: white; font-size: 1.5rem; cursor: pointer; line-height: 1; }
          .chatbox-messages { flex-grow: 1; overflow-y: auto; padding: 1rem; display: flex; flex-direction: column; gap: 0.75rem; }
          .message { padding: 0.75rem 1rem; border-radius: 10px; max-width: 80%; font-family: 'Poppins', sans-serif; line-height: 1.4; color: white; }
          .message.bot { background-color: #2a2a3e; align-self: flex-start; }
          .message.user { background-color: #007bff; align-self: flex-end; }
          .chatbox-footer { padding: 1rem; border-top: 1px solid rgba(0, 255, 255, 0.3); }
          .chat-input { background-color: rgba(0,0,0,0.3) !important; color: white !important; border-color: rgba(0, 255, 255, 0.4) !important; font-family: 'Poppins', sans-serif; }
          .chat-input::placeholder { color: #aaa; }
          .chat-input:focus { box-shadow: 0 0 10px rgba(0, 255, 255, 0.5) !important; }
          .send-btn { background-color: #00ffff !important; border-color: #00ffff !important; }
        `}
      </style>
      <div className={`chatbox-container ${isOpen ? 'open' : ''}`}>
        <div className="chatbox-header">
          <span>CouponX Assistant</span>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>
        <div className="chatbox-messages">
          {messages.map((msg, index) => (
            <div key={index} className={`message ${msg.sender}`}>
              {msg.text}
            </div>
          ))}
          <div ref={chatMessagesEndRef} />
        </div>
        <div className="chatbox-footer">
          <Form onSubmit={handleSendMessage}>
            <InputGroup>
              <Form.Control
                type="text"
                placeholder="Ask about a deal..."
                className="chat-input"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                autoComplete="off"
              />
              <Button type="submit" className="send-btn">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11zM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493z"/>
                </svg>
              </Button>
            </InputGroup>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Chatbox;
