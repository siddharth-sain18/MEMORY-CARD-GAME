// --- Styling for body ---
document.body.className = "bg-gray-900 min-h-screen flex flex-col items-center justify-start py-8";
let heading = document.createElement("h2");
heading.innerText = "🃏 Memory Match";
heading.className = "text-3xl sm:text-4xl font-extrabold text-center text-green-400 drop-shadow-lg";
document.body.appendChild(heading);

let modeBox = document.createElement("div");
modeBox.className = "mt-10 p-6 bg-gray-800 rounded-2xl shadow-xl flex flex-col gap-6 items-center w-80 border border-green-500/40";

let askText = document.createElement("p");
askText.innerText = "Choose Game Mode";
askText.className = "text-xl font-bold text-green-400 font-mono";
modeBox.appendChild(askText);

let btnContainer = document.createElement("div");
btnContainer.className = "flex gap-4";

let oneBtn = document.createElement("button");
oneBtn.innerText = "1 Player";
oneBtn.className = "px-6 py-2 bg-blue-600 text-white font-bold rounded-lg shadow hover:bg-blue-500 transition";
btnContainer.appendChild(oneBtn);

let twoBtn = document.createElement("button");
twoBtn.innerText = "2 Players";
twoBtn.className = "px-6 py-2 bg-purple-600 text-white font-bold rounded-lg shadow hover:bg-purple-500 transition";
btnContainer.appendChild(twoBtn);

modeBox.appendChild(btnContainer);
document.body.appendChild(modeBox);

// --- Player Input Box ---
let inputBox = document.createElement("div");
inputBox.className = "hidden mt-8 p-6 bg-gray-800 rounded-2xl shadow-xl flex flex-col gap-4 items-center w-80 border border-green-500/40";

let inputTitle = document.createElement("p");
inputTitle.innerText = "Enter Player Name(s)";
inputTitle.className = "text-lg font-bold text-green-300 font-mono";
inputBox.appendChild(inputTitle);

let p1Input = document.createElement("input");
p1Input.placeholder = "Player 1 Name";
p1Input.className = "px-4 py-2 w-full rounded-lg text-black font-mono outline-none border-2 border-green-400 focus:ring-2 focus:ring-green-300";
inputBox.appendChild(p1Input);

let p2Input = document.createElement("input");
p2Input.placeholder = "Player 2 Name";
p2Input.className = "hidden px-4 py-2 w-full rounded-lg text-black font-mono outline-none border-2 border-green-400 focus:ring-2 focus:ring-green-300";
inputBox.appendChild(p2Input);

let startBtn = document.createElement("button");
startBtn.innerText = "🚀 Start Game";
startBtn.className = "px-6 py-2 bg-green-600 text-black font-bold rounded-lg shadow hover:bg-green-500 transition";
inputBox.appendChild(startBtn);

document.body.appendChild(inputBox);

// --- Mode Selection Logic ---
let playersCount = 1;
oneBtn.onclick = () => {
    playersCount = 1;
    p2Input.classList.add("hidden");
    inputBox.classList.remove("hidden");
    modeBox.classList.add("hidden");
}

twoBtn.onclick = function () {
    playersCount = 2;
    p2Input.classList.remove("hidden");
    inputBox.classList.remove("hidden");
    modeBox.classList.add("hidden");
};


// --- Game Variables ---
let player1Name = "Player 1";
let player2Name = "Player 2";
let player1Score = 0, player2Score = 0;
let player1Steps = 0, player2Steps = 0;
let currentPlayer = 1;

let gameBoard, status, scoreBoard;
startBtn.onclick = () => {
    player1Name = p1Input.value || "Player 1";
    if (playersCount === 2) player2Name = p2Input.value || "Player 2";

    inputBox.classList.add("hidden");
    scoreBoard = document.createElement("div");
    scoreBoard.className = "mt-6 text-center text-green-300 font-mono text-lg";
    updateScoreBoard();
    document.body.appendChild(scoreBoard);

    status = document.createElement("h3");
    status.innerText = "Click two cards to match!";
    status.className = "text-lg text-center mt-6 text-gray-300 font-mono tracking-wide";
    document.body.appendChild(status);

    // Game Board
    gameBoard = document.createElement("div");
gameBoard.className = "grid grid-cols-4 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-6 gap-4 justify-center mt-10 px-4";
    document.body.appendChild(gameBoard);

    startGame();
};

