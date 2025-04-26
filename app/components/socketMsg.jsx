"use client";
// ChatComponent.jsx
import React, { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";

// Adjust this URL to match your server
const SOCKET_SERVER_URL = "http://localhost:3001";

export function SocketMsg({ userId }) {
  const [socket, setSocket] = useState(null);
  const [receiverId, setReceiverId] = useState("");
  const [content, setContent] = useState("");
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const socketClient = io(SOCKET_SERVER_URL, { transports: ["websocket"] });
    setSocket(socketClient);
    socketClient.emit("join", userId);

    socketClient.on("private-message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    socketClient.on("message-sent", (msg) => {
      console.log("Delivered:", msg);
    });

    return () => socketClient.disconnect();
  }, [userId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!receiverId || !content) return;
    const msg = {
      senderId: userId,
      receiverId,
      content,
      timestamp: Date.now(),
    };
    socket.emit("private-message", msg);
    setContent("");
  };

  return (
    <main className="pt-[12vh] ">
      <div className="max-w-md mx-auto p-4 border rounded-lg shadow ">
        <h2 className="text-xl font-semibold mb-4">Chat (User: {userId})</h2>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Receiver ID"
            value={receiverId}
            onChange={(e) => setReceiverId(e.target.value)}
            className="w-full mb-2 p-2 border rounded"
          />
          <textarea
            placeholder="Message"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-2 border rounded"
          />
          <button
            onClick={sendMessage}
            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Send Message
          </button>
        </div>

        <h3 className="font-semibold mb-2">Conversation</h3>
        <div className="max-h-60 overflow-auto border p-2 rounded">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`mb-2 p-2 rounded ${
                m.senderId === userId
                  ? "bg-blue-100 text-right"
                  : "bg-gray-100 text-left"
              }`}
            >
              <p className="text-sm text-gray-600">
                {m.senderId} → {m.receiverId}
              </p>
              <p>{m.content}</p>
              <p className="text-xs text-gray-500">
                {new Date(m.timestamp).toLocaleTimeString()}
              </p>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>
    </main>
  );
}
