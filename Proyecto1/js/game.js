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
