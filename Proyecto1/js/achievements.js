const catalogologros = {
    primerPaso: { titulo: "Primer Paso", icono: "🗺", desc: "Encuentra tu primer par." },
    rachaCaliente: { titulo: "Buen Inicio", icono: "🔥", desc: "Encuentra 3 pares consecutivos." },
    sinTitubeos: { titulo: "Preciso", icono: "🎯", desc: "Acierta en tu primer intento del juego." },
    tanVelozComoUnaTortuga: { titulo: "Tan veloz como una tortuga", icono: "⚡️", desc: "Gana en menos de 45 segundos." }
};

function desbloquearLogro(idLogro) {
    const logro = catalogologros[idLogro];

    if (!logro) {
        console.error(el logro '${idLogro}' no existe.);
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
