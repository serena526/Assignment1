
const startPage = document.getElementById('startPage');
const gamePage = document.getElementById('gamePage');
const ballContainer = document.getElementById('ballContainer');
const resetButton = document.getElementById('resetButton');
const startButton = document.getElementById('startButton');
const attemptsLeftText = document.getElementById('attemptsLeft');
const gameOverModal = new bootstrap.Modal(document.getElementById('gameOverModal'));
const confirmResetButton = document.getElementById('confirmResetButton');


let correctNumber;
let attempts = 0;
const maxAttempts = 4;
//start the function
startButton.addEventListener('click', function() {
  startPage.style.display = 'none'; 
  gamePage.style.display = 'block'; 
  generateBalls(); 
});

// Function to generate balls
function generateBalls() {
  ballContainer.innerHTML = ''; // Clear existing balls
  attempts = 0; 
  attemptsLeftText.textContent = maxAttempts; // Reset attempts left display
  correctNumber = Math.floor(Math.random() * 40) + 1; 
  console.log("Correct number is:", correctNumber); 
  for (let i = 1; i <= 40; i++) {
    const ball = document.createElement('div');
    ball.classList.add('ball');
    ball.textContent = i;
    ball.addEventListener('click', function() {
      if (attempts < maxAttempts) {
        checkGuess(i, ball);
      }
    });
    ballContainer.appendChild(ball);
  }
}

// Function to check the guess
function checkGuess(number, ball) {
  if (attempts < maxAttempts) {
    attempts++;
    attemptsLeftText.textContent = maxAttempts - attempts; // Update remaining attempts

    if (number === correctNumber) {
      ball.classList.add('correct');
      alert("🎉 Congratulations! You guessed the correct number.");
      disableAllBalls(); // Disable further guesses if correct guess is made
    } else {
      ball.classList.add('incorrect');
    }

    if (attempts === maxAttempts && number !== correctNumber) {
      // Show the game over modal
      gameOverModal.show();
      disableAllBalls();
    }
  }
}

// Function to disable all balls 
function disableAllBalls() {
  const balls = document.querySelectorAll('.ball');
  balls.forEach(ball => {
    ball.style.pointerEvents = 'none'; 
  });
}

// Reset game from modal
confirmResetButton.addEventListener('click', function() {
  gameOverModal.hide();
  generateBalls();
});

// Reset game
resetButton.addEventListener('click', generateBalls);


