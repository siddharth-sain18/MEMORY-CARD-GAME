document.body.className = "bg-gray-900 min-h-screen flex flex-col items-center justify-start py-8";

let heading = document.createElement("h2");
heading.innerText = "🃏 Memory Match";
heading.className = "text-3xl sm:text-4xl font-extrabold text-center text-green-400 drop-shadow-lg";
document.body.appendChild(heading);

let mbox = document.createElement("div");
mbox.className = "mt-10 p-6 bg-gray-800 rounded-2xl shadow-xl flex flex-col gap-6 items-center w-80 border border-green-500/40";
let text = document.createElement("p");
text.innerText = "Choose Game Mode";
text.className = "text-xl font-bold text-green-400 font-mono";
mbox.appendChild(text);
let bbox = document.createElement("div");
bbox.className = "flex gap-4";

let oneplayer = document.createElement("button");
oneplayer.innerText = "1 Player";
oneplayer.className = "px-6 py-2 bg-blue-600 text-white font-bold rounded-lg shadow hover:bg-blue-500 transition";
bbox.appendChild(oneplayer);
let twoplayer = document.createElement("button");
twoplayer.innerText = "2 Players";
twoplayer.className = "px-6 py-2 bg-purple-600 text-white font-bold rounded-lg shadow hover:bg-purple-500 transition";
bbox.appendChild(twoplayer);
mbox.appendChild(bbox);
document.body.appendChild(mbox);

let inputbx = document.createElement("div");
inputbx.className = "hidden mt-8 p-6 bg-gray-800 rounded-2xl shadow-xl flex flex-col gap-4 items-center w-80 border border-green-500/40";
let tittle = document.createElement("p");
tittle.innerText = "Enter Player Name(s)";
tittle.className = "text-lg font-bold text-green-300 font-mono";
inputbx.appendChild(tittle);
let p1name = document.createElement("input");
p1name.placeholder = "Player 1 Name";
p1name.className = "px-4 py-2 w-full rounded-lg text-green-500 font-mono outline-none border-2 border-green-400 focus:ring-2 focus:ring-green-300";
inputbx.appendChild(p1name);
let p2name = document.createElement("input");
p2name.placeholder = "Player 2 Name";
p2name.className = "hidden px-4 py-2 w-full rounded-lg text-green-500 font-mono outline-none border-2 border-green-400 focus:ring-2 focus:ring-green-300";
inputbx.appendChild(p2name);

let sbtn = document.createElement("button");
sbtn.innerText = "Next ➡️";
sbtn.className = "px-6 py-2 bg-green-600 text-black font-bold rounded-lg shadow hover:bg-green-500 transition";
inputbx.appendChild(sbtn);
document.body.appendChild(inputbx);

let lbox = document.createElement("div");
lbox.className = "hidden mt-8 p-6 bg-gray-800 rounded-2xl shadow-xl flex flex-col gap-4 items-center w-80 border border-green-500/40";
let lttile = document.createElement("p");
lttile.innerText = "Select Difficulty Level";
lttile.className = "text-lg font-bold text-green-300 font-mono";
lbox.appendChild(lttile);
let lcont = document.createElement("div");
lcont.className = "flex flex-col gap-3 w-full";

let levels = [
    { name: "Easy (12 cards)", pairs: 6 },
    { name: "Medium (24 cards)", pairs: 12 },
    { name: "Hard (36 cards)", pairs: 18 }
];

let spair = 12;
levels.forEach(lv => {
    let btn = document.createElement("button");
    btn.innerText = lv.name;
    btn.className = "px-4 py-2 bg-gray-700 text-green-400 rounded-lg hover:bg-green-600 hover:text-black transition font-bold";
    btn.onclick = () => {
        spair = lv.pairs;
        lbox.classList.add("hidden");
        start();
    };
    lcont.appendChild(btn);
});
lbox.appendChild(lcont);
document.body.appendChild(lbox);

let pcount = 1;
oneplayer.onclick = () => {
    pcount = 1;
    p2name.classList.add("hidden");
    inputbx.classList.remove("hidden");
    mbox.classList.add("hidden");
}
twoplayer.onclick = function () {
    pcount = 2;
    p2name.classList.remove("hidden");
    inputbx.classList.remove("hidden");
    mbox.classList.add("hidden");
};

let p1 = "Player 1";
let p2 = "Player 2";
let player1Score = 0, player2Score = 0;
let player1Steps = 0, player2Steps = 0;
let cplayer = 1;

