import React from "react";

// Define the workflow order here:
const STATUS_ORDER = ["Todo", "In Progress", "Done"];

export default function TaskCard({ task, updateTask }) {
  // Compute the next status in the cycle:
  const currentIndex = STATUS_ORDER.indexOf(task.status);
  const nextIndex = (currentIndex + 1) % STATUS_ORDER.length;
  const nextStatus = STATUS_ORDER[nextIndex];

  const handleMove = () => {
    updateTask({
      ...task,
      status: nextStatus,
      updatedAt: new Date().toISOString(),
    });
  };

  return (
    <div
      className="task-card"
      style={{
        background: "#f9f9f9",
        padding: 12,
        marginBottom: 12,
        borderRadius: 6,
        boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
      }}
    >
      <h4 style={{ margin: "0 0 8px 0" }}>{task.title}</h4>
      <p style={{ margin: "0 0 8px 0", fontSize: 14 }}>
        {task.description || <em>No description</em>}
      </p>
      <p style={{ margin: "0 0 8px 0", fontSize: 12, color: "#555" }}>
        Priority: {task.priority}
      </p>
      <button
        onClick={handleMove}
        style={{
          fontSize: 12,
          padding: "4px 8px",
          borderRadius: 4,
          cursor: "pointer"
        }}
      >
        Move to “{nextStatus}”
      </button>
    </div>
  );
}
