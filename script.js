'use strict';

// Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

const rulesModal = document.querySelector('.rules-modal');
const overlay = document.querySelector('.overlay');
const btnOpenRules = document.querySelector('.btn--rules');
const btnCloseRules = document.querySelector('.close-rules');

// Starting conditions
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

let scores, currentScore, activePlayer, playing;

const init = function () {
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;

    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;

    diceEl.classList.add('hidden');
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
}

init();

const switchPlayer = function () {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
}

// Rolling dice functionality
btnRoll.addEventListener('click', function () {
    if (playing) {
        // 1. Generating a random dice roll
        const dice = Math.trunc(Math.random() * 6) + 1;
        console.log(dice);

        // 2. Display dice
        diceEl.classList.remove('hidden');
        diceEl.src = `Dice images/dice-${dice}.png`;

        // 3.Check for rolled 1
        if (dice !== 1) {
            // Add dice to current score
            currentScore = currentScore + dice;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        }
        else {
            // Switch to next player
            switchPlayer();
        }
    }

});

btnHold.addEventListener('click', function () {
    if (playing) {
        // 1. Add current score to active player's score
        scores[activePlayer] = scores[activePlayer] + currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

        // 2. Check if player's score is >= 100
        if (scores[activePlayer] >= 100) {
            // Finish the game
            playing = false;
            diceEl.classList.add('hidden');

            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
        }
        else {
            // Switch to the next player
            switchPlayer();
        }
    }

});

btnNew.addEventListener('click', init);

// Rules button
const openRules = function () {
    rulesModal.classList.remove('hidden');
    overlay.classList.remove('hidden');
};

const closeRules = function () {
    rulesModal.classList.add('hidden');
    overlay.classList.add('hidden');
};


btnOpenRules.addEventListener('click', openRules);
btnCloseRules.addEventListener('click', closeRules);

overlay.addEventListener('click', closeRules);

document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !rulesModal.classList.contains('hidden')) {
        closeRules();
    }
});
