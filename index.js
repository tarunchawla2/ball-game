var timer;
var timePassed;
var start;
var speedSelected;
var previousDist;
var totalTime = Date.now();
var newId = 10;

function down() {
    if (Date.now() - totalTime > 5000) {
        alert('Please refresh page for starting new game')
    } else {
        previousDist = parseFloat(train.style.top.substring(0, train.style.top.length - 2))
        start = Date.now()
        speedSelected = document.getElementById("speed").value;
        if (timer) {
            clearInterval(timer);
            timer = setInterval(function() {
                timePassed = Date.now() - start;
                train.style.top = ((previousDist) + ((speedSelected * timePassed) / 1000)) + 'px';
                if (Date.now() - totalTime > 5000) {
                    clearInterval(timer);
                    calculateScore()
                }
            }, 20);
        } else {
            timer = setInterval(function() {
                timePassed = Date.now() - start;
                train.style.top = (speedSelected * timePassed) / 1000 + 'px';
                if (Date.now() - totalTime > 5000) {
                    clearInterval(timer);
                    calculateScore()
                }
            }, 20);
        }
    }
}

function initializeBalls() {
    let randomDiameter;
    for (let i = 0; i < 10; i++) {
        randomDiameter = Math.floor(Math.random() * 100) + 1
        document.getElementById(i).style.width = randomDiameter + 'px';
        document.getElementById(i).style.height = randomDiameter + 'px';
    }

    addNewBall()
    down();
}

function ballClicked(id) {
    let element = document.getElementById(id);
    element.parentNode.removeChild(element);
    setTimeout(function() {
        let newElement = document.createElement("div");
        newElement.id = id;
        newElement.className = "circle";
        randomDiameter = Math.floor(Math.random() * 100) + 1
        newElement.style.width = randomDiameter + 'px';
        newElement.style.height = randomDiameter + 'px';
        document.getElementById("train").appendChild(newElement)
        console.log('Element added')
    }, 1000)
}

function addNewBall() {
    intervel = setInterval(function() {
        if (Date.now() - totalTime > 4000) {
            clearInterval(intervel)
        }
        let newElement = document.createElement("div");
        newElement.id = newId;
        newId++;
        newElement.className = "circle";
        newElement.addEventListener("click", function() {
            ballClicked(newElement.id)
        })
        randomDiameter = Math.floor(Math.random() * 100) + 1;
        newElement.style.width = randomDiameter + 'px';
        newElement.style.height = randomDiameter + 'px';
        document.getElementById("train").appendChild(newElement)
    }, 1000)
}

function calculateScore() {
    let score = 0;
    for (let i = 0; i < document.getElementById("train").childElementCount; i++) {
        let element = document.getElementById(i);
        let width = element.style.width;
        score += (100) / parseFloat(width.substring(0, width.length - 2));
    }
    document.getElementById("score").innerHTML = 'Score: ' + score;
}
initializeBalls()