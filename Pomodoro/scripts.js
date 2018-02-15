
var breakMins = 5;
var sessionMins = 25;

var breakTimeout;
var sessionTimeout;
var countDownInterval;

function sessionDone() {
    document.getElementById('alarm').play();
    alert("Pomodoro session is over! Starting break of " + breakMins + " minutes");
    var ms = breakMins*60*1000;
    breakTimeout = setTimeout(breakDone, ms);
    countDown(breakMins);
}

function breakDone() {
    document.getElementById('alarm').play();
    alert("Break is over, start another session!");
    $("#btnStart").prop("disabled",false);
}

$("#btnStart").click( function() {
    sessionMins = document.getElementById("session").value;
    breakMins = document.getElementById("break").value;
    alert("Starting " + sessionMins + " minute pomodoro session!");
    var ms = sessionMins*60*1000;
    sessionTimeout = setTimeout(sessionDone, ms);
    countDown(sessionMins);
    $("#btnStart").prop("disabled",true);
});

$("#form").submit(function(e) {
    e.preventDefault();
});

function countDown(mins) {
    // Timer from w3schools
    // https://www.w3schools.com/howto/howto_js_countdown.asp
    var countDownDate = new Date(new Date().getTime()+(mins*60*1000));

    countDownInterval = setInterval(function() {
        var now = new Date().getTime();
        var distance = countDownDate - now;
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);
        var timerText = ((minutes<10)?"0":"") + minutes + ":" + ((seconds<10)?"0":"") + seconds;
        document.getElementById("countdownTimer").value = timerText;
        if (distance < 0) {
            clearInterval(countDownInterval);
            document.getElementById("countdownTimer").value = "00:00";
        }
    },1000);
}



$("#session").change(function (e) {
    // if a pomodoro is not in session update the countdown timer as the user adjusts adjusts session length
    // if start button is disabled then a pomodoro is in session
    if (!$("#btnStart").prop("disabled")) {
        $("#countdownTimer").prop("value",$("#session").prop("value") + ":00");
    }
});

$("#btnReset").click(function() {
    // clear timeouts
    clearTimeout(breakTimeout);
    clearTimeout(sessionTimeout);
    // enable start button
    $("#btnStart").prop("disabled",false);
    // clear countdown interval
    clearInterval(countDownInterval);
    // reset countdownTimer text
    document.getElementById("countdownTimer").value = document.getElementById("session").value + ":00";
});