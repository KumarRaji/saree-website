const express = require("express");
const db = require("../db"); // mysql2 pool (callback API)
const router = express.Router();

// quick request logger for debugging
router.use((req, _res, next) => {
  console.log(`[featurecollection] ${req.method} ${req.originalUrl}`);
  next();
});

// CREATE
router.post("/", (req, res) => {
  const { title, category, amount } = req.body || {};
  if (!title || !category || amount == null) {
    return res.status(400).json({ message: "title, category, amount are required" });
  }
  const sql = "INSERT INTO featurecollection (title, category, amount) VALUES (?, ?, ?)";
  db.query(sql, [title, category, amount], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: result.insertId, title, category, amount });
  });
});

// READ all
router.get("/", (_req, res) => {
  db.query(
    "SELECT id, title, category, amount FROM featurecollection ORDER BY id DESC",
    (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(rows);
    }
  );
});

// READ one
router.get("/:id", (req, res) => {
  db.query(
    "SELECT id, title, category, amount FROM featurecollection WHERE id = ? LIMIT 1",
    [req.params.id],
    (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      if (rows.length === 0) return res.status(404).json({ message: "Not found" });
      res.json(rows[0]);
    }
  );
});

// UPDATE
router.put("/:id", (req, res) => {
  const { title, category, amount } = req.body || {};
  if (!title || !category || amount == null) {
    return res.status(400).json({ message: "title, category, amount are required" });
  }
  db.query(
    "UPDATE featurecollection SET title = ?, category = ?, amount = ? WHERE id = ?",
    [title, category, amount, req.params.id],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      if (result.affectedRows === 0) return res.status(404).json({ message: "Not found" });
      res.json({ id: Number(req.params.id), title, category, amount });
    }
  );
});

// DELETE
router.delete("/:id", (req, res) => {
  db.query("DELETE FROM featurecollection WHERE id = ?", [req.params.id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Deleted", id: Number(req.params.id) });
  });
});

module.exports = router;
