'use strict';

// Declaring saving useful elements in variables
// elements on the page
let score0El = document.querySelector('#score--0');
let score1El = document.querySelector('#score--1');

//setting scores to 0
score0El.textContent = 0;
score1El.textContent = 0;

//useful variables with element representatives in page
let score0 = 0;
let score1 = 0;

//to determine playing state, so we can handle the activity of the buttons

let currentScore0 = document.querySelector('#current--0');
let currentScore1 = document.querySelector('#current--1');
//hiding Dice, when game begins
let diceEl = document.querySelector('.dice');
diceEl.classList.add('hidden');

let newGame = document.querySelector('.btn--new');
let rollDice = document.querySelector('.btn--roll');
let hold = document.querySelector('.btn--hold');
let currentScore = 0;
//to hold the total scores, const so that the complete array cannot to modified but the elements in it can be.
const finalScore = [0, 0];
//to hold the status of the current player
let activePlayer = 0;

//

//swtiching player function:

function switchPlayer() {
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.toggle('player--active');
  currentScore = 0;
  document.querySelector(`#current--${activePlayer}`).textContent =
    currentScore;
  activePlayer = activePlayer === 0 ? 1 : 0;
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.toggle('player--active');
}

//funtion to reset everything.

function end() {
  //turning off dice
  document.querySelector('.dice');
  diceEl.classList.add('hidden');

  //setting the scores to null
  currentScore = 0;
  score0 = 0;
  score1 = 0;
  score0El.textContent = score0;
  score1El.textContent = score1;
  finalScore[0] = score0;
  finalScore[1] = score1;
  currentScore0.textContent = score0;
  currentScore1.textContent = score1;

  //restarting the active player
  activePlayer = 0;
  //return active player
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.toggle('player--active');
  document
    .querySelector(`.player--${activePlayer + 1}`)
    .classList.toggle('player--active');
}

//defining usability of buttons

let playingState = true;

rollDice.addEventListener('click', function () {
  if (playingState) {
    diceEl.classList.remove('hidden');

    let diceValue = Math.trunc(Math.random() * 6) + 1;
    diceEl.src = `dice-${diceValue}.png`;
    if (diceValue !== 1) {
      //add to current score
      currentScore += diceValue;
      document.querySelector(`#current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //switch to the next player
      switchPlayer();
    }
  }
});
hold.addEventListener('click', function () {
  if (playingState) {
    finalScore[activePlayer] += currentScore;
    document.querySelector(`#score--${activePlayer}`).textContent =
      finalScore[activePlayer];
    if (finalScore[activePlayer] >= 100) {
      playingState = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active ');
    } else {
      switchPlayer();
    }
  }
});
newGame.addEventListener('click', end);
//this event is active at every moment.
