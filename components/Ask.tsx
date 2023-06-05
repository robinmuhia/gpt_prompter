import { useState } from "react";

const Ask = ({ generateResponse }: any) => {
  const [newQuestion, setNewQuestion] = useState<string>("");
  return (
    <div className="form-section">
      <textarea
        rows={5}
        className="form-control"
        placeholder="Ask me anything..."
        onChange={(e) => setNewQuestion(e.target.value)}
      ></textarea>
      <button
        className="btn"
        onClick={() => generateResponse(newQuestion, setNewQuestion)}
      >
        Ask Robin... 🤖
      </button>
    </div>
  );
};

export default Ask;
