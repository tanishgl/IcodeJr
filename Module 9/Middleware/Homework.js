const express = require("express");

const app = express();

app.use("/removeProduct", (req, res, next) => {
  if (req.method === "DELETE") {
    req.warningMessage = "Are you sure you wish to delete this ?";
  }
  next();
});

app.delete("/removeProduct", (req, res) => {
  res.end(req.warningMessage);
});

app.listen(2929, () => {
  console.log("Server is running on 2929");
});
