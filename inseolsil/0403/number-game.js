"use strict";
(function() {
  let randomNumber;

  let guesses;
  let lastResult;
  let lowOrHi;
  let guessSubmit;
  let guessField;

  let guessCount = 1;
  let resetButton;


  // This is the function that is called when the page is done
  // loading into view
  window.addEventListener("load", init);

  function init() {
    randomNumber = Math.floor(Math.random()*100) + 1;
    console.log(randomNumber);

    guesses = qs('.guesses');
    lastResult = qs('.lastResult');
    lowOrHi = qs('.lowOrHi');
    guessSubmit = qs('.guessSubmit');
    guessField = qs('.guessField');

    guessSubmit.addEventListener('click', checkGuess);
  }

  function checkGuess() {
    const userGuess = Number(guessField.value);

    if(guessCount === 1) {
      guesses.textContent = 'Previous guesses: ';
    }

    guesses.textContent += userGuess + ' ';

    if(userGuess === randomNumber) {
      lastResult.textContent = 'Congratulations! You got it right!';
      lastResult.style.backgroundColor = 'green';
      lowOrHi.textContent = '';
      setGameOver();
    } else if(guessCount === 10) {
      lastResult.textContent = '!!!GAME OVER!!!';
      setGameOver();
    } else {
      lastResult.textContent = 'Wrong!';
      lastResult.style.backgroundColor = 'red';
      if(userGuess < randomNumber) {
        lowOrHi.textContent = 'Last guess was too low!';
      } else if(userGuess > randomNumber) {
        lowOrHi.textContent = 'Last guess was too high!';
      }
    }

    guessCount++;
    guessField.value = '';
    guessField.focus();
  }

  function setGameOver() {
    guessField.disabled = true;
    guessSubmit.disabled = true;
    resetButton = document.createElement('button');
    resetButton.textContent = 'Start new game';
    document.body.appendChild(resetButton);
    resetButton.addEventListener('click', resetGame);
  }

  function resetGame() {
    guessCount = 1;

    const resetParas = qsa('.resultParas p');
    for (const resetPara of resetParas) {
      resetPara.textContent = '';
    }
    resetButton.parentNode.removeChild(resetButton);

    guessField.disabled = false;
    guessSubmit.disabled = false;
    guessField.value = '';
    guessField.focus();

    lastResult.style.backgroundColor = 'white';

    randomNumber = Math.floor(Math.random()*100) + 1;
    console.log(randomNumber);
  }

  /* --- HELPER FUNCTIONS, Alias--- */
  /**
   * Returns the element that has the ID attribute with the specified value.
   * @param {string} name - element ID.
   * @returns {object} - DOM object associated with id.
   */
  function id(name) {
    return document.getElementById(name);
  }

  /**
   * Returns the first element that matches the given CSS selector.
   * @param {string} query - CSS query selector.
   * @returns {object} - The first DOM object matching the query.
   */
  function qs(query) {
    return document.querySelector(query);
  }

  /**
   * Returns an array of elements matching the given query.
   * @param {string} query - CSS query selector.
   * @returns {array} - Array of DOM objects matching the given query.
   */
  function qsa(query) {
    return document.querySelectorAll(query);
  }
})();