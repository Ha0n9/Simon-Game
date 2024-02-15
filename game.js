let buttonColour = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let started = false;
var level = 0;


$(document).keypress((event) => {
    if(!started && event.key.toLowerCase() === "a") {
        nextSequence();
        $("#level-title").text("Level " + level);
        started = true;
    }
})

$(".btn").click(function() {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1)
})

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log("success")

        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(() => {
                nextSequence();
            }, 1000);
        }
    } else {
        console.log("wrong")

        if (userClickedPattern[currentLevel] !== gamePattern[currentLevel]) {
            var wrong = new Audio("sounds/wrong.mp3");
            wrong.play();

            $("body").addClass("game-over");
            setTimeout(() => {
                $("body").removeClass("game-over");
            }, 300);

            $("#level-title").text("Game Over, Press Any Key To Restart").fadeIn(200).fadeOut(200).fadeIn(200).fadeIn(200).fadeOut(200).fadeIn(200);
            startOver();
        }
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}

function nextSequence() {
    level++;
    userClickedPattern = [];

    $("#level-title").text("Level " + level)

    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenNumber = buttonColour[randomNumber];
    gamePattern.push(randomChosenNumber);

    $("#" + randomChosenNumber).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenNumber);
}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");

    setTimeout(() => {
        $("#" + currentColor).removeClass("pressed")
    }, 100);
}