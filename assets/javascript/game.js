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
let dictionary = [
"techno", 
"drum and bass", 
"house", 
"hip hop", 
"dubstep", 
"psytrance", 
"trance", 
"disco", 
"breaks", 
"french house", 
"rave", 
"minimal techno", 
"deep house", 
"trip hop", 
"goa trance", 
"chiptune", 
"breakcore", 
"industrial"
];

var songURLs = [
"https://music.ishkur.com/music/Detroit%20Techno%20-%20(1993)%20Sebastian%20S.%20-%20Etheral.mp3",
"https://music.ishkur.com/music/Pendulum%20-%20(2009)%20Shock%20One%20-%20Polygon.mp3",
"https://music.ishkur.com/music/Chicago%20House%20-%20(1987)%20The%20Children%20-%20Freedom%20(Factory%20mix).mp3",
"https://music.ishkur.com/music/Conscious%20Rap%20-%20(2005)%20GZA%20&%20Ras%20Kass%20-%20Lyrical%20Swords.mp3",
"https://music.ishkur.com/music/Dubstep%20-%20(2011)%20J-Kenzo%20-%20The%20Roteks.mp3",
"https://music.ishkur.com/music/Full%20On%20-%20(2006)%20Mahamudra%20vs%20Dan%20Label%20-%20Electro%20Something.mp3",
"https://music.ishkur.com/music/Trance%20-%20(1990)%20Liaisons%20D.%20-%20He%20Chilled%20Out.mp3",
"https://music.ishkur.com/music/Disco%20House%20-%20(2000)%20C-Mos%20-%206-2%20Young.mp3",
"https://music.ishkur.com/music/Breaks%20-%20(1990)%20The%20Scientist%20-%20The%20Bee.mp3",
"https://music.ishkur.com/music/French%20House%20-%20(1995)%20Daft%20Punk%20-%20Da%20Funk.mp3",
"https://music.ishkur.com/music/Rave%20-%20(1992)%20DJ%20Seduction%20-%20Hardcore%20Heaven.mp3",
"https://music.ishkur.com/music/Minimal%20Techno%20-%20(2001)%20Mikael%20Stavostrand%20-%20Repl.mp3",
"https://music.ishkur.com/music/Euro%20Deep%20House%20-%20(2008)%20Liapin%20-%20Redskin%20(Agnes%20mix).mp3",
"https://music.ishkur.com/music/Trip%20Hop%20-%20(1996)%20Amon%20Tobin%20-%20Daytrip.mp3",
"https://music.ishkur.com/music/Goa%20Trance%20-%20(1995)%20Polyploid%20-%20Coaster%20Prefix.mp3",
"https://music.ishkur.com/music/Chiptune%20-%20(2016)%20Donutshoes%20-%20Highway%20Lottery.mp3",
"https://music.ishkur.com/music/Breakcore%20-%20(2005)%20Kgb%20Kid%20-%20Any%20Bwoy%20Test.mp3",
"https://music.ishkur.com/music/Industrial%20-%20(2013)%20Gesaffelstein%20-%20Hate%20Or%20Glory.mp3"
];
   

var currentSongURL = "https://music.ishkur.com/music/Detroit%20Techno%20-%20(1993)%20Sebastian%20S.%20-%20Etheral.mp3";

var audioElement = document.createElement("audio");
var muted = true;

let GameOver = false;

let Word = [];
let WonWords = [];

let GuessCycler = [];


let GuessedLetters = [];
let IncorrectGuesses = [];
let GuessesRemaining = 10;

//function to check input is a letter
function allLetter(inputtxt) {
        let letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
        if(letters.includes(inputtxt)){return true;} else {return false;};
}

function NewWord() {
    
        // generate random number for dictionary index and check word hasn't been guessed yet
        let WordIndex = 0;
        let CheckWord = "";

        //loop checks random word against GuessCycler (recent words) 
        do {
          WordIndex = Math.floor((Math.random() * dictionary.length));
          
          // CheckWord = (dictionary[WordIndex].split('').join(' ').toUpperCase());
          // to be used when game is made completable, for now dictionary recycles

        }
        while (GuessCycler.includes(WordIndex));
        
        // GuessCycler prevents the same WORD coming up within 5 more attempts
        GuessCycler.push(WordIndex);
        if (GuessCycler.length > 5) {GuessCycler.shift()};
        
        // grab randomized word from dictionary
        let WordStr = dictionary[WordIndex];
        
        // set currentSongURL
        currentSongURL = songURLs[WordIndex];
        
                // update mp3 chosen
                audioElement.pause();
                audioElement.setAttribute("src", currentSongURL);
                audioElement.play();

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
    for (i = 0; i < (Word.length); i++) {
        if (GuessedLetters.includes(Word[i]) || (Word[i]==" ")) {
            PrintedWord.push(Word[i]); // if it matches print it
            
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
        if (WonWords.length === 1) {WordText = "genre";} else {WordText = "genres";};
        WonWordsDiv.innerHTML = "You have mastered " + WonWords.length + " " + WordText + "<br>" + WonWords.join("<br>");
        GameStatus.innerHTML = "You Win. Press SPACE for new game.";
        GameOver = true;


        
    };

    // print stuff on page
    Screen.innerHTML = 
    
    (
        '<br>Incorrect guesses remaining: ' + GuessesRemaining
         + '<br>Incorrect letters guessed:<br>' + IncorrectGuesses.join(" ")
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
    GameStatus.innerHTML = "Guess the GENRE - Press SPACE to begin!";



    audioElement.setAttribute("src", currentSongURL);
    
    document.getElementById("unmute-button").addEventListener("click", unMute);
    document.getElementById("letsgo").addEventListener("click", LetsGoFunction);


function LetsGoFunction() {
  NewGame(); 
  muted = false;
  document.getElementById("splash").style.display= 'none';

};
 

function unMute() {
  
  
  if (muted) {
    audioElement.play();
    muted = false;
    document.getElementById("unmute-button").classList.remove("btn-danger");
    document.getElementById("unmute-button").classList.add("btn-default");

  } else {audioElement.pause();
      muted = true;
 
      document.getElementById("unmute-button").classList.remove("btn-default");
      document.getElementById("unmute-button").classList.add("btn-danger"); 
  };};



};
