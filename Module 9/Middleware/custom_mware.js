const express = require("express");

const app = express();

app.use((req, res, next) => {
  console.log("Hi, there's a request!");
  next();
});

app.use("/shopping", (req, res, next) => {
  if (req.method === "POST") {
    console.log("post request");
    req.specialId = 29;
  }
  next();
});

app.get("/", (req, res) => {
  res.end("Hello world");
});

app.get("/shopping", (req, res) => {
  res.end("get it");
});

app.post("/shopping", (req, res) => {
  res.end(`Your id is ${req.specialId}`);
});

app.listen(2929, () => {
  console.log("Server is running on 2929");
});
