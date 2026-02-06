const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

/* DB CONNECTION */
const db = mysql.createConnection({
  host: "localhost",
  user: "admin",
  password: "admin@123",
  database: "admin",
});

db.connect((err) => {
  if (err) {
    console.error("❌ MySQL connection failed", err);
    return;
  }
  console.log("✅ Connected to MySQL");
});

/* ================= SESSION START ================= */
app.post("/api/session/start", (req, res) => {
  const { sessionId } = req.body;

  if (!sessionId) {
    return res.status(400).json({ success: false, message: "No sessionId" });
  }

  const ipAddress =
    req.headers["x-forwarded-for"] || req.socket.remoteAddress;
  const userAgent = req.headers["user-agent"];

  const sql = `
    INSERT IGNORE INTO user_sessions 
    (session_id, start_time, ip_address, user_agent)
    VALUES (?, NOW(), ?, ?)
  `;

  db.query(sql, [sessionId, ipAddress, userAgent], (err, result) => {
    if (err) {
      console.error("❌ Session save error:", err);
      return res.status(500).json({ success: false });
    }

    res.json({
      success: true,
      inserted: result.affectedRows === 1,
    });
  });
});

/* ================= TEST ================= */
app.get("/", (req, res) => {
  res.send("Replacement Hire API is running");
});

/* ================= START SERVER ================= */
app.listen(5000, () => {
  console.log("🚀 Server running on port 5000");
});
