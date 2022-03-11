// TODO: Your Solution here. :)

//declare variables associated with HTML
var startButton = document.querySelector(".start-button");
var winScore = document.querySelector(".win");
var loseScore = document.querySelector(".lose");
var timerElement = document.querySelector(".timer-count");
var wordBlanksArea = document.querySelector(".word-blanks");


// words
var words = ["javascript", "string", "boolean", "number", "object", "window", "variable", "array"];
var chosenWord = "";

var blankLetterLength = 0;

var blankLetters = [];
var blankedOutWord = [];

isWin = false;

// for lose counter & the win counter
var lossCounter = 0;
var winCounter = 0;

// for timer function, seconds left
var secondsLeft = 10;


// make the countdown timer work + lose condition (lose condition in separate function now)
function startTimer() {
    let timer = setInterval(function (){
        secondsLeft--;
        timerElement.textContent = secondsLeft;

        if (secondsLeft === 0) {
            clearInterval(timer);
            youLost();
        } 
        
        // else {
        //     clearInterval(timer);
        //     winCondition();
        // }

    }, 1000);
}


// make the lose condition
function youLost() {
    timerElement.textContent = "0";
    wordBlanksArea.textContent = "YOU LOSE";
    lossCounter++;
    localStorage.setItem("lossCounter", lossCounter);
}

// make the win condition
function youWon() {
    // timerElement.textContent = "--";
    wordBlanksArea.textContent = "YOU WIN";
    winCounter++;
    localStorage.setItem("winCounter", winCounter);
}



// set the condition to win the game
// function winCondition() {
//     if ()
// }


// randomise the words and blank out the letters of the random word
function randomiseWordsAndTurnThemBlank() {
    // choose the random word
    let chosenWord = words[Math.floor(Math.random() * words.length)];
    console.log(chosenWord);

    // split the chosen word into an array of letters
    let blankLetters = chosenWord.split("");
    console.log(blankLetters);

    let blankLetterLength = blankLetters.length;

    // set an empty array for the blank word as a whole
    let blankedOutWord = [];

    // loop through array length of blankLetters (of chosenWord) and add underscores for each index into blank word array
    for (let i = 0; i < blankLetterLength; i++) {
        blankedOutWord.push("_");
        console.log(blankedOutWord);
    }

    // publish blank word array in textarea, each comma replaced with _
    wordBlanksArea.textContent = blankedOutWord.join(" ");
}


function startGame() {
    // startTimer();
    isWin = false;
    randomiseWordsAndTurnThemBlank();

}

function showTheLetters(letterGuessed) {
    let isInTheWord = false;

    for (var i = 0; i < blankLetterLength; i++) {
        if (chosenWord[i] === letterGuessed) {
            isInTheWord = true;
            console.log("yes");
        }
    }

    if (isInTheWord) {
        for (let j = 0; j < blankLetterLength; j++) {
            if (chosenWord[j] === letterGuessed) {
                blankedOutWord[j] = letterGuessed;
            }
        };
        wordBlanksArea.textContent = blankedOutWord.join(" ");
    }

}


function checkLettersMatch() {
    if (chosenWord === blankedOutWord.join("")) {
        isWin = true;
        console.log("win");
    }
}

// add event listeners

// press the start button will start the game
startButton.addEventListener("click", startGame);

// keydown event
document.addEventListener("keydown", function(event) {
    let keyPressed = event.key.toLowerCase();
    let alphabet = "abcdejghijklmnopqrstuvwxyz".split("");

    if (alphabet.includes(keyPressed)) {
        console.log("working");
        let letterGuessed = event.key;
        showTheLetters(letterGuessed);
        console.log(letterGuessed);
        checkLettersMatch();
    }
});

