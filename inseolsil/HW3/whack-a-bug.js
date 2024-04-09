"use strict";
(function() {

  window.addEventListener("load", init);

  function init() {
    // STEP 1: Hook up the event listeners.
    id("start").addEventListener("click", startGame);
    let bugs = qsa("#bug-container img");
    for (let bug of bugs) {
      bug.addEventListener("click", whackBug);
    }
  }

  /**
   * Reveals the game view, hides some of the bugs, and starts the game.
   * On repeat games, the score is reset and the bugs are unwhacked.
   */
  function startGame() {
    // alert("start game");
    // STEP 2: Reveal the game view when the game starts.
    id("game").classList.remove("hidden");

    // STEP 3: Make it so each bug has a 25% chance of being hidden on the page.
    id("score").textContent = '0';

    let bugs = qsa("#bug-container img");
    
    for (let bug of bugs) {
        bug.src = "bug.png"; 
        bug.classList.remove("whacked");
        bug.classList.add("unwhacked");

        bug.removeEventListener("click", whackBug);
        bug.addEventListener("click", whackBug);

        if (Math.random() < 0.25) {
          bug.classList.add("hidden");
        } 
        else {
          bug.classList.remove("hidden");
        }
    }
  }

  /**
   * Whacks the clicked bug and increments the score. 
   * The bug cannot be whacked again afterwards.
   */
  function whackBug() {
    // alert("whackBug");
    // STEP 4: When a bug is clicked, change it to the whacked image and increment the score.
    if (!this.classList.contains("whacked")) {
        this.src = "bugcut.png";
    }

    let totalScore = id("score");
    let currentScore = parseInt(totalScore.textContent);
    totalScore.textContent = currentScore + 1;
    
    this.classList.remove("unwhacked");
    this.classList.add("whacked");
  
    // STEP 5: Make it so the bug cannot be whacked again after being whacked once.
    this.removeEventListener("click", whackBug);
  }

  /* --- HELPER FUNCTIONS --- */

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