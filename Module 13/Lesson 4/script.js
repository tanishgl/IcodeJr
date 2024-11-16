const express = require("express");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

const SECRET_KEY = "supersecretkey123";

const authenticate = (req, res, next) => {
  const auth = req.headers["authorization"];

  if (!auth) {
    return res.status(403).json({ message: "ACCESS DENIED!" });
  }

  const token = auth.split(" ")[1];

  if (!token) {
    return res.status(403).json({ message: "ACCESS DENIED!" });
  }

  jwt.verify(token, SECRET_KEY, (err, payload) => {
    if (err) {
      if (err.name === jwt.TokenExpiredError) {
        return res
          .status(403)
          .json({ message: "TOKEN EXPIRED. Please Sign Up again" });
      }
      return res.status(403).json({ message: "INVALID OR EXPIRED TOKEN!" });
    }
    next();
  });
};

app.post("/signup", (req, res) => {
  const { username, password } = req.body;

  // Create a JWT Token
  const token = jwt.sign(
    {
      username,
      password,
    },
    SECRET_KEY,
    { expiresIn: "10s" }
  );

  return res.json({ message: "Sign Up Successful", token });
});

app.get("/posts", authenticate, (req, res) => {
  return res.json({ message: "You can view the posts" });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log("App is listening on Port 3000");
});
