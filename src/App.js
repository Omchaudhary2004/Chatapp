import React, { useState, useEffect } from 'react';
import { CometChat } from "@cometchat/chat-sdk-javascript";
import { Header } from './components/Header';
import { LoginModal } from './components/LoginModal';
import { ChatList } from './components/ChatList';
import { MessageList } from './components/MessageList';
import { MessageInput } from './components/MessageInput';
import { useCometChat } from './hooks/useCometChat';
// import { Header, LoginModal, ChatList, MessageList, MessageInput } from './component';

const ChatApp = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [message, setMessage] = useState('');
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const { user, setUser, messages, setMessages, chats, logout } = useCometChat();

  useEffect(() => {
    if (!selectedChat) return;

    CometChat.addMessageListener(
      "UNIQUE_LISTENER_ID",
      {
        onTextMessageReceived: messageObj => {
          setMessages(prev => [...prev, messageObj]);
        },
        onMediaMessageReceived: messageObj => {
          setMessages(prev => [...prev, messageObj]);
        }
      }
    );

    const fetchPreviousMessages = async () => {
      try {
        const messagesRequest = new CometChat.MessagesRequestBuilder()
          .setUID(selectedChat.uid)
          .setLimit(50)
          .build();

        const previousMessages = await messagesRequest.fetchPrevious();
        setMessages(previousMessages);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchPreviousMessages();

    return () => {
      CometChat.removeMessageListener("UNIQUE_LISTENER_ID");
    };
  }, [selectedChat]);

  const sendMessage = async () => {
    if (!message.trim() || !selectedChat) return;

    try {
      const textMessage = new CometChat.TextMessage(
        selectedChat.uid,
        message,
        CometChat.RECEIVER_TYPE.USER
      );

      const sentMessage = await CometChat.sendMessage(textMessage);
      setMessages(prev => [...prev, sentMessage]);
      setMessage('');
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file || !selectedChat) return;

    try {
      let messageType;
      if (file.type.startsWith('image')) {
        messageType = CometChat.MESSAGE_TYPE.IMAGE;
      } else if (file.type.startsWith('video')) {
        messageType = CometChat.MESSAGE_TYPE.VIDEO;
      } else {
        messageType = CometChat.MESSAGE_TYPE.FILE;
      }

      const mediaMessage = new CometChat.MediaMessage(
        selectedChat.uid,
        file,
        messageType,
        CometChat.RECEIVER_TYPE.USER
      );

      const sentMessage = await CometChat.sendMediaMessage(mediaMessage);
      setMessages(prev => [...prev, sentMessage]);
    } catch (error) {
      console.error("Error sending media:", error);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <Header 
        user={user}
        onLoginClick={() => setIsLoginModalOpen(true)}
        onLogout={logout}
      />
      
      {user ? (
        <div className="flex flex-1">
          <ChatList chats={chats} onSelectChat={setSelectedChat} />
          <div className="flex-1 bg-gray-50 p-4 flex flex-col">
            <MessageList messages={messages} />
            <MessageInput 
              message={message}
              setMessage={setMessage}
              onSendMessage={sendMessage}
              onFileUpload={handleFileUpload}
            />
          </div>
        </div>
      ) : (
        <div className="flex-1 flex justify-center items-center">
          <span className="text-xl text-gray-500">Please log in to start chatting</span>
        </div>
      )}

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLogin={setUser}
      />
    </div>
  );
};

export default ChatApp;