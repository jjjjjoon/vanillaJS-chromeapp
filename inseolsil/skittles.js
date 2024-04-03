
(function () {
    const MAX_SKITTLES = 154;
    //공 개수 최대 154개
    const COLORS = ["red", "green", "blue", "purple", "gray", "mediumaquamarine",
        "pikachuyellow", "blanchedalmond", "tomato"];
    const DELAY_LENGTH = 2000; //예측 up&&down 메세지 2초간 유지.

    let timer = new Date(); // 한게임당 걸린 시간
    let seconds = 0;  // 시간 카운트변수

    window.addEventListener("load", initialize);

    //초기화
    function initialize() {
        $("new-game").addEventListener("click", showStartOptions);
        $("start").addEventListener("click", startGame);
        $("guess").addEventListener("click", makeGuess);
    }


    function showStartOptions() {
        setupView();
        clearJar();
        //새로운게임 skittles 다시 0 초기화
        $("guess-count").innerText = 0;

        qs("input").value = "";
        $("results").innerText = "";
    }



    function startGame() {
        gameView();
        fillJar();
    }


    function fillJar() {

        let gameColor = getRandomColor();
        $("color").innerText = gameColor + " ";
        $("color").className = gameColor;

        let skittleCount = Math.ceil(Math.random() * MAX_SKITTLES);
        for (let i = 0; i < skittleCount; i++) {
            addSkittle();
        }

        timer = setInterval(function () {
            seconds++;
        }, 1000);
    }

    function clearJar() {
        let skittles = qsa(".skittle");
        for (let i = 0; i < skittles.length; i++) {
            skittles[i].remove();
        }
    }

    function getRandomColor() {
        let colorCount = qs("input[name='color-count']:checked").value;
        return COLORS[parseInt(Math.random() * colorCount)];
    }


    function addSkittle() {
        let skittle = document.createElement("div");
        skittle.classList.add("skittle");
        let randomColor = getRandomColor();
        skittle.classList.add(randomColor);
        $("jar").appendChild(skittle);
    }


    function endGame() {
        $("results").innerText = "You guessed correct in " + seconds + " seconds!";
        clearInterval(timer);
        timer = null;
        seconds = 0;
        qs("#game-ui input").value = "";
        $("color").innerText = "";

        $("new-game").classList.remove("hidden");
    }


    function showTempMessage(guessValue, resultMsg) {
        $("results").innerText = resultMsg;
        //$("results")는 문서 객체 모델(DOM)에서 id가 "results"인 엘리먼트를 가져오는 함수이고, 
        //innerText를 통해 해당 엘리먼트의 텍스트 내용을 변경합니다.
        setTimeout(function () {
            //setTimeout : 일정시간이 지나면 없어지게함.
            if (guessValue === parseInt(qs("#game-ui input").value)) {
                $("results").innerText = "";
            }
        }, DELAY_LENGTH); //값이 일치하지 않으면 2초간 화면에 띄워라
    }


    function makeGuess() {
        let guessValue = parseInt(qs("#game-ui input").value);
        if (guessValue < 0) {
            showTempMessage(guessValue, "You must enter a non-zero guess!");
        } else if (guessValue >= 0) {
            let correctCount = qsa(".skittle." + $("color").className).length;
            if (guessValue === correctCount) {
                endGame();
            } else {
                let resultMsg = "Not quite! (hint: your guess is a bit ";
                if (guessValue <= correctCount) {
                    resultMsg += "low)";
                } else {
                    resultMsg += "high)";
                }
                showTempMessage(guessValue, resultMsg);
                $("guess-count").innerText = parseInt($("guess-count").innerText) + 1;
            }
        }
    }

    function gameView() {
        $("game-ui").classList.remove("hidden");
        $("game-setup").classList.add("hidden");
        $("start").classList.remove("hidden");
    }

    function setupView() {
        $("game-ui").classList.add("hidden");
        $("game-setup").classList.remove("hidden");
        $("new-game").classList.add("hidden");
        $("start").classList.remove("hidden");
    }

    function $(id) {
        return document.getElementById(id);
    }

    function qs(query) {
        return document.querySelector(query);
    }


    function qsa(query) {
        return document.querySelectorAll(query);
    }

})();
