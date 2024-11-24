const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());
app.use(express.static("public"));

// Helper functions to read and write JSON files
const readData = (file) => JSON.parse(fs.readFileSync(file, "utf8"));
const writeData = (file, data) =>
  fs.writeFileSync(file, JSON.stringify(data, null, 2), "utf8");

// Paths for user and file data
const USERS_FILE = path.join(__dirname, "users.json");
const FILES_FILE = path.join(__dirname, "files.json");

// Route: Login
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;
  const users = readData(USERS_FILE);

  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  res.json({ token: `user_token_${user.id}`, role: user.role });
});

// Route: Upload File (All roles allowed)
app.post("/api/upload", (req, res) => {
  const { token, filename, content } = req.body;
  const users = readData(USERS_FILE);
  const files = readData(FILES_FILE);

  const user = users.find((u) => `user_token_${u.id}` === token);
  if (!user) {
    return res.status(403).json({ message: "Unauthorized" });
  }

  const newFile = {
    id: Date.now(),
    filename,
    content,
    owner: user.username,
  };

  files.push(newFile);
  writeData(FILES_FILE, files);

  res.json({ message: "File uploaded successfully!", file: newFile });
});

// Route: View Files (Role-specific)
app.get("/api/files", (req, res) => {
  const { token } = req.query;
  const users = readData(USERS_FILE);
  const files = readData(FILES_FILE);

  const user = users.find((u) => `user_token_${u.id}` === token);
  if (!user) {
    return res.status(403).json({ message: "Unauthorized" });
  }

  // Admins can view all files, others only their files
  const visibleFiles =
    user.role === "Admin"
      ? files
      : files.filter((file) => file.owner === user.username);

  res.json(visibleFiles);
});

// Route: Edit File (Only Admin and Editor allowed)
app.put("/api/edit", (req, res) => {
  const { token, fileId, newContent } = req.body;
  const users = readData(USERS_FILE);
  const files = readData(FILES_FILE);
  console.log(files);
  const user = users.find((u) => `user_token_${u.id}` === token);
  if (!user || !["Admin", "Editor"].includes(user.role)) {
    return res.status(403).json({ message: "Unauthorized" });
  }
  console.log(fileId);
  // Find the file
  const fileIndex = files.findIndex((file) => file.id === fileId);
  if (fileIndex === -1) {
    return res.status(404).json({ message: "File not found" });
  }

  const file = files[fileIndex];

  // Role-specific edit permissions
  if (user.role === "Editor" && file.owner !== user.username) {
    return res
      .status(403)
      .json({ message: "Editors can only edit their files" });
  }

  // Update the file
  file.content = newContent;
  file.lastEditedBy = user.username; // Track who edited it
  file.lastEditedAt = new Date().toISOString();

  files[fileIndex] = file;
  writeData(FILES_FILE, files);

  res.json({ message: "File updated successfully!", file });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
