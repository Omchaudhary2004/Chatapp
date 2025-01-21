// import React, { useState, useEffect } from 'react';
// import { Search, MoreVertical, Send, Paperclip, Smile, LogIn, UserCircle, X } from 'lucide-react';
// import { CometChat } from "@cometchat/chat-sdk-javascript";


// // Constants for CometChat
// const APP_ID = "26958474e3afb819";
// const REGION = "in";
// const AUTH_KEY = "64af977a4dd3176ebdd85c11264a9c4c463c6143";

// const LoginModal = ({ isOpen, onClose, onLogin }) => {
//   const [uid, setUid] = useState("");
//   const [name, setName] = useState("");
//   const [isRegistering, setIsRegistering] = useState(false);

//   const handleCreateUser = async () => {
//     if (!uid || !name) {
//       alert("Please provide both User ID and Name.");
//       return;
//     }

//     try {
//       const user = new CometChat.User(uid);
//       user.setName(name);
//       await CometChat.createUser(user, AUTH_KEY);
//       alert("User created successfully! You can now login.");
//       setIsRegistering(false);
//       setUid("");
//       setName("");
//     } catch (error) {
//       console.error("Error creating user:", error);
//       alert("Failed to create user. Please try again.");
//     }
//   };

//   const handleLogin = async () => {
//     if (!uid) {
//       alert("Please provide a User ID.");
//       return;
//     }

//     try {
//       const user = await CometChat.login(uid, AUTH_KEY);
//       onLogin(user);
//       onClose();
//     } catch (error) {
//       console.error("Login failed:", error);
//       alert("Login failed. Please check your credentials.");
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//       <div className="bg-white rounded-lg p-6 w-96 relative">
//         <button 
//           onClick={onClose}
//           className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
//         >
//           <X size={20} />
//         </button>
//         <h2 className="text-2xl font-bold mb-4">
//           {isRegistering ? "Create Account" : "Login"}
//         </h2>
//         <input
//           type="text"
//           placeholder="User ID"
//           value={uid}
//           onChange={(e) => setUid(e.target.value)}
//           className="w-full p-2 mb-4 border rounded"
//         />
//         {isRegistering && (
//           <input
//             type="text"
//             placeholder="Name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             className="w-full p-2 mb-4 border rounded"
//           />
//         )}
//         <button
//           onClick={isRegistering ? handleCreateUser : handleLogin}
//           className="w-full bg-blue-500 text-white p-2 rounded mb-2"
//         >
//           {isRegistering ? "Create Account" : "Login"}
//         </button>
//         <button
//           onClick={() => setIsRegistering(!isRegistering)}
//           className="w-full text-blue-500 p-2"
//         >
//           {isRegistering ? "Already have an account? Login" : "Create new account"}
//         </button>
//       </div>
//     </div>
//   );
// };

// const Header = ({ user, onLoginClick, onLogout }) => {
//   return (
//     <div className="bg-white border-b px-4 py-2 flex justify-between items-center">
//       <h1 className="text-xl font-bold">Chat App</h1>
//       <div>
//         {user ? (
//           <div className="flex items-center gap-2">
//             <span className="text-gray-700">{user.name}</span>
//             <button
//               onClick={onLogout}
//               className="text-red-500 hover:text-red-700"
//             >
//               Logout
//             </button>
//           </div>
//         ) : (
//           <button
//             onClick={onLoginClick}
//             className="flex items-center gap-2 text-blue-500 hover:text-blue-700"
//           >
//             <LogIn size={20} />
//             <span>Login</span>
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// const ChatApp = () => {
//   const [selectedChat, setSelectedChat] = useState(null);
//   const [message, setMessage] = useState('');
//   const [messages, setMessages] = useState([]);
//   const [chats, setChats] = useState([]);
//   const [user, setUser] = useState(null);
//   const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

//   useEffect(() => {
//     const initCometChat = async () => {
//       try {
//         await CometChat.init(APP_ID, {
//           region: REGION,
//           subscribePresenceForAllUsers: true
//         });
        
//         // Check if user is already logged in
//         const user = await CometChat.getLoggedinUser();
//         if (user) {
//           setUser(user);
//           fetchUsers();
//         }
//       } catch (error) {
//         console.error("CometChat initialization failed:", error);
//       }
//     };

//     initCometChat();
//   }, []);

//   const handleLogout = async () => {
//     try {
//       await CometChat.logout();
//       setUser(null);
//       setSelectedChat(null);
//       setMessages([]);
//       setChats([]);
//     } catch (error) {
//       console.error("Logout failed:", error);
//     }
//   };

//   const fetchUsers = async () => {
//     try {
//       const limit = 30;
//       const usersRequest = new CometChat.UsersRequestBuilder()
//         .setLimit(limit)
//         .build();

//       const users = await usersRequest.fetchNext();
//       setChats(users);
//     } catch (error) {
//       console.error("Error fetching users:", error);
//     }
//   };

//   useEffect(() => {
//     if (!selectedChat) return;

