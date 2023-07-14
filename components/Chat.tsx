"use client";

import Ask from "./Ask";
import Answer from "./Answer";
import { Dispatch, useState, SetStateAction } from "react";

const Chat = () => {
  const [storedValues, setStoredValues] = useState([]);

  const generateChat = async (
    newQuestion: string,
    setNewQuestion: Dispatch<SetStateAction<string>>,
    response: Promise<string>,
    success: boolean
  ) => {
    if (success) {
      setStoredValues([
        //@ts-ignore
        {
          question: newQuestion,
          answer: response,
        },
        ...storedValues,
      ]);
      setNewQuestion("");
    }
  };

  return (
    <div>
      <div className="header-section">
        <h1>Robin-bot 🤖</h1>
        {storedValues.length < 1 && (
          <p>
            I am an automated question and answer system, designed to assist you
            in finding relevant information about me and us. You are welcome to
            ask me any queries you may have, and I will do my utmost to offer
            you a reliable response. Kindly keep in mind that I am a machine and
            operate solely based on programmed algorithms by yours truly, Robin.
          </p>
        )}
      </div>

      <Ask generateChat={generateChat} />

      {storedValues.length > 0 && <Answer storedValues={storedValues} />}
    </div>
  );
};

export default Chat;
