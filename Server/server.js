const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const PORT = 5000;

const dbrouter = require("./routes/database");

// BodyParser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Test Routing
app.get("/", (req, res) => {
  res.send("Server for Grifin React Native App is running...");
});

// Routing
app.use("/database", dbrouter);

app.listen(PORT, () => {
  console.log(`Server is running on localhost:${PORT}.`);
});
