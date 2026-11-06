console.log("Welcome to the Color Game!");

const squares = document.querySelectorAll(".square");
const colorDisplay = document.getElementById("colorDisplay");
const message = document.getElementById("message");
const heading = document.getElementById("h1");
const resetButton = document.getElementById("reset");
const hardButton = document.getElementById("hard");
const easyButton = document.getElementById("easy");
const expertButton = document.getElementById("expert");
const modeButtons = [hardButton, easyButton, expertButton];

let numberOfColors = 6;
let colors = generateRandomColors(numberOfColors);
let pickedColor = pickColor();

function pickColor() {
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
}

function randomColor() {
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);
    return `rgb(${red}, ${green}, ${blue})`;
}

function generateRandomColors(number) {
    const generatedColors = [];
    for (let i = 0; i < number; i++) {
        generatedColors.push(randomColor());
    }
    return generatedColors;
}

function changeColors(color) {
    for (let i = 0; i < squares.length; i++) {
        squares[i].style.backgroundColor = color;
    }
}

function setUpSquares() {
    for (let i = 0; i < squares.length; i++) {
        if (i < numberOfColors) {
            squares[i].style.display = "block";
            squares[i].style.backgroundColor = colors[i];
        } else {
            squares[i].style.display = "none";
        }

        squares[i].addEventListener("click", function () {
            const clickedColor = this.style.backgroundColor;
            if (clickedColor === pickedColor) {
                message.textContent = "¡Correcto!";
                changeColors(clickedColor);
                heading.style.backgroundColor = clickedColor;
            } else {
                this.style.backgroundColor = getComputedStyle(document.body).backgroundColor;
                message.textContent = "Intentalo Nuevamente";
            }
        });
    }
}

function resetGame() {
    colors = generateRandomColors(numberOfColors);
    pickedColor = pickColor();
    colorDisplay.textContent = pickedColor;
    message.textContent = "";
    heading.style.backgroundColor = "";
    resetButton.textContent = "Nuevos Colores";
    setUpSquareColors();
}

function setUpSquareColors() {
    for (let i = 0; i < squares.length; i++) {
        squares[i].style.display = i < numberOfColors ? "block" : "none";
        if (i < numberOfColors) {
            squares[i].style.backgroundColor = colors[i];
        }
    }
}

function setMode(number, selectedButton) {
    numberOfColors = number;
    for (let i = 0; i < modeButtons.length; i++) {
        modeButtons[i].classList.toggle("selected", modeButtons[i] === selectedButton);
    }
    resetGame();
}

colorDisplay.textContent = pickedColor;
setUpSquares();

resetButton.addEventListener("click", resetGame);
hardButton.addEventListener("click", function () {
    setMode(6, hardButton);
});
easyButton.addEventListener("click", function () {
    setMode(3, easyButton);
});
expertButton.addEventListener("click", function () {
    setMode(12, expertButton);
});
