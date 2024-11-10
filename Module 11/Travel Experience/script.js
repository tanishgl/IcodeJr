const express = require("express");
const mongoose = require("mongoose");
const { User, Place } = require("./Model");

const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/travelDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB", err));

// Creating a new user

app.post("/users", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get all users
app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (error) {
    res.status(500).send(error);
  }
});

//Get user by id
app.get("/users/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).send("User not found");
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update a user by id

app.put("/users/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!user) return res.status(404).send("User not found");
    res.send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete a user by ID

app.delete("/users/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).send("User not found");
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Creating a new Place

app.post("/places", async (req, res) => {
  try {
    const place = new Place(req.body);
    await place.save();
    res.status(201).send(place);
  } catch (error) {
    res.status(400).send(error);
  }
});

//Get All Places
app.get("/places", async (req, res) => {
  try {
    const places = await Place.find().populate("visitedBy", "username email");
    res.send(places);
  } catch (error) {
    res.status(500).send(error);
  }
});

//Get a Place by ID
app.get("/places/:id", async (req, res) => {
  try {
    const place = await Place.findById(req.params.id).populate(
      "visitedBy",
      "username email"
    );
    if (!place) return res.status(404).send("Place not found");
    res.send(place);
  } catch (error) {
    res.status(500).send(error);
  }
});

//Update a Place by ID
app.put("/places/:id", async (req, res) => {
  try {
    const place = await Place.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!place) return res.status(404).send("Place not found");
    res.send(place);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete a Place by ID
app.delete("/places/:id", async (req, res) => {
  try {
    const place = await Place.findByIdAndDelete(req.params.id);
    if (!place) return res.status(404).send("Place not found");
    res.send(place);
  } catch (error) {
    res.status(500).send(error);
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
