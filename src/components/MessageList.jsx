import React from 'react';

export const MessageList = ({ messages }) => {
  const formatMessageContent = (msg) => {
    if (msg.type === 'text') {
      return msg.text;
    } else if (msg.type === 'image') {
      return <img src={msg.data.url} alt="media" className="max-w-xs rounded" />;
    } else if (msg.type === 'video') {
      return <video src={msg.data.url} controls className="max-w-xs rounded" />;
    } else if (msg.type === 'file') {
      return <a href={msg.data.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">Download File</a>;
    }
    return 'Unsupported message type';
  };

  return (
    <div className="flex-1 overflow-y-auto">
      {messages.map((msg, index) => (
        <div key={index} className="my-2">
          <div className="font-bold">{msg.sender.name}</div>
          <div>{formatMessageContent(msg)}</div>
        </div>
      ))}
    </div>
  );
};