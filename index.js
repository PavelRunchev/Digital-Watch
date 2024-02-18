
(function() {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let globalDate = [0, 0];
    let alarm = [0, 0];
    let withAudioFile = false;
    let withVibration = false;
    let alarmBegin = true;

    let alarmOptions = document.querySelector('.alarm-options-container');
    let clearAlarmBtn = document.querySelector('.clear-alarm-btn');

    let firstHourDigit = document.querySelector('.time-image-first-hour-digit');
    let lastHourDigit = document.querySelector('.time-image-last-hour-digit');
    let firstMinuteDigit = document.querySelector('.time-image-first-minute-digit');
    let lastMinuteDigit = document.querySelector('.time-image-last-minute-digit');
    let firstSecondDigit = document.querySelector('.time-image-first-second-digit');
    let lastSecondDigit = document.querySelector('.time-image-last-second-digit');

    let dateDiv = document.querySelector('.date');

    let setAlarmBtn = document.querySelector('.set-alarm-btn');
    setAlarmBtn.addEventListener('click', setAlarm, false);

    let activateBtn = document.querySelector('.alarm-activate-btn');
    activateBtn.addEventListener('click', activateAlarm, false);

    clearAlarmBtn.addEventListener('click', clearAlarm, false);

    let activatedAlaramOn = document.querySelector(".alarm-show-container");

    let card = document.querySelector(".card");
    card.style.display = "none";
    let alarmInfo = document.querySelector('.alarm-time-info');
    let alarmTimeDigit = document.querySelector('.alarm-time-digit');
    let audioFileInfo = document.querySelector('.audio-file-info');
    let vibrationInfo = document.querySelector('.vibration-info');

    let audioBtnOn = document.querySelector('.audio-file-btn-ok');
    audioBtnOn.addEventListener("click", audioOn);
    let audioBtnStop = document.querySelector('.audio-file-btn-stop');
    audioBtnStop.addEventListener("click", audioStop);

    let audioTag = document.querySelector('.audio-tag');

    function DigitalWatch() {
        setInterval(() => {
            const date = new Date();
            const h = String(date.getHours()).padStart(2, '0');
            const m = String(date.getMinutes()).padStart(2, '0');
            const s = String(date.getSeconds()).padStart(2, '0');
            globalDate = [Number(date.getHours()), Number(date.getMinutes())];

            //set hour
            setTime(firstHourDigit, lastHourDigit, h);
            //set minutes
            setTime(firstMinuteDigit, lastMinuteDigit, m);
            //set seconds
            setTime(firstSecondDigit, lastSecondDigit, s);

            const dd = String(date.getDate()).padStart(2, '0');
            const yyyy = String(date.getFullYear()).padStart(2, '0');
            dateDiv.innerHTML = `${dd} ${months[date.getMonth()]} ${yyyy}`;

            //go alarm implement
            if(Number(h) === alarm[0] && Number(m) === alarm[1] && alarmBegin) {
                alarmOn();
                alarmBegin = false;
            }
    
        }, 1000);
    }

    function setTime(firstDigit, lastDigit, time) {
        if(time > 9) {
            firstDigit.src = `./public/images/digit-${getFirstDigit(time)}.png`;
            lastDigit.src = `./public/images/digit-${getLastDigit(time)}.png`;
        } else {
            firstDigit.src = "./public/images/digit-0.png";
            lastDigit.src = `./public/images/digit-${getLastDigit(time)}.png`;
        }
    }

    function getFirstDigit(num) { return parseInt(num / 10); }

    function getLastDigit(num) { return num % 10; }

    function setAlarm(e) {
        setClass(setAlarmBtn, alarmOptions, false);
    }

    function activateAlarm(e) {
        let timepicker = document.querySelector(".set-timer-alarm").value;
        if(timepicker === "" || timepicker === null) return;

        const [hour, minute] = timepicker.split(":");
        if(Number(hour) === globalDate[0] && Number(minute) === globalDate[1]) {
            return;
        } else {
            document.querySelector(".alarm-timer-on").innerHTML = `${timepicker}`;
            withAudioFile = document.querySelector('.check-audio-btn').checked;
            withVibration = document.querySelector('.check-vibration-btn').checked;
            setClass(alarmOptions, clearAlarmBtn, true);
            alarm[0] = Number(hour);
            alarm[1] = Number(minute);
        }
    }

    function clearAlarm(e) {
        setClass(clearAlarmBtn, setAlarmBtn, false);
        //reset radio btn!
        document.querySelector('.check-audio-btn').checked = false;
        document.querySelector('.check-vibration-btn').checked = false;
        document.querySelector('.set-timer-alarm').value = "00:00";
        //reset card info
        withAudioFile = false;
        withVibration = false;
        audioTag.pause();

        card.style.display = "none";
    }

    function setClass(clickedElement, showElement, isActivatedAlarm) {
        clickedElement.classList.remove("show");
        clickedElement.classList.add("hide");

        showElement.classList.remove("hide");
        showElement.classList.add("show");

        if(isActivatedAlarm === true) {
            activatedAlaramOn.classList.remove("hide");
            activatedAlaramOn.classList.add("show");
        } else if(isActivatedAlarm === false) {
            activatedAlaramOn.classList.remove("show");
            activatedAlaramOn.classList.add("hide");
        }
    }

    function alarmOn() {
        if(withAudioFile) {
            setClass(alarmInfo, audioFileInfo, null);
        }

        if(withVibration) {
            setClass(alarmInfo, vibrationInfo, null);
        }

        if(withAudioFile === false && withVibration === false) {
            if(audioFileInfo.className === "card-text mt-3 text-center audio-file-info show") {
                audioFileInfo.classList.remove("show");
                audioFileInfo.classList.add("hide");
            }
          
            if(vibrationInfo.className === "card-text mt-3 text-center vibration-info show") {
                vibrationInfo.classList.remove("show");
                vibrationInfo.classList.add("hide");
            }

            alarmInfo.classList.remove("hide");
            alarmInfo.classList.add("show");
            alarmTimeDigit.innerHTML = `${String(globalDate[0]).padStart(2, '0')}:${String(globalDate[1]).padStart(2, '0')}`;
        }

        card.style.display = "flex";
        console.log(card);
    }

    function audioOn(e) {
        if(withAudioFile) audioTag.play();
    }

    function audioStop(e) {
        audioTag.pause();
    }

    DigitalWatch();
    
})(window);

