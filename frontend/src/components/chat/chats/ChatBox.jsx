import React from 'react';
import ChatHeader from './ChatHeader';
import ChatMessage from './ChatMessage';

const ChatBox = () => {
  return (
    <div className="flex flex-col h-screen">
      <ChatHeader />
      <div className="flex-grow overflow-y-auto">
        <ChatMessage />
      </div>
    </div>
  );
};

export default ChatBox;

