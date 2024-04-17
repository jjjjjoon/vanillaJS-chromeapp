"use strict";
(function() {
  
  window.addEventListener('load', init);

  function init() {
    id("cookie-header").style.color = "#f7f16d"; 


    countCookies(); 
    eatTheCookies(); 
  }

  function countCookies() {
    let cookies = qsa("#cookie-jar .cookie");
    let cookieCount = cookies.length;
    id("cookie-count").textContent = `${cookieCount}! There are ${cookieCount} cookie(s) in the cookie jar!`;
  }

  function eatTheCookies() {
    setInterval(() => {
      let cookies = qsa("#cookie-jar .cookie");
      if (cookies.length > 0) {
        cookies[cookies.length - 1].remove();
        countCookies(); 
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