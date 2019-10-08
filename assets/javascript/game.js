// generate dictionary
let dictionary = ["potato", "turtle", "monkey", "thorough", "procrastinate", "bird"];
let GuessedLetters = [];
let Word = [];
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
        // call new word function and store as string
        let NewWordStr = NewWord();
        // convert to uppercase
        let NewWordUC = NewWordStr.toUpperCase();
        // split string into array by character
        Word = NewWordUC.split("");
        // run printScreen function
        printScreen();
};

function Crosscheck (CurrentLetter) {
        if (GuessedLetters.includes(CurrentLetter)) {return true} else {return false};
};


function printScreen() {
    let Screen = document.getElementById("Game");
    let PrintedWord = [];

    for (i = 0; i < Word.length; i++) {
        if (Crosscheck(Word[i])) {
            PrintedWord.push(Word[i]);
        } else {
            PrintedWord.push('_');
        };
    };

    Screen.innerHTML = 
    
    (
        '<br> Incorrect guesses remaining: ' + GuessesRemaining
         + '<br> Incorrect letters guessed: ' + GuessedLetters
         + '<br><br>' + PrintedWord.join(" ")


    
    );
};



document.onkeyup = function(event) {
    
    let userGuess = event.key;
    let userGuessUC = userGuess.toUpperCase();
    if (allLetter(userGuessUC)) {
        if (GuessedLetters.includes(userGuessUC)) {
            // already been guessed - do nothing
        } else {
            
        GuessedLetters.push(userGuessUC);
            

        GuessesRemaining--;

        printScreen();

        };
    };

};

window.onload = function() {
    
    NewGame();

  };
