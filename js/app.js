/*-------------------------- Constants --------------------------*/
const player = {
  name: "Human",
  score: 0,
};

const buttons = ["green", "red", "yellow", "blue"];

/*-------------------------- Variables --------------------------*/
let level, // PC 1.2
  isWinner, //  PC 1.3
  turn,
  gameSequence,
  playerSequence,
  /*------------------ Cached Element References ------------------*/
  sequenceArray = document.querySelectorAll(".board-btn"); // PC 2.1
gameStatus = document.querySelector("#message"); // PC 2.2
startButton = document.querySelector("#start-level"); // PC 3.2
resetDiv = document.getElementById("reset-div");
resetBtn = document.querySelector("#reset-button");
btnAudio = document.querySelector("#btn-style");

/*----------------------- Event Listeners -----------------------*/
startButton.addEventListener("click", compInput);
sequenceArray.forEach((button) =>
  button.addEventListener("click", playerInput));
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
  console.log(gameSequence, "game");
  gameSequence.forEach((item, idx) => {
    setTimeout(() => {
      console.log();
      const audioElement = new Audio(`./assets/audio/${item}.mp3`);
      audioElement.play();
      lightUp();
    }, 1000 * (idx + 1));
  });
  render();
}

function playerRender() {

  render();
}

// create separate render functions for the comp and player
// each render should add a class assigning color+note
// then a setTimeout to run through the whole array, checking 1 by one what each item is, delaying by a second each.
// then it should remove the class to turn off audio+color

function genSequence() {
  gameSequence.push(buttons[Math.floor
  (Math.random() * buttons.length)]);
  console.log("gs", gameSequence);
}

function lightUp() {
  if (sequenceArray[index] === 0) {
    document.getElementById('0').style.backgroundColor = #CCFF66;
  } else if (buttons[index] === 1) {
    document.getElementById('1').style.backgroundColor = #F05365;
  } else if (buttons[index] === 2) {
    document.getElementById('2').style.backgroundColor = #F1E8B8;
  } else if (buttons[index] === 3) {
    document.getElementById('3').style.backgroundColor = #D6EFFF;
  }
}

function compInput(event) {
  if (turn !== -1) {
    return;
  }
  genSequence();
  compRender();
  render();
  turn = 1;
}

function playerInput(event) {
  if (turn !== 1) {
    return;
  } // don't run if not the Player
  if (event.target.id !== "btn-style") {
    const audioElement = new Audio
    (`./assets/audio/${event.target.id}.mp3`);
    audioElement.volume = 0.5;
    audioElement.play();
  }
  const idx = event.target.id;
  playerSequence.push(buttons[idx]);
  if (buttons[idx] !== gameSequence[playerSequence.length - 1]) {
    message = "D'oh! Try Again?";
    turn = 0;
    render();
    return;
  } else {
    message = "Nice! Keep Going!";
    render();
  }
  console.log("gs", gameSequence);
  console.log("ps", playerSequence);
  if (playerSequence.length === gameSequence.length) {
    level += 1;
    display = level;
    playerSequence = [];
    turn = -1; // back to computers turn
    playerRender();
    compInput(); // invoke computers turn
  }
  getWinner();
  render();
}

function getWinner() {
  if (playerSequence.length === gameSequence.length - 1) {
    message = "Nice! Keep Going!";
    // game continues
  } else if (playerSequence.length === gameSequence.length && level > 15) {
    isWinner = true;
    score = level;
    message = `${player.name} Won! You beat all ${score} levels! Play Again?`;
    confetti.start(2000);
  } else if (playerSequence.length !== gameSequence.length - 1) {
    message = "D'oh! Try Again?";
  }
  resetDiv.classList.remove("hidden"); // PC 7.3
  render();
}
