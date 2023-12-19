const resultElement = document.getElementById("result");
const clearBtn = document.getElementById("clear-button");
const deleteBtn = document.getElementById("delete-button");
const divideBtn = document.getElementById("divide-button");
const multiplyBtn = document.getElementById("multiply-button");
const substractBtn = document.getElementById("substract-button");
const addBtn = document.getElementById("add-button");
const decimalBtn = document.getElementById("decimal-button");
const equalBtn = document.getElementById("equal-button");
const numberBtns = document.querySelectorAll(".number");

// ##############################

let result = "";
let operation = "";
let previousOperand = 0;


//################
const appendNumber = (number) =>{
    if(number === '.' && result.includes("."))
    {
        return;
    }
    result += number;
    updateDisplay();
}

const updateDisplay = ()=>{
    if(operation)
    {
        resultElement.innerText = `${previousOperand}${operation}${result}`
    }
    else
    {
        resultElement.innerText = result;
    }
}

const selectOperator = (operatorValue) => {
    if(result === '')
        return;
    
    if(operation !== '' && previousOperand !== '')
    {
        calculateResult();
    }
    operation = operatorValue;
    previousOperand = result;
    result = '';
    updateDisplay();
}

const calculateResult = ()=>{
    let evaluateResult;
    const prev = parseFloat(previousOperand);
    const current = parseFloat(result);

    if(isNaN(prev) || isNaN(current))
        return;
    
    switch(operation)
    {
        case "+":
            // console.log("hello world");
            evaluateResult = prev + current;
            break;
        case "-":
            evaluateResult = prev - current;
            break;
        case "*":
            evaluateResult = prev * current;
            break;
        case "÷":
            evaluateResult = prev / current;
            break;
        default:
            return;
    }

    result = evaluateResult.toString();
    operation = '';
    previousOperand = '';
}

const clearDisplay = () =>{
    result = "";
    previousOperand = "";
    operation = "";
    updateDisplay();
}

const deleteLastDigit = () => {
    if(result === "")
    {
        result = previousOperand;
        previousOperand = "";
        operation = "";
        updateDisplay();
        return;
    }
    
    result = result.slice(0,-1);
    updateDisplay();
}

numberBtns.forEach(button => {
    button.addEventListener("click", ()=>{
        appendNumber(button.innerText);
    })
})

decimalBtn.addEventListener("click",() => appendNumber("."))

addBtn.addEventListener("click", ()=> selectOperator("+"));
substractBtn.addEventListener("click", ()=> selectOperator("-"));
multiplyBtn.addEventListener("click", ()=> selectOperator("*"));
divideBtn.addEventListener("click", ()=> selectOperator("÷"));

equalBtn.addEventListener("click",()=>{
    if(result === "")
        return;
    calculateResult();
    updateDisplay();
})

clearBtn.addEventListener("click",clearDisplay);

deleteBtn.addEventListener("click", deleteLastDigit)