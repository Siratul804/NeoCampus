"use client";

// NotificationComponent.jsx
import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import axios from "axios";

// Adjust URLs to match your server
const SOCKET_SERVER = "http://localhost:3001";
const REST_SERVER = "http://localhost:3001";

export function NotificationComponent() {
  const [socket, setSocket] = useState(null);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const socketClient = io(SOCKET_SERVER, { transports: ["websocket"] });
    setSocket(socketClient);

    socketClient.on("notification", (notif) => {
      setNotifications((prev) => [notif, ...prev]);
    });

    return () => socketClient.disconnect();
  }, []);

  const triggerNotification = async () => {
    try {
      await axios.post(`${REST_SERVER}/notify`, {
        message: "Hello from NotificationComponent!",
      });
    } catch (err) {
      console.error("Error sending notification:", err);
    }
  };

  return (
    <div className="max-w-sm mx-auto p-4 border rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Real-time Notifications</h2>
      <button
        onClick={triggerNotification}
        className="mb-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        Trigger Notification
      </button>
      <ul className="list-disc list-inside max-h-48 overflow-auto">
        {notifications.map((n, idx) => (
          <li key={idx} className="mb-2">
            <span className="font-medium">
              {new Date(n.timestamp).toLocaleTimeString()}:
            </span>{" "}
            {n.message}
          </li>
        ))}
      </ul>
    </div>
  );
}
