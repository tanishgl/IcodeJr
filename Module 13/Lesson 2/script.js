const express = require("express");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

const SECRET_KEY = "supersecretkey123";

app.post("/signup", (req, res) => {
  const { username, password } = req.body;

  // Create a JWT Token
  const token = jwt.sign(
    {
      username,
      password,
    },
    SECRET_KEY
  );

  return res.json({ message: "Sign Up Successful", token });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log("App is listening on Port 3000");
});
