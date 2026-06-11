let intervaloCronometro = null;

function iniciarCronometro() {
    //evitamos iniciar varias veces el cronometro si hacemos clics rapidos
    if (intervaloCronometro) return;

    const timerElement = document.querySelector('#game-timer .stat-value');

    intervaloCronometro = setInterval(() => {
        gameState.timer++;

        let minutos = Math.floor(gameState.timer / 60);
        let segundos = gameState.timer % 60;

        let minStr = minutos < 10 ? '0' + minutos : minutos;
        let segStr = segundos < 10 ? '0' + segundos : segundos;

        timerElement.textContent = ${minStr}:${segStr};
    }, 1000);
}

function detenerCronometro() {
    clearInterval(intervaloCronometro);
    intervaloCronometro = null;
}

function resetearCronometro() {
    detenerCronometro();
    gameState.timer = 0;
    document.querySelector('#game-timer .stat-value').textContent = "00:00";
}
