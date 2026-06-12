function generarTablero() {
    const boardContainer = document.getElementById('board-container');
    boardContainer.innerHTML = '';

    //determinamos f y c segun dificultad
    let filas, columnas;
    switch (gameState.difficulty) {
        case '4x4': filas = 4; columnas = 4; break;
        case '6x6': filas = 6; columnas = 6; break;
        case '8x8': filas = 8; columnas = 8; break;
    }

    const totalCartas = filas * columnas;
    const totalPares = totalCartas / 2;

    //seleccionamos los iconos segun la tematica
    const themeIcons = gameThemes[gameState.theme];
    
    let cartasSeleccionadas = themeIcons.slice(0, totalPares);
    
    //duplicamos las cartas para poder formar pares
    let mazo = [...cartasSeleccionadas, ...cartasSeleccionadas];

    for (let i = mazo.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [mazo[i], mazo[j]] = [mazo[j], mazo[i]];
    }

    boardContainer.style.display = 'grid';
    boardContainer.style.gridTemplateColumns = `repeat(${columnas}, 1fr)`;
    boardContainer.style.gap = '10px';
    boardContainer.style.maxWidth = columnas === 8 ? '800px' : (columnas === 6 ? '600px' : '400px');
    boardContainer.style.margin = '0 auto';

    //creamos las cartas en el DOM
    mazo.forEach((icono, index) => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.dataset.icon = icono;
        cardElement.dataset.index = index;

        cardElement.innerHTML = `
            <div class="card-inner">
                <div class="card-front parchment-texture"></div>
                <div class="card-back">${icono}</div>
            </div>
        `;

        cardElement.addEventListener('click', () => {
            procesarJugada(cardElement);
        });

        boardContainer.appendChild(cardElement);
    });

    console.log(`Tablero generado: ${filas}x${columnas} con temática ${gameState.theme}`);
}