// --- Score Update ---
function updateScoreBoard() {
    if (playersCount === 1) {
        scoreBoard.innerText = `${player1Name}: ${player1Score} points | Steps: ${player1Steps}`;
    } else {
        scoreBoard.innerText = `${player1Name}: ${player1Score} pts (${player1Steps} steps)  |  ${player2Name}: ${player2Score} pts (${player2Steps} steps) 
🎯 Turn: ${currentPlayer === 1 ? player1Name : player2Name}`;
    }
}
function startGame() {
    let values = ["🍎","🍎","🍌","🍌","🍇","🍇","🍉","🍉","🥭","🥭","🍒","🍒","🍍","🍍","🥝","🥝","🍑","🍑","🥥","🥥","🍋","🍋","🍈","🍈"];
    values.sort(() => Math.random() - 0.5);

    let firstCard = null, secondCard = null, lockBoard = false, matchedCount = 0;

    values.forEach(val => {
        let card = document.createElement("div");
        card.innerText = "❓";
        card.dataset.value = val;
        card.className = "w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center text-xl sm:text-2xl font-bold bg-gray-800 text-green-400 rounded-lg shadow cursor-pointer transition-transform hover:scale-105 duration-300 border border-green-500/30 font-mono select-none";

        card.onclick = () => {
            if (lockBoard || card === firstCard || card.innerText !== "❓") return;

            card.innerText = card.dataset.value;
            card.className = "w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center text-2xl sm:text-3xl font-bold bg-green-600 text-black rounded-lg shadow cursor-pointer transition-transform scale-105 duration-300 border border-green-400/40 font-mono";

            if (!firstCard) {
                firstCard = card;
            } else {
                secondCard = card;
                lockBoard = true;

                if (currentPlayer === 1) player1Steps++; else player2Steps++;

                if (firstCard.dataset.value === secondCard.dataset.value) {
                    matchedCount += 2;
                    status.innerText = "✅ Match found!";
                    status.className = "text-lg text-center mt-6 text-green-400 font-mono";

                    // Score increase
                    if (currentPlayer === 1) player1Score++; else player2Score++;

                    firstCard = null;
                    secondCard = null;
                    lockBoard = false;

                    if (matchedCount === values.length) {
                        showWinner();
                    }
                } else {
                    status.innerText = "❌ Wrong match!";
                    status.className = "text-lg text-center mt-6 text-red-400 font-mono";

                    setTimeout(() => {
                        [firstCard, secondCard].forEach(c => {
                            c.innerText = "❓";
                            c.className = "w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center text-xl sm:text-2xl font-bold bg-gray-800 text-green-400 rounded-lg shadow cursor-pointer transition-transform hover:scale-105 duration-300 border border-green-500/30 font-mono select-none";
                        });
                        firstCard = null;
                        secondCard = null;
                        lockBoard = false;

                        // Switch turn
                        if (playersCount === 2) {
                            currentPlayer = currentPlayer === 1 ? 2 : 1;
                        }
                        updateScoreBoard();
                    }, 800);
                }
                updateScoreBoard();
            }
        };

        gameBoard.appendChild(card);
    });

    // Reset Button
    let resetButton = document.createElement("button");
    resetButton.innerText = "Restart Game";
    resetButton.className = "mt-8 px-6 py-2 bg-green-600 text-black font-bold rounded-lg shadow-lg hover:bg-green-500 transition-colors duration-300";
    resetButton.onclick = () => location.reload();
    document.body.appendChild(resetButton);
}

// --- Winner ---
function showWinner() {
    if (playersCount === 1) {
        status.innerText = `🎉 Game Over! ${player1Name} scored ${player1Score} in ${player1Steps} steps.`;
    } else {
        if (player1Score > player2Score) {
            status.innerText = `🏆 ${player1Name} wins with ${player1Score} points!`;
        } else if (player2Score > player1Score) {
            status.innerText = `🏆 ${player2Name} wins with ${player2Score} points!`;
        } else {
            status.innerText = `🤝 It's a Draw! Both scored ${player1Score}`;
        }
    }
    status.className = "text-xl text-center mt-8 text-green-500 font-extrabold font-mono animate-pulse";
}

