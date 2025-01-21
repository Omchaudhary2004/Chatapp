import { useState, useEffect } from 'react';
import { CometChat } from "@cometchat/chat-sdk-javascript";
import { COMETCHAT_CONSTANTS } from '../constants';

export const useCometChat = () => {
  const [user, setUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const initCometChat = async () => {
      try {
        await CometChat.init(COMETCHAT_CONSTANTS.APP_ID, {
          region: COMETCHAT_CONSTANTS.REGION,
          subscribePresenceForAllUsers: true
        });
        
        const user = await CometChat.getLoggedinUser();
        if (user) {
          setUser(user);
          fetchUsers();
        }
      } catch (error) {
        console.error("CometChat initialization failed:", error);
      }
    };

    initCometChat();
  }, []);

  const fetchUsers = async () => {
    try {
      const usersRequest = new CometChat.UsersRequestBuilder()
        .setLimit(30)
        .build();
      const users = await usersRequest.fetchNext();
      setChats(users);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const logout = async () => {
    try {
      await CometChat.logout();
      setUser(null);
      setMessages([]);
      setChats([]);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return {
    user,
    setUser,
    messages,
    setMessages,
    chats,
    logout,
    fetchUsers
  };
};