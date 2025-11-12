const express = require("express");
const bodyParser = require("body-parser");

const usersRouter = require("./routes/users");
const authRouter = require("./routes/auth");
const featureCollectionRouter = require("./routes/featurecollection");

const app = express();
const PORT = 3001;

// Middleware
app.use(bodyParser.json());

// Routes

app.use("/users", require("./routes/users"));
app.use("/auth", require("./routes/auth"));
app.use("/featurecollection", require("./routes/featurecollection"));

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
