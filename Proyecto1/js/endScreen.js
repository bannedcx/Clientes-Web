function mostrarPantallaFinal() {
    const mensajeFinal = document.getElementById('end-message');
    
    if (gameState.mode === 'pvp') {
        let p1Score = gameState.scores[0];
        let p2Score = gameState.scores[1];
        
        if (p1Score > p2Score) {
            mensajeFinal.textContent = `¡El Explorador ${gameState.players[0]} ha ganado con ${p1Score} pares!`;
        } else if (p2Score > p1Score) {
            mensajeFinal.textContent = `¡El Explorador ${gameState.players[1]} ha ganado con ${p2Score} pares!`;
        } else {
            mensajeFinal.textContent = `¡Increíble! Ha sido un empate con ${p1Score} pares cada uno.`;
        }
    } else {
        mensajeFinal.textContent = `¡Impresionante exploración, ${gameState.players[0]}! Has descubierto todos los secretos.`;
    }

    const statsList = document.getElementById('final-stats-list');
    statsList.innerHTML = ''; 

    statsList.innerHTML += `<li><strong>Movimientos totales:</strong> ${gameState.moves}</li>`;
    statsList.innerHTML += `<li><strong>Pares encontrados:</strong> ${gameState.matches}</li>`;
    
    let precision = gameState.moves > 0 ? Math.round((gameState.matches / gameState.moves) * 100) : 0;
    statsList.innerHTML += `<li><strong>Precisión:</strong> ${precision}%</li>`;
    
    if (gameState.mode === 'solo') {
        const tiempoFinal = document.querySelector('#game-timer .stat-value').textContent;
        statsList.innerHTML += `<li><strong>Tiempo total:</strong> ${tiempoFinal}</li>`;
    }

    document.getElementById('end-screen').classList.replace('hidden-view', 'active-view');
}

// Agregamos un listener para el botón de "Volver al Menú" y "Jugar de Nuevo"
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('back-to-menu-btn').addEventListener('click', () => {
        location.reload();
    });

    document.getElementById('play-again-btn').addEventListener('click', () => {
        document.getElementById('end-screen').classList.replace('active-view', 'hidden-view');
        gameState.moves = 0;
        gameState.matches = 0;
        document.querySelector('#move-counter .stat-value').textContent = "0";
        if (gameState.mode === 'solo') resetearCronometro();
        
        generarTablero();
    });

    document.getElementById('reset-btn').addEventListener('click', () => {
        location.reload();
    });
});
