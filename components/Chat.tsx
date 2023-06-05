import Ask from "./Ask";
import Answer from "./Answer";
import { useState } from "react";

const Chat = ({ generateStory }: any) => {
  const [storedValues, setStoredValues] = useState([]);

  const generateResponse = async (newQuestion: string, setNewQuestion: any) => {
    const response = generateStory(newQuestion);

    if (response) {
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

      <Ask generateResponse={generateResponse} />

      {storedValues.length > 0 && <Answer storedValues={storedValues} />}
    </div>
  );
};

export default Chat;
