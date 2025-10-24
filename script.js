
const start = document.getElementById('start');
const stop = document.getElementById('stop');
const reset = document.getElementById('reset');

const timer = document.getElementById('timer');

const work = document.getElementById('work');
const sBreak = document.getElementById('s-break');
const lBreak = document.getElementById('l-break');

const custom = document.getElementById('custom');
const popup = document.getElementById('custom-popup');
const save = document.getElementById('save');


let timeLeft;
let interval;

const customTimer = () => {

}

const startWork = () => {
    timeLeft = 1500; // 1500s is 25min
    updateTimer();
    work.style.backgroundColor = "gray";
    sBreak.style.backgroundColor = "white";
    lBreak.style.backgroundColor = "white";
}

const startShortBreak = () => {
    timeLeft = 300; // 300s is 5min
    updateTimer();
    sBreak.style.backgroundColor = "gray";
    work.style.backgroundColor = "white";
    lBreak.style.backgroundColor = "white";
}

const startLongBreak = () => {
    timeLeft = 900; // 900s is 15min
    updateTimer();
    lBreak.style.backgroundColor = "gray";
    work.style.backgroundColor = "white";
    sBreak.style.backgroundColor = "white";
}

const updateTimer = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    timer.innerHTML = 
    `${minutes.toString().padStart(2,"0")}:${seconds.toString().padStart(2,"0")}`; // .padStart(2,"0") makes sure the format is 00:00 and because it only works on strings I added .toString()
}

const startTimer = () => {
    interval = setInterval(() => {
        timeLeft--;
        updateTimer();

        if(timeLeft === 0) {
            clearInterval(interval);
            alert("Time's up!");
            timeLeft = 1500;
            updateTimer();
        }
    }, 1000);
}

const stopTimer = () => clearInterval(interval);

const resetTimer = () => {
    clearInterval(interval);
    timeLeft = 1500;
    updateTimer();
}

work.addEventListener("click", startWork);

sBreak.addEventListener("click", startShortBreak);

lBreak.addEventListener("click", startLongBreak);

start.addEventListener("click", startTimer);

stop.addEventListener("click", stopTimer);

reset.addEventListener("click", resetTimer);

// popup 

custom.addEventListener("click", function() {
    popup.classList.toggle("show");
});

save.addEventListener("click", function() {
    popup.classList.toggle("show");

    updateTimer();
});