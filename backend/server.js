require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

const corsOptions = {
  origin: (origin, cb) => cb(null, true), // dev: allow all
  credentials: true,
  methods: ["GET","POST","PUT","PATCH","DELETE","OPTIONS"],
  allowedHeaders: ["Content-Type","Authorization"]
};
app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

app.use(express.json());

app.get("/", (_req, res) => res.send("API is up."));

app.use("/users", require("./routes/users"));
app.use("/auth", require("./routes/auth"));
app.use("/featurecollection", require("./routes/featurecollection")); // <-- IMPORTANT

app.use((req, res) => res.status(404).json({ message: "Not Found" }));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
