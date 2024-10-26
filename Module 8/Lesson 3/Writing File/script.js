const fs = require("fs");

const fileUrl = "./../Reading File/basic.txt";

fs.readFile(fileUrl, "utf-8", (error, data) => {
  fs.writeFile("test.txt", data, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("File has been created successfully");
    }
  });
});
