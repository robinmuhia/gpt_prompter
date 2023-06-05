"use client";

import Chat from "components/Chat";

const ChatBot = () => {
  const generateStory = (question: string) => {
    return "Hello World";
  };

  return (
    <div>
      <Chat generateStory={generateStory} />
    </div>
  );
};

export default ChatBot;
