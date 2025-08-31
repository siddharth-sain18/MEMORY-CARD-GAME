document.body.className = "bg-gray-900 min-h-screen flex flex-col items-center justify-start py-8";

let heading = document.createElement("h2");
heading.innerText = "🃏 Memory Match";
heading.className = "text-4xl font-extrabold text-center text-green-400 drop-shadow-lg";
document.body.appendChild(heading);

let gameBoard = document.createElement("div");
gameBoard.className = "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 justify-center mt-10 px-4";
document.body.appendChild(gameBoard);

let status = document.createElement("h3");
status.innerText = "Click two cards to match!";
status.className = "text-lg text-center mt-6 text-gray-300 font-mono tracking-wide";
document.body.appendChild(status);

let values = ["🍎","🍎","🍌","🍌","🍇","🍇","🍉","🍉","🥭","🥭","🍒","🍒","🍍","🍍","🥝","🥝","🍑","🍑","🥥","🥥","🍋","🍋","🍈","🍈"];
values.sort(() => Math.random() - 0.5);

let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matchedCount = 0;

values.forEach(val => {
    let card = document.createElement("div");
    card.innerText = "❓";
    card.dataset.value = val;
    card.className = "w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center text-xl sm:text-2xl font-bold bg-gray-800 text-green-400 rounded-lg shadow-[0_0_6px_rgba(0,255,0,0.25)] cursor-pointer transition-transform hover:scale-105 duration-300 border border-green-500/30 font-mono select-none";

    card.onclick = () => {
        if (lockBoard || card === firstCard || card.innerText !== "❓") return;

        card.innerText = card.dataset.value;
        card.className = "w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center text-2xl sm:text-3xl font-bold bg-green-600 text-black rounded-lg shadow-[0_0_8px_rgba(0,255,0,0.4)] cursor-pointer transition-transform scale-105 duration-300 border border-green-400/40 font-mono";

        if (!firstCard) {
            firstCard = card;
        } else {
            secondCard = card;
            lockBoard = true;

            if (firstCard.dataset.value === secondCard.dataset.value) {
                matchedCount += 2;
                status.innerText = "✅ Match found!";
                status.className = "text-lg text-center mt-6 text-green-400 font-mono";
                firstCard = null;
                secondCard = null;
                lockBoard = false;

                if (matchedCount === values.length) {
                    status.innerText = "🎉You hacked the game! All pairs matched!";
                    status.className = "text-xl text-center mt-8 text-green-500 font-extrabold font-mono animate-pulse";
                }
            } else {
                status.innerText = "❌ Wrong match!";
                status.className = "text-lg text-center mt-6 text-red-400 font-mono";
                setTimeout(() => {
                    [firstCard, secondCard].forEach(c => {
                        c.innerText = "❓";
                        c.className = "w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center text-xl sm:text-2xl font-bold bg-gray-800 text-green-400 rounded-lg shadow-[0_0_6px_rgba(0,255,0,0.25)] cursor-pointer transition-transform hover:scale-105 duration-300 border border-green-500/30 font-mono select-none";
                    });
                    firstCard = null;
                    secondCard = null;
                    lockBoard = false;
                }, 1000);
            }
        }
    };

    gameBoard.appendChild(card);
});

let resetButton = document.createElement("button");
resetButton.innerText = "Restart Game";
resetButton.className = "mt-8 px-6 py-2 bg-green-600 text-black font-bold rounded-lg shadow-lg hover:bg-green-500 transition-colors duration-300";
resetButton.onclick = () => location.reload();
document.body.appendChild(resetButton);

resetButton.onmouseover = () => {
    resetButton.className = "mt-8 px-6 py-2 bg-green-500 text-black font-bold rounded-lg shadow-lg hover:bg-green-600 transition-colors duration-300";
}
resetButton.onmouseout = () => {
    resetButton.className = "mt-8 px-6 py-2 bg-green-600 text-black font-bold rounded-lg shadow-lg hover:bg-green-500 transition-colors duration-300";
}
