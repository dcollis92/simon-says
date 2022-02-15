/*-------------------------- Constants --------------------------*/
const player = {
  name: "Human",
  score: 0,
};

const buttons = ["green", "red", "yellow", "blue"];

const winSong = [
"green", "red", "blue", "yellow",
"blue", "red", "green", "red",
"blue", "yellow", "green", "red", 
"blue", "yellow",
"blue", "red", "green", "red", "blue", "yellow",
]

/*-------------------------- Variables --------------------------*/
let level,
    isWinner, 
    turn,
    gameSequence,
    playerSequence,

/*------------------ Cached Element References ------------------*/
sequenceArray = document.querySelectorAll(".board-btn");
gameStatus = document.querySelector("#message"); 
startButton = document.querySelector("#start-level"); 
resetDiv = document.getElementById("reset-div");
resetBtn = document.querySelector("#reset-button");

/*----------------------- Event Listeners -----------------------*/
startButton.addEventListener("click", compInput);
sequenceArray.forEach((button) =>
  button.addEventListener("click", playerInput));
resetBtn.addEventListener("click", init);

/*-------------------------- Functions --------------------------*/
init();

function init() {
  gameSequence = [];
  playerSequence = [];
  level = 1; 
  turn = -1;
  isWinner = null
  message = `Ready ${player.name}?`;
  display = "Play";
  resetBtn.classList.add("hidden");
  render();
}

function render() {
  setTimeout(() => {
    gameStatus.textContent = message;
    startButton.textContent = display;
    display = level;
  }, 450)
}

function genSequence() {
  gameSequence.push(buttons[Math.floor
  (Math.random() * buttons.length)]);
  // console.log("gs", gameSequence);
}

function lightUp(seq, idx, playRate) {
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
  }, playRate);
}

// (isWinner === true ? 200 : 400)

function compInput(event) {
  if (turn !== -1 || isWinner) {
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
}

function compRender() {
  // console.log(gameSequence, "game");
  gameSequence.forEach((color, seqIdx) => {
    setTimeout(() => {
      btnRender(color, gameSequence, seqIdx)
    },500 * (seqIdx + 1));
  });
  console.log("gs", gameSequence);
}

function btnRender(color, seq, seqIdx) {
  const audioElement = new Audio(`./assets/audio/${color}.mp3`);
      audioElement.volume = 1;
      audioElement.play();
      lightUp(seq, seqIdx, isWinner ? 1000 : 400); 
}

function playerRender(color) {
  btnRender(color, playerSequence, playerSequence.length -1)
}

function playerInput(event) {
  const idx = event.target.id;
  if (turn !== 1 || idx === "btn-style") {
    return;
  }
  playerSequence.push(buttons[idx]);
  playerRender(buttons[idx]);
  if (buttons[idx] !== gameSequence[playerSequence.length -1]) {
    message = "D'oh! Try Again?";
    turn = 0;
    isWinner = false
    resetBtn.classList.remove("hidden")
    render();
    return;
  } else {
    message = `Level ${level}! Nice! Keep Going!`;
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
}

function getWinner() {
  if (level > 5) {
    score = level -1;
    display = 'WINNER'
    isWinner = true
    message = `${player.name} Won! You beat all ${score} levels! Play Again?`;
    confetti.start(2000);
    // playWinSong()
    resetDiv.classList.remove("hidden");
    return;
  } 
}

function playWinSong() {
  winSong.forEach((color, seqIdx) => {
    setTimeout(() => {
      btnRender(color, seqIdx)
    },1000 * (seqIdx + 1));
  });

}
