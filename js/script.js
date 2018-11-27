var currentRow;
var currentImage;
var currentArray = [];

window.onload = run;
function run() {
    currentRow = 1;
    currentImage = 1;
    console.log(checker.getCombination());
}

var checker = (function () {
    this.combination = ["../img/1.png", "../img/3.png", "../img/4.png", "../img/4.png"];
    return {
        compare: function compare(array) {
            let numOfReds = 0
            let numOfGreens = 0;
            let fakeCombination = [...combination];
            for (let i = 0; i < 4; i++) {
                if (array[i] == combination[i]) {
                    numOfGreens++;
                    continue;
                }
                if (fakeCombination.includes(element)) {
                    console.log(element + " postoji u" + fakeCombination);
                    fakeCombination.splice(fakeCombination.indexOf(`${element}`), 1, "empty");
                    console.log("Nakon isecanja: " + fakeCombination);

                    console.log(element + " === " + combination[i]);

                    numOfReds++;
                }
            }

            return { numOfReds, numOfGreens, numOfWrong: 4 - numOfGreens - numOfReds };
        },
        getCombination: function getCombination() {
            return combination;
        }
    }
})();




function generateCombination() {
    let combination = [];
    for (let i = 1; i <= 4; i++) {
        combination.push(`../img/${Math.floor(Math.random() * 4) + 1}.png`);
    }
    return combination;
}

function buttonClicked(eventHandler) {
    let currentImageElements = document.getElementsByClassName(`row combination-${currentRow}`)[0].children[0].children[0].children;
    let currentImageElement;
    for (let i = 0; i < currentImageElements.length; i++) {
        if (currentImageElements[i].children[0].src.endsWith("blanko.png")) {
            currentImage = ++i;
            break;
        }
    }
    currentImageElement = currentImageElements[currentImage - 1].children[0];

    currentImageElement.setAttribute("src", `..${eventHandler.src.split("LEVI")[1]}`);

    if (increasePositionVariables()) {
        currentArray = [];
        for (let i = 0; i < 4; i++) {
            currentArray.push(`..${currentImageElement.src.split("LEVI")[1]}`);
        }

        setGreensAndReds(checker.compare(currentArray));
    }

}

function resetBlankoImage(element) {
    element.setAttribute("src", "../img/blanko.png");

}

function increasePositionVariables() {
    currentImage++;
    if (currentImage == 5) {
        currentImage = 1;
        currentRow++;
        return true;
    }
    return false;
}


function setGreensAndReds(stats) {

    let currentDot = 1;
    let currentRowConfirmationElementChildren = document.getElementsByClassName(`row combination-${currentRow - 1}`)[0].children[1].children[0];
    if (stats.numOfGreens > 0) {
        while (currentDot <= stats.numOfGreens) {
            currentRowConfirmationElementChildren.children[currentDot - 1].children[0].setAttribute("src", "../img/grndot.png");
            currentDot++;
        }
    }
    if (stats.numOfReds > 0) {
        while (currentDot <= stats.numOfReds + stats.numOfGreens) {
            currentRowConfirmationElementChildren.children[currentDot - 1].children[0].setAttribute("src", "../img/reddot.png");
            currentDot++;
        }
    }

}