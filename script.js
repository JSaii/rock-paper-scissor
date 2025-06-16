function getComputerChoice(){
    const randn = Math.random();
    if(randn <= 0.3){
        return "rock";
    }else if(0.3 < randn && randn <= 0.6){
        return "paper";
    }else if(0.6 < randn && randn <= 1){
        return "scissor";
    }else{
        return "Undefined value";
    }
}

function getHumanChoice(){
    let choice = prompt("Enter your choice: ", "rock");
    choice = choice.toLowerCase();
    if(!(choice === 'rock' || choice ==='paper' || choice === 'scissor')){
        if(confirm("IT'S EITHER ROCK OR PAPER OR SCISSOR HAVE YOU NEVER PLAYED BEFORE?!")){
            choice = getHumanChoice();
        } else return -1;
    }
    return choice;
}