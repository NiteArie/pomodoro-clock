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

    let _currentOptionTime = _time;
    let _currentOptionBreak = _break;

    let _timerInterval = null;
    let _breakInterval = null;
    let _timerState = true;

    renderTimeDisplay();
    renderOptionBreakDisplay();
    renderOptionTimeDisplay();

    _startButton.addEventListener("click", event => {
        if (_timerState) {
            startTimer();
        } else {
            startBreakTimer();
        }
        disableStartButton();
        activeStartButton();
        clearStopButton();
    })

    _stopButton.addEventListener("click", event => {
        if (_timerState) {
            clearInterval(_timerInterval);
        } else {
            clearInterval(_breakInterval);
        }
        enableStartButton();
        clearStartButton();
        activeStopButton();
    })

    _resetButton.addEventListener("click", event => {
        if (_timerState) {
            clearInterval(_timerInterval);
        } else {
            clearInterval(_breakInterval);
        }
        setTimeValue(25);
        setSecondValue(0);
        renderTimeDisplay();
        renderOptionTimeDisplay();
        clearStartButton();
        clearStopButton();
        enableStartButton();
    })

    _incrementTimeButton.addEventListener("click", event => {
        incrementTimeByValue(1);
        validTime();
        setCurrentOptionTime(_time);
        renderTimeDisplay();
        renderOptionTimeDisplay();
    })

    _decrementTimeButton.addEventListener("click", event => {
        decrementTimeByValue(1);
        validTime();
        setCurrentOptionTime(_time);
        renderTimeDisplay();
        renderOptionTimeDisplay();
    })

    _incrementBreakButton.addEventListener("click", event => {
        incrementBreakByValue(1);
        validBreak();
        setCurrentOptionBreak(_break);
        renderTimeDisplayWithBreak();
        renderOptionBreakDisplay();
    })

    _decrementBreakButton.addEventListener("click", event => {
        decrementBreakByValue(1);
        validBreak();
        setCurrentOptionBreak(_break);
        renderTimeDisplayWithBreak();
        renderOptionBreakDisplay();
    })

    function renderTimeDisplay() {
        _timeDisplay.textContent = formatTimeAndSecond(_time, _second);
    }

    function renderTimeDisplayWithBreak() {
        _timeDisplay.textContent = formatTimeAndSecond(_break, _second);
    }

    function renderOptionTimeDisplay() {
        _optionTimeDisplay.textContent = `${_time} mins`;
    }

    function renderOptionBreakDisplay() {
        _optionBreakDisplay.textContent = `${_break} mins`;
    }

    function setCurrentOptionTime(value) {
        _currentOptionTime = value;
    }

    function setCurrentOptionBreak(value) {
        _currentOptionBreak = value;
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

    function activeTimerState() {
        _timerState = true;
    }

    function activeBreakState() {
        _timerState = false;
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

            if (_time === 0 && _second === 0) {
                activeBreakState();
                clearInterval(_timerInterval);
                setSecondValue(0);
                setBreakValue(_currentOptionBreak);
                console.log(_break);
                startBreakTimer();
            }
        }, 1000);
    }

    function startBreakTimer() {
        _breakInterval = setInterval(() => {
            if (_second === 0) {
                decrementBreakByValue(1);
                setSecondValue(59);
            } else {
                decrementSecondByValue(1);
            }

            renderTimeDisplayWithBreak();

            if (_break === 0 && _second === 0) {
                activeTimerState();
                clearInterval(_breakInterval);
                setTimeValue(_currentOptionTime);
                setSecondValue(0);
                startTimer();
            }

        }, 1000);
    }

    function activeStartButton() {
        _startButton.classList.add("container__click__buttons__button--active");
    }

    function clearStartButton() {
        _startButton.classList.remove("container__click__buttons__button--active");
    }

    function disableStartButton() {
        _startButton.disabled = true;
    }

    function enableStartButton() {
        _startButton.disabled = false;
    }

    function activeStopButton() {
        _stopButton.classList.add("container__click__buttons__button--active");
    }

    function clearStopButton() {
        _stopButton.classList.remove("container__click__buttons__button--active");
    }



})();