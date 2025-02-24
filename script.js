let timers = [];

function startTimer() {
    const hours = parseInt(document.getElementById("hours").value) || 0;
    const minutes = parseInt(document.getElementById("minutes").value) || 0;
    const seconds = parseInt(document.getElementById("seconds").value) || 0;
    const totalTime = hours * 3600 + minutes * 60 + seconds;

    if (totalTime > 0) {
        const timerId = Date.now();
        timers.push({ id: timerId, timeLeft: totalTime, interval: null });
        updateTimers();
    }
}

function updateTimers() {
    const timersContainer = document.getElementById("timers");
    timersContainer.innerHTML = "";

    timers.forEach((timer, index) => {
        const timerElement = document.createElement("div");
        timerElement.classList.add("timer");
        timerElement.innerHTML = `
            <span id="timer-${timer.id}">${formatTime(timer.timeLeft)}</span>
            <button onclick="deleteTimer(${timer.id})">Delete</button>
        `;
        timersContainer.appendChild(timerElement);
        startCountdown(timer.id);
    });
}

const audio = new Audio("timer-end-sound.mp3"); // Add a sound file in your project
audio.play();


function startCountdown(timerId) {
    const timer = timers.find(t => t.id === timerId);
    if (!timer) return;

    timer.interval = setInterval(() => {
        timer.timeLeft--;
        document.getElementById(`timer-${timer.id}`).innerText = formatTime(timer.timeLeft);

        if (timer.timeLeft <= 0) {
            clearInterval(timer.interval);
            timerEnd(timer.id);
        }
    }, 1000);
}

function formatTime(seconds) {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${String(hrs).padStart(2, '0')} : ${String(mins).padStart(2, '0')} : ${String(secs).padStart(2, '0')}`;
}

function deleteTimer(timerId) {
    timers = timers.filter(timer => timer.id !== timerId);
    updateTimers();
}

function timerEnd(timerId) {
    const timerElement = document.getElementById(`timer-${timerId}`).parentNode;
    timerElement.classList.add("timer-up");
    timerElement.innerHTML = `<span>Timer Is Up!</span> <button onclick="deleteTimer(${timerId})">Stop</button>`;
    playAlarm();
}

function playAlarm() {
    const audio = new Audio("https://www.soundjay.com/button/beep-07.wav");
    audio.play();
}
