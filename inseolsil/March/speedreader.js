"use strict";
(function() {
    document.addEventListener("DOMContentLoaded", init); 

    let intID;
    let curSpd = 171;

    function init() {
        let startBtn = document.getElementById('startBt');
        let stopBtn = document.getElementById('stopBt');

        stopBtn.classList.add('active');

        startBtn.addEventListener('click', function() {
            startReading();
            this.classList.add('active');
            stopBtn.classList.remove('active');
        });

        stopBtn.addEventListener('click', function() {
            stopReading();
            this.classList.add('active'); 
            startBtn.classList.remove('active');
        });

        let sizeBtn = document.querySelectorAll('input[name="sizeBt"]');
        sizeBtn.forEach(button => {
            button.addEventListener('change', changeFontSize);
        });

        document.getElementById('speedBt').addEventListener('change', changeSpeed);

        setFontSize('Medium');
    }

    function startReading() {
        clearInterval(intID);
    
        let text = document.getElementById('inputbox').value;
        let result = text.split(/[ \t\n]+/);
        let words = [];
    
        for (let word of result) {
            let cleanedWord = word.replace(/[,.!?;:]+$/, '');
            words.push(cleanedWord);
    
            if (cleanedWord !== word) {
                words.push(cleanedWord);
            }
        }
    
        let index = 0;
    
        intID = setInterval(function() {
            if (index < words.length) {
                document.getElementById('outputBox').textContent = words[index];
                index++;
            } else {
                clearInterval(intID);
            }
        }, curSpd);
    }
    

    function stopReading() {
        clearInterval(intID);
        document.getElementById('outputBox').textContent = ''; 
    }

    function changeFontSize(event) {
        setFontSize(event.target.value);
    }

    function setFontSize(size) {
        let fontSize;
        switch (size) {
            case 'Big':
                fontSize = '48pt';
                break;
            case 'Bigger':
                fontSize = '60pt';
                break;
            default:
                fontSize = '36pt';
        }
        document.getElementById('outputBox').style.fontSize = fontSize;
    }

    function changeSpeed() {
        let speedOptions = {
            "50": 1200,
            "300": 200,
            "350": 171,
            "400": 150,
            "450": 133,
            "500": 120
        };

        let selectedSpeed = document.getElementById('speedBt').value;
        curSpd = speedOptions[selectedSpeed];

        if (intID) {
            clearInterval(intID);
            startReading(); 
        }
    }

})();
