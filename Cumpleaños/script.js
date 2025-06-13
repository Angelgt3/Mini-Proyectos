document.addEventListener('DOMContentLoaded', () => {
    const card = document.getElementById('card');
    const confettiContainer = document.getElementById('confetti');
    const balloonsContainer = document.getElementById('balloons-container');
    let celebrationInterval;

    card.addEventListener('click', function() {
        this.classList.toggle('open');
        if (this.classList.contains('open')) {
            startCelebration();
        } else {
            stopCelebration();
        }
    });

    function startCelebration() {
        // Mostrar elementos
        confettiContainer.style.opacity = '1';
        balloonsContainer.style.opacity = '1';
        
        // Crear confeti y globos
        celebrationInterval = setInterval(() => {
            createConfetti();
            createBalloons(2);
        }, 1000);
        
        createConfetti();
        createBalloons(5);
    }

    function stopCelebration() {
        clearInterval(celebrationInterval);
    }

    function createBalloons(count) {
        const colors = ['#4B0082', '#6A0DAD', '#9370DB', '#B19CD9', '#E6E6FA'];
        
        for (let i = 0; i < count; i++) {
            const balloon = document.createElement('div');
            balloon.className = 'balloon';
            
            // Posición aleatoria en la parte superior
            balloon.style.left = `${Math.random() * 100}%`;
            balloon.style.top = `${-60 - (Math.random() * 50)}px`;
            
            // Tamaño aleatorio
            const size = 30 + Math.random() * 30;
            balloon.style.width = `${size}px`;
            balloon.style.height = `${size * 1.25}px`;
            
            // Color y estilo
            balloon.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            balloon.style.opacity = Math.random() * 0.7 + 0.3;
            
            // Animación de caída
            const duration = 5 + Math.random() * 10;
            balloon.style.animation = `balloon-fall ${duration}s linear forwards`;
            
            balloonsContainer.appendChild(balloon);
            
            // Eliminar después de la animación
            setTimeout(() => {
                balloon.remove();
            }, duration * 1000);
        }
    }

    function createConfetti() {
        const colors = ['#4B0082', '#6A0DAD', '#9370DB', '#E6E6FA'];
        
        for (let i = 0; i < 80; i++) {
            const confettiPiece = document.createElement('div');
            confettiPiece.className = 'confetti-piece';
            
            // Posición aleatoria en la parte superior
            confettiPiece.style.left = `${Math.random() * 100}%`;
            confettiPiece.style.top = `${-20 - (Math.random() * 30)}px`;
            
            // Tamaño y forma aleatorios
            const size = 5 + Math.random() * 5;
            confettiPiece.style.width = `${size}px`;
            confettiPiece.style.height = `${size}px`;
            
            // Color y rotación
            confettiPiece.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confettiPiece.style.transform = `rotate(${Math.random() * 360}deg)`;
            
            // Animación de caída
            const duration = 3 + Math.random() * 5;
            confettiPiece.style.animation = `confetti-fall ${duration}s linear forwards`;
            
            confettiContainer.appendChild(confettiPiece);
            
            // Eliminar después de la animación
            setTimeout(() => {
                confettiPiece.remove();
            }, duration * 1000);
        }
    }

});
