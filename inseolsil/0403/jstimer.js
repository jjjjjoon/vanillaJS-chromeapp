/**
 * stopwatch timer starter
 */

'use strict';
(function() {

  // TODO: introduce any module global variables necessary here
  let stopwatchTime = 0;
  let timerId = null;
  let timerId2 = null;

  window.addEventListener('load', init);

  /**
   * initiates page upon load
   */
  function init() {
      id("setTimeout_btn").addEventListener("click", delayedMessage);
      id("setInterval_btn").addEventListener("click", repeatedMessage);
      id("toggle-btn").addEventListener("click", toggleMessageInterval);
      id("multiply-btn").addEventListener("click", delayedMultiply);
  }

  // setTimeout
  function delayedMessage() {
    id("output-text").textContent = "Wait for it...";
    setTimeout(sayHelloDelayed, 3000);
  }

  function sayHelloDelayed() { // called when the timer goes off
    id("output-text").textContent = "Hello! ";
  }

  // setInterval
  function repeatedMessage() {
    timerId = setInterval(sayHelloRepeat, 1000);
  }

  function sayHelloRepeat() {
    id("output-text2").textContent += "Hello! ";
  }

  // toggle
  function toggleMessageInterval() {
    if (timerId2 === null) {
      timerId2 = setInterval(sayHelloToggle, 1000);
    } else {
      clearInterval(timerId2);
      timerId2 = null; // 2. Why is this line important?
      // 3. What happens if you swap the two lines above?
    }
  }

  function sayHelloToggle() {
    id("output-text3").textContent += "Hello! ";
  }


  // Delayed multiply
  function delayedMultiply() {
    // 6 and 7 are passed to multiply when timer goes off
    setTimeout(multiply, 2000, 6, 7);
  }

  function multiply(a, b) {
    id("output-text4").textContent = "Multiplication of 6 and 7 is "+ (a*b);
  }

  function id(name) {
    return document.getElementById(name);
  }

})();