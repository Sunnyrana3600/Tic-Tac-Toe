// Getting content from HTML document 
let gameTile=document.querySelectorAll('.boardTile');
let reset=document.querySelector('.resetButton');
let playerTurn=document.querySelector('.playerTurn');

//Creating gameboard
let arrayBoard=["","","","","","","","",""]
//Player Starts with X
let currentPlayer='X';
//Game starts off as off.
let gameOn=false;
//Different Win Conditions 
let winConditions=[
    // Win Conditions horizontally 
    [0,1,2],
    [3,4,5],
    [6,7,8],
    //Win Conditions vertically 
    [0,3,6],
    [1,4,7],
    [2,5,8],
    //Win Consitions diagonally
    [0,4,8],
    [6,4,2]

]

playGame();

function playGame(){
    //Starts Game
    gameOn=true;
    // First Player Turn
    playerTurn.textContent=`${currentPlayer}'s turn`;
    playerTurn.style.color='red';
    //Displays the X and O
    updateTile();
    reset.addEventListener('click',()=>{ // add event listener that when clicked everything resets 
        gameTile.forEach(element=>{
            element.textContent='';
        });
        currentPlayer='X';
        gameOn=true;
        arrayBoard=["","","","","","","","",""];
        playerTurn.textContent=`${currentPlayer}'s turn`;
        playerTurn.style.color='red';
    })
    
}


function updateTile(){
    gameTile.forEach((element,index)=>{
        element.addEventListener('click',()=>{
            if(element.innerHTML=='' && gameOn==true){// if the tile does not have a value and the game is still running then change the display
                element.textContent=currentPlayer; 
                arrayBoard[index]=currentPlayer;
                tileColor();// changes color of the X and O
                checkWinner();// checks the winner;
                if(gameOn==true){// if the game is still in progress than change the player
                    changePlayer();
                    playerTurn.textContent=`${currentPlayer}'s turn`;
                } 
            }
        });
    });
}


function changePlayer(){
    if(currentPlayer=='X'){
        currentPlayer='O';// if the current player is X change to O
        playerTurn.style.color='blue';
        
    }
    else{
        currentPlayer='X';
        playerTurn.style.color='red'; // if the current player is O change to X
        
    }
}



function checkWinner(){
    for(let i=0;i<winConditions.length;i++){//Loops through all possible win conditions 
        let winCondition=winConditions[i];
        const A=arrayBoard[winCondition[0]];
        const B=arrayBoard[winCondition[1]];
        const C=arrayBoard[winCondition[2]];

        if(A == "" || B == "" || C == ""){// if any are empty continue 
            continue;
        }
        if(A==B&&B==C){
            playerTurn.textContent=`${currentPlayer} wins!`;// if there is match then end the game and display winner
            gameOn=false;
            break;
            
        }
        else if(!arrayBoard.includes("")){// if there is no winner and no more room it's a draw
            playerTurn.textContent = `Draw!`;
            gameOn = false;
        }
        
 
    }

}

function tileColor(){
    gameTile.forEach(element=>{
        if(element.innerHTML=='X'){
            element.style.color='red';// if the inner text is X change the color to red
        }
        else{
            element.style.color='blue';// if the inner text is O change the color to blue
        }
    });
}
