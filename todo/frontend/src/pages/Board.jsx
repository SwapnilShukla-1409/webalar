import { useEffect, useState } from "react";
import axios from "axios";
import { useSocket } from "../context/SocketContext";
import { useAuth } from "../context/AuthContext";
import Column from "../components/Column";
import ActivityLog from "../components/ActivityLog";

export default function Board() {
  const socket = useSocket();
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);

  // Fetch all tasks from the backend
  const fetchTasks = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/tasks");
      setTasks(data);
    } catch (err) {
      console.error("Failed to fetch tasks:", err);
    }
  };

  useEffect(() => {
    fetchTasks();

    if (!socket) return;
    // Listen for any task changes
    socket.on("taskCreated", fetchTasks);
    socket.on("taskUpdated", fetchTasks);
    socket.on("taskDeleted", fetchTasks);

    return () => {
      socket.off("taskCreated", fetchTasks);
      socket.off("taskUpdated", fetchTasks);
      socket.off("taskDeleted", fetchTasks);
    };
  }, [socket]);

  // When the user drags/drops or edits a task, call this:
  const updateTask = async (task) => {
    try {
      await axios.put(`http://localhost:5000/api/tasks/${task._id}`, {
        ...task,
        username: user,             // so the backend can log who changed it
      });
      // backend will emit "taskUpdated" & fetchTasks will run via socket
    } catch (err) {
      console.error("Failed to update task:", err);
    }
  };

  const STATUSES = ["Todo", "In Progress", "Done"];

  return (
    <div className="board" style={{ padding: 20 }}>
      <h2>Hello, {user}</h2>
      <div
        className="kanban"
        style={{ display: "flex", gap: 16, marginTop: 16 }}
      >
        {STATUSES.map((status) => (
          <Column
            key={status}
            status={status}
            tasks={tasks.filter((t) => t.status === status)}
            updateTask={updateTask}
          />
        ))}
      </div>
      <ActivityLog />
    </div>
  );
}
