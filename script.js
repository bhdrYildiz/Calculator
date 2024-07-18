const display = document.querySelector('.calculator-input');
const keys = document.querySelector('.calculator-keys');
const historyList = document.querySelector('.history-list');

let displayValue = '0';
let firstValue = null;
let operator = null;
let secondValueSit = false;
let history = [];

updateDisplay();

function updateDisplay() {
    display.value = displayValue;
}

keys.addEventListener('click', function(e) {
    const element = e.target;
    const value = element.value;

    if (!element.matches('button')) return;

    switch(value){
        case '+':
        case '-':
        case '*':
        case '/':
        case '=':
            handleOperator(value);
            break;
        case '.':
            inputDecimal();
            break;
        case 'clear':
            clear();
            break;
        default:
            inputNumber(element.value);
    }
    updateDisplay();
});

function handleOperator(nextOperator){
    const value = parseFloat(displayValue);

    if(operator && secondValueSit){
        operator = nextOperator;
        return;
    }

    if(firstValue === null){
        firstValue = value;
    }else if(operator){
        const result = calculate(firstValue, value, operator);

        if (operator !== '=') {
            displayValue = `${parseFloat(result.toFixed(7))}`;
            history.push(`${firstValue} ${operator} ${value} = ${displayValue}`);
            updateHistory();
        }

        firstValue = result;
    }
    secondValueSit = true;
    operator = nextOperator;
}

function calculate(first, second, operator){
    if(operator === '+'){
        return first + second;
    }else if(operator === '-'){
        return first - second;
    }else if(operator === '*'){
        return first * second;
    }else if( operator === '/'){
        return first / second;
    }

    return second;
}

function inputNumber(num){

    if(secondValueSit){
        displayValue = num;
        secondValueSit = false;
    }else{
        displayValue = displayValue === '0' ? num : displayValue + num;
    }
}

function inputDecimal() {
    if(!displayValue.includes('.')){
        displayValue += '.';
    }
}

function clear() {
    displayValue = '0';
}

function updateHistory() {
    historyList.innerHTML = '';
    history.forEach(entry => {
        const li = document.createElement('li');
        li.textContent = entry;
        historyList.appendChild(li);
    });
}