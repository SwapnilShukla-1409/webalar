import React from "react";
import TaskCard from "./TaskCard";

export default function Column({ status, tasks, updateTask }) {
  return (
    <div
      className="column"
      style={{
        background: "#fff",
        borderRadius: 8,
        padding: 16,
        flex: 1,
        minHeight: 200,
      }}
    >
      <h3 style={{ marginTop: 0 }}>{status}</h3>
      {tasks.length === 0 ? (
        <p style={{ color: "#666" }}>No tasks</p>
      ) : (
        tasks.map((task) => (
          <TaskCard key={task._id} task={task} updateTask={updateTask} />
        ))
      )}
    </div>
  );
}
