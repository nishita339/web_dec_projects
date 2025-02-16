// Selecting essential HTML elements
const board = document.getElementById("board");
const turnIndicator = document.getElementById("turnIndicator");
const result = document.getElementById("result");
const resetButton = document.getElementById("reset");
const clickSound = document.getElementById("clickSound");
const winSound = document.getElementById("winSound");

let cells = []; // Array to store cell elements
let currentPlayer = "X"; // Tracks the current player
let gameBoard = ["", "", "", "", "", "", "", "", ""]; // Represents the game board as an array

// Winning combinations for Tic Tac Toe
const winningCombinations = [
    [0, 1, 2], // Top row
    [3, 4, 5], // Middle row
    [6, 7, 8], // Bottom row
    [0, 3, 6], // Left column
    [1, 4, 7], // Middle column
    [2, 5, 8], // Right column
    [0, 4, 8], // Diagonal (Top-left to Bottom-right)
    [2, 4, 6]  // Diagonal (Top-right to Bottom-left)
];

// Function to create the game board
function createBoard() {
    board.innerHTML = ""; // Clear previous board
    gameBoard.forEach((_, index) => {
        const cell = document.createElement("div"); // Create a new cell
        cell.classList.add("cell"); // Add CSS class for styling
        cell.dataset.index = index; // Store index as a data attribute
        cell.addEventListener("click", handleCellClick); // Add click event listener
        board.appendChild(cell); // Append cell to the board
        cells.push(cell); // Store cell in array
    });
}

// Function to handle cell clicks
function handleCellClick(event) {
    const index = event.target.dataset.index; // Get index of clicked cell
    if (gameBoard[index] !== "" || checkWinner()) return; // Ignore if cell is filled or game is over

    gameBoard[index] = currentPlayer; // Update game board
    event.target.textContent = currentPlayer; // Display player's symbol (X or O)
    clickSound.play(); // Play click sound

    if (checkWinner()) { // Check if there's a winner
        result.textContent = `${currentPlayer} Wins!`; // Display winner
        highlightWinner(); // Highlight winning cells
        if (winSound) {
            winSound.currentTime = 0; // Reset sound to the beginning
            winSound.play().catch(error => console.log("Error playing win sound:", error)); // Play win sound
        }
        return;
    }

    if (!gameBoard.includes("")) { // Check for a draw (no empty cells left)
        result.textContent = "It's a Draw!";
        return;
    }

    // Switch to the next player
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    turnIndicator.textContent = `${currentPlayer}'s Turn`; // Update turn indicator
}

// Function to check if a player has won
function checkWinner() {
    return winningCombinations.some(combination => {
        const [a, b, c] = combination;
        return gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c];
    });
}

// Function to highlight the winning combination
function highlightWinner() {
    winningCombinations.forEach(combination => {
        const [a, b, c] = combination;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            cells[a].classList.add("winner"); // Highlight first cell
            cells[b].classList.add("winner"); // Highlight second cell
            cells[c].classList.add("winner"); // Highlight third cell
        }
    });
}

// Event listener for the reset button
resetButton.addEventListener("click", () => {
    gameBoard = ["", "", "", "", "", "", "", "", ""]; // Reset game board
    cells.forEach(cell => {
        cell.textContent = ""; // Clear cell content
        cell.classList.remove("winner"); // Remove highlight
    });
    result.textContent = ""; // Clear result message
    currentPlayer = "X"; // Reset starting player
    turnIndicator.textContent = "X's Turn"; // Reset turn indicator
});

// Initialize the game board
createBoard();