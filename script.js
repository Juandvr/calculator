const display = document.getElementById('display');
const numbers = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator');
const equal = document.getElementById('equal');

let firstNumber = 0;
let secondNumber = 0;
let operator = 0;

function operate(number1, number2, operator) {
    const operations = {
        '+': (a, b) => a + b,
        '-': (a, b) => a - b,
        '*': (a, b) => a * b,
        '/': (a, b) => a / b,
    }

    const operation = operations[operator];
    if(!operation) "invalid operator";

    return operation(number1, number2);
}

numbers.forEach(number => {
    number.addEventListener('click', () => {
        display.value += number.textContent;
        if (!firstNumber) {
            firstNumber = secondNumber = parseInt(number.textContent);
        }
        else {
            secondNumber = parseInt(number.textContent);
        }
    })
})

operators.forEach(op => {
    op.addEventListener('click', () => {
        display.value += op.textContent;
        operator = op.textContent;
    })
})

equal.addEventListener('click', () => {
    display.value = operate(firstNumber, secondNumber, operator);
    console.log(firstNumber, secondNumber, operator);
})