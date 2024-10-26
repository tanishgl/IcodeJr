const qrcode = require("qrcode");

const data = {
  name: "Tanish",
  favoriteColor: "green",
  favNumber: 29,
  secretCode: "2oadhfja28472394#@$sdf",
};

let stringData = JSON.stringify(data);

qrcode.toString(stringData, (err, url) => {
  if (err) console.log("Some error occurred");
  console.log(url);
});
