function formatNumber(num) {
    return parseFloat(num.toFixed(10)).toString();
}

// Select the display and all calculator buttons
const display = document.querySelector('.display');
const buttons = document.querySelectorAll('.box');

let firstNumber = null;          // Stores the first number
let currentOperator = null;      // Stores the chosen operator
let lastSecondNumber = null;     // Stores last second number for repeat "="
let lastOperator = null;         // Stores last operator for repeat "="

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.innerText;

        // 1️⃣ Number or decimal
        if (!isNaN(value) || value === ".") {
            if (display.innerText === "0" || display.innerText === "") {
                display.innerText = value;
            } else {
                display.innerText += value;
            }
        }

        // 2️⃣ Clear All
        else if (value === "AC") {
            display.innerText = "0";
            firstNumber = null;
            currentOperator = null;
            lastSecondNumber = null;
            lastOperator = null;
        }

        // 3️⃣ Delete last digit
        else if (value === "DE") {
            display.innerText = display.innerText.slice(0, -1);
            if (display.innerText === "") {
                display.innerText = "0";
            }
        }

        // 4️⃣ Percentage
        else if (value === "%") {
            display.innerText = Number(display.innerText) / 100;
        }

        // 5️⃣ Plus/Minus toggle
        else if (value === "+/-") {
            display.innerText = String(Number(display.innerText) * -1);
        }

        // 6️⃣ Operators (+, -, ×, ÷)
        else if (["＋", "－", "×", "÷"].includes(value)) {
            firstNumber = Number(display.innerText); // Save first number
            currentOperator = value;                 // Save operator
            display.innerText = "0";                  // Clear display for next input
        }

        // 7️⃣ Equals (=)
        else if (value === "＝") {
            let secondNumber;
            let operatorToUse;

            if (currentOperator !== null) {
                // First time pressing "=" after an operator
                secondNumber = Number(display.innerText);
                operatorToUse = currentOperator;

                // Save for future "=" presses
                lastSecondNumber = secondNumber;
                lastOperator = currentOperator;
            } 
            else if (lastOperator !== null) {
                // Pressing "=" again without choosing new operator
                secondNumber = lastSecondNumber;
                operatorToUse = lastOperator;
            } 
            else {
                // Nothing to calculate
                return;
            }

            let result;
            if (operatorToUse === "＋") {
                result = firstNumber + secondNumber;
            } else if (operatorToUse === "－") {
                result = firstNumber - secondNumber;
            } else if (operatorToUse === "×") {
                result = firstNumber * secondNumber;
            } else if (operatorToUse === "÷") {
                result = firstNumber / secondNumber;
            }

            display.innerText = formatNumber(result);
            firstNumber = result;     // Update for chaining
            currentOperator = null;   // Reset current operator
        }
    });
});
