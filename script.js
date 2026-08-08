console.log("Calculator started");

const display = 
document.querySelector("input");
console.log(display);

const buttons = 
document.querySelectorAll("button");
console.log(buttons);

const historyList =
document.getElementById("historyList");

const clearHistory = 
document.getElementById("clearHistory");

const menuBtn =
document.getElementById("menuBtn");

const menu =
document.getElementById("menu");

const historyBtn =
document.getElementById("historyBtn");

    let savedHistory =
    localStorage.getItem("history");

    if (savedHistory) {
        historyList.innerHTML =
    savedHistory;
    }


function calculatePercentage(expression) {

    expression = expression.replace(
        /(\d+(\.\d+)?)\+(\d+(\.\d+)?)%/g,
        (_, a, __, b) => Number(a) + (Number(a) * Number(b) / 100)
    );

    expression = expression.replace(
        /(\d+(\.\d+)?)\-(\d+(\.\d+)?)%/g,
        (_, a, __, b) => Number(a) - (Number(a) * Number(b) / 100)
    );

    expression = expression.replace(
        /(\d+(\.\d+)?)×(\d+(\.\d+)?)%/g,
        (_, a, __, b) => Number(a) * Number(b) / 100
    );

    expression = expression.replace(
        /(\d+(\.\d+)?)÷(\d+(\.\d+)?)%/g,
        (_, a, __, b) => Number(a) / (Number(b) / 100)
    );

    expression = expression.replace(
        /(\d+(\.\d+)?)%/g,
        "$1/100"
    );

    return expression;
}

buttons.forEach(function(button)
{

button.addEventListener("click",
function()  {
        
        if (button.id === "themeBtn" || 
            button.id === "menuBtn" ||
            button.id === "historyBtn" ||
            button.id === "clearHistory") {
            return;
            }

        if (display.value === "Error"
            && 
            button.innerText !== "="
            &&
            button.innerText !== "C"
            &&
            button.innerText !== "⌫") {
                display.value = "";
            }

        if (button.innerText === "C") {
            display.value = "" ;
          
}

 else if (button.innerText === "⌫") {
    display.value = 
display.value.slice(0, -1);
 }
 
 else if (button.innerText === "=")  {
    try {

        let originalExpression=
    display.value;
    
        let expression =
    calculatePercentage(originalExpression);

        expression =
    expression.replace(/×/g, "*");
        expression =
    expression.replace(/÷/g, "/");

    
        let result = eval(expression);

        if (!Number.isInteger(result)) {
            result =
        parseFloat(result.toFixed(6));
        }
    
             display.value = result;

             let li =
    document.createElement("li");
    
             li.innerText = originalExpression + " = " +
    result;
             
             historyList.prepend(li);

             while 
             (historyList.children.length > 10)
             {
                historyList.removeChild(historyList.lastChild);
             } 
             localStorage.setItem("history", historyList.innerHTML);

  }   catch {
          display.value = "Error";
     }
  }


 else {
    let lastChar = 
    display.value.slice(-1);

    if (
        ["+", "-", "×", "÷",
    "%"].includes(lastChar) && 
        ["+", "-", "×", "÷",
    "%"].includes(button.innerText)
    )  {
        return;
    }
        
        //Decimal validation
        if (button.innerText === ".")
    {
             let parts =
    display.value.split(/[+\-×÷%]/);
             let currentNumber =
    parts[parts.length - 1];

        if
    (currentNumber.includes(".")) {
        return;
    }

    }
       display.value +=
button.innerText;

}   
    });
});

document.addEventListener("keydown" , function(event) {

    if (

     display.value === "Error" 
    &&
    (
        (event.key >= "0"
        &&
        event.key <= "9") || 
        ["+", "-", "*", "/", "%", "."].includes(event.key)
    )
    ) {
        display.value = "";
    }
     
    if (event.key >= "0" && event.key <= "9") {
             display.value += event.key;
    }

    else if (["+", "-", "*", "/", "%"].includes(event.key)) {

    let lastChar = display.value.slice(-1);

    const operators = ["+", "-", "×", "÷", "%"];

    if (operators.includes(lastChar)) {
        return;
    }

    let symbol = event.key;

    if (event.key === "*") {
        symbol = "×";
    } else if (event.key === "/") {
        symbol = "÷";
    }

    display.value += symbol;
}
        
    else if (event.key === "Enter") {
        try {

            let originalExpression =
    display.value;
         
         let expression =
    calculatePercentage(originalExpression);

         expression =
    expression.replace(/×/g, "*");
        expression =
    expression.replace(/÷/g, "/");
    
            let result = eval(expression);

        if (!Number.isInteger(result)) {
            result =
        parseFloat(result.toFixed(6));
        }

        display.value = result;

        let li = 
    document.createElement("li");

        li.innerText = originalExpression + " = " + 
        result;

        historyList.prepend(li);

        
             while 
             (historyList.children.length > 10)
             {
                historyList.removeChild(historyList.lastChild);
             } 

        localStorage.setItem("history",historyList.innerHTML);

    }  catch {
           display.value = "Error";
       }
     }

    else if (event.key === "Backspace") {
        display.value =
    display.value.slice(0, -1);
    }

    else if (event.key === "Escape") {
        display.value = "";
    }

    else if (event.key === ".") {

        
             let parts =
    display.value.split(/[+\-×÷%]/);
             let currentNumber =
    parts[parts.length - 1];

        if
    (currentNumber.includes(".")) {
        return;
    }

        display.value += ".";
    }
    
});

const themeBtn = document.getElementById("themeBtn");
const calculator = document.querySelector(".calculator");

if (localStorage.getItem("theme")
=== "dark") {
    document.body.classList.add("dark");

    calculator.classList.add("dark");
       themeBtn.innerText = "☀️";
}   else {
       themeBtn.innerText = "🌙";
}

themeBtn.addEventListener("click", function () {

    console.log("Dark Mode Button Clicked");

document.body.classList.toggle("dark");

    calculator.classList.toggle("dark");

    if (calculator.classList.contains("dark")) {
        themeBtn.innerText = "☀️";
        localStorage.setItem("theme", "dark");

    } else {
        themeBtn.innerText = "🌙";
        localStorage.setItem("theme", "light");
    }

});

clearHistory.addEventListener("click", function () {
    historyList.innerHTML = "";

localStorage.removeItem("history");
});

menuBtn.addEventListener("click", () => {

    menu.classList.toggle("show");
});

historyBtn.addEventListener("click", () => {
    if (historyList.style.display
=== "block") {
            historyList.style.display
= "none";        
        } else {
            historyList.style.display
= "block";
        }
})

document.addEventListener("click", (e) => {
    if (!menu.contains(e.target) && e.target !== menuBtn) {
        menu.classList.remove("show");
    }
});
