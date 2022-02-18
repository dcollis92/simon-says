/*-------------------------- Constants --------------------------*/
const player = {
  name: "Human",
};

const buttons = ["green", "red", "yellow", "blue"];

const winSeq = [
  "green", "red", "blue", "yellow",
  "green", "red", "blue", "yellow",
  "green", "red", "blue", "yellow",
  "green", "red", "blue", "yellow",
  "green", "red", "blue", "yellow",
  "green", "red", "blue", "yellow",
  "green", "red", "blue", "yellow",
  "green", "red", "blue", "yellow",
  "green", "red", "blue", "yellow",
  "green", "red", "blue", "yellow",
  "green", "red", "blue", "yellow",
];

/*-------------------------- Variables --------------------------*/
let level,
    isWinner,
    turn,
    gameSequence,
    playerSequence,

/*------------------ Cached Element References ------------------*/
sequenceArray = document.querySelectorAll(".btns");
gameStatus = document.querySelector("#message");
startRestartBn = document.querySelector("#start-restart");

/*----------------------- Event Listeners -----------------------*/
sequenceArray.forEach((button) =>
  button.addEventListener("click", playerInput));

/*-------------------------- Functions --------------------------*/

init();

function init() {
  startRestartBn.addEventListener("click", compInput);
  gameSequence = [];
  playerSequence = [];
  level = 1;
  turn = -1;
  isWinner = null;
  message = `Ready ${player.name}?`;
  display = "PLAY";
  render();
}

function render() {
  setTimeout(() => {
    gameStatus.textContent = message;
    startRestartBn.textContent = display;
    display = level;
  }, 450);
}

function compRender() {
  gameSequence.forEach((color, seqIdx) => {
    setTimeout(() => {
      btnRender(color, gameSequence, seqIdx);
    }, 500 * (seqIdx + 1));
  });
}

function playerRender(color) {
  btnRender(color, playerSequence, playerSequence.length - 1);
}

function btnRender(color, seq, seqIdx) {
  const audioElement = new Audio(`./assets/audio/${color}.mp3`);
  audioElement.volume = 0.7;
  audioElement.play();
  lightUp(seq, seqIdx);
}

function genSequence() {
  gameSequence.push(buttons[Math.floor(Math.random() * buttons.length)]);
}

function lightUp(seq, idx) {
  if (seq[idx] === "green") {
    sequenceArray[0].style.backgroundColor = "#CCFF66";
  } else if (seq[idx] === "red") {
    sequenceArray[1].style.backgroundColor = "#F05365";
  } else if (seq[idx] === "yellow") {
    sequenceArray[2].style.backgroundColor = "#F1E8B8";
  } else if (seq[idx] === "blue") {
    sequenceArray[3].style.backgroundColor = "#8390FA";
  }
  setTimeout(() => {
    if (seq[idx] === "green") {
      sequenceArray[0].style.backgroundColor = "darkgreen";
    } else if (seq[idx] === "red") {
      sequenceArray[1].style.backgroundColor = "darkred";
    } else if (seq[idx] === "yellow") {
      sequenceArray[2].style.backgroundColor = "goldenrod";
    } else if (seq[idx] === "blue") {
      sequenceArray[3].style.backgroundColor = "darkblue";
    }
  }, 400);
}

function compInput() {
  if (turn !== -1 || level > 5) {
    return;
  }
  genSequence();
  if (level === 1) {
    compRender();
    startRestartBn.removeEventListener("click", compInput);
  } else {
    setTimeout(() => {
      compRender();
    }, 1000);
  }
  render();
  turn = 1;
}

function playerInput(event) {
  const idx = event.target.id;
  if (turn !== 1 || idx === "btn-style") {
    return;
  }
  playerSequence.push(buttons[idx]);
  playerRender(buttons[idx]);
  if (buttons[idx] !== gameSequence[playerSequence.length - 1]) {
    message = "D'oh! Try Again?";
    turn = 0;
    isWinner = false;
    startRestartBn.addEventListener("click", init);
    display = "REPLAY";
    render();
    return;
  } else {
    message = `Level ${level}! Nice! Keep Going!`;
  }
  if (playerSequence.length === gameSequence.length) {
    level += 1;
    display = level;
    playerSequence = [];
    turn = -1;
    compInput();
  }
  getWinner();
}

function getWinner() {
  if (level > 5) {
    display = "REPLAY";
    startRestartBn.addEventListener("click", init);
    isWinner = true;
    message = `${player.name} Won! Play Again?`;
    confetti.start(11000);
    playWinSong();
    render();
  }
}

function playWinSong() {
  const audioElement = new Audio(`./assets/audio/winSong.mp3`);
  audioElement.volume = 0.5;
  audioElement.play();
  winSeq.forEach((color, seqIdx) => {
    setTimeout(() => {
      winRender(color, winSeq, seqIdx);
    }, 300 * (seqIdx + 1));
  });
}

function winRender(color, seq, seqIdx) {
  lightUp(seq, seqIdx);
}
