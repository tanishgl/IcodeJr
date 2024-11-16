const express = require("express");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
const SECRET_KEY = "supersecretkey123";

const authenticate = (req, res, next) => {
  const auth = req.headers["authorization"];
  if (!auth) {
    res.status(403).json({ message: "ACCESS DENIED" });
  }
  const token = auth.split(" ")[1];
  if (!token) {
    res.status(403).json({ message: "ACCESS DENIED" });
  }
  jwt.verify(token, SECRET_KEY, (err, payload) => {
    if (err) res.status(403).json({ message: "INVALID OR EXPIRED TOKEN" });
    if (req.path === "/privatePosts") {
      let userRole = payload.role;
      if (userRole !== "admin") {
        return res
          .status(403)
          .json({ message: "You are not allowed to view these posts" });
      }
    }
    next();
  });
};

app.post("/signup", (req, res) => {
  const { username, password, role } = req.body;
  const token = jwt.sign(
    {
      username,
      password,
      role,
    },
    SECRET_KEY
  );
  res.json({ message: "Signed Up successfully", token });
});

app.get("/posts", authenticate, (req, res) => {
  res.json({ message: "You can view the posts" });
});

app.get("/privatePosts", authenticate, (req, res) => {
  res.json({ message: "You can view the private posts" });
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log("Server listening on Port 3000");
});
