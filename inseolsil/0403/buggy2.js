(function() {
    window.addEventListener("load", init);
  
    function init() {
      let myBtn = document.getElementById("#my-btn");
      myBtn.addEventListener("klick", gogogo);
    }
  
    function gogogo() {
      alert("Yay, it works!");
    }
  })();