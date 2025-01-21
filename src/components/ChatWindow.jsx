import React, { useState, useEffect, useRef } from 'react';
import { Send, UserCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const ChatWindow = ({ selectedUser }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);

  // Simulate loading chat history
  useEffect(() => {
    if (selectedUser) {
      // In a real app, fetch messages from your backend
      const mockHistory = [
        {
          id: 1,
          sender: selectedUser.uid,
          text: "Hey there!",
          timestamp: new Date(Date.now() - 100000),
        },
        {
          id: 2,
          sender: 'currentUser',
          text: "Hi! How are you?",
          timestamp: new Date(Date.now() - 80000),
        },
        {
          id: 3,
          sender: selectedUser.uid,
          text: "I'm doing great, thanks for asking!",
          timestamp: new Date(Date.now() - 60000),
        },
      ];
      setMessages(mockHistory);
    }
  }, [selectedUser]);

  // Auto scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const newMsg = {
      id: Date.now(),
      sender: 'currentUser',
      text: newMessage,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, newMsg]);
    setNewMessage('');
  };

  if (!selectedUser) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500">
        Select a contact to start chatting
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Chat Header */}
      <div className="flex items-center p-4 border-b">
        <UserCircle className="h-10 w-10 text-gray-400 mr-3" />
        <div>
          <h2 className="font-semibold">{selectedUser.name}</h2>
          <p className="text-sm text-gray-500">{selectedUser.status || 'Online'}</p>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.sender === 'currentUser' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-[70%] rounded-lg p-3 ${
                message.sender === 'currentUser'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-900'
              }`}
            >
              <p>{message.text}</p>
              <p className={`text-xs mt-1 ${
                message.sender === 'currentUser'
                  ? 'text-blue-100'
                  : 'text-gray-500'
              }`}>
                {message.timestamp.toLocaleTimeString([], { 
                  hour: '2-digit', 
                  minute: '2-digit'
                })}
              </p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <form onSubmit={handleSendMessage} className="p-4 border-t">
        <div className="flex gap-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1"
          />
          <Button type="submit">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ChatWindow;