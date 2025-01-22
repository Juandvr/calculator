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
    })
})

let newOperation = true;

operators.forEach(op => {
    op.addEventListener('click', () => {
        operator = op.textContent;

        if (newOperation) {
            firstNumber = secondNumber = parseInt(display.value);
            display.value = '';
            newOperation = false;
        }
    })
})

equal.addEventListener('click', () => {
    if (!newOperation) { 
        secondNumber = parseInt(display.value);
        let outcome = operate(firstNumber, secondNumber, operator);
        display.value = outcome;
        firstNumber = outcome;
        newOperation = true;
        console.log(firstNumber, secondNumber, operator);
    } else {
        let outcome = operate(firstNumber, secondNumber, operator);
        display.value = outcome;
        firstNumber = outcome;
        console.log(firstNumber, secondNumber, operator);
    }
})