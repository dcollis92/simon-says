/*-------------------------- Constants --------------------------*/
const player = {
  // PC 0.1
  name: "Human",
  score: 0,
};

const buttons = ["green", "red", "yellow", "blue"]; // PC 0.2

/*-------------------------- Variables --------------------------*/
let level,
  // PC 1.2
  isWinner,
  //  PC 1.3
  turn,
  /*------------------ Cached Element References ------------------*/
  sequenceArray = document.querySelectorAll(".board-btn"); // PC 2.1
gameStatus = document.querySelector("#message"); // PC 2.2
startButton = document.querySelector("#start-level"); // PC 3.2
const resetDiv = document.getElementById("reset-div");
const resetBtn = document.querySelector("#reset-button");

/*----------------------- Event Listeners -----------------------*/
startButton.addEventListener("click", compInput);
sequenceArray.forEach((button) =>
  button.addEventListener("click", playerInput)
);
resetBtn.addEventListener("click", init);

/*-------------------------- Functions --------------------------*/
init(); // PC 3.1

function init() {
  gameSequence = []; // PC 3.2
  playerSequence = []; // PC 3.2
  level = 1; // PC 3.2
  turn = -1;
  isWinner = null; // PC 3.2
  message = `Ready ${player.name}?`;
  display = "Play";
  resetDiv.classList.add("hidden");
  render();
}

function render() {
  gameStatus.textContent = message;
  startButton.textContent = display;
  display = level;
}

function compRender() {
  buttons.
  setTimeout(() => {buttons}, 1000);
  render()
}

function playerRender() {

  render()
}

function genSequence() {
  gameSequence.push(buttons[Math.floor(Math.random() * buttons.length)]);
  console.log("gs", gameSequence)
}


function compInput(event) {
  if (turn !== -1) {
    return;
  }
  genSequence()
  // why isn't this working?
  compRender();
  render();
  turn = 1;
  console.log("gs", gameSequence);
}
console.log("gs", gameSequence);

function playerInput(event) {
  if (turn !== 1) {
    return;
  } // don't run if not the Player
  const idx = event.target.id;
  playerSequence.push(buttons[idx]);
  if (buttons[idx] !== gameSequence[playerSequence.length - 1]) {
    // The player's last guess is incorrrect, and they've lost
    // we can return out of this function.
  } else {
    // The player's last guess is correct, and they can continue
    // (you may not even need this)
  }
  console.log(gameSequence)
  console.log(playerSequence)
  if (playerSequence.length === gameSequence.length) {
    // If we've reached this point then the player's last guess is correct
    // AND we've reached the end of the current sequence, time for the computer
    // to show what's next
    level += 1;
    display = level;
    console.log("ps", playerSequence);
    playerSequence = [];
    turn = -1; // back to computers turn
    playerRender()
    compInput(); // invoke computers turn
  }
  render()
}

function getWinner() {
  if (gameSequence === playerSequence) {
    message = "Nice! Keep Going!";
    // game continues
  } else if (gameSequence === playerSequence && level > 15) {
    isWinner = true;
    message = `${player.name} Won! Play Again?`;
    confetti.start(2000);
  } else if (gameSequence !== playerSequence) {
    message = "D'oh! Try Again?";
  }
  resetDiv.classList.remove("hidden"); // PC 7.3
  render();
}
