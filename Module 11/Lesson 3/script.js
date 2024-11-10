const express = require("express");
const mongoose = require("mongoose");
const app = express();

mongoose
  .connect("mongodb://localhost:27017/books", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err);
  });

// Example route to test connection
app.get("/", async (req, res) => {
  try {
    const collections = await mongoose.connection.db
      .listCollections()
      .toArray();
    const collectionNames = collections.map((collection) => collection.name);
    res.json(collectionNames);
  } catch (err) {
    console.log("Error fetching collections:", err);
    res.status(500).send("Error fetching collections");
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
