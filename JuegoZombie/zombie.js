class Zombie {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.radioCabeza = 20;
        this.anchoCuerpo = 10;
        this.altoCuerpo = 40;
        this.velocidad = 2;
        this.direccion = 1; 
        this.explotado = false;
        this.particulasExplosion = [];
        this.cicloCaminar = 0;

        this.hitbox = {
            factorAncho: 2.5,
            factorAltura: 1.8,
            ajusteArriba: 10,
            ajusteAbajo: 15
        };
    }

    dibujar(ctx) {
        if (this.explotado) return;
        ctx.save();
        const x = this.x;
        const y = this.y;

        // Cabeza 
        ctx.beginPath();
        ctx.ellipse(
            x, 
            y - this.altoCuerpo - this.radioCabeza,
            this.radioCabeza + 2, 
            this.radioCabeza,
            0, 0, Math.PI * 2
        );
        ctx.fillStyle = "#8FBC8F";
        ctx.fill();
        ctx.strokeStyle = "#333";
        ctx.stroke();

        // Ojo
        ctx.beginPath();
        ctx.arc(
            x + 6 * this.direccion,
            y - this.altoCuerpo - 23,
            3, 0, Math.PI * 2
        );
        ctx.fillStyle = "red";
        ctx.fill();

        // Cuerpo 
        const cuerpoAncho = this.anchoCuerpo;
        const cuerpoAlto = this.altoCuerpo;
        ctx.beginPath();
        ctx.roundRect(
            x - cuerpoAncho / 2, y - cuerpoAlto,
            cuerpoAncho, cuerpoAlto, 6
        );
        ctx.fillStyle = "#6B8E23";
        ctx.fill();
        ctx.stroke();

        // Brazo 
        ctx.beginPath();
        ctx.moveTo(x, y - cuerpoAlto * 0.6);

        const movimientoVertical = Math.sin(this.cicloCaminar) * 3;
        ctx.quadraticCurveTo(
            x + 20 * this.direccion, 
            y - cuerpoAlto * 0.6 + movimientoVertical,
            x + 30 * this.direccion, 
            y - cuerpoAlto * 0.5 + movimientoVertical
        );
        ctx.lineWidth = 5;
        ctx.strokeStyle = "#8FBC8F";
        ctx.stroke();

        // Piernas
        const caminata = Math.sin(this.cicloCaminar);

        // Pierna izquierda
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.quadraticCurveTo(
            x - 10, y + 15 + caminata * 3,
            x - 12, y + 30 + caminata * 8
        );
        ctx.lineWidth = 5;
        ctx.strokeStyle = "#556B2F";
        ctx.stroke();

        // Pierna derecha
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.quadraticCurveTo(
            x + 4, y + 15 - caminata * 2,
            x + 6, y + 30 - caminata * 5
        );
        ctx.stroke();

        ctx.restore();
    }

    explotar() {
        this.explotado = true;
        for (let i = 0; i < 30; i++) {
            this.particulasExplosion.push({
                x: this.x,
                y: this.y,
                radio: Math.random() * 6 + 2, 
                velocidadX: (Math.random() - 0.5) * 5,
                velocidadY: (Math.random() - 0.5) * 5,
                alpha: 1,
                color: `hsl(${Math.random() * 20}, 100%, 50%)`
            });
        }
    }

    dibujarExplosion(ctx) {
        this.particulasExplosion.forEach((particula, index) => {
            ctx.globalAlpha = particula.alpha;
            ctx.fillStyle = particula.color;
            ctx.beginPath();
            ctx.arc(particula.x, particula.y, particula.radio, 0, Math.PI * 2);
            ctx.fill();
            
            particula.x += particula.velocidadX;
            particula.y += particula.velocidadY;
            particula.alpha -= 0.02;

            if (particula.alpha <= 0) {
                this.particulasExplosion.splice(index, 1);
            }
        });
        ctx.globalAlpha = 1;
    }

    actualizar(lienzoWidth) {
        if (!this.explotado) {
            this.x += this.velocidad * this.direccion;
            this.cicloCaminar += 0.1;
            
            // LLega al borde
            if (this.x > lienzoWidth - 50 ) {
                // PERDER
            }
        }
    }

    esGolpeado(clickX, clickY) {
        const { factorAncho, factorAltura, ajusteArriba, ajusteAbajo } = this.hitbox;
        const { anchoHitbox, alturaHitbox, hitboxArriba } = this.calcularDimensionesHitbox();
        
        return (clickX >= this.x - anchoHitbox/2 && 
                clickX <= this.x + anchoHitbox/2 && 
                clickY >= hitboxArriba && 
                clickY <= this.y + ajusteAbajo) && 
            !this.explotado;
    }

    dibujarHitbox(ctx) {
        const { anchoHitbox, alturaHitbox, hitboxArriba } = this.calcularDimensionesHitbox();
        const { ajusteAbajo } = this.hitbox;
        
        ctx.save();
        ctx.strokeStyle = 'rgba(255, 100, 100, 0.5)';
        ctx.lineWidth = 3;
        ctx.setLineDash([5, 3]);
        
        ctx.strokeRect(
            this.x - anchoHitbox/2,
            hitboxArriba,
            anchoHitbox,
            alturaHitbox + ajusteAbajo
        );
        
        ctx.restore();
    }

    calcularDimensionesHitbox() {
        const { factorAncho, factorAltura, ajusteArriba } = this.hitbox;
        return {
            anchoHitbox: this.radioCabeza * factorAncho,
            alturaHitbox: this.altoCuerpo + this.radioCabeza * factorAltura,
            hitboxArriba: this.y - this.altoCuerpo - this.radioCabeza - ajusteArriba
        };
    }
}

