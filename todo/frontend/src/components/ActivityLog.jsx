import { useEffect, useState } from "react";
import axios from "axios";

export default function ActivityLog() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    fetchLogs();
    const interval = setInterval(fetchLogs, 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchLogs = async () => {
    const { data } = await axios.get("http://localhost:5000/api/actions");
    setLogs(data);
  };

  return (
    <div className="log-panel">
      <h4>Activity Log</h4>
      <ul>
        {logs.map((log, i) => (
          <li key={i}>
            [{new Date(log.timestamp).toLocaleTimeString()}] {log.user} - {log.action}
          </li>
        ))}
      </ul>
    </div>
  );
}
