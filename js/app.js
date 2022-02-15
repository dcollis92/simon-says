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
// btnAudio = document.querySelector("#btn-style");

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
  setTimeout(() => {
    gameStatus.textContent = message;
    startButton.textContent = display;
    display = level;
  }, 450)
}

function compRender() {
  console.log(gameSequence, "game");
  gameSequence.forEach((item, idx) => {
    setTimeout(() => {
      console.log();
      const audioElement = new Audio(`./assets/audio/${item}.mp3`);
      audioElement.play();
      lightUp(gameSequence, idx);
    }, 700 * (idx + 1));
  });
  render();
}

function playerRender(idx, color) {
  if (idx !== "btn-style") {
    const audioElement = new Audio(`./assets/audio/${color}.mp3`);
    audioElement.volume = 0.5;
    audioElement.play();
  }
  lightUp(playerSequence, playerSequence.length - 1);
}

function genSequence() {
  gameSequence.push(buttons[Math.floor(Math.random() * buttons.length)]);
  console.log("gs", gameSequence);
}

function lightUp(seq, idx) {
  if (seq[idx] === "green") {
    document.getElementById("0").style.backgroundColor = "#CCFF66";
  } else if (seq[idx] === "red") {
    document.getElementById("1").style.backgroundColor = "#F05365";
  } else if (seq[idx] === "yellow") {
    document.getElementById("2").style.backgroundColor = "#F1E8B8";
  } else if (seq[idx] === "blue") {
    document.getElementById("3").style.backgroundColor = "#D6EFFF";
  }
  setTimeout(() => {
    if (seq[idx] === "green") {
      document.getElementById("0").style.backgroundColor = "darkgreen";
    } else if (seq[idx] === "red") {
      document.getElementById("1").style.backgroundColor = "darkred";
    } else if (seq[idx] === "yellow") {
      document.getElementById("2").style.backgroundColor = "goldenrod";
    } else if (seq[idx] === "blue") {
      document.getElementById("3").style.backgroundColor = "darkblue";
    }
  }, 500);
}

function compInput(event) {
  if (turn !== -1) {
    return;
  }
  genSequence();
  if (level === 1) {
    compRender();
  } else {
    setTimeout(() => {
      compRender();
    }, 1000);
  }
  render();
  turn = 1;
  console.log(level);
}

function playerInput(event) {
  if (turn !== 1) {
    return;
  } // don't run if not the Player
  const idx = event.target.id;
  playerSequence.push(buttons[idx]);
  playerRender(idx, buttons[idx]);
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
    turn = -1;
    compInput();
  }
  getWinner();
  render();
}

function getWinner() {
  if (playerSequence.length === gameSequence.length - 1) {
    message = "Nice! Keep Going!";
  } else if (playerSequence.length === gameSequence.length && level > 15) {
    isWinner = true;
    score = level;
    message = `${player.name} Won! You beat all ${score} levels! Play Again?`;
    confetti.start(2000);
  } else if (playerSequence.length !== gameSequence.length - 1) {
    message = "D'oh! Try Again?";
  }
  resetDiv.classList.remove("hidden");
  render();
}
