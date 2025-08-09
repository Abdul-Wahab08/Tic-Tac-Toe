const boxes = document.querySelectorAll(".box")
const resetBtn = document.getElementById("resetBtn")
const newGameBtn = document.getElementById("newGameBtn")
const result = document.getElementById("result")

let turnX = true;
let count = 0;

let winCondition = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

boxes.forEach(box => {
    box.addEventListener('click', () => {
        if (turnX === true) {
            box.textContent = "X";
            turnX = false;
        } else {
            box.textContent = "0";
            turnX = true;
        }
        box.disabled = true;
        count++;

        let isWinner = checkWinner();
        if (count === 9 && !isWinner) {
            gameDraw();
        }
    })
})

function gameDraw() {
    result.innerText = "🤝 It's a Draw!";
    newGameBtn.style.display = "block";
}

function disableBoxes() {
    for (let box of boxes) {
        box.disabled = true;
    }
}

function enableBoxes() {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
        box.classList.remove("win")
    }
}

function checkWinner() {
    for (let condition of winCondition) {
        let val1 = boxes[condition[0]].innerText;
        let val2 = boxes[condition[1]].innerText;
        let val3 = boxes[condition[2]].innerText;

        if (val1 != "" && val2 != "" && val3 != "") {
            if (val1 === val2 && val2 === val3) {

                boxes[condition[0]].classList.add("win")
                boxes[condition[1]].classList.add("win")
                boxes[condition[2]].classList.add("win")

                result.innerHTML = `🎉 Congratulations Player ${val1}! You Win!`
                newGameBtn.style.display = "block";
                disableBoxes();
                count = 0;
                return;
            }
        }
    }
}

function resetGame() {
    turnX = true;
    count = 0;
    enableBoxes();
    result.innerText = "";
    newGameBtn.style.display = "none"
}

resetBtn.addEventListener('click', resetGame)
newGameBtn.addEventListener('click', resetGame)

