const catalogologros = {
    primerPaso: { titulo: "Primer Paso", icono: "🗺", desc: "Encuentra tu primer par." },
    rachaCaliente: { titulo: "Buen Inicio", icono: "🔥", desc: "Encuentra 3 pares consecutivos." },
    sinTitubeos: { titulo: "Preciso", icono: "🎯", desc: "Acierta en tu primer intento del juego." },
    tanVelozComoUnaTortuga: { titulo: "Tan veloz como una tortuga", icono: "⚡️", desc: "Gana en menos de 30 segundos." }
};

function desbloquearLogro(idLogro) {
    const logro = catalogologros[idLogro];

    if (!logro) {
        console.error(El logro '${idLogro}' no existe.);
        return;
    }

    if (gameState.unlockedAchievements.includes(idLogro)) return;

    gameState.unlockedAchievements.push(idLogro);

    mostrarNotificacionFlotante(logro);

    const listaHUD = document.getElementById('achievements-list');
    if (listaHUD) {
        listaHUD.innerHTML += <li>${logro.icono} <strong>${logro.titulo}</strong></li>;
    }
    
    const listaFinal = document.getElementById('end-achievements-list');
    if(listaFinal) {
        listaFinal.innerHTML += <li>${logro.icono} ${logro.titulo}: <small>${logro.desc}</small></li>;
    }
}

function mostrarNotificacionFlotante(logro) {
    const contenedor = document.getElementById('notifications-container');
    
    const toast = document.createElement('div');
    toast.className = 'toast-notification parchment-texture';
    toast.innerHTML = `
        <div class="toast-icon">${logro.icono}</div>
        <div class="toast-text">
            <h4>Logro Desbloqueado</h4>
            <p>${logro.titulo}</p>
        </div>
    `;

    contenedor.appendChild(toast);

    setTimeout(() => {
        toast.style.animation = 'slideOutRight 0.5s forwards';
        setTimeout(() => toast.remove(), 500);
    }, 4000);
}
