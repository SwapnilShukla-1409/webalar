import { useEffect, useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000"); // Adjust if deployed

function TaskPage() {
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "Low",
    status: "Todo",
    assignedTo: ""
  });

  useEffect(() => {
    axios.get("http://localhost:5000/api/tasks").then(res => setTasks(res.data));
    axios.get("http://localhost:5000/api/auth/users").then(res => setUsers(res.data));
  }, []);

  // ✅ Real-time listeners
  useEffect(() => {
    socket.on("taskCreated", (task) => {
      setTasks((prev) => [...prev, task]);
    });

    socket.on("taskUpdated", (updatedTask) => {
      setTasks((prev) =>
        prev.map((t) => (t._id === updatedTask._id ? updatedTask : t))
      );
    });

    socket.on("taskDeleted", (taskId) => {
      setTasks((prev) => prev.filter((t) => t._id !== taskId));
    });

    return () => {
      socket.off("taskCreated");
      socket.off("taskUpdated");
      socket.off("taskDeleted");
    };
  }, []);

  const createTask = async () => {
    try {
      await axios.post("http://localhost:5000/api/tasks", form);
      setForm({ title: "", description: "", priority: "Low", status: "Todo", assignedTo: "" });
    } catch (err) {
      console.error("Error creating task:", err);
      alert("Failed to create task.");
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${id}`);
    } catch (err) {
      alert("Failed to delete task");
    }
  };

  return (
    <div style={{ padding: "30px", fontFamily: "sans-serif" }}>
      <h2>📋 All Tasks</h2>

      <div style={{ marginBottom: "20px", padding: "10px", border: "1px solid #aaa", borderRadius: 6 }}>
        <h3>Create New Task</h3>
        <input placeholder="Title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
        <input placeholder="Description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
        <select value={form.priority} onChange={e => setForm({ ...form, priority: e.target.value })}>
          <option>Low</option><option>Medium</option><option>High</option>
        </select>
        <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })}>
          <option>Todo</option><option>In Progress</option><option>Done</option>
        </select>
        <select value={form.assignedTo} onChange={e => setForm({ ...form, assignedTo: e.target.value })}>
          <option value="">Unassigned</option>
          {users.map(user => (
            <option key={user._id} value={user._id}>{user.username}</option>
          ))}
        </select>
        <button onClick={createTask}>Add Task</button>
      </div>

      {tasks.length === 0 ? (
        <p>No tasks available.</p>
      ) : (
        tasks.map((task) => (
          <div key={task._id} style={{ border: "1px solid #ccc", marginBottom: "10px", padding: "10px", borderRadius: "6px" }}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p><strong>Status:</strong> {task.status}</p>
            <p><strong>Priority:</strong> {task.priority}</p>
            <p><strong>Assigned To:</strong> {task.assignedTo?.username || "Unassigned"}</p>
            <button onClick={() => deleteTask(task._id)} style={{ marginTop: 5, color: "red" }}>Delete</button>
          </div>
        ))
      )}
    </div>
  );
}

export default TaskPage;