let gameb, status, scoreb;
sbtn.onclick = () => {
    p1 = p1name.value || "Player 1";
    if (pcount === 2) p2 = p2name.value || "Player 2";

    inputbx.classList.add("hidden");
    lbox.classList.remove("hidden");
};
function updateScoreBoard() {
    if (pcount === 1) {
        scoreb.innerText = `${p1}: ${player1Score} points | Steps: ${player1Steps}`;
    } else {
        scoreb.innerText = `${p1}: ${player1Score} pts (${player1Steps} steps)  |  ${p2}: ${player2Score} pts (${player2Steps} steps) 
🎯 Turn: ${cplayer === 1 ? p1 : p2}`;
    }
}
function start() {
    scoreb = document.createElement("div");
    scoreb.className = "mt-6 text-center text-green-300 font-mono text-lg";
    updateScoreBoard();
    document.body.appendChild(scoreb);
    status = document.createElement("h3");
    status.innerText = "Click two cards to match!";
    status.className = "text-lg text-center mt-6 text-gray-300 font-mono tracking-wide";
    document.body.appendChild(status);

    gameb = document.createElement("div");
    gameb.className = "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 justify-center mt-10 px-4";
    document.body.appendChild(gameb);
    let cardval = ["🍎","🍌","🍇","🍉","🥭","🍒","🍍","🥝","🍑","🥥","🍋","🍈","🍓","🍐","🥑","🍊","🥦","🥕"];
    let values = cardval.slice(0, spair).flatMap(v => [v, v]);
    values.sort(() => Math.random() - 0.5);
    let fcard = null, secondCard = null, lockBoard = false, matchedCount = 0;

    values.forEach(val => {
        let card = document.createElement("div");
        card.innerText = "❓";
        card.dataset.value = val;
        card.className = "w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center text-xl sm:text-2xl font-bold bg-gray-800 text-green-400 rounded-lg shadow cursor-pointer transition-transform hover:scale-105 duration-300 border border-green-500/30 font-mono select-none";

        card.onclick = () => {
            if (lockBoard || card === fcard || card.innerText !== "❓") return;

            card.innerText = card.dataset.value;
            card.className = "w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center text-2xl sm:text-3xl font-bold bg-green-600 text-black rounded-lg shadow cursor-pointer transition-transform scale-105 duration-300 border border-green-400/40 font-mono";

            if (!fcard) {
                fcard = card;
            } 
            else {
                secondCard = card;
                lockBoard = true;

                if (cplayer === 1) player1Steps++; else player2Steps++;

                if (fcard.dataset.value === secondCard.dataset.value) {
                    matchedCount += 2;
                    status.innerText = "✅ Match found!";
                    status.className = "text-lg text-center mt-6 text-green-400 font-mono";

                    if (cplayer === 1) player1Score++; else player2Score++;

                    fcard = null;
                    secondCard = null;
                    lockBoard = false;

                    if (matchedCount === values.length) {
                        winner();
                    }
                }
                 else {
   status.innerText = "❌ Wrong match!";
  status.className = "text-lg text-center mt-6 text-red-400 font-mono";

  setTimeout(() => {
       [fcard, secondCard].forEach(c => {
     c.innerText = "❓";
     c.className = "w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center text-xl sm:text-2xl font-bold bg-gray-800 text-green-400 rounded-lg shadow cursor-pointer transition-transform hover:scale-105 duration-300 border border-green-500/30 font-mono select-none";
       });
          fcard = null;
                secondCard = null;
                        lockBoard = false;

                        if (pcount === 2) {
                            cplayer = cplayer === 1 ? 2 : 1;
                        }
                        updateScoreBoard();
                    }, 800);
                }
                updateScoreBoard();
            }
        };

        gameb.appendChild(card);
    });
    let resetbtn = document.createElement("button");
    resetbtn.innerText = "Restart Game";
    resetbtn.className = "mt-8 px-6 py-2 bg-green-600 text-black font-bold rounded-lg shadow-lg hover:bg-green-500 transition-colors duration-300";
    resetbtn.onclick = () => location.reload();
    document.body.appendChild(resetbtn);
}

function winner() {
    if (pcount === 1) {
        status.innerText = `🎉 Game Over! ${p1} scored ${player1Score} in ${player1Steps} steps.`;
    } else {
        if (player1Score > player2Score) {
            status.innerText = `🏆 ${p1} wins with ${player1Score} points!`;
        } else if (player2Score > player1Score) {
            status.innerText = `🏆 ${p2} wins with ${player2Score} points!`;
        } else {
            status.innerText = `🤝 It's a Draw! Both scored ${player1Score}`;
        }
    }
    status.className = "text-xl text-center mt-8 text-green-500 font-extrabold font-mono animate-pulse";
}
