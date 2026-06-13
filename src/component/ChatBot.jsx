import React, { useState } from "react";

const ChatBot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8010";

  const appendMessage = (message) => {
    setMessages((prev) => [...prev, message]);
  };

  const sendMessage = async () => {
    const cleanInput = input.trim();
    if (!cleanInput || isSending) return;

    const history = messages.slice(-12).map((msg) => ({
      role: msg.role === "bot" ? "assistant" : "user",
      text: msg.text,
    }));

    appendMessage({ role: "user", text: cleanInput });
    setInput("");
    setIsSending(true);

    try {
      const res = await fetch(`${API_URL}/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: cleanInput, history }),
      });
      if (!res.ok) {
        throw new Error(`Chat API failed with status ${res.status}`);
      }

      const data = await res.json();
      appendMessage({
        role: "bot",
        text: data.reply || "I could not generate a reply right now.",
      });
    } catch (err) {
      console.error(err);
      appendMessage({
        role: "bot",
        text: "Server error. Check AI service on port 8010.",
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <>
      <div
        onClick={() => setOpen(!open)}
        className="fixed z-50 bottom-6 right-6 bg-indigo-600 text-white px-5 py-3 rounded-full shadow-lg cursor-pointer"
      >
        AI Stylist
      </div>

      {open && (
        <div className="fixed z-50 bottom-20 right-6 w-80 bg-white rounded-xl shadow-2xl flex flex-col">
          <div className="bg-indigo-600 text-white p-3 rounded-t-xl">
            AI Fashion Stylist
          </div>

          <div className="flex-1 p-3 overflow-y-auto h-72">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`mb-2 ${
                  msg.role === "user" ? "text-right" : "text-left text-gray-700"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          <div className="flex border-t">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") sendMessage();
              }}
              className="flex-1 p-2 outline-none"
              placeholder="Ask about fashion..."
            />
            <button
              onClick={sendMessage}
              disabled={isSending}
              className="bg-indigo-600 text-white px-4"
            >
              {isSending ? "..." : "Send"}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;
