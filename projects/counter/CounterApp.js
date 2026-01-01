// Select DOM elements
const counterDisplay = document.getElementById('counter');
const decrementBtn = document.getElementById('decrement-btn');
const resetBtn = document.getElementById('reset-btn');
const incrementBtn = document.getElementById('increment-btn');
const saveBtn = document.getElementById('save-btn');
const saveCount = document.getElementById('save-count');



// Initialize counter value
let counterValue = 0;

// Decrement function
decrementBtn.addEventListener('click', () => {
  counterValue--;
  counterDisplay.textContent = counterValue;
});

// Reset function
resetBtn.addEventListener('click', () => {
  counterValue = 0;
  counterDisplay.textContent = counterValue;
});

// Increment function
incrementBtn.addEventListener('click', () => {
  counterValue++;
  counterDisplay.textContent = counterValue;
});


// Save function
saveBtn.addEventListener('click', () => {
  if(counterValue !== 0){
    saveCount.textContent += counterValue + (", ");
  }    else{
    alert('Counter value is zero. Please increment or decrement before saving.');
  }

 });