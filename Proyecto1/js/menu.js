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
