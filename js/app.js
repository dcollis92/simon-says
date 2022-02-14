/*-------------------------- Constants --------------------------*/
const player = {
  name: "Human",
  score = level -1
};

const buttons = ["green", "red", "yellow", "blue"];

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
resetDiv = document.getElementById("reset-div");
resetBtn = document.querySelector("#reset-button");
btnAudio = document.querySelector(".btn-style")

/*----------------------- Event Listeners -----------------------*/
startButton.addEventListener("click", compInput);
sequenceArray.forEach((button) =>
  button.addEventListener("click", playerInput));
resetBtn.addEventListener("click", init);

sequenceArray.addEventListener("click", evt => {
  if (evt.target.id !== "not-fox"){
    const audioElement = new Audio(`../audio/${evt.target.id}.mp3`)
    audioElement.volume = .01
    audioElement.play()
  }
})

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
  sequenceArray.classList
  setTimeout(() => {}, 1000);
  render()
}

function playerRender() {
  
  render()
}

// create separate render functions for the comp and player
// each render should add a class assigning color+note
// then a setTimeout to run through the whole array, checking 1 by one what each item is, delaying by a second each.
// then it should remove the class to turn off audio+color

function genSequence() {
  gameSequence.push(buttons[Math.floor(Math.random() * buttons.length)]);
  console.log("gs", gameSequence)
}

function compInput(event) {
  if (turn !== -1) {
    return;
  }
  genSequence()
  compRender();
  render();
  turn = 1;
}

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
  }
  console.log('gs', gameSequence)
  console.log('ps', playerSequence)
  if (playerSequence.length === gameSequence.length) {
    level += 1;
    display = level;
    playerSequence = [];
    turn = -1; // back to computers turn
    playerRender()
    compInput(); // invoke computers turn
  }
  getWinner()
  render()
}

function getWinner() {
  if (playerSequence.length === (gameSequence.length -1)) {
    message = "Nice! Keep Going!";
    // game continues
  } else if (playerSequence.length === gameSequence.length && level > 15) {
    isWinner = true;
    message = `${player.name} Won! You beat all ${score} levels! Play Again?`;
    confetti.start(2000);
  } else if (playerSequence.length !== (gameSequence.length -1)) {
    message = "D'oh! Try Again?";
  }
  resetDiv.classList.remove("hidden"); // PC 7.3
  render();
}