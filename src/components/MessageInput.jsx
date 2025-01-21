import React from 'react';
import { Send, Paperclip } from 'lucide-react';

export const MessageInput = ({ message, setMessage, onSendMessage, onFileUpload }) => {
  return (
    <div className="flex items-center gap-2">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message"
        className="flex-1 p-2 border rounded"
      />
      <input
        type="file"
        onChange={onFileUpload}
        className="hidden"
        id="file-input"
      />
      <label htmlFor="file-input" className="cursor-pointer">
        <Paperclip size={24} />
      </label>
      <button onClick={onSendMessage} className="text-blue-500">
        <Send size={24} />
      </button>
    </div>
  );
};
