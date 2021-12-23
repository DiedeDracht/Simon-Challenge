// Create a new array called buttonColours

var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});



// 1. Use jQuery to detect when any of the buttons are clicked and trigger a handler function.
// 2. Inside the handler, create a new variable called userChosenColour to store the id of
// the button that got clicked.
// 3. Add the contents of the variable userChosenColour created earlier to the end of this new userClickedPattern

// This section stores the buttons the player has clicked
$('.btn').click(function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);

  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);

});

function checkAnswer(currentLevel) {

  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log('success');

    if (gamePattern.length === userClickedPattern.length) {

      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log('wrong');
    playSound("wrong");

    $('body').addClass('game-over');
    setTimeout(function() {
      $('body').removeClass('game-over');
    }, 200);

    $('#level-title').text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

// 2. In the styles.css file, there is a class called "game-over", apply this class to the
// body of the website when the user gets one of the answers wrong and then remove it after 200 milliseconds.

// This section creates the sequence which the player has to recreate
function nextSequence() {

  userClickedPattern = [];
  level++;
  $('#level-title').text("Level " + level);

  var randomNumber = Math.round(Math.random() * 3);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);
}
//3. Inside this function, you'll need to reset the values of level,
//gamePattern and started variables.

// Play the sound for the button colour selected in step 1.
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
};

// Add pressed class
function animatePress(currentColour) {
  $('#' + currentColour).addClass('pressed');

  setTimeout(function() {
    $('#' + currentColour).removeClass('pressed');
  }, 100);
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
  userClickedPattern = 0;
}


// I really struggled with this in earlier challenges, but I understood it for this challenge so I'm
// going to have a go at explaining it to you. The animatePress(currentColour) function doesn't do
// anything on its own. It just sits there so it can be called when it is needed. So currentColour
// is just a placeholder used within the function. Inside the animatePress function, currentColour
// stands for "whatever value gets pushed through this function when the function is used".
// If you look in Angela's code with the completed answer, you'll see that as well as adding the animatePress
// function with its comments, she has also added an extra line into the very first function.
// I've added a comment in caps to highlight it. (It probably would have helped if Angela had added
//   a fourth comment here, and a fourth step to the instructions, since without this step the
//   animatePress function won't run.) This is the line that instructs the computer to run the animatePress
//   function, and gets it to replace the placeholder currentColour  with the variable userChosenColour.
