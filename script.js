let playerScore = 0;
let computerScore = 0;
let roundNumber = 1;
const mapChoice = {
    'rock': 0,
    'paper': 1,
    'scissors': 2
}
const judgeMatrix = [
    [0, -1, 1],
    [1, 0, -1],
    [-1, 1, 0]
]

function getComputerChoice(){
    const randn = Math.random();
    if(randn <= 0.3){
        return "rock";
    }else if(0.3 < randn && randn <= 0.6){
        return "paper";
    }else if(0.6 < randn && randn <= 1){
        return "scissors";
    }else{
        return "Undefined value";
    }
}

function getPlayerChoice(){
    while(true){
        let choice = prompt(
            `ROUND ${roundNumber}` + `\nScores: You - ${playerScore} CPU - ${computerScore}`+ "\n\nEnter your choice: ", 
            "rock"
        );

        if(choice === null){
            break;
        }

        choice = choice.toLowerCase();

        if(choice === 'rock' || choice ==='paper' || choice === 'scissors') {
            return choice;
        } else {
            const retry = confirm("IT'S EITHER ROCK OR PAPER OR SCISSORS HAVE YOU NEVER PLAYED BEFORE?!");
            if(!retry) {
                break;
            }
        }
    }
    return null;
}

function playRound(){
    let playerChoice = getPlayerChoice();
    if(playerChoice === null) {
        return null;
    }
    const computerChoice = getComputerChoice();
    const mappedPlayerChoice = mapChoice[playerChoice];
    const mappedComputerChoice = mapChoice[computerChoice];

    const gameStatusMsg = `You-> ${playerChoice} X ${computerChoice} <-CPU`;

    const judge = judgeMatrix[mappedPlayerChoice][mappedComputerChoice]

    if(judge === 0){
        alert(gameStatusMsg + "\n\nTie")
    }else if(judge === 1){
        playerScore++;
        alert(gameStatusMsg + "\n\nYou win !")
    }else if(judge === -1){
        computerScore++;
        alert(gameStatusMsg + "\n\nYou lose !")
    }else{
        alert("Undefined value")
    }
    return 1;
}

alert("You will play five rounds of rock paper scissors against the computer !")

for(let i = 0;i < 5;i++){
    const round = playRound();
    if(round === null) {
        break;
    }
    roundNumber++;
}

alert(`Final score \n\nYou: ${playerScore}, CPU: ${computerScore}`)
alert('Refresh the page to play again.')