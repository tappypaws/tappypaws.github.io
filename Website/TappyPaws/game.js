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
let currentWord = "";
let typedIndex = 0;
let totalWordsTyped = 0; 
let wordsTyped = 0;      
let level = 2;
let evolutionStage = 1;
let frame = 1;
const maxStage = 10;
const stageMessages = {
    2: "The dog is starting to grow!",
    3: "Growing strong!",
    4: "Looking sharp!",
    5: "Wow, this is one long dog!",
    6: "Bark bark!",
    7: "Cool Dog!",
    8: "Keep typing!",
    9: "That's one long dog!",
    10: "Hot Dog!"
};
const wordList = ["ability", "able", "about", "above", "accept", "according", "account", "across", "act", "action", "activity", "actually", "add", "address", "administration", "admit", "adult", "affect", "after", "again", "against", "age", "agency", "agent", "ago", "agree", "agreement", "ahead", "air", "all", "allow", "almost", "alone", "along", "already", "also", 
                  "baby", "back", "bad", "bag", "ball", "bank", "bar", "base", "beat", "beautiful", "because", "become", "bed", "before", "begin", "behavior", "behind", "believe", "benefit", "best", "better", "between", "beyond", 
                  "call", "camera", "campaign", "can", "candidate", "capital", "career", "carry", "case", "catch", "cause", "cell", "center", "central", "century", "certain", "chair", "challenge", "chance", "change", "character", "choice", "choose", "citizen", "coach", "color", "come", "common", "computer", "contain", "control", "create", 
                  "dark", "data", "debate", "decade", "decide", "describe", "design", "detail", "determine", "develop", "discover", "discuss", "dog", "draw", "dream", "drive", 
                  "early", "effect", "either", "end", "enjoy", "enough", "enter", "entire", "environment", "everybody", "everyone", "everything", "expect", "explain", "eye", 
                  "face", "fact", "family", "fast", "feel", "field", "floor", "fly", "form", "former", "forward", "friend", "front", "future", 
                  "game", "garden", "gas", "girl", "good", "government", "grow", "growth", "guess", 
                  "hair", "happy", "hard", "health", "heart", "heat", "heavy", "help", "herself", "him", "himself", "history", "hospital", "hot", "hour", "house", "human", 
                  "idea", "identify", "image", "important", "include", "individual", "industry", "information", "inside","international", "interview", "it", "item", "itself", 
                  "job", "join", "just", 
                  "keep", "kid", "kitchen", "knowledge", 
                  "land", "language", "large", "laugh", "learn", "leave", "left", "letter", "level", "life", "light", "like", "list", "listen", "little", "live", "long", "lose", "love", 
                  "machine", "main", "maintain", "major", "make", "man", "manage", "mean", "medical", "meet", "memory", "model", "modern", "money", "mouth", "move", "music", 
                  "name", "natural", "nature", "necessary", "need", "nice", "north", "note", "notice", 
                  "occur", "office", "officer", "official", "oil", "old", "one", "only", "open", "opportunity", "option", "order", "organization", "outside", "owner", 
                  "page", "painting", "paper", "past", "patient", "pattern", "pay", "peace", "people", "perform", "performance", "perhaps", "period", 
                  "physical", "pick", "plant", "play", "power", "present", "pretty", "price", "problem", "public", "purpose", "push", 
                  "quality", "question", "quickly", "quite", 
                  "race", "radio", "raise", "range", "reach", "ready", "real", "red", "reflect", "relate", "remain", "represent", "respond", "rest", "result", "return", "reveal", "rule", "run",
                  "safe", "school", "scientist", "season", "seat", "section", "security", "serious", "serve", "service", "shake", "share", "short", "shoulder", "show", "situation", "smile", "somebody", "someone", "something", "sometimes", "source", "speech", "sport", "standard", "star", "start", "state", "station", "stay", "still", "store", "story", "strategy", "study", "success", "successful", "suggest", 
                  "talk", "task", "technology", "television", "term", "that", "the", "their", "them", "themselves", "theory", "there", "these", "they", "thing", "thought", "thousand", "throughout", "throw", "thus", "time", "together", "training", "treatment", "tree", "truth", "try", 
                  "understand", "until", "usually", 
                  "value", "various", "victim", "view", "visit", "voice", "vote", 
                  "wait", "walk", "wall", "want", "watch", "water", "way", "window", "wish", "word", "work", "world", "worry", "would", "write", "writer", "wrong",
                  "yard", "year", "yes", "yet", "you", "young", "your", "yourself", 
                  "rizz", "blud", "bro", "crazy", "sigma", "sussy", "among us", "gyatt", "skibidi", "roblox", "minecraft", "toilet", "goofy", "cap", "fanum tax", "alpha", "beta", "ate", "rizzler", "ohio", "glizzy", "bababooey", "oiia oiia", 
                  "aura", "looksmaxxing", "balls", "deez nuts", "mew", "meow", "bark",
                  "dichlorodifluoromethanes", "electrocardiographically", "intercomprehensibilities", "microelectrophoretically", "overintellectualizations", "phosphatidylethanolamine"];
