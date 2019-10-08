// generate dictionary
let dictionary = ["potato", "turtle", "monkey", "thorough", "procrastinate", "bird"];
let WonWords = [];
let GameOver = false;

let Word = [];
let GuessedLetters = [];
let IncorrectGuesses = [];
let GuessesRemaining = 10;

//function to check input is a letter
function allLetter(inputtxt) {
        let letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "X", "Y", "Z"];
        if(letters.includes(inputtxt)){return true;} else {return false;};
}

function NewWord() {
    
        // generate random number for dictionary index
        let WordIndex = Math.floor((Math.random() * dictionary.length));
        
        // grab randomized word from dictionary
        let WordStr = dictionary[WordIndex];
        
        // return new word as string
        return WordStr;

    };

function NewGame() {
        // clear all game state variables
        Word = [];
        GuessedLetters = [];
        IncorrectGuesses = [];
        GuessesRemaining = 10;
        GameOver = false;

        // call new word function and store as string
        let NewWordStr = NewWord();
        // convert to uppercase
        let NewWordUC = NewWordStr.toUpperCase();
        // split string into array by character
        Word = NewWordUC.split("");
        
        // set status text
        GameStatus.innerHTML = "Guess any letter A-Z"; 
    
        // run printScreen function
        printScreen();
};



function printScreen() {

    let Screen = document.getElementById("Game");
    let WonWordsDiv = document.getElementById("WonWordsDiv");
    let PrintedWord = [];

    // generate current state of word for screen
    for (i = 0; i < Word.length; i++) {
        if (GuessedLetters.includes(Word[i])) {
            PrintedWord.push(Word[i]);
        } else {
            PrintedWord.push('_');
        };
    };

    // check if user has won
    if (PrintedWord.includes("_")) {
        if (GuessesRemaining == 0) {
            GameStatus.innerHTML = "You Lose. Press SPACE for new game.";
            GameOver = true;
        };
    } else {
        
        WonWords.push(PrintedWord.join(" "));
        WonWordsDiv.innerHTML = WonWords.join("<br>");
        GameStatus.innerHTML = "You Win. Press SPACE for new game.";
        GameOver = true;

        
    };

    // print stuff on page
    Screen.innerHTML = 
    
    (
        '<br> Incorrect guesses remaining: ' + GuessesRemaining
         + '<br> Incorrect letters guessed: ' + IncorrectGuesses
         + '<br><br>' + PrintedWord.join(" ")


    
    );
};



document.onkeyup = function(event) {
    
    let userGuess = event.key;
    let userGuessUC = userGuess.toUpperCase();

    if (GameOver === false) {
        // check letter is A-Z
        if (allLetter(userGuessUC)) {
            if (GuessedLetters.includes(userGuessUC)) {
                // already been guessed - do nothing
            } 
            else 
            {
                
            GuessedLetters.push(userGuessUC);
                if (Word.includes(userGuessUC)) {
                    printScreen();
                } 
                else 
                {
                    IncorrectGuesses.push(userGuessUC);
                    GuessesRemaining--;
                    printScreen();
                }


            };
        };
    } else {

        // hit SPACE to restart
        if (userGuess === " ") {
            NewGame();
            
        }
    };
};

window.onload = function() {

    GameOver=true;
    GameStatus.innerHTML = "Press SPACE to begin!";

  };
