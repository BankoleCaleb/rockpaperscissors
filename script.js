const intro = () => {
  let name = prompt("Input player's name")
  let currentName = document.querySelector(".name").innerText
  if(name == null ){
    document.querySelector(".name").innerText = currentName;
  } else if(name == "") {
    document.querySelector(".name").innerText = currentName
  } else {
    document.querySelector(".name").innerText = name
  } 
  alert("if you are on Firefox, don't check the don't allow site to prompt you again' button; it breaks the site.")
  alert("Click the 'Change player's name' button to input your name.")
  alert("Click R on your keyboard to choose 'Rock'. Make sure your caps lock is off")
  alert("Click P on your keyboard to choose 'Paper'. Make sure your caps lock is off")
  alert("Click S on your keyboard to choose 'Scissors'. Make sure your caps lock is off")
  alert("Click the spacebar on your keyboard to end the game")
  alert("If you are on an android phone, change the orientation of your screen to landscape in order to enjoy the game.")
}
setTimeout(intro, 5000)
let rpsButtons = document.querySelectorAll(".rpsButton");
let playerScore = document.getElementById("player-score")
let hand = document.getElementById("hands")
let result = document.getElementById("result")
let endButton = document.getElementById("endGameButton")
let scores = document.getElementsByClassName("score")
let changeName = document.querySelector(".player-name")
changeName.onclick = () => {
  let name = prompt("Input your name")
  let currentName = document.querySelector(".name").innerText
  if(name == null ){
    document.querySelector(".name").innerText = currentName;
  } else if(name == "") {
    document.querySelector(".name").innerText = currentName
  } else {
    document.querySelector(".name").innerText = name
  } 
}

function getComputerChoice() {
  let randomNumber = Math.floor(Math.random() * 3)
  let computerChoice = rpsButtons[randomNumber].value
  return computerChoice;
}

function getResult(playerChoice, computerChoice) {

  let score
  
  if (playerChoice == computerChoice) {
    score = 0
  } else if (playerChoice === "Paper" && computerChoice === "Rock") {
    score = 1
  } else if (playerChoice === "Scissors" && computerChoice === "Paper") {
    score = 1
  } else if (playerChoice === "Rock" && computerChoice === "Scissors") {
    score = 1
  } else {
    score = -1
  }

  if(score === 1) {
    scores[0].innerText++
  } else if(score === -1) {
    scores[1].innerText++
  } else if(score === 0) {
    scores[1].innerText++
    scores[0].innerText++
  }
  return score
}

function showResult(score, playerChoice, computerChoice) {
  switch(score) {
    case 1:
      result.innerText = "You won!"
      break;
    case -1:
      result.innerText = "You lose!"
      break;
    case 0:
      result.innerText = "It's a draw!"
  }

  const checkWinner = (score) => {
    switch(score) {
      case 1:
        return `${playerChoice} beats ${computerChoice}`
      case -1:
        return `${computerChoice} beats ${playerChoice}`
      case 0:
        return `${playerChoice} is equal with ${computerChoice}`
    }
  }

  hand.innerText = `You chose ${playerChoice} while computer chose ${computerChoice}`

  playerScore.innerText =  `${checkWinner(score)}`
}

function onClickRPS(playerChoice) {
  let computerChoice = getComputerChoice();
  let score = getResult(playerChoice, computerChoice);
  showResult(score, playerChoice, computerChoice);
}


function playGame() {
  rpsButtons.forEach(btn => {
    btn.onclick = () => onClickRPS(btn.value);
  })
  endButton.onclick = endGame;
}

function endGame() {
  if(Number(scores[0].innerHTML) > Number(scores[1].innerHTML)) {
    winner.innerText = `🎌You won against computer 🎉🥳`
  } else if(scores[0].innerText == scores[1].innerText){
    winner.innerText = "It's a draw🎌"
  } else {
    winner.innerText = `You lost to the computer.☹`
  }
  let finalScore = winner.nextElementSibling
  finalScore.innerText = `Final score is ${scores[0].innerText} - ${scores[1].innerText}`
  
  announce.classList.add("finally")
  playerScore.innerText = "";
  hand.innerText = "";
  result.innerText = "";
  for(a of scores) {
    a.innerText = 0
  } 
}
let announce = document.querySelector(".final")
let close = announce.querySelector("button")
let winner = announce.querySelector("p")
close.onclick = () => {
  announce.classList.remove("finally")
}


playGame()
document.onkeypress = (e) => {
  if(e.which == 114) {
      onClickRPS("Rock")
    } else if(e.which == 112) {
      onClickRPS("Paper")
    } else if(e.which == 115) {
      onClickRPS("Scissors")
    } else if(e.which == 32) {
    endGame();
  }

}