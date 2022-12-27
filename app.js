const express = require("express");
const app = express();

const cors = require("cors");

app.use(cors());
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/main.html");
});

app.listen(3000, () => {
  console.log("Server is listening...");
});
