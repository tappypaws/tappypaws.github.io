/*Start Button*/
const startButton = document.getElementById("startButton");
startButton.addEventListener("click", function() {
    window.location.href = "game.html";
});
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
/*Review Page*/
const reviewButton = document.getElementById("reviewButton");
reviewButton.addEventListener("click", function() {
    window.location.href = "review.html";
});
/*Credits Page*/
const creditsButton = document.getElementById("creditsButton");
creditsButton.addEventListener("click", function() {
    window.location.href = "credits.html";
});
/*Dark Theme*/
const themeButton = document.getElementById("darkMode");
const container = document.getElementById("container");
const box = document.getElementById("box");

if (themeButton) {
    themeButton.addEventListener("click", function () {
        document.body.classList.toggle("darkTheme");
        container.classList.toggle("darkTheme");
        box.classList.toggle("darkTheme");
    });
}
/*Tappy Paws Button*/
const tappyPawsButton = document.getElementById("tappyPawsButton");
tappyPawsButton.addEventListener("click", function() {
    window.location.href = "../TappyPaws/index.html";
});