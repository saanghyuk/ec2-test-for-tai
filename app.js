const express = require("express");
const app = express();
const cors = require("cors");

let members = require("./members");

app.use(cors());

// POST 할때 들어오는 JSON받을 수 있게 필요하다.
// app.use(express.json());

app.get("/", (req, res) => {
  console.log("/");
  res.sendFile(__dirname + "/index.html");
});

// GET: 전체 직원 정보 조회 (후에 팀 별 )
app.get("/api/members", (req, res) => {
  // console.log(req.query);
  const { team } = req.query;
  // case sensitive
  if (team) {
    const teamMembers = members.filter(m => m.team == team);
    res.send(teamMembers);
  } else {
    res.send(members);
  }
});

// GET: id별 비밀번호 조회
app.get("/api/members/:id", (req, res) => {
  const { id } = req.params;
  const member = members.find(m => m.id == Number(id));
  if (member) {
    res.send(member);
  } else {
    res.status(404).send({ message: "There is no such member" });
  }
});

// POST: 새로운 멤버 추가
app.post("/api/members", (req, res) => {
  const newMember = req.body;
  console.log(req.body);
  members.push(newMember);
  res.send(newMember);
});

app.put("/api/members/:id", (req, res) => {
  const { id } = req.params;
  const newInfo = req.body;
  const member = members.find(m => m.id === Number(id));
  if (member) {
    Object.keys(newInfo).forEach(prop => {
      member[prop] = newInfo[prop];
    });
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
    res.send({ message: "Deleted" });
  } else {
    res.status(404).sendFile({ message: "There is no member with the id" });
  }
});

app.listen(3000, () => {
  console.log("Server is listening...");
});
