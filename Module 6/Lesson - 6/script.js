let body = document.body;
let switcher = document.querySelector(".switch");
let title = document.querySelector(".title");
let para = document.querySelector(".para");

let isDay = true;

let bulb = document.querySelector(".bulb");
bulb.addEventListener("click", switchBulb);

function switchBulb() {
  bulb.classList.toggle("day");
  bulb.classList.toggle("night");
  if (bulb.classList.contains("day")) {
    bulb.classList.add("day-animation");
  }
}

// function switchBulb() {
//   isDay = !isDay;
//   body.classList.toggle("b-day");
//   body.classList.toggle("b-night");
//   bulb.classList.toggle("day");
//   bulb.classList.toggle("night");
//   if (bulb.classList.contains("day")) {
//     bulb.classList.add("day-animation");
//   }
//   switchTitleColor(isDay);
//   switchPara(isDay);
//   switchChanger(isDay);
// }

function switchTitleColor(isDay) {
  if (isDay) {
    title.style.color = "black";
  } else {
    title.style.color = "Red";
  }
}

function switchPara(isDay) {
  if (isDay) {
    para.style.color = "black";
  } else {
    para.style.color = "white";
  }
}

function switchChanger(isDay) {
  if (isDay) {
    switcher.style.borderColor = "black";
  } else {
    switcher.style.borderColor = "white";
  }
}
