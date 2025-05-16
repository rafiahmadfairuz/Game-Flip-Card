  let emojis = ['😀','😎','😍','😱','👾','🤖'];
  let first = null, score = 0, time = 30, timer, totalPairs = 6;

  function startGame() {
    let board = document.getElementById("board");
    document.getElementById("tulisan-menang").textContent = "";
    board.innerHTML = "";
    score = 0;
    time = 30;
    document.getElementById("score").textContent = score;
    document.getElementById("time").textContent = time;
    clearInterval(timer);
    timer = setInterval(() => {
      time--;
      document.getElementById("time").textContent = time;
      if (time == 0) {
        clearInterval(timer);
        alert("Waktu habis! Skor: " + score);
      }
    }, 1000);

    let cards = shuffle([...emojis, ...emojis]);
    cards.forEach(emoji => {
      let card = document.createElement("div");
      card.className = "card";
      card.textContent = "❓";
      card.onclick = () => flipCard(card, emoji);
      board.appendChild(card);
    });
  }

  function flipCard(card, emoji) {
    if (card.classList.contains("flipped") || card.textContent != "❓") return;
    card.textContent = emoji;
    card.classList.add("flipped");

    if (!first) {
      first = card;
    } else {
      if (first.textContent === card.textContent && first !== card) {
        score++;
        document.getElementById("score").textContent = score;
        first = null;
        if (score === totalPairs) {
          clearInterval(timer);
          document.getElementById("tulisan-menang").textContent = "🎉 Kamu Menang!";
        }
      } else {
        setTimeout(() => {
          card.textContent = "❓";
          first.textContent = "❓";
          card.classList.remove("flipped");
          first.classList.remove("flipped");
          first = null;
        }, 700);
      }
    }
  }

  function shuffle(arr) {
    return arr.sort(() => Math.random() - 0.5);
  }

  startGame();
