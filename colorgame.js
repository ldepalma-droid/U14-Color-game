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

let numberOfSquares = 6;
let colors = generateRandomColors(numberOfSquares);
let pickedColor = pickColor();
console.log("Cantidad de colores:", colors.length);

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

function playSquareEffect(square, effectClass) {
    square.classList.remove("square-selected", "square-correct");
    void square.offsetWidth;
    square.classList.add(effectClass);
}

function setUpSquares() {
    for (let i = 0; i < squares.length; i++) {
        if (i < numberOfSquares) {
            squares[i].style.display = "block";
            squares[i].style.backgroundColor = colors[i];
        } else {
            squares[i].style.display = "none";
        }

        squares[i].addEventListener("click", function () {
            const clickedColor = this.style.backgroundColor;
            if (clickedColor === pickedColor) {
                playSquareEffect(this, "square-correct");
                message.textContent = "¡Correcto!";
                changeColors(clickedColor);
                heading.style.backgroundColor = clickedColor;
                resetButton.textContent = "Play Again?";
            } else {
                playSquareEffect(this, "square-selected");
                this.style.backgroundColor = getComputedStyle(document.body).backgroundColor;
                message.textContent = "Intentalo Nuevamente";
            }
        });

        squares[i].addEventListener("animationend", function () {
            this.classList.remove("square-selected", "square-correct");
        });
    }
}

function resetGame() {
    colors = generateRandomColors(numberOfSquares);
    pickedColor = pickColor();
    console.log("Cantidad de colores:", colors.length);
    colorDisplay.textContent = pickedColor;
    message.textContent = "";
    heading.style.backgroundColor = "";
    resetButton.textContent = "Nuevos Colores";
    setUpSquareColors();
}

function setUpSquareColors() {
    for (let i = 0; i < squares.length; i++) {
        squares[i].style.display = i < numberOfSquares ? "block" : "none";
        if (i < numberOfSquares) {
            squares[i].style.backgroundColor = colors[i];
        }
    }
}

function setMode(number, selectedButton) {
    numberOfSquares = number;
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
