const squares = document.querySelectorAll(".cell")
const textPlayer = document.querySelector(".game-status")

let roundWon = false

let moves = ['','', '', '', '', '', '', '', ''];

let currentPlayer = "O";

const winningMessage = () => `Player ${currentPlayer} has won!`;
const drawMessage = () => `Game ended in a draw!`;
const currentPlayerTurn = () => `It's ${currentPlayer === "O" ? "X" : "O"}'s turn`;



const play = (p) =>{
    if(moves.length){
        currentPlayer = currentPlayer === "O" ? "X" : "O";
    }
    moves[p] = currentPlayer;
    return currentPlayer
}


squares.forEach((square, index) => {
    square.addEventListener('click', (e) => {
        if(!square.innerHTML && !roundWon) {
            const squareValue = play(index);
            square.innerHTML = squareValue
        }  
        textPlayer.innerHTML = currentPlayerTurn();
        checkWinner();
    })
})


const wins = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const checkWinner =()=>{
    let winSquares;
    roundWon = false;
    for(let i = 0; i < wins.length; i++){
        const win = wins[i];
        let a = moves[win[0]];
        let b = moves[win[1]];
        let c = moves[win[2]];
        if(a === '' || b === '' || c === ""){
            continue;
        }
        if(a === b && b === c){
            roundWon = true;
            winSquares = win;
            break
        }
    }
    if(roundWon){
        textPlayer.innerHTML = winningMessage();
        winSquares.forEach(square => squares[square].style.color = "green")
        squares.innerHTML = "green"
        return;
    }

    let roundDraw = !moves.includes("");
    if(roundDraw){
        textPlayer.innerHTML = drawMessage();
        return;
    }
}


const restartGame = () =>{
     moves = ['','', '', '', '', '', '', '', ''];
     textPlayer.innerHTML = "It's O turn";
     roundWon = false;
    squares.forEach(square => {
        square.innerHTML="";
        square.style.color = "black"
    });
}

