/*Store the status element to allow the use of it later*/

const statusDisp= document.querySelector('.status');
let gameActive=true;
let player="X";
let gameState=["","","","","","","","","",];
const winningMessage = () =>`Player ${player} has won`;
const drawMessage = () =>'Game ended on a draw';
const playerTurn = () => `Its ${player} turn`;


/*Initial message */

statusDisp.innerHTML = playerTurn();
function handleCellPlayed(clickedCell, clickedCellIndex){
    gameState[clickedCellIndex] = player;
    clickedCell.innerHTML = player;

}

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handlePLayerChange() {
    player = player ==="X"?"O":"X";
    statusDisp.innerHTML = playerTurn();
}

function handleResultValidation() {
    let roundWon = false;
    for(let i=0; i<=7; i++){
      const winCondition = winningConditions[i];
      let a = gameState[winCondition[0]];
      let b = gameState[winCondition[1]];
      let c = gameState[winCondition[2]];
      if (a==='' || b==='' || c===''){
          continue;
      }
      if(a===b && b===c){
          roundWon = true;
          break
      }
    }
    if(roundWon){
      statusDisp.innerHTML=winningMessage();
      gameActive=false;
      return;
    }  


    let roundDraw = !gameState.includes("");
    if (roundDraw) {
        statusDisp.innerHTML=drawMessage();
        gameActive=false;
        return;
    }

    handlePLayerChange();
}

function handRestartGame() {
    gameActive=true;
    player = "X";
    gameState=["","","","","","","","","",];
    statusDisp.innerHTML = playerTurn();
    document.querySelectorAll('.cell')
               .forEach(cell => cell.innerHTML = "");
}

function handleCellClick(clickedCellEvent) {
    const clickedCell=clickedCellEvent.target;

    /*Grab the data cell index from clicked cell from the grid */
    const clickedCellIndex=parseInt(clickedCell.getAttribute('data-cell-index'));

    /**Check if the cell have been already played or if it is paused*/
    if(gameState[clickedCellIndex]!=="" || !gameActive){
        return;
    }
    /**if everything is in order proceed with the game flow */

    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();
}

document.querySelectorAll('.cell').forEach(cell=>
    cell.addEventListener('click', handleCellClick));
document.querySelector('.button-restart').addEventListener('click',handRestartGame);
