import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function AdminDashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/session/admin")
      .then(res => res.json())
      .then(setData);

    const interval = setInterval(() => {
      fetch("http://localhost:5000/api/session/admin")
        .then(res => res.json())
        .then(setData);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  if (!data) return <div className="p-5">Loading...</div>;

  return (
    <div className="container py-4">
      <h2 className="mb-4">📊 Admin Dashboard</h2>

      <div className="row g-3 mb-4">
        <div className="col-md-4">
          <div className="card p-3 shadow">
            <h6>Total Sessions</h6>
            <h3>{data.total}</h3>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card p-3 shadow">
            <h6>Active Sessions</h6>
            <h3>{data.active}</h3>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card p-3 shadow">
            <h6>Avg Duration (sec)</h6>
            <h3>{data.avgDuration}</h3>
          </div>
        </div>
      </div>

      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Session</th>
            <th>Start</th>
            <th>End</th>
            <th>Duration (s)</th>
          </tr>
        </thead>
        <tbody>
          {data.sessions.map(s => (
            <tr key={s.id}>
              <td>{s.id}</td>
              <td>{s.session_id}</td>
              <td>{new Date(s.start_time).toLocaleString()}</td>
              <td>{s.end_time ? new Date(s.end_time).toLocaleString() : "Active"}</td>
              <td>{s.duration_seconds || "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
