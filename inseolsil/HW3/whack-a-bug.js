"use strict";
(function() {

  let gameTimerId = null;
  let spawnTimerId = null;
  const GAME_LENGTH = 60;
  const BUG_IMG = "bug.png";
  const BUG_WHACKED = "bugcut.png";
  const BUG_CONTAINER_WIDTH = 1200;
  const BUG_CONTAINER_HEIGHT = 600;
  const BUG_SIZE = 75;

  window.addEventListener("load", init);

  function init() {
    id("start").addEventListener("click", startGame);
  }

  function startGame() {
    stopGame();
    id("game").classList.remove("hidden");

    let spawnRate = parseInt(id("spawn-rate").value);
    let spawnCount = parseInt(id("spawn-count").value);
    let despawnRate = parseInt(id("despawn-rate").value);

    if (!spawnRate || !spawnCount || !despawnRate) {
        id("error").textContent = "Some parameters are not filled in!";
        id("game").classList.add("hidden");
        return;
    } else if (spawnRate <= 0 || spawnCount <= 0 || despawnRate <= 0) {
        id("error").textContent = "Some parameters are 0 or less!";
        id("game").classList.add("hidden");
        return;
    }

    id("score").textContent = "0";
    id("timer").textContent = "60";

    clearInterval(gameTimerId);     
    gameTimerId = setInterval(decrementGameTimer, 1000); 

    clearInterval(spawnTimerId);    
    spawnTimerId = setInterval(spawnBugs, spawnRate); 
}

  function decrementGameTimer() {
    let timerElement = id("timer");
    let timeRemaining = parseInt(timerElement.textContent);

    if (timeRemaining > 0) {
      timerElement.textContent = timeRemaining - 1;
    } 
    else {
      stopGame();
    }
  }

  function spawnBugs() {
    const container = id("bug-container");
    const spawnCount = parseInt(id("spawn-count").value);
    const despawnRate = parseInt(id("despawn-rate").value);

    for (let i = 0; i < spawnCount; i++) {
      const bug = document.createElement("img");
      bug.src = BUG_IMG;
      bug.className = "bug";
      bug.style.position = 'absolute';
      bug.addEventListener("click", whackBug);

      const x = Math.random() * (BUG_CONTAINER_WIDTH - BUG_SIZE);
      const y = Math.random() * (BUG_CONTAINER_HEIGHT - BUG_SIZE);
      bug.style.left = x + "px";
      bug.style.top = y + "px";

      container.appendChild(bug);

      setTimeout(() => {
        if (bug.parentNode) {
          bug.parentNode.removeChild(bug);
        }
      }, despawnRate);
    }
  }

  function stopGame() {
    clearInterval(gameTimerId); 
    clearInterval(spawnTimerId);
    id("game").classList.add("hidden"); 
    id("bug-container").innerHTML = "";
  }

  function whackBug() {
    if (!this.classList.contains("whacked")) {
      this.classList.add("whacked");
      this.src = BUG_WHACKED;
      let score = id("score");

      score.textContent = parseInt(score.textContent) + 1;
    }
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

})();