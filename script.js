let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matchedCards = 0; // Counter for matched pairs
const totalPairs = 4; // Total pairs to match (adjust if you add more pairs)

window.onload = setupAudio;

function setupAudio() {
  const audio = document.getElementById("Brick"); // Get the audio element by ID
  audio.play(); // Play the audio
}

function handleCardClick(cardId, imgSrc) {
  if (lockBoard) return; // Prevent multiple clicks while the board is locked
  const card = document.getElementById(cardId);

  if (card.classList.contains("flipped")) return; // Prevent clicking on already flipped cards

  card.src = imgSrc; // Flip the card
  card.classList.add("flipped"); // Track flipped cards

  if (!firstCard) {
    firstCard = { id: cardId, src: imgSrc };
    playSound();
  } else {
    secondCard = { id: cardId, src: imgSrc };
    lockBoard = true; // Lock the board to prevent further clicks during the comparison

    if (firstCard.src === secondCard.src) {
      matchedCards++; // Increment matched pairs counter
      checkForWin(); // Check if the player has won
      firstCard = null;
      secondCard = null;
      lockBoard = false; // Reset for the next round
    } else {
      playSound3();
      setTimeout(() => {
        document.getElementById(firstCard.id).src = "buttons/lightgray.png"; // Reset cards
        document.getElementById(secondCard.id).src = "buttons/lightgray.png";
        document.getElementById(firstCard.id).classList.remove("flipped");
        document.getElementById(secondCard.id).classList.remove("flipped");
        firstCard = null;
        secondCard = null;
        lockBoard = false; // Reset game state
      }, 1000);
    }
  }
}

// Function to check if all cards are matched
function checkForWin() {
  if (matchedCards === totalPairs) {
    showAccessGranted(); // Show the "Access Granted" image
  }
}

// Function to show the "Access Granted" image
function showAccessGranted() {
  const accessGrantedElement = document.getElementById("access-granted");
  accessGrantedElement.classList.remove("hidden"); // Remove the 'hidden' class to display the image
  playSound4();
}

// Timer functionality
let timerValue = 40; // Countdown starting value
let timerId; // Timer identifier

// Function to update the timer display
function updateTimer() {
  const timerElement = document.getElementById("timer");
  timerElement.textContent = timerValue; // Update the timer display

  if (timerValue <= 0) {
    clearInterval(timerId); // Stop the timer
    alert("TOO LATE! THE MONSTER GOT IN THE ROOM");
    location.reload(); // Refresh the page to restart the game
  } else {
    timerValue--; // Decrease the timer value by 1 every second
  }
}

// Get the image, message box, and close button
const image = document.querySelector(".twoImagediv img");
const messageBox = document.getElementById("messageBox");
const closeBtn = document.getElementById("closeBtn");

// When the image is clicked, show the message box
image.addEventListener("click", () => {
  messageBox.style.display = "block"; // Show the message box
});

// When the close button is clicked, hide the message box
closeBtn.addEventListener("click", () => {
  messageBox.style.display = "none"; // Hide the message box
});

// Start the timer when the game begins
function startTimer() {
  timerId = setInterval(updateTimer, 1000); // Call updateTimer() every second
}

function playSound() {
  document.getElementById("bricker").play();
}
function playSound2() {
  document.getElementById("Ping").play();
}
function playSound3() {
  document.getElementById("xPingy").play();
}
function playSound4() {
  document.getElementById("sxPingy").play();
}
// Initialize the game by starting the timer
startTimer();

// Set up click handlers for each card
document.getElementById("green1").onclick = () =>
  handleCardClick("green1", "buttons/lime.png");
document.getElementById("green2").onclick = () =>
  handleCardClick("green2", "buttons/lime.png");
document.getElementById("orange1").onclick = () =>
  handleCardClick("orange1", "buttons/orange.png");
document.getElementById("orange2").onclick = () =>
  handleCardClick("orange2", "buttons/orange.png");
document.getElementById("red1").onclick = () =>
  handleCardClick("red1", "buttons/brown.png");
document.getElementById("red2").onclick = () =>
  handleCardClick("red2", "buttons/brown.png");
document.getElementById("blue1").onclick = () =>
  handleCardClick("blue1", "buttons/blue (2).png");
document.getElementById("blue2").onclick = () =>
  handleCardClick("blue2", "buttons/blue (2).png");
