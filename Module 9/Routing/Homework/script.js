const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.end("hello");
});

app.get("/shop", (req, res) => {
  fs.readFile("./index.html", (err, data) => {
    res.status(200).sendFile(path.join(__dirname, "index.html"));
  });
});

app.listen(2929, () => {
  console.log("Server is started on 2929");
});
