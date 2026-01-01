const checkBtn = document.querySelector("#check-btn");
const textInput = document.querySelector("#text-input");
const result = document.querySelector("#result");


checkBtn.addEventListener("click", () => {
    const input = textInput.value.trim();

    if (input === ""){
        alert("Please input a value.");
        return;
    }

    const cleanInput = input.toLowerCase().replace(/[^a-z0-9]/g, '');
    const reversed = cleanInput.split('').reverse().join('');

    if (cleanInput === reversed){
        result.textContent = `${input} is a palindrome`;
    }else {
        result.textContent = `${input} is not a palindrome`;
    }
} )

