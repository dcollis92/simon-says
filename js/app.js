/*-------------------------- Constants --------------------------*/
player = {

}

buttons = ['red', 'green', 'yellow', 'blue']


/*-------------------------- Variables --------------------------*/
let level, isWinner, 



/*------------------ Cached Element References ------------------*/
sequenceArray = document.querySelectorAll('.board-btn')
gameStatus = document.querySelector('#message')
const resetDiv = document.getElementById('reset-div')
const resetBtn = document.querySelector('#reset-button')


/*----------------------- Event Listeners -----------------------*/
sequenceArray.forEach(button => button.addEventListener('click', handleClick)) 

resetBtn.addEventListener('click', init)


/*-------------------------- Functions --------------------------*/
init()

function init() {


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

