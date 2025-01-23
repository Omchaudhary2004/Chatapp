
import React, { useState, useEffect } from 'react';
import { UserCircle, PlusCircle } from 'lucide-react';
import { CometChat } from "@cometchat/chat-sdk-javascript";

export const ChatList = ({ onSelectChat }) => {
  const [chats, setChats] = useState([]);
  const [newUserUID, setNewUserUID] = useState('');
  const [isAddingUser, setIsAddingUser] = useState(false);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const conversationsRequest = new CometChat.ConversationsRequestBuilder()
          .setLimit(50)
          .setConversationType('user')
          .build();

        const conversations = await conversationsRequest.fetchNext();
        
        const activeChats = conversations.map((conversation) => {
          const user = conversation.getConversationWith();
          const lastMessage = conversation.getLastMessage();

          return {
            uid: user.getUid(),
            name: user.getName(),
            avatar: user.getAvatar(),
            lastMessage: lastMessage?.getText() || 'No messages yet',
            timestamp: lastMessage?.getSentAt()
          };
        });

        setChats(activeChats);
      } catch (error) {
        console.error('Failed to fetch active chats:', error);
      }
    };

    fetchChats();
  }, []);

  const handleAddUser = async () => {
    if (!newUserUID.trim()) return;

    try {
      const user = await CometChat.getUser(newUserUID);
      
      // Check if user already exists in chats
      const existingChat = chats.find(chat => chat.uid === user.getUid());
      if (existingChat) {
        onSelectChat(existingChat);
        setIsAddingUser(false);
        setNewUserUID('');
        return;
      }

      const newChat = {
        uid: user.getUid(),
        name: user.getName(),
        lastMessage: 'No messages yet'
      };

      setChats(prev => [newChat, ...prev]);
      onSelectChat(newChat);
      setIsAddingUser(false);
      setNewUserUID('');
    } catch (error) {
      alert('User not found. Check the UID and try again.');
    }
  };

  return (
    <div className="w-1/3 bg-gray-100 p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">Chats</h2>
        <PlusCircle 
          onClick={() => setIsAddingUser(!isAddingUser)} 
          className="text-blue-500 cursor-pointer hover:text-blue-700"
        />
      </div>

      {isAddingUser && (
        <div className="mb-4 flex">
          <input
            type="text"
            value={newUserUID}
            onChange={(e) => setNewUserUID(e.target.value)}
            placeholder="Enter User UID"
            className="flex-grow p-2 border rounded-l"
          />
          <button 
            onClick={handleAddUser}
            className="bg-blue-500 text-white px-4 rounded-r"
          >
            Add
          </button>
        </div>
      )}

      {chats.map((chat) => (
        <div
          key={chat.uid}
          className="flex items-center p-2 cursor-pointer hover:bg-gray-200 rounded"
          onClick={() => onSelectChat(chat)}
        >
          <UserCircle size={24} className="text-gray-500 mr-3" />
          <div>
            <div className="font-medium">{chat.name}</div>
            <p className="text-xs text-gray-500 truncate">{chat.lastMessage}</p>
          </div>
        </div>
      ))}

      {chats.length === 0 && (
        <p className="text-gray-500 text-center">No active conversations</p>
      )}
    </div>
  );
};