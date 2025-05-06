let counter = 0;

const counterDisplay = document.getElementById('counter');
const incrementButton = document.getElementById('increment');
const decrementButton = document.getElementById('decrement');
const resetButton = document.getElementById('reset');

incrementButton.addEventListener('click', () => {
    counter++;
    updateCounterDisplay();
});

decrementButton.addEventListener('click', () => {
    counter--;
    updateCounterDisplay();
});

resetButton.addEventListener('click', () => {
    counter = 0;
    updateCounterDisplay();
});

function updateCounterDisplay() {
    counterDisplay.textContent = counter;
}