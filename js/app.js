/*-------------------------- Constants --------------------------*/
const player = { // PC 0.1
  name: 'Ready Player One',
  score: 0
}

const buttons = ['red', 'green', 'yellow', 'blue'] // PC 0.2


/*-------------------------- Variables --------------------------*/
let level, isWinner, 
// PC 1.2     1.3


/*------------------ Cached Element References ------------------*/
sequenceArray = document.querySelectorAll('.board-btn') // PC 2.1
gameStatus = document.querySelector('#message') // PC 2.2
startButton = document.querySelector('#start-level') // PC 3.2
const resetDiv = document.getElementById('reset-div')
const resetBtn = document.querySelector('#reset-button')


/*----------------------- Event Listeners -----------------------*/
startButton.addEventListener('click', handleClick)
sequenceArray.forEach(button => button.addEventListener('click', handleClick)) 
resetBtn.addEventListener('click', init)



/*-------------------------- Functions --------------------------*/
init() // PC 3.1

function init() { 
  gameSequence = [] // PC 3.2
  playerSequence = [] // PC 3.2
  level = 0 // PC 3.2
  isWinner = null // PC 3.2
  message = "Ready?"
  display = 'Play'
  // insert timer function
  resetDiv.classList.add("hidden")
  render()
}

function render() {
  gameStatus.textContent = message
  startButton.textContent = display

}

function genSequence() {
  let gameSequence = buttons[Math.floor(Math.random()* buttons.length-1)]
  
}

function tick() {
  seconds++
}

function handleClick(event) {

  level += 1
  display = level
  getWinner() // 6.1
  render ()
}
console.log(gameSequence)

function getWinner() {
  if (gameSequence === playerSequence) {
    message = 'Nice! Keep Going!'
    // game continues
  } else if (gameSequence === playerSequence && level > 15) {
    isWinner = true
    message = 'You Won! Play Again?'
    confetti.start(2000)
  } else if (gameSequence !== playerSequence) {
    message = "D'oh! Try Again?"
  }

  resetDiv.classList.remove("hidden") // PC 7.3
  render ()
}

