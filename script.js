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

        disableIncrementTimeButton();
        disableDecrementTimeButton();
        disableIncrementBreakButton();
        disableDecrementBreakButton();

    })

    _stopButton.addEventListener("click", event => {
        if (_timerState) {
            clearInterval(_timerInterval);
        } else {
            clearInterval(_breakInterval);
        }

        enableIncrementTimeButton();
        enableDecrementTimeButton();
        enableIncrementBreakButton();
        enableDecrementBreakButton();

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

        updateDocumentTitle("Idle");

        setTimeValue(25);
        setSecondValue(0);
        setBreakValue(5);

        setCurrentOptionTime(_time);
        setCurrentOptionBreak(_break);

        renderTimeDisplay();
        renderOptionTimeDisplay();
        renderOptionBreakDisplay();

        enableIncrementTimeButton();
        enableDecrementTimeButton();
        enableIncrementBreakButton();
        enableDecrementBreakButton();

        clearStartButton();
        clearStopButton();
        enableStartButton();
    })

    _incrementTimeButton.addEventListener("click", event => {
        incrementTimeByValue(1);
        validTime();

        setCurrentOptionTime(_time);

        if (_timerState) {
            renderTimeDisplay();
        }
        renderOptionTimeDisplay();

    })

    _decrementTimeButton.addEventListener("click", event => {
        decrementTimeByValue(1);
        validTime();

        setCurrentOptionTime(_time);

        if (_timerState) {
            renderTimeDisplay();
        }
        renderOptionTimeDisplay();
    })

    _incrementBreakButton.addEventListener("click", event => {
        incrementBreakByValue(1);
        validBreak();

        setCurrentOptionBreak(_break);
        
        if (!_timerState) {
            renderTimeDisplayWithBreak();
        }

        renderOptionBreakDisplay();
    })

    _decrementBreakButton.addEventListener("click", event => {
        decrementBreakByValue(1);
        validBreak();

        setCurrentOptionBreak(_break);

        if (!_timerState) {
            renderTimeDisplayWithBreak();
        }

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
            updateDocumentTitle(formatTimeAndSecond(_time, _second));

            if (_time === 0 && _second === 0) {
                activeBreakState();
                clearInterval(_timerInterval);

                playSessionEndAudio();

                setSecondValue(0);
                setBreakValue(_currentOptionBreak);
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
            updateDocumentTitle(formatTimeAndSecond(_break, _second));

            if (_break === 0 && _second === 0) {
                activeTimerState();
                clearInterval(_breakInterval);
                
                playBreakEndAudio();

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

    function disableIncrementTimeButton() {
        _incrementTimeButton.disabled = true;
    }

    function enableIncrementTimeButton() {
        _incrementTimeButton.disabled = false;
    }

    function disableDecrementTimeButton() {
        _decrementTimeButton.disabled = true;
    }

    function enableDecrementTimeButton() {
        _decrementTimeButton.disabled = false;
    }

    function disableIncrementBreakButton() {
        _incrementBreakButton.disabled = true;
    }
    function enableIncrementBreakButton() {
        _incrementBreakButton.disabled = false;
    }
    function disableDecrementBreakButton() {
        _decrementBreakButton.disabled = true;
    }
    function enableDecrementBreakButton() {
        _decrementBreakButton.disabled = false;
    }

    function playSessionEndAudio() {
        try {
            let audio = document.createElement("audio");
            audio.src = "assets/bell.mp3";
    
            audio.play();
        } catch (error) {
            console.log("Audio autoplay error on Chrome. Audio works best on Firefox");
        }
    }

    function playBreakEndAudio() {
        try {
            let audio = document.createElement("audio");
            audio.src = "assets/break.wav";

            audio.play();
        } catch (error) {
            console.log("Audio autoplay error on Chrome. Audio works best on Firefox");
        }
    }

    function updateDocumentTitle(value) {
        document.title = `${value} - Pomodoro Clock`;
    }

})();