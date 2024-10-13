const display = document.getElementById("display");
const keys = document.querySelectorAll(".key");
const operators = document.querySelectorAll(".operator");
const clearButton = document.getElementById("clear");
const equalsButton = document.getElementById("equals");

let currentInput = "";
let operator = "";
let previousInput = "";

keys.forEach((key) => {
  key.addEventListener("click", () => {
    currentInput += key.value;
    display.value = currentInput;
  });
});

operators.forEach((op) => {
  op.addEventListener("click", () => {
    operator = op.value;
    previousInput = currentInput;
    currentInput = "";
  });
});

equalsButton.addEventListener("click", () => {
  if (previousInput && currentInput && operator) {
    let result;
    switch (operator) {
      case "+":
        result = parseFloat(previousInput) + parseFloat(currentInput);
        break;
      case "-":
        result = parseFloat(previousInput) - parseFloat(currentInput);
        break;
      case "*":
        result = parseFloat(previousInput) * parseFloat(currentInput);
        break;
      case "/":
        result = parseFloat(previousInput) / parseFloat(currentInput);
        break;
    }
    display.value = result;
    currentInput = result.toString();
    previousInput = "";
    operator = "";
  }
});

clearButton.addEventListener("click", () => {
  display.value = "";
  currentInput = "";
  previousInput = "";
  operator = "";
});
