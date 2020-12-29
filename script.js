const app = (() => {
    const _startButton = document.querySelector(".container__clock__buttons__start");   
    const _stopButton = document.querySelector(".container__clock__buttons__start");
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

    renderTimeDisplay();
    renderOptionBreakDisplay();
    renderOptionTimeDisplay();

    function renderTimeDisplay() {
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

    function decrementTimeByValue(value) {
        _time -= value;
    }

    function incrementBreakByValue(value) {
        _break += value;
    }

    function decrementBreakByValue(value) {
        _break -= value;
    }

    function validTime() {
        if (_time < 1) {
            _time = 1;
        } else if (_time > 60) {
            _time = 60;
        }
    }

    function validBreak() {
        if (_break < 1) {
            _break = 1;
        } else if (_break > 60) {
            _break = 60;
        }
    }

    function formatTimeAndSecond(time, second) {
        return (
            `${time < 10 ? "0" + time : time}:${second < 10 ? "0" + second : second}`
        );
    }



})();