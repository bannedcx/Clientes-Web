function inicializarHUD() {
    const playersStats = document.querySelector('.players-stats');
    
    if (gameState.mode === 'pvp') {
        playersStats.innerHTML = `
            <div id="p1-score-box" class="player-box active-turn">
                <h4>1. ${gameState.players[0]}</h4>
                <p>Pares: <span id="p1-score">0</span></p>
            </div>
            <div id="p2-score-box" class="player-box">
                <h4>2. ${gameState.players[1]}</h4>
                <p>Pares: <span id="p2-score">0</span></p>
            </div>
        `;
    } else {
        let textoModo = gameState.mode === 'solo' ? 'Cronometrado' : 'Práctica Libre';
        playersStats.innerHTML = `
            <div class="player-box">
                <h4>${gameState.players[0]}</h4>
                <p>Modo: ${textoModo}</p>
            </div>
        `;
    }
}

function sumarPunto() {
    if (gameState.mode !== 'pvp') return;

    gameState.scores[gameState.currentPlayerIndex]++;
    
    document.getElementById(`p${gameState.currentPlayerIndex + 1}-score`).textContent = gameState.scores[gameState.currentPlayerIndex];
}

function cambiarTurno() {
    if (gameState.mode !== 'pvp') return;

    document.getElementById(`p${gameState.currentPlayerIndex + 1}-score-box`).classList.remove('active-turn');

    gameState.currentPlayerIndex = gameState.currentPlayerIndex === 0 ? 1 : 0;

    document.getElementById(`p${gameState.currentPlayerIndex + 1}-score-box`).classList.add('active-turn');
}
