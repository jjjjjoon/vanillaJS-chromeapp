(function() {
    "use strict";
  
    window.addEventListener("load", init);
  
    function init() {
      console.log("Window loaded!")
  
      let encryptBt = document.getElementById("encrypt-it");
      encryptBt.addEventListener("click", handleClick);
  
      let resetBt = document.getElementById("reset");
      resetBt.addEventListener("click", reset);
  
      let allCapsCheckbox = document.getElementById("all-caps");
      allCapsCheckbox.addEventListener("change", doCaps);
  
      let radioBt = document.querySelectorAll('input[name="text-size"]');
      radioBt.forEach(button => {
      button.addEventListener("change", changeFontSize);
    });
    }
  
    function shiftCipher(text) {
      text = text.toLowerCase();
      let result = "";
      for (let i = 0; i < text.length; i++) {
        if (text[i] < 'a' || text[i] > 'z') {
          result += text[i];
        } else if (text[i] == 'z') {
          result += 'a';
        } else {
          let letter = text.charCodeAt(i);
          let resultLetter = String.fromCharCode(letter + 1);
          result += resultLetter;
        }
      }
      return result;
    }

    function handleClick() {
        console.log("Button clicked!");
    
        let cipherType = document.getElementById("cipher-type").value;
        if (cipherType === "shift") {
            let inputText = document.getElementById("input-text").value;
            let outputText = shiftCipher(inputText);
            document.getElementById("result").textContent = outputText;
          }
        else if (cipherType === "random") {
            let inputText = document.getElementById("input-text").value;
            let outputText = generateCipher(inputText);
            document.getElementById("result").textContent = outputText;
        }
      }
  
    function reset() {
      document.getElementById("input-text").value = '';
      document.getElementById("result").textContent = '';
    }
    
    function doCaps() {
      let resultElement = document.getElementById("result");
      let AllCaps = document.getElementById("all-caps").checked;
      if (AllCaps) {
        resultElement.classList.add("uppercase");
      } else {
        resultElement.classList.remove("uppercase");
      }
    }
  
    function generateCipher(text) {
        let alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
        let cipher = [];
        let alphabetLength = alphabet.length;
        for (let i = 0; i < alphabetLength; i++) {
          let randomIndex = Math.floor(Math.random() * alphabet.length);
          cipher.push(alphabet.splice(randomIndex, 1)[0]);
        }
        let result = "";
        for (let i = 0; i < text.length; i++) {
          if (text[i] >= 'a' && text[i] <= 'z') {
            let letterCode = text.charCodeAt(i) - 'a'.charCodeAt(0);
            result += cipher[letterCode];
          } else {
            result += text[i];
          }
        }
        return result;
      }

    function changeFontSize() {
      let selectedSize = document.querySelector('input[name="text-size"]:checked').value;
      let resultElement = document.getElementById("result");
    
      resultElement.classList.remove("smallFont", "bigFont"); 
      if (selectedSize === "12pt") {
        resultElement.classList.add("smallFont");
      } else if (selectedSize === "24pt") {
        resultElement.classList.add("bigFont");
      }
    }
  
   
    
  })();