"use client";

import { useEffect, useState } from "react";

import { socket } from "../../socket";

function page() {
  const [notification, setNotification] = useState("");
  useEffect(() => {
    console.log("Setting up listeners...");

    socket.on("connect", () => {
      console.log("Connected:", socket.id);
    });

    socket.on("notification", (message) => {
      console.log("Received notification:", message);
      setNotification(message);
    });

    socket.on("menuAdded", (message) => {
      console.log("Received menuAdded:", message); // Add this log
      setNotification(message);
    });

    return () => {
      socket.off("notification");
      socket.off("menuAdded");
      socket.off("connect");
    };
  }, []);

  const handleClick = () => {
    socket.emit("triggerNotification");
  };

  const handleMenuAdded = () => {
    socket.emit("triggerMenuAdded");
  };

  return (
    <>
      <button onClick={handleClick} className=" bg-amber-200 rounded ">
        Trigger Notification
      </button>
      <br />
      <br />
      <br />
      <button onClick={handleMenuAdded} className=" bg-amber-200 rounded ">
        Trigger Menu Added
      </button>
      {notification && <p>Notification: {notification}</p>}
    </>
  );
}

export default page;
