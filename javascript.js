// Declare Main Resources
const container = document.getElementById('container');     //Main Container
const boardContainer = document.createElement('div');       //Inner Container
const topBar = document.createElement('div');
const playerOneCon = document.createElement('div');
const playerTwoCon = document.createElement('div');
const gameContainer = document.createElement('div');
const bottomContainer = document.createElement('div');
const gameEndCon = document.createElement('div');
    boardContainer.classList.add('board-container');
let playerOneName = 'player one';
let playerTwoName = 'player two';
let gamePhase = "Default";
let playerOneScore = 0;
let playerTwoScore = 0;
let turn = 0;
let xArr = [];
let yArr = [];
const win1 = ['0', '1', '2'];
const win2 = ['3', '4', '5'];
const win3 = ['6', '7', '8'];
const win4 = ['0', '3', '6'];
const win5 = ['1', '4', '7'];
const win6 = ['2', '5', '8'];
const win7 = ['0', '4', '8'];
const win8 = ['2', '4', '6'];

function isEven (number) {
    return number % 2 === 0;
  }

// Switch Between Game Screens
function setUpBoard() {
        if (gamePhase == "Default") {
            startPage();            
        } else if (gamePhase == "newGame") {
            playerSelect();
        } else if (gamePhase == "startGame") {
            startGame();
        }; 
}

// Build the Starting Screen
function startPage() {
    const startPageBkg = document.createElement('div');
        startPageBkg.classList.add('start-page-bkg');
    const startText = document.createElement('div');
        startText.classList.add('start-text');
        startText.textContent = "Start Game!";  
            startPageBkg.appendChild(startText);        //}
            boardContainer.appendChild(startPageBkg);   //} Build Start Page
            container.appendChild(boardContainer);      //}

        // Click to continue Event    
        startPageBkg.addEventListener("click", () => {
            startPageBkg.classList.add('fade-ani');     
            startText.classList.add('fade-out');
            console.log("click");
            gamePhase = "newGame";
            // Wait till transition ends before progressing
            startPageBkg.addEventListener('transitionend', () => {
                setUpBoard();
            })
        });
}

function playerSelect() {
        boardContainer.innerHTML = "";          // Clear the inner Code
    const playerSelectBkg = document.createElement('div');
    const playerOneContainer = document.createElement('div');
    const playerOneText = document.createElement('div');
    const playerOneInput = document.createElement('input');
    const playerTwoContainer = document.createElement('div');
    const playerTwoText = document.createElement('div');
    const playerTwoInput = document.createElement('input');
    const playerSelectTitle = document.createElement('div');
    const playerSelectBtn = document.createElement('div');
        playerSelectBkg.classList.add('player-select-bkg');
        playerOneContainer.classList.add('player-container');
        playerOneText.classList.add('player-text');
        playerOneText.textContent = "Player One Name: "
        playerOneInput.classList.add('player-select-input');
        playerOneInput.setAttribute('id', 'player-one');
        playerTwoContainer.classList.add('player-container');
        playerTwoText.classList.add('player-text');
        playerTwoText.textContent = "Player Two Name: ";
        playerTwoInput.classList.add('player-select-input');
        playerTwoInput.setAttribute('id', 'player-two');
        playerSelectTitle.classList.add('player-select-title');
        playerSelectTitle.textContent = "Player Names";
        playerSelectBtn.classList.add('player-select-btn');
        playerSelectBtn.textContent = "Choices Made";
            boardContainer.appendChild(playerSelectBkg);
            playerOneContainer.appendChild(playerOneText);
            playerOneContainer.appendChild(playerOneInput);
            playerTwoContainer.appendChild(playerTwoText);
            playerTwoContainer.appendChild(playerTwoInput);
            playerSelectBkg.appendChild(playerSelectTitle);
            playerSelectBkg.appendChild(playerOneContainer);
            playerSelectBkg.appendChild(playerTwoContainer);
            playerSelectBkg.appendChild(playerSelectBtn);

            //Submit Button Coding
    playerSelectBtn.addEventListener("click", () => {
        playerOneName = playerOneInput.value;
        playerTwoName = playerTwoInput.value;
        gamePhase = "startGame";
        const playerOneNameText = document.createElement('div');
        const playerTwoNameText = document.createElement('div');
            playerOneNameText.classList.add('player-text');
            playerOneNameText.classList.add('player-one');        
            playerTwoNameText.classList.add('player-text');
            playerTwoNameText.classList.add('player-two');
            playerOneNameText.textContent = playerOneName;
            playerTwoNameText.textContent = playerTwoName;
            playerSelectBkg.classList.add('anim-bkg-to-game');
            playerSelectTitle.classList.add('fade-out');            
            playerOneContainer.classList.add('anim-top-left');
            playerTwoContainer.classList.add('anim-top-right');
            playerSelectBtn.classList.add('fade-out');
            playerOneContainer.replaceChild(playerOneNameText, playerOneInput);
            playerTwoContainer.replaceChild(playerTwoNameText, playerTwoInput);
            playerSelectBkg.removeChild(playerSelectBtn);
            playerSelectBkg.removeChild(playerSelectTitle);
            playerSelectBkg.classList.add('init-game');

            playerSelectBkg.addEventListener('transitionend', () => {
                setUpBoard();

                
            })
   })
}

