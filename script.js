const app = (() => {
    const _startButton = document.querySelector(".container__clock__buttons__start");   
    const _stopButton = document.querySelector(".container__clock__buttons__stop");
    const _resetButton = document.querySelector(".container__clock__buttons__reset");
    const _timeDisplay = document.querySelector(".container__clock__session__time");
    const _incrementTimeButton = document.querySelector(".container__options__time__inc");
    const _decrementTimeButton = document.querySelector(".container__options__time__dec");
    const _incrementBreakButton = document.querySelector(".container__options__break__inc");
    const _decrementBreakButton = document.querySelector(".container__options__break__dec");
    const _optionTimeDisplay = document.querySelector(".container__options__time__content");
    const _optionBreakDisplay = document.querySelector(".container__options__break__content");

    let _break = 5;
    let _time = 25;
    let _second = 0;
    let _timerInterval = null;

    renderTimeDisplay();
    renderOptionBreakDisplay();
    renderOptionTimeDisplay();

    _startButton.addEventListener("click", event => {
        startTimer();
    })

    _stopButton.addEventListener("click", event => {
        clearInterval(_timerInterval);
    })

    _resetButton.addEventListener("click", event => {
        setTimeValue(25);
        setSecondValue(0);
        renderTimeDisplay();
        renderOptionTimeDisplay();
    })

    _incrementTimeButton.addEventListener("click", event => {
        incrementTimeByValue(1);
        validTime();
        renderTimeDisplay();
        renderOptionTimeDisplay();
    })

    _decrementTimeButton.addEventListener("click", event => {
        decrementTimeByValue(1);
        validTime();
        renderTimeDisplay();
        renderOptionTimeDisplay();
    })

    _incrementBreakButton.addEventListener("click", event => {
        incrementBreakByValue(1);
        validBreak();
        renderOptionBreakDisplay();
    })

    _decrementBreakButton.addEventListener("click", event => {
        decrementBreakByValue(1);
        validBreak();
        renderOptionBreakDisplay();
    })

    function renderTimeDisplay() {
        console.log(_time, _second);
        _timeDisplay.textContent = formatTimeAndSecond(_time, _second);
    }

    function renderOptionTimeDisplay() {
        _optionTimeDisplay.textContent = `${_time} mins`;
    }

    function renderOptionBreakDisplay() {
        _optionBreakDisplay.textContent = `${_break} mins`;
    }

    function incrementTimeByValue(value) {
        _time += value;
    }

    function setTimeValue(value) {
        _time = value;
    }

    function decrementTimeByValue(value) {
        _time -= value;
    }

    function incrementBreakByValue(value) {
        _break += value;
    }

    function setBreakValue(value) {
        _break = value;
    }

    function decrementBreakByValue(value) {
        _break -= value;
    }

    function incrementSecondByValue(value) {
        _second += value;

    }function decrementSecondByValue(value) {
        _second -= value;
    }

    function setSecondValue(value) {
        _second = value;
    }

    function validTime() {
        if (_time < 1) {
            setTimeValue(1);
        } else if (_time > 60) {
            setTimeValue(60);
        }
    }

    function validBreak() {
        if (_break < 1) {
            setBreakValue(1);
        } else if (_break > 60) {
            setBreakValue(60);
        }
    }

    function formatTimeAndSecond(time, second) {
        return (
            `${time < 10 ? "0" + time : time}:${second < 10 ? "0" + second : second}`
        );
    }

    function startTimer() {
        _timerInterval = setInterval(() => {
            if (_second === 0) {
                decrementTimeByValue(1);
                setSecondValue(59);

            } else {
                decrementSecondByValue(1);
            }

            renderTimeDisplay();

            if (_time === 0) {
                clearInterval(_timerInterval);
            }
        }, 1000);
    }



})();