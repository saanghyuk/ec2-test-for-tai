const express = require("express");
const app = express();

const cors = require("cors");

app.use(cors());
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/members", (req, res) => {
  console.log("TEST");
});

app.listen(3000, () => {
  console.log("Server is listening...");
});
