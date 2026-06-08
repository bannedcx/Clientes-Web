let primeraCarta = null;
let segundaCarta = null;

//funcion al hacer clic en una carta
function procesarJugada(cartaSeleccionada) {
    if (gameState.isBoardLocked) return;
    if (cartaSeleccionada === primeraCarta) return;
    if (cartaSeleccionada.classList.contains('matched')) return; 

    if (gameState.moves === 0 && !primeraCarta && gameState.mode === 'solo') {
        iniciarCronometro();
    }

    //volteamos la carta
    cartaSeleccionada.classList.add('flipped');

    // si no hay ninguna carta, la guardamos como primera
    if (!primeraCarta) {
        primeraCarta = cartaSeleccionada;
        return;
    }

    segundaCarta = cartaSeleccionada;
    gameState.moves++;

    document.querySelector('#move-counter .stat-value').textContent = gameState.moves;
    
    verificarCoincidencia();
}

function verificarCoincidencia() {
    let esCoincidencia = primeraCarta.dataset.icon === segundaCarta.dataset.icon;

    if (esCoincidencia) {
        deshabilitarCartas();
    } else {
        desvoltearCartas();
    }
}

function deshabilitarCartas() {
    primeraCarta.classList.add('matched');
    segundaCarta.classList.add('matched');
    
    gameState.matches++; 
    sumarPunto(); 
    
    gameState.currentStreak++;
    
    desbloquearLogro('primerPaso');
    
    if (gameState.currentStreak === 3) {
        desbloquearLogro('rachaCaliente');
    }
    
    if (gameState.moves === 1 && gameState.matches === 1) {
        desbloquearLogro('sinTitubeos');
    }

    verificarFinDePartida();
    if (gameState.mode === 'solo' && gameState.timer < 45) {
            desbloquearLogro('tanVelozComoUnaTortuga');
        }
    resetearTurno();
}

function desvoltearCartas() {

    gameState.currentStreak = 0; 
    gameState.isBoardLocked = true;
    
    primeraCarta.classList.add('error-shake');
    segundaCarta.classList.add('error-shake');

    setTimeout(() => {
        primeraCarta.classList.remove('flipped', 'error-shake');
        segundaCarta.classList.remove('flipped', 'error-shake');

        cambiarTurno();
        resetearTurno();
    }, 1000);
}

function resetearTurno() {
    primeraCarta = null;
    segundaCarta = null;
    gameState.isBoardLocked = false;
}

function verificarFinDePartida() {
    let paresNecesarios;
    
    switch (gameState.difficulty) {
        case '4x4': paresNecesarios = 8; break;
        case '6x6': paresNecesarios = 18; break;
        case '8x8': paresNecesarios = 32; break;
    }

    if (gameState.matches === paresNecesarios) {
        
        if (gameState.mode === 'solo' && gameState.timer < 45) {
            desbloquearLogro('tanVelozComoUnaTortuga');
        }

        gameState.isBoardLocked = true;
        
        if (gameState.mode === 'solo') {
            detenerCronometro();
        }

        setTimeout(() => {
            mostrarPantallaFinal();
        }, 500); 
    }
}
