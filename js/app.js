/*-------------------------- Constants --------------------------*/
player = { // PC 0.1
  name: 'Ready Player One',
  score: 0
}

buttons = ['red', 'green', 'yellow', 'blue'] // PC 0.2


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
sequenceArray.forEach(button => button.addEventListener('click', handleClick)) 

resetBtn.addEventListener('click', init)


/*-------------------------- Functions --------------------------*/
init()

function init() {
  let gameSequence = [''] // 3.2
  let playerSequence = [''] // 3.2
  level = 1 // PC 3.2
  isWinner = null // PC 3.2


  render()
}

function render() {


}

function handleClick() {


  render ()
}

function getWinner() {


  render ()
}

