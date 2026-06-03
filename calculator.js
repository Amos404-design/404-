let display = document.getElementById('display');

function appendNumber(num) {
    if (display.value.length < 15) {
        display.value += num;
    }
}

function appendOperator(op) {
    const lastChar = display.value[display.value.length - 1];
    
    // Prevent multiple operators in a row
    if (lastChar === '+' || lastChar === '-' || lastChar === '*' || lastChar === '/') {
        return;
    }
    
    // Prevent operator as first input
    if (display.value === '') {
        return;
    }
    
    display.value += op;
}

function appendDecimal() {
    // Get the current number (after last operator)
    const parts = display.value.split(/[\+\-\*\/]/);
    const currentNumber = parts[parts.length - 1];
    
    // Prevent multiple decimals in the same number
    if (!currentNumber.includes('.')) {
        display.value += '.';
    }
}

function clearDisplay() {
    display.value = '';
}

function deleteLast() {
    display.value = display.value.slice(0, -1);
}

function calculate() {
    try {
        // Replace display operators with JavaScript operators
        let expression = display.value;
        expression = expression.replace(/÷/g, '/');
        expression = expression.replace(/×/g, '*');
        expression = expression.replace(/−/g, '-');
        
        // Evaluate the expression
        const result = eval(expression);
        
        // Check if result is valid
        if (isFinite(result)) {
            display.value = result;
        } else {
            display.value = 'Error';
        }
    } catch (error) {
        display.value = 'Error';
    }
}

// Allow keyboard input
document.addEventListener('keydown', function(event) {
    if (event.key >= '0' && event.key <= '9') {
        appendNumber(event.key);
    } else if (event.key === '.') {
        appendDecimal();
    } else if (event.key === '+' || event.key === '-' || event.key === '*' || event.key === '/') {
        appendOperator(event.key);
    } else if (event.key === 'Enter' || event.key === '=') {
        event.preventDefault();
        calculate();
    } else if (event.key === 'Backspace') {
        event.preventDefault();
        deleteLast();
    } else if (event.key === 'Escape') {
        clearDisplay();
    }
});