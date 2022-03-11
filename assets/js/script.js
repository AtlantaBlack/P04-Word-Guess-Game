// TODO: Your Solution here. :)

//declare variables associated with HTML
var startButton = document.querySelector(".start-button");
var resetButton = document.querySelector(".reset-button");
var winElement = document.querySelector(".win");
var loseElement = document.querySelector(".lose");
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

var storedLosses = localStorage.getItem("lossCounter");
var storedWins = localStorage.getItem("winCounter");

// for timer function, seconds left
var secondsLeft = 10;


// call initialise function
initialiseScoring();

// initialise get previous wins and losses
function initialiseScoring() {
    getLoseScore();
    getWinScore();
}

// retrieve local storage loss data
function getLoseScore() {
    if (storedLosses === null) {
        lossCounter = 0;
    } else {
        lossCounter = storedLosses;
    }
    
    loseElement.textContent = storedLosses;
}

// retrieve local storage win data
function getWinScore() {
    if (storedWins === null) {
        winCounter = 0;
    } else {
        winCounter = storedWins;
    }
    winElement.textContent = storedWins;
}

// set loss data to local storage
function setLoseScore() {
    localStorage.setItem("lossCounter", lossCounter);
    loseElement.textContent = lossCounter;
}

// set win data to local storage
function setWinScore () {
    localStorage.setItem("winCounter", winCounter);
    winElement.textContent = winCounter;
}

// make the lose condition
function youLost() {
    startButton.disabled = false;
    timerElement.textContent = "0";
    wordBlanksArea.textContent = "YOU LOSE";
    lossCounter++;
}

// make the win condition
function youWon() {
    startButton.disabled = false;
    wordBlanksArea.textContent = "YOU WIN";
    winCounter++;
}

// start the game
function startGame() {
    secondsLeft = 10;
    isWin = false;
    startButton.disabled = true;
    randomiseWordsAndTurnThemBlank();
    startTimer();
}


// make the countdown timer work + lose condition (lose condition in separate function now)
function startTimer() {
    let timer = setInterval(function (){
        secondsLeft--;
        timerElement.textContent = secondsLeft;

        if (secondsLeft === 0) {
            clearInterval(timer);
            youLost();
            setLoseScore();
        } else if (secondsLeft > 0 && isWin === true) {
            clearInterval(timer);
            youWon();
            setWinScore();
        }
    }, 1000);
}


// randomise the words and blank out the letters of the random word
function randomiseWordsAndTurnThemBlank() {
    // choose the random word
    chosenWord = words[Math.floor(Math.random() * words.length)];
    console.log(chosenWord);

    // split the chosen word into an array of letters
    blankLetters = chosenWord.split("");

    blankLetterLength = blankLetters.length;

    // set an empty array for the blank word as a whole
    blankedOutWord = [];

    // loop through array length of blankLetters (of chosenWord) and add underscores for each index into blank word array
    for (let i = 0; i < blankLetterLength; i++) {
        blankedOutWord.push("_");
    }

    // publish blank word array in textarea, each comma replaced with _
    wordBlanksArea.textContent = blankedOutWord.join(" ");
}

// show the letters that get pressed
function showTheLetters(letterGuessed) {
    // make a new variable for win condition check
    let isInTheWord = false;

    // loop through index of word. if letter is in word, return true
    for (var i = 0; i < blankLetterLength; i++) {
        if (chosenWord[i] === letterGuessed) {
            isInTheWord = true;
        }
    }

    // if letter is in the word, loop through again (different variable for index), replace index of blanked out word with letter wherever the blanked out word's index matches with chosen word's index
    if (isInTheWord) {
        for (let j = 0; j < blankLetterLength; j++) {
            if (chosenWord[j] === letterGuessed) {
                blankedOutWord[j] = letterGuessed;
            }
        }

    // write out the new filled in blanked word joined with spaces
    wordBlanksArea.textContent = blankedOutWord.join(" ");
    }
}

// check the win condition
function checkLettersMatch() {
    if (chosenWord === blankedOutWord.join("")) {
        isWin = true;
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
        checkLettersMatch();
    }
});

// reset button
resetButton.addEventListener("click", resetGame);

//reset function
function resetGame() {
    lossCounter = 0;
    winCounter = 0;

    setLoseScore();
    setWinScore();
}

