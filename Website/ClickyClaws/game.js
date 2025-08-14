/*Start Button*/
function start() {
    let start = document.getElementById("start");
               
    start.addEventListener("transitionend", () => {
        document.getElementById("bgm").play();
        start.remove();
    });

    start.classList.add("hide");
}
/*Sound Effect*/
function buttonSoundEffect() {
    const soundEffect = document.getElementById("soundEffect");
     
    soundEffect.play();
}
/*Click Effect*/
document.body.addEventListener('click', function (event) {
    const spark = document.createElement('div');
    const x = event.clientX + window.scrollX;
    const y = event.clientY + window.scrollY;

    spark.className = 'spark';
  
    spark.style.left = x + 'px';
    spark.style.top = y + 'px';
    spark.style.zIndex = 10000;
    spark.style.pointerEvents = 'none';
    spark.style.filter = 'hue-rotate(' + Math.random() * 360 + 'deg)';
 
    for (let i = 0; i < 8; i++) {
        const span = document.createElement('span');

        span.style.position = 'absolute';
        span.style.left = '10%';
        span.style.top = '25%';
        span.style.width = '2px';
        span.style.height = '20px';
        span.style.transformOrigin = 'bottom';
        span.style.transform = `translate(-50%, -50%) rotate(${i * 45}deg)`;
        spark.appendChild(span);
    }

    document.body.appendChild(spark);
  
    setTimeout(() => {
        spark.remove();
    }, 500);
});
/*Music*/
const music = document.getElementById("bgm");
function unmute() {
    music.play();
}
function mute() {
    music.pause();
}
function volumeUp() {
    music.volume += 0.1;
}
function volumeDown() {
    music.volume -= 0.1;
}
/*Theme Button*/
const themeButton = document.getElementById("darkMode");
const gameBox = document.getElementById("gameBox");
if (themeButton) {
    themeButton.addEventListener("click", function () {
        document.body.classList.toggle("darkTheme");
        gameBox.classList.toggle("darkTheme");
    });
}
/*Game*/
let clicks = 0;
let totalClicks = 0;
let level = 9;
let evolutionStage = 1;
let frame = 1;
const maxStage = 10;
const stageMessages = {
    2: "Nice catch!",
    3: "The cat is happy!",
    4: "Nom nom nom!",
    5: "Wow, that's one wide cat!",
    6: "Meow!",
    7: "Cool Cat!",
    8: "Keep Clicking!",
    9: "That's one wide cat!",
    10: "Hamburger Cat!"
};
const gameArea = document.getElementById("gameBox");
const cat = document.getElementById("evolvingCat");
const catEat = document.getElementById("evolvingCatEat");
const stageMessage = document.getElementById("stageMessage");
const pointsDisplay = document.getElementById("pointsDisplay");
const victoryDisplay = document.getElementById("victoryDisplay");

function getRandomPosition() {
    const x = Math.floor(Math.random() * (gameArea.clientWidth - 50));
    const y = Math.floor(Math.random() * (gameArea.clientHeight - 50));

    return {x,y};
}
function showPoints() {
    pointsDisplay.classList.add("revealPoints");
    setTimeout(() => {
        pointsDisplay.classList.remove("revealPoints");
    }, 600);
}
function showVictory() {
    victoryDisplay.classList.add("revealVictory");
    setTimeout(() => {
        victoryDisplay.classList.remove("revealVictory");
    }, 600);
}
function eatCat() {
    const eatButton = document.getElementById("eatButton");

    eatButton.classList.add("hidden");

    cat.classList.remove("evolve");

    const interval = setInterval(() => {
        cat.src = `./images/HamburgerCatEat${frame}.png`;
        frame++;

        if (frame > 44) {
            clearInterval(interval);
            cat.classList.add("hidden");
        }
    }, 500);
}
function updateProgressBar() {
    const totalClicksForEvolution = 450;
    const progress = (totalClicks / totalClicksForEvolution) * 100;
    if (progress <= 100) {
        document.getElementById("progressBar").style.width = `${progress}%`;
    }
}
function spawnMouse() {
    let store = evolutionStage;
    const mouse = document.createElement("div");
    const position = getRandomPosition();

    mouse.classList.add("mouse");
    mouse.style.left = `${position.x}px`;
    mouse.style.top = `${position.y}px`;
    
    mouse.addEventListener("click", () => {
        buttonSoundEffect();
        if (clicks === level) {
            clicks = 0;
            level += 10;
            evolutionStage++;
            bgChange();
            updateProgressBar();
        }
        if (evolutionStage > maxStage) {
            evolutionStage = maxStage;
        }
        if (evolutionStage === maxStage) {
            const message = stageMessages[evolutionStage] || `Stage ${evolutionStage}`;

            if (frame <= 44) {
                document.getElementById("eatButton").classList.remove("hidden");
            }

            showVictory();

            cat.src = "./images/HamburgerCat11.png";

            cat.classList.remove("frame1");
            void cat.offsetWidth;
            cat.classList.add("evolve");

            cat.classList.remove("victor");
            void cat.offsetWidth;
            cat.classList.add("victor");    

            stageMessage.textContent = message;

            stageMessage.style.animation = "none";
            void stageMessage.offsetWidth;
            stageMessage.style.animation = "messages 2s ease-in-out";

            confetti({
                particleCount: 1000,
                spread: 300,
                origin: { x: 0.7, y: 0.4 }
            });
        }
        else if ((store < evolutionStage) && (evolutionStage > 1)) {
            const message = stageMessages[evolutionStage] || `Stage ${evolutionStage}`;

            showPoints();

            cat.src = `./images/Cat${evolutionStage}.png`;
            catEat.src = `./images/Cat${evolutionStage}Eat.png`;

            cat.classList.remove("frame1");
            void cat.offsetWidth;
            cat.classList.add("evolve");

            stageMessage.textContent = message;

            stageMessage.style.animation = "none";
            void stageMessage.offsetWidth;
            stageMessage.style.animation = "messages 2s ease-in-out";

            confetti({
                particleCount: 150,
                spread: 90,
                origin: { x: 0.7, y: 0.5 }
            });
        }
        else {
            showPoints();

            cat.src = `./images/Cat${evolutionStage}.png`;
            catEat.src = `./images/Cat${evolutionStage}Eat.png`;

            cat.classList.remove("evolve");
            cat.classList.remove("frame1");
            void cat.offsetWidth;
            cat.classList.add("frame1");

            catEat.classList.remove("frame2");
            void catEat.offsetWidth;
            catEat.classList.add("frame2");
            catEat.classList.remove("hidden");
            void catEat.offsetWidth;
            catEat.classList.add("hidden");
        }
        totalClicks++;
        clicks++;
        mouse.remove();
        updateProgressBar();
        spawnMouse();
    });

    gameArea.appendChild(mouse);
}

spawnMouse();
