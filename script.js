const display = document.getElementById('display');
const log = document.getElementById('log');
const numbers = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator');
const equal = document.getElementById('equal');
const clear = document.getElementById('clear');

let firstNumber = 0;
let secondNumber = 0;
let operator;

function operate(number1, number2, operator) {
    const operations = {
        '+': (a, b) => a + b,
        '-': (a, b) => a - b,
        '*': (a, b) => a * b,
        '/': (a, b) => b == 0 ? 'Error' : a / b
    }

    const operation = operations[operator];
    if(!operation) return "invalid operator";

    return operation(number1, number2);
}

let newOperation = true;
let showResult = false;
let newNumber = false;

numbers.forEach(number => {
    number.addEventListener('click', () => {
        if (!showResult) {
            display.value += number.textContent;
        } else if (showResult) {
            display.value = '';
            display.value += number.textContent;
            showResult = false;
            newNumber = true;
        }
    })
})

let secondOperator = false;
let newOperator;

operators.forEach(op => {
    op.addEventListener('click', () => {
        if (secondOperator) {
            newOperator = op.textContent;
            secondNumber = parseInt(display.value);
            let outcome = operate(firstNumber, secondNumber, operator);
            display.value = outcome;
            log.innerText = `${outcome} ${newOperator}`;
            firstNumber = outcome;
            showResult = true;
            operator = newOperator;
        } else if (newOperation && secondNumber == 0) {
            operator = op.textContent;
            newOperator = op.textContent;
            firstNumber = secondNumber = parseInt(display.value);
            display.value = '';
            newOperation = false;
            secondOperator = true;
        } else if (newOperation) {
            operator = op.textContent;
            newOperator = op.textContent;
            firstNumber = parseInt(display.value);
            display.value = '';
            newOperation = false;
            secondOperator = true;
        }
    })
})

function calc() {
    secondOperator = false;
    if (!newOperation) { 
        if (display.value !== '') secondNumber = parseInt(display.value);
        let outcome = operate(firstNumber, secondNumber, operator);
        display.value = outcome;
        log.innerText = `${firstNumber} ${operator} ${secondNumber} =`;
        firstNumber = outcome;
        operator = newOperator;
        newOperation = true;
        showResult = true;
    } else if (newNumber) {
        firstNumber = parseInt(display.value);
        let outcome = operate(firstNumber, secondNumber, operator);
        display.value = outcome;
        log.innerText = `${firstNumber} ${operator} ${secondNumber} =`;
        firstNumber = outcome;
        showResult = true;
    } else {
        let outcome = operate(firstNumber, secondNumber, operator);
        display.value = outcome;
        log.innerText = `${firstNumber} ${operator} ${secondNumber} =`;
        firstNumber = outcome;
        showResult = true;
    }
}

equal.addEventListener('click', calc);

clear.addEventListener('click', () => {
    display.value = '';
    log.innerText = '';
    firstNumber = 0;
    secondNumber = 0;
    operator = 0;
    newOperation = true;
    showResult = false;
    newNumber = false;
})