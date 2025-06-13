const lienzo = document.getElementById("juegoCanvas");
const ctx = lienzo.getContext("2d");

// Ajustar lienzo al tamaño de la ventana
function ajustarLienzo() {
    lienzo.width = window.innerWidth;
    lienzo.height = window.innerHeight;
}
ajustarLienzo();
window.addEventListener('resize', ajustarLienzo);

// Crear zombies
const zombies = [];
for (let i = 0; i < 5; i++) {
    zombies.push(new Zombie(
        Math.random() * lienzo.width * 0.5 + 50,
        Math.random() * lienzo.height * 0.5 + 100
    ));
}

// Bucle principal
function bucleJuego() {
    ctx.clearRect(0, 0, lienzo.width, lienzo.height);
    
    zombies.forEach(zombie => {
        zombie.actualizar(lienzo.width);
        
        if (zombie.explotado) {
            zombie.dibujarExplosion(ctx);
        } else {
            zombie.dibujar(ctx);
            //zombie.dibujarHitbox(ctx); 
        }
    });

    requestAnimationFrame(bucleJuego);
}

// Evento de clic
lienzo.addEventListener("click", (e) => {
    zombies.forEach(zombie => {
        if (zombie.esGolpeado(e.clientX, e.clientY)) {
            zombie.explotar();
        }
    });
});

bucleJuego();