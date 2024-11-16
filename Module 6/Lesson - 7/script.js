let rotateBox = document.querySelector(".rotatebox");
let rotateMsg = "HoverToRotate";
let colorBox = document.querySelector(".colorbox");
let colorMsg = "HoverForMagic";
let followBox = document.querySelector(".followbox");

fillBox(rotateBox, rotateMsg);
fillBox(colorBox, colorMsg);
addAnimation(rotateBox, "spin");
addAnimation(colorBox, "coloration");

/**
 * fillBox method takes 2 arguments :-
 * 1. box - HTML element where we will create individual letters (also div)
 * 2. msg - The message
 */

function fillBox(box, msg) {
  for (let i = 0; i < msg.length; i++) {
    let letter = createLetter(msg[i]);
    box.appendChild(letter);
  }
}

/**
 * createLetter method creates a div for a single letter.
 */

function createLetter(content) {
  let letter = document.createElement("div");
  letter.innerHTML = content;
  letter.classList.add("ltr");
  return letter;
}

/**
 * addAnimation method takes 2 arguments :-
 * 1. box - parent HTML element
 * 2. animation - name of the animation which will be applied to each child element (letter) of the box.
 */

function addAnimation(box, animation) {
  for (let i = 0; i < box.children.length; i++) {
    let letter = box.children[i];
    letter.addEventListener("mouseover", () => {
      letter.classList.add(animation);
    });
    letter.addEventListener("mouseleave", () => {
      letter.classList.remove(animation);
    });
  }
}

/**
 * Adding mousedown event listener on the follow box.
 * mousedown event is triggered when mouse is clicked on an element.
 * As soon as the mouse will click the follow box, we will add mousemove event on window.
 * window represents the browser window.
 * mousemove event is triggered when mouse is moved.
 * So, when mouse will be moved on the window, moveWithMouse callback method will be called.
 * clientX and clientY = X and Y coordinates of the mouse.
 * We will change the left and top values of followBox accordingly.
 * After 10 seconds, we will remove the mousemove event handler from the window.
 * During these 10 seconds, we are also changing the content of the moving div using promises and settimeout.
 */

followBox.addEventListener("mousedown", (e) => {
  const moveWithMouse = (e) => {
    let mx = e.clientX;
    let my = e.clientY;
    followBox.style.left = `${mx}px`;
    followBox.style.top = `${my}px`;
  };
  window.addEventListener("mousemove", moveWithMouse);
  let promises = [];
  for (let i = 0; i < 10; i++) {
    promises.push(
      new Promise((resolve) => {
        setTimeout(() => {
          followBox.innerHTML = `I Can move Now 😄 (for ${10 - i} s)`;
        }, i * 1000);
      })
    );
  }
  setTimeout(() => {
    followBox.innerHTML = "Click to follow";
    window.removeEventListener("mousemove", moveWithMouse);
  }, 10000);
});
