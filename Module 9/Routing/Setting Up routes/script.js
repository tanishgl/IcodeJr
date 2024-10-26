const express = require("express");
const fs = require("fs");
const app = express();

app.get("/", (req, res) => {
  res.end("hello");
});

app.get("/product", (req, res) => {
  res.status(200).send("<h1>Product ID 29</h1>");
});

app.get("/greet", (req, res) => {
  const fileURL = "./index.html";
  fs.readFile(fileURL, (err, data) => {
    res.status(200).end(data);
  });
});

app.post("/submit", (req, res) => {
  console.log(req);
});

app.listen(2929, () => {
  console.log("Server is started on 2929");
});
