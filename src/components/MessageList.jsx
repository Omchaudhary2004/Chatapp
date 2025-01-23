// import React from 'react';

// export const MessageList = ({ messages }) => {
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
//     <div className="flex-1 overflow-y-auto">
//       {messages.map((msg, index) => (
//         <div key={index} className="my-2">
//           <div className="font-bold">{msg.sender.name}</div>
//           <div>{formatMessageContent(msg)}</div>
//         </div>
//       ))}
//     </div>
//   );
// };

// import React from 'react';
// import { Send, Paperclip } from 'lucide-react';

// export const MessageInput = ({ message, setMessage, onSendMessage, onFileUpload }) => {
//   const handleKeyPress = (e) => {
//     if (e.key === 'Enter' && !e.shiftKey) {
//       e.preventDefault();
//       onSendMessage();
//     }
//   };

//   return (
//     <div className="border-t p-4 bg-white">
//       <div className="flex items-center gap-2">
//         <input
//           type="text"
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//           onKeyPress={handleKeyPress}
//           placeholder="Type a message"
//           className="flex-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//         <input
//           type="file"
//           onChange={onFileUpload}
//           className="hidden"
//           id="file-input"
//         />
//         <label htmlFor="file-input" className="cursor-pointer">
//           <Paperclip className="w-6 h-6 text-gray-500 hover:text-gray-700" />
//         </label>
//         <button 
//           onClick={onSendMessage}
//           disabled={!message.trim()} 
//           className="text-blue-500 hover:text-blue-600 disabled:opacity-50"
//         >
//           <Send className="w-6 h-6" />
//         </button>
//       </div>
//     </div>
//   );
// };
import React, { useRef, useEffect } from 'react';
import { CometChat } from "@cometchat/chat-sdk-javascript";

export const MessageList = ({ messages = [] }) => {
  const messagesEndRef = useRef(null);
  const loggedInUser = CometChat.getLoggedinUser();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const formatMessageContent = (msg) => {
    try {
      if (!msg) return null;

      switch(msg.type) {
        case 'text':
          return <div className="break-words">{msg.text}</div>;
        case 'image':
          return msg.data?.url ? (
            <img 
              src={msg.data.url} 
              alt="media" 
              className="max-w-xs rounded" 
              onError={(e) => e.target.style.display = 'none'}
            />
          ) : null;
        case 'video':
          return msg.data?.url ? (
            <video 
              src={msg.data.url} 
              controls 
              className="max-w-xs rounded"
              onError={(e) => e.target.style.display = 'none'}
            />
          ) : null;
        case 'file':
          return msg.data?.url ? (
            <a 
              href={msg.data.url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-blue-500 underline break-all"
            >
              {msg.data.attachments?.[0]?.name || 'Download File'}
            </a>
          ) : null;
        default:
          return 'Unsupported message type';
      }
    } catch (error) {
      console.error('Error formatting message:', error);
      return 'Error displaying message';
    }
  };

  return (
    <div className="flex-1 overflow-y-auto p-4">
      {messages.map((msg, index) => (
        <div
          key={msg.id || index}
          className={`flex mb-4 ${msg.sender?.uid === loggedInUser?.uid ? 'justify-end' : 'justify-start'}`}
        >
          <div className={`max-w-[70%] rounded-lg p-3 ${
            msg.sender?.uid === loggedInUser?.uid 
              ? 'bg-blue-500 text-white' 
              : 'bg-gray-200'
          }`}>
            <div className="font-bold mb-1 break-words">
              {msg.sender?.name || msg.sender?.uid || 'Unknown'}
            </div>
            {formatMessageContent(msg)}
          </div>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};
