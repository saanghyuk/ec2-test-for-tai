const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

members = [
  {
    id: 1,
    name: "SungHwan",
    team: "Customer Success",
    position: "Manager",
    emailAddress: "sunghwan@ab180.co"
  },
  {
    id: 2,
    name: "Damin",
    team: "Customer Success",
    position: "Manager",
    emailAddress: "damin@ab180.co"
  },
  {
    id: 3,
    name: "Jieun",
    team: "Customer Success",
    position: "Manager",
    emailAddress: "jieun@ab180.co"
  },
  {
    id: 4,
    name: "Tai",
    team: "SOLCON",
    position: "Team Lead",
    emailAddress: "tai@ab180.co"
  },
  {
    id: 5,
    name: "Sangil",
    team: "SOLCON",
    position: "Solution Consultant",
    emailAddress: "sangil@ab180.co"
  },
  {
    id: 6,
    name: "Youngwon",
    team: "Customer Success",
    position: "Manager",
    emailAddress: "youngwon@ab180.co"
  },
  {
    id: 7,
    name: "Yeoeun",
    team: "Enablement",
    position: "Manager",
    emailAddress: "yeoeun@ab180.co"
  },
  {
    id: 8,
    name: "Roi",
    team: "All",
    position: "CEO",
    emailAddress: "nam@ab180.co"
  },
  {
    id: 9,
    name: "Haeun",
    team: "Customer Success",
    position: "Manager",
    emailAddress: "haeun@ab180.co"
  }
];

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// GET: 전체 직원 정보 조회 (후에 팀 별 )
app.get("/api/members", (req, res) => {
  console.log(req.query);
  console.log(req.query);
  const { team } = req.query;
  if (team) {
    const teamMembers = members.filter(m => m.team == team);
    res.send(teamMembers);
  } else {
    res.send(members);
  }
  res.send(members);
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
