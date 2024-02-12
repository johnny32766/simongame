var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var level = 0;
var started = false;


function nextSequence() {
    var randomeNumber = Math.floor(Math.random() * 4);
    var randomChoosenColour = buttonColours[randomeNumber];
    gamePattern.push(randomChoosenColour); 
    console.log("gamePattern: " + gamePattern);
    $("#" + randomChoosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChoosenColour);
    level++;
    $("h1").text("Level " + level);
}

function playSound(color) {
    var audiotFile = "sounds/wrong.mp3";
    switch(color) {
        case "red":
            audiotFile = "sounds/red.mp3";
            break;
        case "green":
            audiotFile = "sounds/green.mp3";
            break;
        case "blue":
            audiotFile = "sounds/blue.mp3";
            break;
        case "yellow":
            audiotFile = "sounds/yellow.mp3";
            break;
    }
    var audio = new Audio(audiotFile);
    audio.play();
}

function animatePress (color) {
    $("#" + color).addClass("pressed");
    setTimeout(function() {
        $("#" + color).removeClass("pressed", 100);
    });
}

function checkAnswer() {
    if(JSON.stringify(userClickedPattern) === JSON.stringify(gamePattern)){
        console.log("success");
        setTimeout(nextSequence, 1000);
        userClickedPattern = [];
        
    } else {
        console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);
        $("h1").text("Game Over, Press Any Key to Restart");
        started = false;
        level = 0;
        gamePattern = [];
        userClickedPattern = [];

    } 
}


$(".btn").on("click", function() {
    var userChoosenColor = this.id;
    playSound(userChoosenColor);
    animatePress(userChoosenColor);
    userClickedPattern.push(userChoosenColor); 
    console.log("userClickedPattern: " + userClickedPattern);
    if (userClickedPattern.length === gamePattern.length){
        checkAnswer();
    }
});


$("body").keypress(function() {
    if (started == false) {
        nextSequence();
        started = true;
        
    }
})
