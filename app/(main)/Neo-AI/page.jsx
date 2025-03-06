"use client";

import { useState, useEffect, useRef } from "react";
import { ArrowUp } from "lucide-react";

export default function QuizGenerator() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      text: `Hello, user! What you wanna know?`,
      isBot: true,
    },
  ]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null); // For auto-scrolling to bottom

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, loading]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (message.trim()) {
      const userMessage = { text: message, isBot: false };
      setMessages((prev) => [...prev, userMessage]);
      setMessage("");
      setLoading(true);

      try {
        const response = await fetch("/api/neoAi", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ input: message }),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch quiz response");
        }

        const data = await response.json();
        const botMessage = {
          text: data.answer || "No response available.",
          isBot: true,
        };

        setMessages((prev) => [...prev, botMessage]);
      } catch (error) {
        console.error("Error fetching quiz response:", error);
        const errorMessage = {
          text: "Oops! Something went wrong. Please try again.",
          isBot: true,
        };
        setMessages((prev) => [...prev, errorMessage]);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="w-full px-4 py-2 pt-[3vh] ">
      <div className="bg-white min-h-[530px] p-6 rounded-3xl shadow-xl border border-gray-300">
        {/* Header Section */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-black">NeoCampus AI</h1>
        </div>

        {/* Messages Section */}
        <div className="min-h-[350px] max-h-[400px] overflow-y-auto p-4 bg-gradient-to-r from-peach-100  to-coral-50 rounded-xl flex flex-col-reverse">
          <div>
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.isBot ? "justify-start" : "justify-end"
                }`}
              >
                <div
                  className={`text-sm p-3 rounded-xl max-w-[80%] mt-4 ${
                    msg.isBot
                      ? "bg-slate-200 text-black "
                      : "bg-slate-500 text-white "
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="text-sm p-3 rounded-xl max-w-[80%] bg-gradient-to-r from-purple-200 via-purple-100 to-indigo-100 text-gray-900">
                  Typing...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Section */}
        <form onSubmit={handleSubmit} className="mt-4">
          <div className="flex items-center border border-gray-300 rounded-xl overflow-hidden">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Enter what you wanna know?..."
              className="flex-1 rounded px-4 py-2 text-gray-800 placeholder-gray-500 focus:outline-none"
            />
            <button
              type="submit"
              className="p-3 rounded bg-slate-600 hover:bg-slate-700 text-white hover:opacity-90 transition-all cursor-pointer "
              disabled={loading}
            >
              <ArrowUp className="w-5 h-5" />
              <span className="sr-only">Send message</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
