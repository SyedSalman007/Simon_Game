function numToButton(theNum) {
  switch (theNum) {
    case 1:
      return "green";
    case 2:
      return "red";
    case 3:
      return "yellow";
    case 4:
      return "blue";
    default:
      return "";
  }
}

var theButton;
var currLevel = 0;
var gamePattern = [];
var userPattern = [];
var started = true;

$("body").keypress(function (event) {
  if (event.key.toLowerCase() == "a" && started) {
    buildSequence();
    started = false;
  }
});

$(".btn").click(function () {
  var userClicked = $(this).attr("id");
  userPattern.push(userClicked);

  animatePress(userClicked);
  playTheAudio(userClicked);

  checkAnswer(userPattern.length - 1);
});

function checkAnswer(length) {
  if (userPattern[length] === gamePattern[length]) {
    if (userPattern.length === gamePattern.length) {
      setTimeout(() => {
        buildSequence();
      }, 1000);
    }
  } else {
    playTheAudio("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press A to Restart");

    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    startOver();
  }
}

function playTheAudio(name) {
  var audio = new Audio("./sounds/" + name + ".mp3");
  audio.play();
}

function buildSequence() {
  userPattern = [];
  currLevel++;

  $("h1").text(`Level ${currLevel}`);
  nextMove = Math.floor(Math.random() * 4) + 1;
  theButton = numToButton(nextMove);

  gamePattern.push(theButton);

  $("#" + theButton)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  playTheAudio(theButton);
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function startOver() {
  currLevel = 0;
  gamePattern = [];
  started = true;
}
