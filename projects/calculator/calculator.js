const display = document.querySelector("#display");

function appendToDisplay(input){
    display.value += input;
}

function calculate(){
    try {
        display.value = eval(display.value);  
    } catch (error) {
        alert("invalid format.");
    }
}

function clearDisplay() {
    display.value ="";
}

function deleteLast() {
    display.value = display.value.slice(0, -1); // Removes the last character
}
