(() => {
    // set variable
    const card = [
        {
            "id" : 1,
            "image" : "./assets/img/anehihan.jpg"
        },
        {
            "id" : 2,
            "image" : "./assets/img/chatminou.jpg"
        },
        {
            "id" : 3,
            "image" : "./assets/img/chientoutou.jpg"
        },
        {
            "id" : 4,
            "image" : "./assets/img/lamacrachat.jpg"
        },
        {
            "id" : 5,
            "image" : "./assets/img/lapinscrottes.jpg"
        },
        {
            "id" : 6,
            "image" : "./assets/img/lionnegraou.jpg"
        },
        {
            "id" : 7,
            "image" : "./assets/img/oursbaby.jpg"
        }
    ];
    let arrayDraw = [false, false, false, false, false, false, false, false, false, false, false, false, false, false];
    let toDraw = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7];
    let drawFinish=false;
    let nbFalse=0;
    let i=0;
    let nbCardClick=-1;
    let card1="";
    let card1img="";


    // loadTimer
    function loadTimer() {

        let myVar = setInterval(myTimer, 1000);

        function stopTimer() {
            clearInterval(myVar);
        }

        function myTimer () {
        let time=document.querySelector("#start").dataset.time;
        let secondes=time[4] + time[5];
        let minutes=time[0];
        secondes=Number(secondes);
        minutes=Number(minutes);
        secondes--;
        if (secondes<0) {
            minutes--;
            secondes=59;
        }
        secondes=secondes.toString(10);
        minutes=minutes.toString(10);
        if (secondes==="9") secondes="09";if (secondes==="8") secondes="08";if (secondes==="7") secondes="07";if (secondes==="6") secondes="06";if (secondes==="5") secondes="05";if (secondes==="4") secondes="04";if (secondes==="3") secondes="03";if (secondes==="2") secondes="02";if (secondes==="1") secondes="01";if (secondes==="0") secondes="00";
        document.getElementById("start").dataset.time=minutes + " : " + secondes;
        document.getElementById("start").innerText=document.getElementById("start").dataset.time;
        if (minutes==="0" && secondes==="00") {
            stopTimer();
            endGame("lose");
        }
        }
    }

    // when the game is over
    function endGame(status) {
        if (status==="win") {
            document.getElementById("start").dataset.time="0 : 01";
            document.getElementById("start").dataset.status="win";
            document.getElementById("welcome").innerText = "Congratulation ! You win the game";
            document.getElementById("line1").innerText = "";
            document.getElementById("line2").innerText = "You can play again if you want :)";
            document.getElementById("line3").innerText = "";
            document.getElementById("pushTheButton").innerHTML = "<a href='index.html'>Retry Now</a>";
            document.getElementById("myModal").style.display = "flex";
        }
        if (status==="lose" && document.getElementById("start").dataset.status==="inGame") {
            document.getElementById("start").dataset.status="lose";
            document.getElementById("welcome").innerText = "Oh noooo ! You lose the game";
            document.getElementById("line1").innerText = "";
            document.getElementById("line2").innerText = "You can play again if you want :/";
            document.getElementById("line3").innerText = "";
            document.getElementById("pushTheButton").innerHTML = "<a href='index.html'>Retry Now</a>";
            document.getElementById("myModal").style.display = "flex";
        }
    }

    // start game
    document.getElementById("start").addEventListener("click", ()=> {
      if (document.getElementById("start").dataset.status==="toStart") {
        document.getElementById("start").textContent="3 : 00";
        loadTimer();
        while (!drawFinish) {
            let draw = Math.floor(Math.random()*14);
            if (arrayDraw[draw]===false) arrayDraw[draw]=toDraw[i];
            else {
                let selectOk=false;
                while (!selectOk) {
                    let draw = Math.floor(Math.random()*14);
                    if (arrayDraw[draw]===false) {
                        arrayDraw[draw]=toDraw[i];
                        selectOk=true;
                    }
                }
            }
            i++;
            if (i===14) drawFinish=true;
        }
        document.getElementById("start").dataset.status="inGame";
      }
      nbCardClick=0;
    })

    // listen the click on the card
    document.querySelectorAll('.card').forEach((element) =>
        element.addEventListener('click', () => {
            if ((nbCardClick===0 || nbCardClick===1) && document.querySelector("#" + element.id).dataset.turn==="0" && document.querySelector("#" + element.id).dataset.verif==="0") turnCard(element.id);
        }));

    // turn a card
    function turnCard(id) {
        nbCardClick++;
        let idStr=id.substring(3, 5);
        let idNum=Number(idStr);
        let idCard=arrayDraw[idNum];
        idCard=Number(idCard); idCard--;
        document.getElementById(id).src=card[idCard]["image"];
        document.getElementById(id).dataset.turn="1";
        if (nbCardClick===1) { card1=id; card1img=card[idCard]["image"];}
        if (nbCardClick===2) {
            if (card[idCard]["image"] !== card1img) {
                setTimeout(function(){
                alerte("The 2 pictures are different");
                setTimeout(function(){
                    document.getElementById(id).src="./assets/img/back.jpg";
                    document.getElementById(card1).src="./assets/img/back.jpg";
                    document.getElementById(id).dataset.turn="0";
                    document.getElementById(card1).dataset.turn="0";
                    nbCardClick=0;
                    }, 1500);
                }, 500);
            }
            else {
                nbCardClick=0;
                document.getElementById(id).dataset.verif="1";
                document.getElementById(card1).dataset.verif="1";
                let checkIfWin=0;
                document.querySelectorAll('.card').forEach((element) => {
                      if (document.getElementById(element.id).dataset.verif==="1") checkIfWin++;
                    });
                if (checkIfWin===14) { endGame("win"); }
            }
        }
    }

})();

