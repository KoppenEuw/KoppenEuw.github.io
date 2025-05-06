let activeDuration = 40; // in seconds
let breakDuration = 20; // in seconds
let rounds = 8;
let currentRound = 1;
let isActive = false;
let timerInterval;
let pausedTimeLeft = null; // Track the remaining time when paused

const statusDisplay = document.getElementById('status');
const timerDisplay = document.getElementById('timer');
const roundDisplay = document.getElementById('round');
const startButton = document.getElementById('start');
const restartButton = document.getElementById('restart');
const activeMinus = document.getElementById('active-minus');
const activePlus = document.getElementById('active-plus');
const breakMinus = document.getElementById('break-minus');
const breakPlus = document.getElementById('break-plus');
const roundsMinus = document.getElementById('rounds-minus');
const roundsPlus = document.getElementById('rounds-plus');
const activeDurationDisplay = document.getElementById('active-duration');
const breakDurationDisplay = document.getElementById('break-duration');
const roundsDisplay = document.getElementById('rounds');

// Add a stop button functionality
const stopButton = document.createElement('button');
stopButton.id = 'stop';
stopButton.textContent = 'Stop';
stopButton.style.display = 'none'; // Initially hidden
startButton.insertAdjacentElement('afterend', stopButton);

// Add audio files for countdown and end sounds
const countdownSound = new Audio('./beep.wav');
const endSound = new Audio('./end.wav');

function updateTimerDisplay(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

function updateSettingsDisplay() {
    activeDurationDisplay.textContent = `${Math.floor(activeDuration / 60).toString().padStart(2, '0')}:${(activeDuration % 60).toString().padStart(2, '0')}`;
    breakDurationDisplay.textContent = `${Math.floor(breakDuration / 60).toString().padStart(2, '0')}:${(breakDuration % 60).toString().padStart(2, '0')}`;
    roundsDisplay.textContent = rounds;
}

function resetToInitialState() {
    clearInterval(timerInterval);
    isActive = false;
    currentRound = 0;
    roundDisplay.textContent = `ROUND ${currentRound}/${rounds}`;
    statusDisplay.textContent = 'Rest';
    document.body.style.backgroundColor = 'green';
    updateTimerDisplay(breakDuration);
    startButton.textContent = 'Start';
    startButton.style.display = 'inline';
    stopButton.style.display = 'none';
    startButton.addEventListener('click', startHandler, { once: true });
}

// Fix the resume functionality to continue the timer from where it was paused
stopButton.addEventListener('click', () => {
    clearInterval(timerInterval);
    pausedTimeLeft = isActive ? activeDuration : breakDuration; // Save the remaining time
    stopButton.style.display = 'none';
    startButton.style.display = 'inline';
    startButton.textContent = 'Resume';
});

function startHandler() {
    clearInterval(timerInterval);
    if (startButton.textContent === 'Resume') {
        startButton.textContent = 'Start';
        startButton.style.display = 'none';
        stopButton.style.display = 'inline';
        startTimer(pausedTimeLeft); // Resume from the paused time
    } else {
        currentRound = 1; // Start from the first round
        isActive = true; // Switch to active mode
        startButton.style.display = 'none';
        stopButton.style.display = 'inline';
        startTimer();
    }
}

startButton.addEventListener('click', startHandler, { once: true });

function startTimer(resumeTime = null) {
    let timeLeft = resumeTime !== null ? resumeTime : (isActive ? activeDuration : breakDuration);
    statusDisplay.textContent = isActive ? 'Active' : 'Rest';
    document.body.style.backgroundColor = isActive ? 'red' : 'green';
    updateTimerDisplay(timeLeft);

    timerInterval = setInterval(() => {
        timeLeft--;
        updateTimerDisplay(timeLeft);

        // Play countdown sound at 3, 2, and 1 seconds left
        if (timeLeft === 3 || timeLeft === 2 || timeLeft === 1) {
            countdownSound.play();
        }

        // Play end sound when the timer reaches 0
        if (timeLeft === 0) {
            clearInterval(timerInterval);
            endSound.play();

            if (isActive) {
                isActive = false;
            } else {
                isActive = true;
                currentRound++;
            }

            if (currentRound > rounds) {
                statusDisplay.textContent = 'Done';
                document.body.style.backgroundColor = 'white';
                resetToInitialState();
                return;
            }

            roundDisplay.textContent = `ROUND ${currentRound}/${rounds}`;
            startTimer();
        }
    }, 1000);
}

// Update the initial display to show rest mode and 0/8 rounds
roundDisplay.textContent = `ROUND 0/${rounds}`;
statusDisplay.textContent = 'Rest';
document.body.style.backgroundColor = 'green';

// Update restart button to reset to the initial state
restartButton.addEventListener('click', () => {
    resetToInitialState();
});

// Update the event listeners to dynamically update the displayed values
activeMinus.addEventListener('click', () => {
    if (activeDuration > 10) activeDuration -= 10;
    updateSettingsDisplay();
    updateTimerDisplay(isActive ? activeDuration : breakDuration); // Update timer display dynamically
});

activePlus.addEventListener('click', () => {
    activeDuration += 10;
    updateSettingsDisplay();
    updateTimerDisplay(isActive ? activeDuration : breakDuration); // Update timer display dynamically
});

breakMinus.addEventListener('click', () => {
    if (breakDuration > 10) breakDuration -= 10;
    updateSettingsDisplay();
    updateTimerDisplay(isActive ? activeDuration : breakDuration); // Update timer display dynamically
});

breakPlus.addEventListener('click', () => {
    breakDuration += 10;
    updateSettingsDisplay();
    updateTimerDisplay(isActive ? activeDuration : breakDuration); // Update timer display dynamically
});

// Ensure currentRound remains 0 when updating the number of rounds
roundsMinus.addEventListener('click', () => {
    if (rounds > 1) rounds--;
    updateSettingsDisplay();
    if (currentRound > 0) {
        currentRound = 0; // Reset to 0 if rounds are adjusted
    }
    roundDisplay.textContent = `ROUND ${currentRound}/${rounds}`; // Update round display dynamically
});

roundsPlus.addEventListener('click', () => {
    rounds++;
    updateSettingsDisplay();
    if (currentRound > 0) {
        currentRound = 0; // Reset to 0 if rounds are adjusted
    }
    roundDisplay.textContent = `ROUND ${currentRound}/${rounds}`; // Update round display dynamically
});

// Initialize displays
updateSettingsDisplay();
updateTimerDisplay(breakDuration);
roundDisplay.textContent = `ROUND 0/${rounds}`;
statusDisplay.textContent = 'Rest';
document.body.style.backgroundColor = 'green';