function startGame() {
    container.innerHTML = "";
    container.appendChild(boardContainer);
    boardContainer.innerHTML = "";
    boardContainer.classList.add('flex-column');
    topBar.classList.add('top-bar');
    boardContainer.appendChild(topBar);
    gameContainer.classList.add('game-container');
    boardContainer.appendChild(gameContainer);
    bottomContainer.classList.add('bottom-container');
    boardContainer.appendChild(bottomContainer);
    playerOneCard();
    playerTwoCard();
    gameBuild();

}

function gameBuild() {
    gameContainer.innerHTML = "";
    if (container.contains(gameEndCon)) {
            container.removeChild(gameEndCon);
    } else {};
    
    const board = ["","","","","","","","",""];

    for (i=0; i < board.length; i++) {
        const gameCell = document.createElement('div');
        gameCell.classList.add('game-cell');
        gameCell.setAttribute('id', i);
        gameContainer.appendChild(gameCell);
        gameCell.addEventListener("click", (e) =>{
            turn++;
            if (isEven(turn)) {
                e.target.classList.add('clicked-even');
                xArr.push(e.target.id);
            } else {
                e.target.classList.add('clicked-odd');
                yArr.push(e.target.id);
            }
            checkWin();       
    })
    }
}

function checkWin() {
    if ((containsAll(xArr, win1)) || (containsAll(xArr, win2)) || (containsAll(xArr, win3)) || (containsAll(xArr, win4)) || (containsAll(xArr, win5)) || (containsAll(xArr, win6)) || (containsAll(xArr, win7)) || (containsAll(xArr, win8))) 
        {
            winningPlayer = playerTwoName;
            playerTwoScore++;
            console.log(playerTwoScore);
            gameEnd()}
    else if ((containsAll(yArr, win1)) || (containsAll(yArr, win2)) || (containsAll(yArr, win3)) || (containsAll(yArr, win4)) || (containsAll(yArr, win5)) || (containsAll(yArr, win6)) || (containsAll(yArr, win7)) || (containsAll(yArr, win8))) 
        {
            winningPlayer = playerOneName;
            playerOneScore++;
            console.log(playerOneScore);
            gameEnd()}    
    if (xArr.length == 5) {winningPlayer = "You both Suck!"; gameEnd();}
    else if (yArr.length == 5) {winningPlayer = "You both Suck!"; gameEnd();}
};

function playerOneCard() {
    playerOneCon.innerHTML = "";
    const playerOneNameTitle = document.createElement('div');
    const playerOneScoreText = document.createElement('div');
        playerOneCon.classList.add('player-one-container');
        playerOneNameTitle.classList.add('player-one-name-title');
        playerOneNameTitle.textContent = playerOneName;
        playerOneScoreText.classList.add('player-score');
        playerOneScoreText.textContent = playerOneScore;
            playerOneCon.appendChild(playerOneNameTitle);
            playerOneCon.appendChild(playerOneScoreText);
            topBar.appendChild(playerOneCon);
    
}

function playerTwoCard() {
    playerTwoCon.innerHTML = "";
    const playerTwoNameTitle = document.createElement('div');
    const playerTwoScoreText = document.createElement('div');
        playerTwoCon.classList.add('player-two-container');
        playerTwoNameTitle.classList.add('player-two-name-title');
        playerTwoNameTitle.textContent = playerTwoName;
        playerTwoScoreText.classList.add('player-score');
        playerTwoScoreText.textContent = playerTwoScore;
            playerTwoCon.appendChild(playerTwoScoreText);
            playerTwoCon.appendChild(playerTwoNameTitle);
            topBar.appendChild(playerTwoCon);
}

setUpBoard();

function containsAll(array, values) {
    return values.every(value => array.includes(value));
  }

function gameEnd() {
        gameEndCon.innerHTML = '';
        gameEndCon.classList.add('game-end-container');
    const gameEndBkg = document.createElement('div');
        gameEndBkg.classList.add('game-end-bkg');
    const winnerTextOne = document.createElement('div');
        winnerTextOne.classList.add('winner-text');
        winnerTextOne.textContent = winningPlayer;
    const winnerTextTwo = document.createElement('div');
        winnerTextTwo.classList.add('winner-text-two');
        winnerTextTwo.textContent = "is the Winner!";
    const nextGameBtn = document.createElement('div');
        nextGameBtn.classList.add('next-game-btn');
        nextGameBtn.textContent = "Next Game!";

        gameEndCon.appendChild(gameEndBkg);
        gameEndBkg.appendChild(winnerTextOne);
        gameEndBkg.appendChild(winnerTextTwo);
        gameEndBkg.appendChild(nextGameBtn);
    container.appendChild(gameEndCon);

    nextGameBtn.addEventListener('click', () => {
        xArr = [];
        yArr = [];
        startGame();
    })
}