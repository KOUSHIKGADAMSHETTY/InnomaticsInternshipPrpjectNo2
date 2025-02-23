document.addEventListener("DOMContentLoaded", () => {
    const categoryButtons = document.querySelectorAll(".category-btn");
    const gameContainer = document.querySelector(".game-container");
    const landingPage = document.querySelector(".landing-page");
    const cardGrid = document.querySelector(".card-grid");
    const restartButton = document.querySelector(".restart-btn");
    const scoreDisplay = document.getElementById("score-value");
    const timeDisplay = document.getElementById("time-value");

    let cards = [];
    let firstCard = null;
    let secondCard = null;
    let lockBoard = false;
    let score = 0;
    let timeLeft = 30;
    let timer;

    const categories = {
        fruits: ["🍎", "🍌", "🍉", "🍇", "🍓", "🍒"],  
        emojis: ["😀", "😂", "😍", "😎", "😜", "🤩"],
        animals: ["🐶", "🐱", "🐼", "🦁", "🐸", "🐵"],
        planets: ["🌍", "🌕", "🪐", "☀️", "🌟", "🌑"],
        currencies: ["$", "€", "£", "¥", "₹", "₿"]
    };

    // Start game with selected category
    categoryButtons.forEach(button => {
        button.addEventListener("click", () => {
            const category = button.dataset.category;
            startGame(category);
        });
    });

    function startGame(category) {
        landingPage.classList.add("hidden");
        gameContainer.classList.remove("hidden");
        generateCards(categories[category]);
        resetGame();
    }

    function generateCards(items) {
        const selectedItems = [...items, ...items]; // Duplicate for matching pairs
        selectedItems.sort(() => Math.random() - 0.5); // Shuffle
        cardGrid.innerHTML = ""; // Clear previous grid

        cards = selectedItems.map(item => {
            const card = document.createElement("div");
            card.classList.add("card");
            card.dataset.item = item;
            card.innerHTML = `<div class="card-inner">
                <div class="card-front">❓</div>
                <div class="card-back">${item}</div>
            </div>`;
            card.addEventListener("click", flipCard);
            cardGrid.appendChild(card);
            return card;
        });
    }

    function flipCard() {
        if (lockBoard || this === firstCard || this.classList.contains("flipped")) return;

        this.classList.add("flipped");

        if (!firstCard) {
            firstCard = this;
        } else {
            secondCard = this;
            checkForMatch();
        }
    }

    function checkForMatch() {
        lockBoard = true;
        if (firstCard.dataset.item === secondCard.dataset.item) {
            disableCards();
            score += 10;
            scoreDisplay.textContent = score;
        } else {
            setTimeout(unflipCards, 1000);
        }
    }

    function disableCards() {
        firstCard.removeEventListener("click", flipCard);
        secondCard.removeEventListener("click", flipCard);
        resetBoard();
    }

    function unflipCards() {
        firstCard.classList.remove("flipped");
        secondCard.classList.remove("flipped");
        resetBoard();
    }

    function resetBoard() {
        firstCard = null;
        secondCard = null;
        lockBoard = false;
    }

    function startTimer() {
        clearInterval(timer);
        timeLeft = 45;
        timeDisplay.textContent = timeLeft;
    
        timer = setInterval(() => {
            timeLeft--;
            timeDisplay.textContent = timeLeft;
    
            if (checkWinCondition()) {  // Check if all cards are matched
                clearInterval(timer);
                setTimeout(() => alert("🎉 Congratulations! You matched all the cards in time! 🎉"), 100);
                return;
            }
    
            if (timeLeft <= 0) {
                clearInterval(timer);
                alert("Time's up! Try again.");
                restartGame();
            }
        }, 1000);
    }
    
    // Function to check if all cards are matched
    function checkWinCondition() {
        return document.querySelectorAll('.card:not(.matched)').length === 0;
    }
    
    

    function resetGame() {
        score = 0;
        scoreDisplay.textContent = score;
        startTimer();
    }

    function restartGame() {
        gameContainer.classList.add("hidden");
        landingPage.classList.remove("hidden");
        clearInterval(timer);
    }

    restartButton.addEventListener("click", restartGame);
});
document.addEventListener("DOMContentLoaded", () => {
    const backButton = document.querySelector(".back-btn");
    const gameContainer = document.querySelector(".game-container");
    const landingPage = document.querySelector(".landing-page");

    backButton.addEventListener("click", () => {
        gameContainer.classList.add("hidden");
        landingPage.classList.remove("hidden");
        clearInterval(timer); // Stop timer when returning to home
    });
});
