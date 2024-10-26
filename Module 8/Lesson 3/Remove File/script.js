const fs = require("fs");

const fileUrl = "./base.txt";

fs.rm(fileUrl, (err) => {
  if (err) {
    console.log("Some error while removing the file");
  } else {
    console.log("File has been removed successfully");
  }
});
