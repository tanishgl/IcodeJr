const fs = require("fs");

const fileUrl = "./basic.txt";

fs.readFile(fileUrl, "utf-8", (error, data) => {
  console.log(data.length);
});
