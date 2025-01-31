let display = document.getElementById('display');
let currentInput = '';
let currentOperation = null;
let previousNumber = null;

function appendValue(value) {
    currentInput += value;
    display.value = currentInput;
}

function clearDisplay() {
    currentInput = '';
    currentOperation = null;
    previousNumber = null;
    display.value = '';
}

function backspace() {
  currentInput = currentInput.slice(0, -1);
    display.value = currentInput;
}

function calculate() {
    if (currentInput === '') return;
  let newNumber = Number(currentInput)

    if (previousNumber === null) {
      previousNumber = newNumber;
      currentInput = '';
      return;
    }

    let result = 0;

    switch (currentOperation) {
        case '+':
          result = previousNumber + newNumber;
          break;
      case '-':
          result = previousNumber - newNumber;
          break;
      case '*':
          result = previousNumber * newNumber;
        break;
      case '/':
          result = previousNumber / newNumber;
        break;
      default:
          result = newNumber;
          break;
    }

    previousNumber = result;
    currentInput = '';
    display.value = result;

}
