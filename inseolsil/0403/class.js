"use strict";
(function() {

  window.addEventListener("load", init);

  function init() {
    id("add").addEventListener("click", addClass);
    id("add-another").addEventListener("click", addAnotherClass);
    id("remove").addEventListener("click", removeClass);
    id("contain").addEventListener("click", containClass);
    id("toggle").addEventListener("click", toggleClass);
    id("toogle-hide").addEventListener("click", toggleHideClass);
  }

  function addClass() {
    // TODO: add "mystery" class to p element with id=text

    // id("text").classList.add("mystery");
    // console.log(id("text").outerHTML);

  }

  function addAnotherClass() {
    // TODO: add "surprise" class to p element with id=text

    // id("text").classList.add("surprise");
    // console.log(id("text").outerHTML);
  }

  function removeClass() {
    // TODO: remove "mystery" class from p element with id=text

    // id("text").classList.remove("mystery");
    // console.log(id("text").outerHTML);
  }

  function containClass() {
    // TODO: 
    // check if p element with id=text has "mystery" class
    // if so, print "Yes" in p element with id=answer
    // otherwise, print "Nope :(" in p element with id=answer

    // let result = id("text").classList.contains("mystery");
    // if (result) {
    //   id("answer").textContent = "Yes!";
    // } else {
    //   id("answer").textContent = "Nope :(";
    // }
  }

  function toggleClass() {
    // TODO: 
    // if p element with id=text has "mystery" class, remove the class
    // elseif the element does not have "mystery" class, add the class
    // use "toggle" method. Do not use "add" or "remove" method.

    // id("text").classList.toggle("mystery");
    // console.log(id("text").outerHTML);
  }

  function toggleHideClass() {
    // TODO: 
    // if p element with id=text has "hiden" class, remove the class
    // elseif the element does not have "hiden" class, add the class
    // use "toggle" method. Do not use "add" or "remove" method.

    
    
  }


  /* -------------------- Helper Function -------------------- */
  /**
   * id helper function
   * @param {String} idName name of id
   * @return {Object} element with id name
   */
  function id(idName) {
      return document.getElementById(idName);
  }
})();