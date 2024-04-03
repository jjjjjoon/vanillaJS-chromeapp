"use strict";
(function() {
    
    window.addEventListener("load", init); 

    function init() {
        document.getElementById("colorify").addEventListener("click", ChangeBackGroundColor);
    }

    function ChangeBackGroundColor() {              
        let backgroundColor = changeColor();
        document.body.style.backgroundColor = backgroundColor;
        document.getElementById("qwer").innerText = "Your Color is " + backgroundColor + '!';
    }

    function changeColor() {
        let backgroundColor = '#' + Math.floor(Math.random()* (16**6 - 1)).toString(16);
        return backgroundColor;
    }
})();
