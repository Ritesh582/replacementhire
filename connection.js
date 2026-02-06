const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "admin",
  password: "admin@123",
  database: "admin"
});

db.connect(err => {
  if (err) throw err;
  console.log("✅ Connected to MySQL");
});

app.get("/", (req, res) => {
  res.send("Replacement Hire API is running");
});

app.listen(5000, () => console.log("Server started on port 5000"));
