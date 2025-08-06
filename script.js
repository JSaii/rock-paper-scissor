const ROCK_THRESHOLD = 0.3;
const SCISSORS_THRESHOLD = 0.6;
let currentPlayerSelection = null
let stateObject = {
    "playerChoice": null,
    "cpuChoice": null,
    "roundNumber": 1,
    "playerScore": 0,
    "cpuScore": 0,
    "tieCounter": 0,
    "roundWinner": null
}
const INITIAL_VALUES = {
    "playerChoice": null,
    "cpuChoice": null,
    "roundNumber": 1,
    "playerScore": 0,
    "cpuScore": 0,
    "tieCounter": 0,
    "roundWinner": null
}
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

function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function stateManager(state){
    if(state === "initial"){
        stateObject = {...INITIAL_VALUES};
        goButton.disabled = false;
        choiceButtons.forEach(button => {
            button.disabled = false
            button.classList.remove("selected")
            button.classList.remove("winner")
            button.classList.remove("loser")
        });
        document.getElementById("player-score").textContent = stateObject.playerScore;
        document.getElementById("cpu-score").textContent = stateObject.cpuScore;
    } else if (state === "inter-round"){
        goButton.disabled = true;
        choiceButtons.forEach(button => button.disabled = true);
        if(stateObject.roundWinner === "player"){
            const selected = document.querySelector("button.selected");
            selected.classList.add("winner");
            selected.classList.remove("selected");
        } else if(stateObject.roundWinner === "cpu"){
            const selected = document.querySelector("button.selected");
            selected.classList.add("loser");
            selected.classList.remove("selected");
        }
        document.getElementById("player-score").textContent = stateObject.playerScore;
        document.getElementById("cpu-score").textContent = stateObject.cpuScore;
        await wait(2000);
        stateManager("initial-round")
    } else if (state === "initial-round"){
        goButton.disabled = false;
        choiceButtons.forEach(button => {
            button.disabled = false
            button.classList.remove("selected")
            button.classList.remove("winner")
            button.classList.remove("loser")
        });

        choiceButtonsCpu.forEach(button => {
            button.disabled = false
            button.classList.remove("selected")
            button.classList.remove("winner")
            button.classList.remove("loser")
        });
        stateObject.roundWinner = null;
        stateObject.playerChoice = null;
    }
}

const choiceButtons = document.querySelectorAll(".choice-button:not(.cpu)");
const choiceButtonsCpu = document.querySelectorAll(".choice-button.cpu");
const resetButton = document.getElementById("reset-bt")

resetButton.addEventListener("click", () => {
    stateManager("initial");
})

choiceButtons.forEach((button) => {
    button.addEventListener("click", () => {
        choiceButtons.forEach(button => button.classList.remove("selected"));
        document.getElementById(button.id).classList.add("selected");
        stateObject.playerChoice = button.id;
        console.log(stateObject.playerChoice);
    });
});

const goButton = document.getElementById("go-bt")
goButton.addEventListener("click", () => {
    playRound();
})

function getComputerChoice(){
    const randn = Math.random();
    
    if(randn <= ROCK_THRESHOLD) {
        document.getElementById(`cpu-rock-bt`).classList.add("selected");
        return "rock";
    } else if(randn <= SCISSORS_THRESHOLD) {
        document.getElementById(`cpu-paper-bt`).classList.add("selected");
        return "paper";
    } else {
        document.getElementById(`cpu-scissors-bt`).classList.add("selected");
        return "scissors";
    }

}

function playRound(){

    let playerChoice = stateObject.playerChoice;

    if(playerChoice === null) {
        alert("Please choose first!")
        return null;
    }

    const computerChoice = getComputerChoice();
    const mappedPlayerChoice = mapChoice[playerChoice];
    const mappedComputerChoice = mapChoice[computerChoice];
    const judge = judgeMatrix[mappedPlayerChoice][mappedComputerChoice]

    if(judge === 0) {
        stateObject.tieCounter++;
        stateManager("inter-round")
    } else if(judge === 1) {
        stateObject.playerScore++;
        stateObject.roundWinner = "player";
        stateManager("inter-round")
    } else if(judge === -1) {
        stateObject.cpuScore++;
        stateObject.roundWinner = "cpu";
        stateManager("inter-round")
    } else {
        alert("Undefined value")
    }

    return 1;
}