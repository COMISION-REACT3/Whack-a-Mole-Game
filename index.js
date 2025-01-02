// Selecciona el contenedor principal del juego y todos los elementos de los "items" (casillas de juego)
const gameContainer = document.querySelector(".container");
const allMoleItems = document.querySelectorAll(".item");

// Carga los sonidos: el sonido del golpe (whack) y la música de fondo
const whackSound = new Audio('/sound/whack.mp3');
const backgroundMusic = new Audio('/sound/music.mp3');
backgroundMusic.loop = true; //configura para que se repita automaticamente
backgroundMusic.volume = 0.3; //ajusta el volumen de la musica

// Variables para gestionar el juego
let startGame, startTime;
let countDown = 20;
let score = 0;

// Elementos HTML donde se muestran el tiempo y el puntaje
const timeCount = document.getElementById('time-count');
const scoreCount = document.getElementById('score-count');

// Botones para iniciar y reiniciar el juego
const startButton = document.getElementById('start-game');
const restartButton = document.getElementById('restart-game');

// Evento que se activa al hacer clic en el botón de inicio del juego
startButton.addEventListener("click", () => {
    startGameLogic();
    startButton.style.display = "none";
    restartButton.style.display = "none";
    backgroundMusic.play();
})

// Evento que se activa al hacer clic en el botón de reinicio
restartButton.addEventListener("click", () =>{
    resetGame();
    startButton.style.display = "block";
    restartButton.style.display = "none"
})

// Evento para detectar clics dentro del contenedor del juego
gameContainer.addEventListener("click", (e) => {
    //verificar si el click ocurrio en un topo
    if(e.target.classList.contains("mole-clicked")){
        whackSound.currentTime = 0; //reinicia el sonido del golpe si ya se estaba reproduciendo

        whackSound.play(); //reproduce el sonido del golpe

        score++; //incrementar el puntaje
        scoreCount.innerHTML = score; //actualizar el puntaje en la pantalla

        //muestra el texto animado donde haya ocurrido el click
        const bushElement = e.target.parentElement.previousElementSibling; //Este método selecciona el hermano anterior en el árbol DOM desde el elemento padre (parentElement).En este contexto, se asume que el arbusto (o la ubicación donde debe mostrarse el texto) es el elemento hermano que está justo antes del topo en el DOM. 

        let textElement = document.createElement("span");
        textElement.setAttribute("class", "whack-text");
        textElement.innerHTML = "Whack!";
        bushElement.appendChild(textElement);

        //eliminar el texto "Whack!" despues de 300 milisegundos
        setTimeout(() => {
            textElement.remove();
        }, 300);
    }
});




