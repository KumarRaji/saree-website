const express = require("express");
const cors = require("cors");

const app = express();
const usersRouter = require("./routes/users");


// middleware
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());

// optional health route so / doesn’t 404
app.get("/", (req, res) => {
  res.send("API is up. Try GET /users");
});

// mount router
app.use("/users", usersRouter);
app.use("/auth", require("./routes/auth"));

// 404 fallback (optional)
app.use((req, res) => res.status(404).json({ message: "Not Found" }));

// start
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
