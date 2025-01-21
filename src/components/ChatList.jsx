import React, { useState, useEffect } from 'react';
import { UserCircle } from 'lucide-react';
import { CometChat } from "@cometchat/chat-sdk-javascript";

export const ChatList = ({ onSelectChat }) => {
  const [chats, setChats] = useState([]);
  const [newChatUID, setNewChatUID] = useState('');

  // Fetch conversations when the component mounts
  useEffect(() => {
    const loadChats = async () => {
      try {
        const conversationsRequest = new CometChat.ConversationsRequestBuilder()
          .setLimit(50)
          .build();

        const fetchedChats = await conversationsRequest.fetchNext();
        setChats(fetchedChats);
      } catch (error) {
        console.error('Failed to fetch chats:', error);
      }
    };

    loadChats();
  }, []);

  // Add a new chat (basic example)
  const handleAddChat = async () => {
    if (!newChatUID.trim()) {
      alert('Please enter a valid UID.');
      return;
    }

    try {
      const user = await CometChat.getUser(newChatUID);
      setChats((prevChats) => [...prevChats, { uid: user.uid, name: user.name }]);
      setNewChatUID('');
    } catch (error) {
      console.error('Failed to add user:', error);
      alert('Could not find user with UID: ' + newChatUID);
    }
  };

  return (
    <div className="w-1/3 bg-gray-100 p-4">
      {/* Chat List */}
      {chats.map((chat) => (
        <div
          key={chat.uid}
          className="flex items-center p-2 cursor-pointer hover:bg-gray-200"
          onClick={() => onSelectChat(chat)} // Call onSelectChat with the selected chat
        >
          <UserCircle size={24} className="text-gray-500" />
          <span className="ml-2">{chat.name}</span>
        </div>
      ))}

      {/* Add New User */}
      <div className="mt-4">
        <input
          type="text"
          value={newChatUID}
          onChange={(e) => setNewChatUID(e.target.value)}
          placeholder="Enter user UID"
          className="p-2 border rounded w-full"
        />
        <button
          onClick={handleAddChat}
          className="mt-2 w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Add User
        </button>
      </div>
    </div>
  );
};
