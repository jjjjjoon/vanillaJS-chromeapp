"use strict";
(function() {
  // TODO: introduce any module global variable(s) necessary here
  
  window.addEventListener('load', init);

  /**
   * initiates page upon load
   */
  function init() {
    // part A
    // TODO: when the page loads, apply a style to the #cookie-header <h2> that sets the text color to hex value #f7f16d 
    id("cookie-header").style.color = "#f7f16d"; // Big Bird Yellow: Set the color of cookie-header

    // part B
    countCookies(); // Count Chocula: Count and display the number of cookies

    // part C
    eatTheCookies(); // Cookie Monster Hungry: Remove a cookie every 2 seconds
  }

  // part B
  // TODO: when the page loads, you find all of the cookie list items in the cookie-jar, count them, 
  // and set the text of the #cookie-count <p> to be: < # of cookies>! 
  // There are <# cookies> in cookie(s) in the cookie jar! (Replace '<# of cookies>' with the correct number).
  function countCookies() {
    let cookies = qsa("#cookie-jar .cookie");
    let cookieCount = cookies.length;
    id("cookie-count").textContent = `${cookieCount}! There are ${cookieCount} cookie(s) in the cookie jar!`;
  }

  // part C
  // TODO: remove the last cookie in Whitaker's cookie jar every 2 seconds.
  function eatTheCookies() {
    setInterval(() => {
      let cookies = qsa("#cookie-jar .cookie");
      if (cookies.length > 0) {
        cookies[cookies.length - 1].remove(); // Remove the last cookie from the jar
        countCookies(); // Update the cookie count after removal
      }
    }, 2000);
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
   * Returns an array of elements matching the given query.
   * @param {string} query - CSS query selector.
   * @returns {array} - Array of DOM objects matching the given query.
   */
  function qsa(query) {
    return document.querySelectorAll(query);
  }

})();