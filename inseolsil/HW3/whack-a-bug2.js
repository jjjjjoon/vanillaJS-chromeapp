/*
 * Whack a Bug Part 2
 * Allows the user to start games of Whack a Bug, and handles whacking bugs.
 * Also handles timing of the game and incrementing score
 */

"use strict";
(function() {

  /*
   * Do not change these module-global variables/constants,
   * at least, not until the challenge problems.
   * Try to find ways to solve the problems without global variables.
   */
  let gameTimerId = null;
  let spawnTimerId = null;
  const GAME_LENGTH = 60;
  const BUG_IMG = "images/bug.png";
  const BUG_WHACKED = "images/bug-whacked.png";
  const BUG_CONTAINER_WIDTH = 1200;
  const BUG_CONTAINER_HEIGHT = 600;
  const BUG_SIZE = 75;

  window.addEventListener("load", init);

  /**
   * Sets up the event listener for the start button.
   */
  function init() {
    id("start").addEventListener("click", startGame);
  }

  /**
   * Reveals and clears the game view, resets the score, and begins the game by setting up timers.
   * Previously running games are stopped.
   */
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

    id("score").textContent = "0";  // 점수 초기화
    id("timer").textContent = "60"; // 타이머 설정

    clearInterval(gameTimerId);     
    gameTimerId = setInterval(decrementGameTimer, 1000); 

    clearInterval(spawnTimerId);    
    spawnTimerId = setInterval(spawnBugs, spawnRate); 
}

  

  /**
   * Decrements the game timer by 1, and ends the game if it reaches 0.
   */
  function decrementGameTimer() {
    // STEP 3: Decrement the game timer and stop the game if needed.
    let timerElement = id("timer");
    let timeRemaining = parseInt(timerElement.textContent);

    if (timeRemaining > 0) {
      timerElement.textContent = timeRemaining - 1;
    } 
    else {
      stopGame(); // 타이머가 0에 도달하면 게임 종료
    }
  }

  /**
   * Spawns bugs according to the count and despawn parameters set by the user.
   * Is called periodically during a game.
   */
  function spawnBugs() {
    /*
     * STEP 4: Spawn the necessary number of bugs. Their position should be random within the
     * bug container, they should be whacked when clicked, and they should despawn after the
     * amount of time specified by the form elements.
     */
    const container = id("bug-container");
    const spawnCount = parseInt(id("spawn-count").value);
    const despawnRate = parseInt(id("despawn-rate").value);

    for (let i = 0; i < spawnCount; i++) {
      const bug = document.createElement("img");
      bug.src = BUG_IMG;
      bug.className = "bug";
      bug.style.position = 'absolute';
      bug.addEventListener("click", whackBug);

      // 랜덤 위치 설정
      const x = Math.random() * (BUG_CONTAINER_WIDTH - BUG_SIZE);
      const y = Math.random() * (BUG_CONTAINER_HEIGHT - BUG_SIZE);
      bug.style.left = x + "px";
      bug.style.top = y + "px";

      // 벌레를 컨테이너에 추가
      container.appendChild(bug);

      // 자동 제거 타이머 설정
      setTimeout(() => {
        if (bug.parentNode) {
          bug.parentNode.removeChild(bug);
        }
      }, despawnRate);
    }
  }

  /**
   * Stops the current game, removing bugs from the screen and stopping the timer.
   */
  function stopGame() {
    // STEP 3: Clear the board and clear game timers that are running.
    clearInterval(gameTimerId); // 게임 타이머 인터벌 정지
    clearInterval(spawnTimerId); // 벌레 생성 인터벌 정지
    id("game").classList.add("hidden"); // 게임 보드 숨기기
    id("bug-container").innerHTML = ""; // 벌레 제거
  }

  /**
   * whacks the clicked bug and increments the score. The bug cannot be whacked again afterwards.
   */
  function whackBug() {
    if (!this.classList.contains("whacked")) {
      this.classList.add("whacked");
      this.src = BUG_WHACKED;
      let score = id("score");

      // Need to convert the string content into a number.
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