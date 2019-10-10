// hangman parts
let hangManParts = [
    `
  
      
      
     
      
  
  
    `,
    `
  
      
      
     
      
  _____
  
    `,
    `
  
    |  
    |  
    | 
    |  
  __|__
  
    `,
    `
    ___
    |  
    |  
    | 
    |  
  __|__
  
    `,
    `
    ___
    |  |
    |  
    | 
    |  
  __|__
  
    `,
    `
    ___
    |  |
    |  O
    | 
    |  
  __|__
  
    `,
    `
    ___
    |  |
    |  O
    | -+
    |  
  __|__
  
    `,
    `
    ___
    |  |
    |  O
    | -+-
    |  
  __|__
  
    `,
    `
    ___
    |  |
    |  O
    | -+-
    |  /
  __|__
  
    `,
    `
    ___
    |  |
    |  O
    | -+-
    |  /\\
  __|__
  
    `,
    `
    ___      /
    |  |   /
    |  O /
    |   /
    | -+- 
  __|__/\\
  
    `,
  ];



// generate dictionary
// let dictionary = ["techno", "drum and bass", "house", "tech house", "hiphop", "dubstep", "psytrance", "trance"];

let dictionary = ["tech house", "drum and bass"];


let WonWords = [];
let GameOver = false;

let Word = [];
let GuessedLetters = [];
let IncorrectGuesses = [];
let GuessesRemaining = 10;

//function to check input is a letter
function allLetter(inputtxt) {
        let letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
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
    let HangManScreen = document.getElementById("Hangman");
    let Screen = document.getElementById("Game");
    let WonWordsDiv = document.getElementById("WonWordsDiv");
    let PrintedWord = [];

    // generate current state of word for screen
    for (i = 0; i < Word.length; i++) {
        if (GuessedLetters.includes(Word[i]) || (Word[i]==" ")) {
            PrintedWord.push(Word[i]); // if it matches print it
            console.log(PrintedWord)
        } else {
            PrintedWord.push('_'); // if it doesn't match print an underscore
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
        let WordText = "";
        if (WonWords.length === 1) {WordText = "word";} else {WordText = "words";};
        WonWordsDiv.innerHTML = "You have guessed " + WonWords.length + " " + WordText + " correctly: <br>" + WonWords.join("<br>");
        GameStatus.innerHTML = "You Win. Press SPACE for new game.";
        GameOver = true;

        
    };

    // print stuff on page
    Screen.innerHTML = 
    
    (
        '<br> Incorrect guesses remaining: ' + GuessesRemaining
         + '<br> Incorrect letters guessed:<br>' + IncorrectGuesses.join(" ")
         + '<br><br>' + PrintedWord.join(" ")


    
    );

    // draw hangman state
    // and add the line breaks properly trying to!
    let HangManString = hangManParts[IncorrectGuesses.length];
      
    // let HangManStringFormatted = HangManString.replace(/(\r\n|\n|\r)/gm,"<br>");
     HangManScreen.innerHTML = HangManString;
    
    
};


// detect KEYPRESS
document.onkeyup = function(event) {
    
    let userGuess = event.key;
    let userGuessUC = userGuess.toUpperCase();

    if (GameOver === true) {
        // If GAME IS OVER hit SPACE to restart
        if (userGuess === " ") {
            NewGame(); 
        }
    }  
    else { 
        // Game is still going
        // check letter is A-Z
        if (allLetter(userGuessUC)) {
            if (GuessedLetters.includes(userGuessUC)) {
                // Has already been guessed - do nothing
                GameStatus.innerHTML = "You already guessed " + userGuessUC;
            } 
            else 
            {
                
            GuessedLetters.push(userGuessUC);
                if (Word.includes(userGuessUC)) {
                    GameStatus.innerHTML = userGuessUC + " is in the word!";
                    printScreen();
                } 
                else 
                {
                    IncorrectGuesses.push(userGuessUC);
                    GuessesRemaining--;
                    GameStatus.innerHTML = "The word does not contain " + userGuessUC;
                    printScreen();
                }


            };
        };

    };
};

window.onload = function() {

    GameOver=true;
    GameStatus.innerHTML = "Press SPACE to begin!";

  };
