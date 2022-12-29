const numbers = document.querySelectorAll('[data-number]');
const display = document.querySelector('.main');
const clear = document.querySelector('.ac');
const del = document.querySelector('.del');
const operators = document.querySelectorAll('.operator');
const equal = document.querySelector('.equal');
const sub = document.querySelector('.sub');
const decimal = document.querySelector('.decimal');
let displayValue = 0;
display.textContent = displayValue;
let subValue;
let num1 = 0;
let operation;
equal.disabled = true;

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function divide(a, b) {
    return a / b;
}

function multiply(a, b) {
    return a * b;
}

function operate(operator, a, b) {
    if (operator === '+') {
        return add(a, b);
    } else if (operator === '-') {
        return subtract(a, b);
    } else if (operator === 'x') {
        return multiply(a, b);
    } else if (operator === '÷') {
        return divide(a, b);
    }
}

operators.forEach(operator => {
    operator.addEventListener('click', (e) => {
        num1 = +displayValue;
        displayValue = 0;
        display.textContent = displayValue;
        operation = e.target.innerHTML;
        subValue = num1.toString() + operation;
        sub.textContent = subValue;
        equal.disabled = false;
    });
})

equal.addEventListener('click', () => {
    let num2 = +displayValue;
    displayValue = operate(operation, num1, num2);
    if (displayValue.toString().length > 8) {
        displayValue = displayValue.toPrecision(4);
    }
    display.textContent = displayValue;
    subValue = subValue + num2.toString();
    sub.textContent = subValue;
    equal.disabled = true;
})

numbers.forEach(number => {
    number.addEventListener('click', () => {
        appendNumber(number.innerHTML);
    });
})

function appendNumber(number) {
    // displayValue is a number
    //  number is a string
    if (displayValue === 0) {
        displayValue = number;
        display.textContent = displayValue;
    }
    else if (typeof displayValue === 'number') {
        displayValue = number;
        display.textContent = displayValue;
    }
    else if (displayValue.toString().length < 8) {
        displayValue = displayValue + number;
        display.textContent = displayValue;
    }
}

decimal.addEventListener('click', () => {
    if (displayValue.toString().includes('.')) {
        return;
    }
    else if (displayValue.toString().length < 8) {
        displayValue += '.';
    }
    else {
        displayValue = 0;
    }
    display.textContent = displayValue;
})

del.addEventListener('click', () => {
    if (displayValue.toString().length < 2) {
        displayValue = 0;
        display.textContent = displayValue;
    }
    else {
        displayValue = display.textContent.slice(0, -1)
        display.textContent = displayValue;
    }
})

clear.addEventListener('click', () => {
    displayValue = 0;
    display.textContent = displayValue;
    subValue = '';
    sub.textContent = subValue;
})