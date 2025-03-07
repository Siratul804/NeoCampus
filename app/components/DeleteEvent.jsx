"use client";

import { Trash } from "lucide-react";
import { enqueueSnackbar } from "notistack";

export default function DeleteEvent({ todo_id, handleRevalidate, revalidate }) {
  const handleDelete = async () => {
    // if (!todo_id) return alert("Todo ID is missing!");
    if (!todo_id)
      return enqueueSnackbar("Todo ID is missing!", {
        variant: "error",
      });

    try {
      const response = await fetch("/api/todoDelete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ todo_id }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to delete.");
      }

      // alert("To-Do deleted successfully!");
      enqueueSnackbar("To-Do deleted successfully!", {
        variant: "default",
      });
      handleRevalidate();
    } catch (error) {
      console.error("Delete error:", error);
      alert(error.message);
    }
  };

  return (
    <span onClick={handleDelete} className="cursor-pointer inline-flex">
      <Trash className="h-5 w-5" />
    </span>
  );
}
