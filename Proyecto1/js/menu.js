document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('setup-form');
    const modeSelect = document.getElementById('game-mode');
    const player2Wrapper = document.getElementById('player2-input-wrapper');
    const player2Input = document.getElementById('player2-name');

    modeSelect.addEventListener('change', (e) => {
        if (e.target.value === 'pvp') {
            //cuando elijamos pvp, mostramos al segundo jugador
            player2Wrapper.classList.remove('hidden');
            player2Input.setAttribute('required', 'true'); 
        } else {
            //si no, ocultamos al jugador 2 y eliminamos su valor
            player2Wrapper.classList.add('hidden');
            player2Input.removeAttribute('required');
        }
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault(); 

        //guardamos config
        gameState.mode = modeSelect.value;
        gameState.difficulty = document.querySelector('input[name="difficulty"]:checked').value;
        gameState.theme = document.getElementById('theme-select').value;
        
        gameState.players = [];
        gameState.players.push(document.getElementById('player1-name').value);
        
        if (gameState.mode === 'pvp') {
            gameState.players.push(player2Input.value);
        }

        document.getElementById('setup-screen').classList.replace('active-view', 'hidden-view');
        document.getElementById('game-screen').classList.replace('hidden-view', 'active-view');

        console.log("¡Expedición Iniciada! Configuración guardada:", gameState);
        
        const timerElement = document.getElementById('game-timer');
        if (gameState.mode === 'solo') {
            timerElement.classList.remove('hidden');
        } else {
            timerElement.classList.add('hidden');
        }

        generarTablero(); 
        inicializarHUD();
    });
});
