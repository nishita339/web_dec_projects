let playerScore = 0;
let computerScore = 0;
const bgMusic = document.getElementById('bg-music');
const winnerMusic = document.getElementById('winner-music');

function playGame(userChoice) {
    const choices = ['rock', 'paper', 'scissors'];
    const computerChoice = choices[Math.floor(Math.random() * choices.length)];
    let result = '';
    
    if (userChoice === computerChoice) {
        result = "It's a tie!";
    } else if (
        (userChoice === 'rock' && computerChoice === 'scissors') ||
        (userChoice === 'paper' && computerChoice === 'rock') ||
        (userChoice === 'scissors' && computerChoice === 'paper')
    ) {
        result = "You Win!";
        playerScore++;
        winnerMusic.play();
    } else {
        result = "You Lose!";
        computerScore++;
    }
    
    document.getElementById('result').innerText = `Computer chose ${computerChoice}. ${result}`;
    document.getElementById('playerScore').innerText = playerScore;
    document.getElementById('computerScore').innerText = computerScore;
}

function resetGame() {
    playerScore = 0;
    computerScore = 0;
    document.getElementById('playerScore').innerText = playerScore;
    document.getElementById('computerScore').innerText = computerScore;
    document.getElementById('result').innerText = '';
    winnerMusic.pause();
    winnerMusic.currentTime = 0;
}