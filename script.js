document.addEventListener("DOMContentLoaded", function () {
    const display = document.getElementById("display");
    const buttons = document.querySelectorAll(".btn");

    let currentInput = "";
    let operator = null;
    let previousValue = null;

    buttons.forEach((button) => {
        button.addEventListener("click", () => {
            const value = button.getAttribute("data-value");

            if (!isNaN(value) || value === ".") {
                if (currentInput.includes(".") && value === ".") return;
                currentInput += value;
                display.textContent = currentInput;
            } else if (value === "C") {
                currentInput = "";
                operator = null;
                previousValue = null;
                display.textContent = "0";
            } else if (value === "=") {
                if (previousValue !== null && operator && currentInput) {
                    currentInput = evaluate(previousValue, currentInput, operator).toString();
                    display.textContent = currentInput;
                    operator = null;
                    previousValue = null;
                }
            } else {
                if (currentInput) {
                    if (previousValue === null) {
                        previousValue = currentInput;
                    } else if (operator) {
                        previousValue = evaluate(previousValue, currentInput, operator).toString();
                    }
                    operator = value;
                    currentInput = "";
                    display.textContent = `${previousValue} ${operator}`;
                }
            }
        });
    });

    function evaluate(a, b, operator) {
        a = parseFloat(a);
        b = parseFloat(b);

        switch (operator) {
            case "+":
                return a + b;
            case "-":
                return a - b;
            case "*":
                return a * b;
            case "/":
                return a / b;
            default:
                return 0;
        }
    }
});
