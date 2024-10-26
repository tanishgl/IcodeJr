const express = require("express");
const app = express();

app.use(express.json());

app.post("/", (req, res) => {
  console.log(req.body);
  res.end(`You sent ${req.body.message} and your id is ${req.body.id}`);
});

app.listen(2929, () => {
  console.log("Server is started on 2929");
});
