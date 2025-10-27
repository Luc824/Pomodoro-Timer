
const start = document.getElementById('start');
const stop = document.getElementById('stop');
const reset = document.getElementById('reset');

const timer = document.getElementById('timer'); 

const work = document.getElementById('work'); // work button
const sBreak = document.getElementById('s-break'); // short break button
const lBreak = document.getElementById('l-break'); // long break button

const custom = document.getElementById('custom'); // custom timer button
const popup = document.getElementById('custom-popup'); // popup to set times
const save = document.getElementById('save'); // popup save button

const workNumberValueInput = document.getElementById('work-time');
const shortBreakNumberValueInput = document.getElementById('short-break-time');
const longBreakNumberValueInput = document.getElementById('long-break-time');

const sound = document.getElementById('sound');
const flash = document.getElementById('flash');

let timeLeft;
let interval;
let currentMode;

const blockInvalidKeys = (input) => {
    input.addEventListener("keydown", (e => {
        if (e.key === "-" || e.key === "e" || e.key === '.') {
            e.preventDefault();
        }
    }));
};

blockInvalidKeys(workNumberValueInput);
blockInvalidKeys(shortBreakNumberValueInput);
blockInvalidKeys(longBreakNumberValueInput);

const getValidTime = (input) => {
    let minutes = Math.max(1, Number(input.value) || 1); // avoids negative number inputs and we fall back to 1 if NaN or ""

    if (minutes > 1000) {
        minutes = 1000;
    }

    input.value = minutes;

    return minutes * 60;
};

const setTimer = (mode) => {
    stopTimer();

    if (mode === "work") {
        timeLeft = getValidTime(workNumberValueInput);
    } else if (mode === "shortBreak") {
        timeLeft = getValidTime(shortBreakNumberValueInput);
    } else if (mode === "longBreak") {
        timeLeft = getValidTime(longBreakNumberValueInput);
    }

    currentMode = mode;
    updateTimer();
};

const updateTimer = () => {

    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    timer.textContent =
        minutes.toString().padStart(2,"0") + ":" + // .padStart(2,"0") makes sure the format is 00:00 and because it only works on strings I added .toString()
        seconds.toString().padStart(2,"0");
};
    

const startTimer = () => {
    if (interval) return;

    interval = setInterval(() => {
        timeLeft--;
        updateTimer();

        if(timeLeft <= 0) {
            clearInterval(interval);
            interval = null;

            sound.currentTime = 0; // rewinds to start of sound incase it was palyed before
            sound.play();

            flashScreen();

            setTimer(currentMode);
            updateTimer();
        };
    }, 1000);
};

const stopTimer = () => {
    clearInterval(interval);
    interval = null;
};

const resetTimer = () => {
    stopTimer();
    setTimer(currentMode);
};

const highlightMode = (mode) => {
    work.style.backgroundColor = mode === "work" ? "gray" : "white";
    sBreak.style.backgroundColor = mode === "shortBreak" ? "gray" : "white";
    lBreak.style.backgroundColor = mode === "longBreak" ? "gray" : "white";
};

const flashScreen = () => {
    flash.classList.add('active');

    setTimeout(() => {
        flash.classList.remove('active');
    }, 300);
}

work.addEventListener("click", () => {
    setTimer("work");
    highlightMode("work");
});

sBreak.addEventListener("click", () => {
    setTimer("shortBreak");
    highlightMode("shortBreak");
});

lBreak.addEventListener("click", () => {
    setTimer("longBreak");
    highlightMode("longBreak");
});

start.addEventListener("click", () => {
    if (!currentMode) {
        alert("Please pick Work, Short Break or Long Break first");
        return;
    }
    startTimer();
});

stop.addEventListener("click", () => {
    if (!currentMode) {
        alert("Please pick Work, Short Break or Long Break first");
        return;
    }
    stopTimer();
});

reset.addEventListener("click", () => {
    if (!currentMode) {
        alert("Please pick Work, Short Break or Long Break first");
        return;
    }
    resetTimer();
});

// popup

custom.addEventListener("click", function() {
    popup.classList.toggle("show");
});

save.addEventListener("click", function() {
    popup.classList.toggle("show");

    if (currentMode) {
        setTimer(currentMode);
        highlightMode(currentMode);
    }
});