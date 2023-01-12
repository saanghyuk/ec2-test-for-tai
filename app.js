const express = require("express");
// let members = require("./members");

const fs = require("fs");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

const members_json = fs.readFileSync("members.json", "utf-8");
let members = JSON.parse(members_json);

console.log(members);
console.log(typeof members);

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

app.get("/api/members/:id", (req, res) => {
  const { id } = req.params;
  const member = members.find(m => m.id == Number(id));

  if (member) {
    res.send(member);
  } else {
    res.status(404).send({ message: "There is no such member" });
  }
});

app.post("/api/members", (req, res) => {
  const newMember = req.body;
  members.push(newMember);
  fs.writeFileSync("members.json", JSON.stringify(members));
  res.status(200).send(newMember);
});

app.put("/api/members/:id", (req, res) => {
  const { id } = req.params;
  const newInfo = req.body;
  const member = members.find(m => m.id === Number(id));
  if (member) {
    Object.keys(newInfo).forEach(prop => {
      member[prop] = newInfo[prop];
    });
    fs.writeFileSync("members.json", JSON.stringify(members));
    res.send(member);
  } else {
    res.status(404).send({ message: "There is no member with the id" });
  }
});

app.delete("/api/members/:id", (req, res) => {
  const { id } = req.params;
  const membersCount = members.length;
  members = members.filter(member => member.id !== Number(id));
  if (members.length <= membersCount) {
    fs.writeFileSync("members.json", JSON.stringify(members));
    res.send({ message: "Deleted" });
  } else {
    res.status(404).send({ message: "There is no member with the id" });
    f;
  }
});

app.listen(3000, () => {
  console.log("Server is listening...");
});
