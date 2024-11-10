const mongoose = require("mongoose");
// User schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});
const User = mongoose.model("User", userSchema);

// Place schema
const placeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: {
    city: String,
    country: String,
  },
  description: String,
  visitedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  rating: { type: Number, min: 1, max: 5 },
  createdAt: { type: Date, default: Date.now },
});
const Place = mongoose.model("Place", placeSchema);

module.exports = { Place, User };