const stageMessage = document.getElementById("stageMessage");
const pointsDisplay = document.getElementById("pointsDisplay");
const victoryDisplay = document.getElementById("victoryDisplay");
const wordDisplay = document.getElementById("wordDisplay");
const dog = document.getElementById("evolvingDog");
const dogEat = document.getElementById("evolvingDogEat");

function getRandomWord() {
    return wordList[Math.floor(Math.random() * wordList.length)];
}
function renderWord() {
    const correct = `<span class="correct">${currentWord.slice(0, typedIndex)}</span>`;
    const rest = currentWord.slice(typedIndex);
    wordDisplay.innerHTML = correct + rest;
}
function startNewWord() {
    currentWord = getRandomWord();
    typedIndex = 0;
    renderWord();
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
function eatDog() {
    const eatButton = document.getElementById("eatButton");

    eatButton.classList.add("hidden");

    dog.classList.remove("evolve");

    const interval = setInterval(() => {
        dog.src = `./images/HotDogEat${frame}.PNG`;
        frame++;

        if (frame > 24) {
            clearInterval(interval);
            dog.classList.add("hidden");
        }
    }, 500);    
}
function updateProgressBar() {
    const totalWordsForEvolution = 225;
    const progress = (totalWordsTyped / totalWordsForEvolution) * 100;
    if (progress <= 100) {
        document.getElementById("progressBar").style.width = `${progress}%`;
    }
}

document.addEventListener("keydown", (e) => {
    let store = evolutionStage;

    if (e.key.length === 1) {
        const expectedChar = currentWord[typedIndex];
        if (e.key === expectedChar) {
            typedIndex++;
            if(typedIndex === currentWord.length) {
                totalWordsTyped++;
                wordsTyped++;
                updateProgressBar();
                if(wordsTyped === level) {
                    wordsTyped = 0;
                    // level += 5;
                    evolutionStage++;
                    updateProgressBar();
                    if (evolutionStage > maxStage) {
                        evolutionStage = maxStage;
                    }
                }
                if (evolutionStage === maxStage) {
                    const message = stageMessages[evolutionStage] || `Stage ${evolutionStage}`;

                    if (frame <= 24) {
                        document.getElementById("eatButton").classList.remove("hidden");
                    }  

                    showVictory();
                    
                    dog.src = "./images/HotDog11.png";

                    dog.classList.remove("frame1");
                    void dog.offsetWidth;
                    dog.classList.add("evolve");

                    dog.classList.remove("victor");
                    void dog.offsetWidth;
                    dog.classList.add("victor");    

                    stageMessage.textContent = message;

                    stageMessage.style.animation = "none";
                    void stageMessage.offsetWidth;
                    stageMessage.style.animation = "messages 2s ease-in-out";

                    confetti({
                        particleCount: 2000,
                        spread: 500,
                        origin: { y: 0.6 }
                    });
                }
                else if ((store < evolutionStage) && (evolutionStage > 1)) {
                    const message = stageMessages[evolutionStage] || `Stage ${evolutionStage}`;

                    showPoints();
                    
                    dog.src = `./images/Dog${evolutionStage}.png`;
                    dogEat.src = `./images/Dog${evolutionStage}Eat.png`;

                    dog.classList.remove("frame1");
                    void dog.offsetWidth;
                    dog.classList.add("evolve");

                    stageMessage.textContent = message;

                    stageMessage.style.animation = "none";
                    void stageMessage.offsetWidth;
                    stageMessage.style.animation = "messages 2s ease-in-out";

                    confetti({
                        particleCount: 150,
                        spread: 90,
                        origin: { y: 0.6 }
                    });
                }
                else {
                    showPoints();

                    dog.src = `./images/Dog${evolutionStage}.png`;
                    dogEat.src = `./images/Dog${evolutionStage}Eat.png`;

                    dog.classList.remove("evolve");
                    dog.classList.remove("frame1");
                    void dog.offsetWidth;
                    dog.classList.add("frame1");

                    dogEat.classList.remove("frame2");
                    void dogEat.offsetWidth;
                    dogEat.classList.add("frame2");
                    dogEat.classList.remove("hidden");
                    void dogEat.offsetWidth;
                    dogEat.classList.add("hidden");
                }
                setTimeout(startNewWord, 0);    
            }
        else {
            renderWord();
        }
        }
    else {
        wordDisplay.innerHTML = 
        `<span class="correct">${currentWord.slice(0, typedIndex)}</span>` +
        `<span class="incorrect">${currentWord[typedIndex]}</span>` +
        currentWord.slice(typedIndex + 1);
    }
    }
});

updateProgressBar();
startNewWord();
