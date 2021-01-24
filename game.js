var buttons = ["green", "red", "yellow", "blue"];
var gameSequence = [];
var userClickSequence = [];
var started = false;
var level = 0;

$(document).keydown(function() {
  if (started === false) {
    // $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
})

$(".btn").click(function() {
  var clickedColor = $(this).attr("id");
  userClickSequence.push(clickedColor);
  console.log("userClickSequence", userClickSequence);
  buttonAnimate(clickedColor);
  playSound(clickedColor);
  checkSequence(userClickSequence.length-1);
});

function nextSequence() {
  level++;
  $("#level-title").text("Level " + level);
  userClickSequence = [];
  var nextNumber = Math.round(Math.random() * 3);
  var nextButton = buttons[nextNumber];
  gameSequence.push(nextButton);
  console.log("gameSequence", gameSequence);
$("#" + nextButton).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(nextButton);

}

function playSound(key) {
  audio = new Audio("sounds/" + key + ".mp3");
  audio.play();
}

function buttonAnimate(button) {
  $("#" + button).addClass("pressed");
  setTimeout(function() {
    $("#" + button).removeClass("pressed");
  }, 100);
}

function checkSequence(lastItem) {
  if (gameSequence[lastItem] === userClickSequence[lastItem]) {
    console.log("success");
    if (gameSequence.length === userClickSequence.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("wrong");
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    playSound("wrong");
    $("#level-title").text("Game Over, Press any Key to Restart");
    startOver();
  }
}

function startOver() {
  level = 0;
  gameSequence = [];
  started = false;
}
