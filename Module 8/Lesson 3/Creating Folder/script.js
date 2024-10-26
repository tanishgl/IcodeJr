const fs = require("fs");

fs.mkdir("./folder1/folder1A", { recursive: true }, (error, path) => {
  console.log(path);
});
