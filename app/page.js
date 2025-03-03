"use client";

import { useEffect, useState } from "react";
import { socket } from "../socket";
import { SidebarPage } from "@/components/Sidebar";

import { useUser } from "@clerk/nextjs";

export default function Home() {
  const [isConnected, setIsConnected] = useState(false);
  const [transport, setTransport] = useState("N/A");
  const [notification, setNotification] = useState("");

  const { user: clerkUser, isLoaded } = useUser();

  // console.log(clerkUser?.id);
  // console.log(clerkUser?.imageUrl);

  useEffect(() => {
    if (socket.connected) {
      onConnect();
    }

    function onConnect() {
      setIsConnected(true);
      setTransport(socket.io.engine.transport.name);

      socket.io.engine.on("upgrade", (transport) => {
        setTransport(transport.name);
      });
    }

    function onDisconnect() {
      setIsConnected(false);
      setTransport("N/A");
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    socket.on("notification", (message) => {
      setNotification(message);
    });

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("notification");
    };
  }, []);

  const handleClick = () => {
    socket.emit("triggerNotification");
  };

  return (
    <div>
      {/* <p>Status: {isConnected ? "connected" : "disconnected"}</p>
      <p>Transport: {transport}</p>
      <button onClick={handleClick} className=" bg-amber-200 rounded ">
        Trigger Notification
      </button>
      {notification && <p>Notification: {notification}</p>} */}
      {/* <SidebarPage/> */}
    </div>
  );
}
