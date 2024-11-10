const mongoose = require("mongoose");

const BookSchema = mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  publishedYear: Number,
  pageCount: Number,
});

const Book = mongoose.model("Book", BookSchema);

module.exports = Book;
