import { useState } from "react";

function ChatAssistant() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Log interaction details here (e.g., 'Met Dr. Smith, discussed hypertension drug, positive sentiment') or ask for help.",
    },
  ]);

  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;

    setMessages((prev) => [
      ...prev,
      { role: "user", content: input },
      {
        role: "assistant",
        content:
          "Got it 👍 I can summarize this interaction or help structure it for logging.",
      },
    ]);

    setInput("");
  };

  return (
    <div className="chat-container">
      <div className="chat-header">🤖 AI Assistant</div>

      <div className="chat-messages">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={
              msg.role === "user" ? "chat-bubble user" : "chat-bubble assistant"
            }
          >
            {msg.content}
          </div>
        ))}
      </div>

      <div className="chat-input">
        <input
          placeholder="Describe interaction..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default ChatAssistant;
