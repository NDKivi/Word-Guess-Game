//===============================================
// Global variables
//===============================================
const ALLOWEDGUESSES = 10;
let stringBank = [
    "relativity",
    "gravity",
    "parallax",
    "mercury",
    "venus",
    "mars",
    "jupiter",
    "saturn",
    "pluto",
    "star",
    "asteroid",
    "comet",
    "quasar",
    "galaxy",
    "meteor",
    "nebula",
    "supaernova",
    "sunspot",
    "pulsar",
    "cepheid",
    "cosmology",
    "orbit",
    "occultation",
    "penumbra",
    "vacuum",
    "accretion",
    "antimatter",
    "apastron",
    "blueshift",
    "redshift",
    "retrograde",
    "spectrometer",
    "supergiant",
    "terminator"
];
let mysteryString = getNewMysteryString();
let gameOver = false;
let pastMysteryStrings = [];
let lettersNotInMysteryWord = [];
let allLettersGuessed = [];
let numWins = 0;
let numLosses = 0;
let showArray;
initializeShowArray();


//===============================================
// Input functions
//===============================================
function guessLetter(event) {
    let y = event.key.toLowerCase();
    console.log(event.key);
    if (!gameOver) {
        if (!isLetter(y)) {
            document.getElementById("warning").textContent = "Please type a letter";
        } else if (isAlreadyGuessed(y)) {
            document.getElementById("warning").textContent = "You already guessed " + y + ". Please pick a new letter.";
        } else {
            document.getElementById("warning").textContent = "";
            updateGame(y);
        }
    } else {
        if (y == " ") {
            resetGame();
        }
    }
}

function isLetter(myString) {
    return (myString.length === 1) && myString.match(/[a-z]/i);
}

function isAlreadyGuessed(myString) {
    for (let letter of allLettersGuessed) {
        if (myString === letter) {
            return true;
        }
    }
    return false;
}

//===============================================
// Main logic functions
//===============================================
function updateGame(inputLetter) {
    allLettersGuessed.push(inputLetter);
    if ((mysteryString.indexOf(inputLetter)) === -1) {
        lettersNotInMysteryWord.push(inputLetter);
        if (isGameLost()) {
            numLosses++;
            gameOver = true;
            displayGameOver(false);
        }
    } else {
        for (let i = 0; i < mysteryString.length; i++) {
            if (mysteryString.charAt(i) === inputLetter) {
                showArray[i] = true;
            }
        }
        if (isGameWon()) {
            numWins++;
            gameOver = true;
            displayGameOver(true);
        }
    }
    updateDisplay();

}

function isGameLost() {
    return (lettersNotInMysteryWord.length > ALLOWEDGUESSES);
}

function isGameWon() {
    for (let i = 0; i < showArray.length; i++) {
        if (!showArray[i]) {
            return false;
        }
    }
    return true;
}

function resetGame() {
    pastMysteryStrings.push(mysteryString);
    mysteryString = getNewMysteryString();
    initializeShowArray();
    lettersNotInMysteryWord = [];
    allLettersGuessed = [];
    gameOver = false;
    updateDisplay();
    document.getElementById("gameovermessage").textContent = "";
}

function getNewMysteryString() {
    let index = Math.floor(Math.random() * stringBank.length);
    return stringBank.splice(index, 1).toString();
}

function initializeShowArray() {
    showArray = [];
    for (let i = 0; i < mysteryString.length; i++) {
        showArray.push(false);
    }
}

//===============================================
// Output functions
//===============================================
function updateDisplay() {
    displayString();
    displayLettersNotInMysteryWord();
    displayGuessesLeft();
    displayLosses();
    displayWins();
    displayPastWords();
}

function displayString() {
    let str = "";
    for (let i = 0; i < mysteryString.length; i++) {
        if (showArray[i]) {
            str += mysteryString.charAt(i);
        } else {
            str += "_";
        }
    }
    document.getElementById("word").textContent = str;
}

function displayLettersNotInMysteryWord() {
    let str = "";
    let arrLength = lettersNotInMysteryWord.length;
    if (arrLength > 0) { 
        for (let i = 0; i < arrLength - 1; i++) {
            str += lettersNotInMysteryWord[i] + ", "
        }
        str += lettersNotInMysteryWord[arrLength - 1];
    }
    document.getElementById("fail").textContent = str;
}

function displayLosses() {
    document.getElementById("losses").textContent = numLosses;
}

function displayWins() {
    document.getElementById("wins").textContent = numWins;
}

function displayPastWords() {
    let str = "";
    for (currentString of pastMysteryStrings) {
        str += currentString + "\n";
    }
    document.getElementById("pastwords").textContent = str;
}

function displayGuessesLeft() {
    let num = ALLOWEDGUESSES - lettersNotInMysteryWord.length;
    if (num < 0) {
        num = 0;
    }
    document.getElementById("remainingguesses").textContent = "" + num;
}

function displayGameOver(isWinner) {
    let myElement = document.getElementById("gameovermessage");
    if (isWinner) {
        myElement.textContent = "You won!!!!!!!!! You can now observe the universe at your leisure with complete control of the Hubble Space Telescope.  Press the space bar to start another round.";  
    } else {
        myElement.textContent = "You lost!!!!!!!! You passed the event horizon and were obliterated by the singularity of the black hole.  Regardless, press the space bar to start another round.";
    }
}