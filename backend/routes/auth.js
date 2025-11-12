// routes/auth.js
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../db");

const router = express.Router();
const SALT_ROUNDS = 10;

// helper: create JWT
function signToken(payload) {
  return jwt.sign(
    payload,
    process.env.JWT_SECRET || "devsecret",
    { expiresIn: process.env.JWT_EXPIRES || "7d" }
  );
}

// POST /auth/register
router.post("/register", (req, res) => {
  const { name, email, password, age } = req.body || {};

  // Basic validation
  if (!name || !email || !password) {
    return res.status(400).json({ message: "name, email, password are required" });
  }
  if (password.length < 6) {
    return res.status(400).json({ message: "password must be at least 6 characters" });
  }

  // Check email exists
  const checkSql = "SELECT id FROM admin WHERE email = ? LIMIT 1";
  db.query(checkSql, [email], async (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    if (rows.length > 0) {
      return res.status(409).json({ message: "Email already registered" });
    }

    try {
      const hash = await bcrypt.hash(password, SALT_ROUNDS);
      const insertSql = "INSERT INTO admin (name, email, password, age) VALUES (?, ?, ?, ?)";
      db.query(insertSql, [name, email, hash, age ?? null], (err2, result) => {
        if (err2) return res.status(500).json({ error: err2.message });

        const token = signToken({ id: result.insertId, email, name });
        return res.json({
          message: "Registered successfully",
          user: { id: result.insertId, name, email, age: age ?? null },
          token,
        });
      });
    } catch (hashErr) {
      return res.status(500).json({ error: hashErr.message });
    }
  });
});

// POST /auth/login
router.post("/login", (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) {
    return res.status(400).json({ message: "email and password are required" });
  }

  const sql = "SELECT id, name, email, password, age FROM admin WHERE email = ? LIMIT 1";
  db.query(sql, [email], async (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    if (rows.length === 0) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const user = rows[0];
    try {
      const ok = await bcrypt.compare(password, user.password);
      if (!ok) return res.status(401).json({ message: "Invalid credentials" });

      const token = signToken({ id: user.id, email: user.email, name: user.name });
      return res.json({
        message: "Logged in",
        user: { id: user.id, name: user.name, email: user.email, age: user.age },
        token,
      });
    } catch (cmpErr) {
      return res.status(500).json({ error: cmpErr.message });
    }
  });
});

// GET /auth/me  (protected)
router.get("/me", require("../middleware/auth"), (req, res) => {
  // req.user comes from JWT: { id, email, name }
  const sql = "SELECT id, name, email, age FROM admin WHERE id = ? LIMIT 1";
  db.query(sql, [req.user.id], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    if (rows.length === 0) return res.status(404).json({ message: "User not found" });
    res.json(rows[0]);
  });
});

module.exports = router;
