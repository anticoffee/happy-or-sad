const box = Array.from(document.querySelectorAll('.box'));
const playerDisplay = document.querySelector('.display');
const btn = document.querySelector('#newGame');

let board = ['','','','','','','','',''];
let currentPlayer = "happy";
let game = true;

const HAPPYWINNER = "happy won";
const SADWINNER = "sad won";
const TIE = 'TIE';

const winningPatterns = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

function winnerCheck(){

    let roundWon = false;

    for (let i =0; i<=7; i++){
        const winCondition = winningPatterns[i];
        const a = board[winCondition[0]];
        const b = board[winCondition[1]];
        const c = board[winCondition[2]];

        if (a ==='' || b ==='' || c ===''){
            continue;
        }
        if(a === b && b === c){
            roundWon = true;
            break;
        }
    }

    if (roundWon){
        announce(currentPlayer === "happy" ? SADWINNER:HAPPYWINNER);
        game = false;
        return;
    }
    
    if (!board.includes(''))
        announce(TIE);

}

const announce = (type) => {
    switch(type){
        case HAPPYWINNER:
            playerDisplay.innerHTML = '<button class="win" id="winner">happy won</button>';
            break;
        case SADWINNER:
            playerDisplay.innerHTML = '<button class="win" id="winner">sad won</button>';
            break;
        case TIE:
            playerDisplay.innerHTML = "<button class='win' id='winner'>it's a tie</button>";
    }
};

const isValidAction = (box) => {
    if(box.classList.contains("happy") || box.classList.contains("sad")){
        return false;
    }

    return true;
};

const updateBoard = (index) => {
    board[index] = currentPlayer;
}

const changePlayer = () => {
    currentPlayer = currentPlayer === "happy" ? "sad":"happy";
    if (currentPlayer === "happy"){
        playerDisplay.innerHTML = (`${currentPlayer}'s turn`);
    } else{
        playerDisplay.innerHTML = (`<h1 class="color">${currentPlayer}'s turn</h1>`);
    }
    
}

const userAction = (box,index) => {
    if(isValidAction(box) && game) {
        box.classList.add(`${currentPlayer}`);
        updateBoard(index);
        changePlayer();
        winnerCheck();
    }
}

const newGame = () => {
    board = ['','','','','','','','',''];
    game = true;

    if(currentPlayer === "sad"){
        changePlayer();
    } else{
        currentPlayer = "sad";
        changePlayer();
    }

    box.forEach(box => {
        box.innerText = '';
        box.classList.remove('happy');
        box.classList.remove('sad');
    });
}


box.forEach( (box, index) =>{ 
    box.addEventListener('click', () => userAction(box, index));
});

btn.addEventListener('click', newGame);