const fs = require("fs");

const filePath = "./index.html";
const destFile = "./index2.html";

fs.readFile(filePath, (err, data) => {
  if (err) {
    console.log(
      "Some error occured while reading the file. \n Please try later."
    );
  } else {
    fs.writeFile(destFile, data, (err) => {
      if (err) {
        console.log("Some error occured while writing the file");
      } else {
        console.log("File has been written successfully");
      }
    });
  }
});
