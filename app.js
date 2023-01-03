const express = require("express");
let members = require("./members");

const app = express();

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.get("/api/members", (req, res) => {
  let { team } = req.query;
  if (team) {
    const teamMembers = members.filter(
      m => m.team.toLowerCase() == team.toLowerCase()
    );
    res.send(teamMembers);
  } else {
    res.send(members);
  }
});

app.listen(3000, () => {
  console.log("Server is listening...");
});
