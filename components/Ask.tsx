import { useRouter } from "next/navigation";
import { useState } from "react";

const Ask = ({ generateChat }: any) => {
  const [newQuestion, setNewQuestion] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);
  const router = useRouter();

  const handleClick = async () => {
    try {
      const response = await fetch("/api/chat-bot", {
        method: "POST",
        body: JSON.stringify({
          question: newQuestion,
        }),
      });
      if (response.ok) {
        setSuccess(true);
        const chat = await response.json();
        generateChat(newQuestion, setNewQuestion, chat.text, success);
        const textarea = document.getElementById("chat-bot");
        //@ts-ignore
        textarea.value = "";
      }
    } catch (err) {
      console.log(err);
      router.push("/error");
    }
  };
  return (
    <div className="form-section">
      <textarea
        id="chat-bot"
        rows={5}
        className="form-control"
        placeholder="Ask me anything..."
        onChange={(e) => setNewQuestion(e.target.value)}
      ></textarea>
      <button
        className="btn"
        onClick={() => {
          handleClick();
        }}
      >
        Ask Robin... 🤖
      </button>
    </div>
  );
};

export default Ask;
