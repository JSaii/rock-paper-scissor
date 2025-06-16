function getComputerChoice(){
    const randn = Math.random()
    console.log(randn)
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