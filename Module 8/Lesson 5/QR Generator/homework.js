const fs = require("fs");
const qrcode = require("qrcode");

const pathUrl = "./homeworkTxt.txt";

fs.readFile(pathUrl, (err, data) => {
  if (err) {
    console.log("Some error occurred");
  }
  if (data) {
    let obj = { message: data };
    let qrString = JSON.stringify(obj);
    qrcode.toString(qrString, (err, url) => {
      console.log(url);
    });
  }
});
