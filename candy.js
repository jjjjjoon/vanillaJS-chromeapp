"use strict";
(function() {

  window.addEventListener("load", init);

  function init() {
    id("add").addEventListener("click", addIcon);
    id("replace-first").addEventListener("click", replaceFirstIcon)
    id("remove-last").addEventListener("click", removeLastIcon);
    id("remove-all").addEventListener("click", removeAllIcons);
    id("prevent").addEventListener("click", preventRemoval);
  }

  // "more candy crush"
  function addIcon() {
    let candy = gen("img");
    candy.src = "images/candy.png";
    candy.alt = "candy";
    id("icons").appendChild(candy);
  }

  // TODO: complete the code below.
  // "replace first candy crush"
//   function replaceFirstIcon() {
//     if () {
      
      
      
      
//     }
//   }

  // "remove last candy crush"
  function removeLastIcon() {
    if (id("icons").lastElementChild !== null) {
      id("icons").lastElementChild.remove();
    }
  }

  // "remove all candy crush"
  function removeAllIcons() {
    // let candies = document.querySelectorAll("img");
    // for (let i = 0; i < candies.length; i++) {
    //   candies[i].remove();
    // }
    id("icons").innerHTML = "";
  }

  // "prevent candy crush removal"
  function preventRemoval() {
    id("remove-last").removeEventListener("click", removeLastIcon);
    id("remove-all").removeEventListener("click", removeAllIcons);
  }

  function id(id) {
    return document.getElementById(id);
  }

  function gen(tagName) {
    return document.createElement(tagName);
  }
})();