//     // Listen for new messages
//     CometChat.addMessageListener(
//       "UNIQUE_LISTENER_ID",
//       {
//         onTextMessageReceived: messageObj => {
//           setMessages(prev => [...prev, messageObj]);
//         },
//         onMediaMessageReceived: messageObj => {
//           setMessages(prev => [...prev, messageObj]);
//         }
//       }
//     );

//     // Fetch previous messages
//     const fetchPreviousMessages = async () => {
//       try {
//         const messagesRequest = new CometChat.MessagesRequestBuilder()
//           .setUID(selectedChat.uid)
//           .setLimit(50)
//           .build();

//         const previousMessages = await messagesRequest.fetchPrevious();
//         setMessages(previousMessages);
//       } catch (error) {
//         console.error("Error fetching messages:", error);
//       }
//     };

//     fetchPreviousMessages();

//     return () => {
//       CometChat.removeMessageListener("UNIQUE_LISTENER_ID");
//     };
//   }, [selectedChat]);

//   const sendMessage = async () => {
//     if (!message.trim() || !selectedChat) return;

//     try {
//       const textMessage = new CometChat.TextMessage(
//         selectedChat.uid,
//         message,
//         CometChat.RECEIVER_TYPE.USER
//       );

//       const sentMessage = await CometChat.sendMessage(textMessage);
//       setMessages(prev => [...prev, sentMessage]);
//       setMessage('');
//     } catch (error) {
//       console.error("Error sending message:", error);
//     }
//   };

//   const handleFileUpload = async (event) => {
//     const file = event.target.files?.[0];
//     if (!file || !selectedChat) return;

//     try {
//       let messageType;
//       if (file.type.startsWith('image')) {
//         messageType = CometChat.MESSAGE_TYPE.IMAGE;
//       } else if (file.type.startsWith('video')) {
//         messageType = CometChat.MESSAGE_TYPE.VIDEO;
//       } else {
//         messageType = CometChat.MESSAGE_TYPE.FILE;
//       }

//       const mediaMessage = new CometChat.MediaMessage(
//         selectedChat.uid,
//         file,
//         messageType,
//         CometChat.RECEIVER_TYPE.USER
//       );

//       const sentMessage = await CometChat.sendMediaMessage(mediaMessage);
//       setMessages(prev => [...prev, sentMessage]);
//     } catch (error) {
//       console.error("Error sending media:", error);
//     }
//   };

//   const formatMessageContent = (msg) => {
//     if (msg.type === 'text') {
//       return msg.text;
//     } else if (msg.type === 'image') {
//       return <img src={msg.data.url} alt="media" className="max-w-xs rounded" />;
//     } else if (msg.type === 'video') {
//       return <video src={msg.data.url} controls className="max-w-xs rounded" />;
//     } else if (msg.type === 'file') {
//       return <a href={msg.data.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">Download File</a>;
//     }
//     return 'Unsupported message type';
//   };

//   return (
//     <div className="flex flex-col h-screen">
//       <Header 
//         user={user}
//         onLoginClick={() => setIsLoginModalOpen(true)}
//         onLogout={handleLogout}
//       />
      
//       {user ? (
//         <div className="flex flex-1">
//           {/* Chat list sidebar */}
//           <div className="w-1/3 bg-gray-100 p-4">
//             {chats.map((chat) => (
//               <div
//                 key={chat.uid}
//                 className="flex items-center p-2 cursor-pointer hover:bg-gray-200"
//                 onClick={() => setSelectedChat(chat)}
//               >
//                 <UserCircle size={24} className="text-gray-500" />
//                 <span className="ml-2">{chat.name}</span>
//               </div>
//             ))}
//           </div>

//           {/* Chat window */}
//           <div className="flex-1 bg-gray-50 p-4 flex flex-col">
//             <div className="flex-1 overflow-y-auto">
//               {messages.map((msg, index) => (
//                 <div key={index} className="my-2">
//                   <div className="font-bold">{msg.sender.name}</div>
//                   <div>{formatMessageContent(msg)}</div>
//                 </div>
//               ))}
//             </div>

//             {/* Message input */}
//             <div className="flex items-center gap-2">
//               <input
//                 type="text"
//                 value={message}
//                 onChange={(e) => setMessage(e.target.value)}
//                 placeholder="Type a message"
//                 className="flex-1 p-2 border rounded"
//               />
//               <input
//                 type="file"
//                 onChange={handleFileUpload}
//                 className="hidden"
//                 id="file-input"
//               />
//               <label htmlFor="file-input" className="cursor-pointer">
//                 <Paperclip size={24} />
//               </label>
//               <button onClick={sendMessage} className="text-blue-500">
//                 <Send size={24} />
//               </button>
//             </div>
//           </div>
//         </div>
//       ) : (
//         <div className="flex-1 flex justify-center items-center">
//           <span className="text-xl text-gray-500">Please log in to start chatting</span>
//         </div>
//       )}

//       <LoginModal
//         isOpen={isLoginModalOpen}
//         onClose={() => setIsLoginModalOpen(false)}
//         onLogin={setUser}
//       />
//     </div>
//   );
// };

// export default ChatApp;
