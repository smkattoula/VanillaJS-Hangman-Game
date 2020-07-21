const wordElement = document.getElementById("word");
const wrongLettersElement = document.getElementById("wrong-letters");
const playAgainBtn = document.getElementById("play-button");
const popup = document.getElementById("popup-container");
const notification = document.getElementById("notification-container");
const finalMessage = document.getElementById("final-message");

const figureParts = document.querySelectorAll(".figure-part");

const words = [
  "apple",
  "coconut",
  "computer",
  "iphone",
  "adventure",
  "beauty",
  "journey",
  "daredevil",
  "wizard",
  "mindfulness",
  "music",
];

let selectedWord = words[Math.floor(Math.random() * words.length)];

const correctLetters = [];
const wrongLetters = [];

// Create a function that displays the hidden word
function displayWord() {
  wordElement.innerHTML = `${selectedWord
    .split("")
    .map(
      (letter) =>
        `<span class="letter">${
          correctLetters.includes(letter) ? letter : ""
        }</span>`
    )
    .join("")}`;

  const innerWord = wordElement.innerText.replace(/\n/g, "");

  if (innerWord === selectedWord) {
    finalMessage.innerText = "Congratulations! You won! 😃";
    popup.style.display = "flex";
  }
}

// Create a function that updates the wrong letters
function updateWrongLettersElement() {
  // Displays wrong letters
  wrongLettersElement.innerHTML = `${
    wrongLetters.length > 0 ? "<p>Wrong</p>" : ""
  }
    ${wrongLetters.map((letter) => `<span>${letter}</span>`)}`;

  // Displays parts
  figureParts.forEach((part, index) => {
    const errors = wrongLetters.length;

    if (index < errors) {
      part.style.display = "block";
    } else {
      part.style.display = "none";
    }
  });

  // Check if the user lost the game
  if (wrongLetters.length === figureParts.length) {
    finalMessage.innerText = "Sorry, you lose 😣";
    popup.style.display = "flex";
  }
}

// Create a function that shows a notification
function showNotification() {
  notification.classList.add("show");

  setTimeout(() => {
    notification.classList.remove("show");
  }, 2000);
}

// Keydown event listener
window.addEventListener("keydown", (e) => {
  if (e.keyCode >= 65 && e.keyCode <= 90) {
    const letter = e.key;

    if (selectedWord.includes(letter)) {
      if (!correctLetters.includes(letter)) {
        correctLetters.push(letter);

        displayWord();
      } else {
        showNotification();
      }
    } else {
      if (!wrongLetters.includes(letter)) {
        wrongLetters.push(letter);

        updateWrongLettersElement();
      } else {
        showNotification();
      }
    }
  }
});

// Event listener to restart game and play again
playAgainBtn.addEventListener("click", () => {
  //Empty the arrays
  correctLetters.splice(0);
  wrongLetters.splice(0);

  selectedWord = words[Math.floor(Math.random() * words.length)];

  displayWord();

  updateWrongLettersElement();

  popup.style.display = "none";
});
displayWord();
