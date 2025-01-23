// import React from 'react';
// import { Send, Paperclip } from 'lucide-react';

// export const MessageInput = ({ message, setMessage, onSendMessage, onFileUpload }) => {
//   return (
//     <div className="flex items-center gap-2">
//       <input
//         type="text"
//         value={message}
//         onChange={(e) => setMessage(e.target.value)}
//         placeholder="Type a message"
//         className="flex-1 p-2 border rounded"
//       />
//       <input
//         type="file"
//         onChange={onFileUpload}
//         className="hidden"
//         id="file-input"
//       />
//       <label htmlFor="file-input" className="cursor-pointer">
//         <Paperclip size={24} />
//       </label>
//       <button onClick={onSendMessage} className="text-blue-500">
//         <Send size={24} />
//       </button>
//     </div>
//   );
// };

// import React from 'react';
// import { CometChat } from "@cometchat/chat-sdk-javascript";

// export const MessageList = ({ messages }) => {
//   const loggedInUser = CometChat.getLoggedinUser();

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
//     <div className="flex-1 overflow-y-auto p-4">
//       {messages.map((msg, index) => (
//         <div
//           key={index}
//           className={`flex mb-4 ${msg.sender.uid === loggedInUser?.uid ? 'justify-end' : 'justify-start'}`}
//         >
//           <div className={`max-w-[70%] rounded-lg p-3 ${
//             msg.sender.uid === loggedInUser?.uid 
//               ? 'bg-blue-500 text-white' 
//               : 'bg-gray-200'
//           }`}>
//             <div className="font-bold mb-1">{msg.sender.name}</div>
//             {formatMessageContent(msg)}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

import React, { useState } from 'react';
import { Send, Paperclip } from 'lucide-react';

export const MessageInput = ({ message, setMessage, onSendMessage, onFileUpload }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSendMessage = async () => {
    if (!message.trim() || isSubmitting) return;
    
    try {
      setIsSubmitting(true);
      await onSendMessage();
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileChange = async (e) => {
    if (!e.target.files?.length) return;
    try {
      setIsSubmitting(true);
      await onFileUpload(e);
      e.target.value = ''; // Reset file input
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-4 border-t bg-white">
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder="Type a message"
          className="flex-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={isSubmitting}
        />
        <input
          type="file"
          onChange={handleFileChange}
          className="hidden"
          id="file-input"
          accept="image/*,video/*,application/*"
        />
        <label 
          htmlFor="file-input" 
          className={`cursor-pointer ${isSubmitting ? 'opacity-50' : 'hover:text-gray-700'}`}
        >
          <Paperclip className="w-6 h-6 text-gray-500" />
        </label>
        <button 
          onClick={handleSendMessage}
          disabled={!message.trim() || isSubmitting}
          className="text-blue-500 hover:text-blue-600 disabled:opacity-50"
        >
          <Send className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};