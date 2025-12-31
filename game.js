class Ball {
    constructor(x, y, radius, color, speed) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        const angle = Math.random() * Math.PI * 2;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;
        this.mass = radius * radius;
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.2)';
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.closePath();
    }

    update(canvas, gravity, gyroX, gyroY) {
        this.vy += gravity;

        this.vx += gyroX * 0.5;
        this.vy += gyroY * 0.5;

        this.x += this.vx;
        this.y += this.vy;

        if (this.x + this.radius > canvas.width) {
            this.x = canvas.width - this.radius;
            this.vx *= -1;
        } else if (this.x - this.radius < 0) {
            this.x = this.radius;
            this.vx *= -1;
        }

        if (this.y + this.radius > canvas.height) {
            this.y = canvas.height - this.radius;
            this.vy *= -1;
        } else if (this.y - this.radius < 0) {
            this.y = this.radius;
            this.vy *= -1;
        }
    }
}

class Game {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.balls = [];
        this.gravity = 0.3;
        this.gyroX = 0;
        this.gyroY = 0;
        this.gyroActive = false;
        this.lastBallConfig = null;

        this.modal = document.getElementById('modal');

        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());

        this.setupControls();
        this.setupModal();
        this.animate();
    }

    resizeCanvas() {
        const rect = this.canvas.getBoundingClientRect();
        this.canvas.width = rect.width;
        this.canvas.height = rect.height;
    }

    setupModal() {
        const openModalBtn = document.getElementById('openModal');
        const closeModalBtn = document.querySelector('.close-modal');

        openModalBtn.addEventListener('click', () => {
            this.modal.classList.add('active');
        });

        closeModalBtn.addEventListener('click', () => {
            this.modal.classList.remove('active');
        });

        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.modal.classList.remove('active');
            }
        });
    }

    setupControls() {
        const sizeInput = document.getElementById('size');
        const speedInput = document.getElementById('speed');
        const sizeValue = document.getElementById('sizeValue');
        const speedValue = document.getElementById('speedValue');

        sizeInput.addEventListener('input', (e) => {
            sizeValue.textContent = e.target.value;
        });

        speedInput.addEventListener('input', (e) => {
            speedValue.textContent = e.target.value;
        });

        document.getElementById('addBall').addEventListener('click', () => {
            this.addBall();
            this.modal.classList.remove('active');
        });

        document.getElementById('quickAdd').addEventListener('click', () => {
            if (this.lastBallConfig) {
                this.addBallWithConfig(this.lastBallConfig);
            }
        });

        document.getElementById('clearAll').addEventListener('click', () => {
            this.balls = [];
            this.updateBallCount();
        });

        document.getElementById('enableGyro').addEventListener('click', () => {
            this.requestGyroscope();
        });
    }

    requestGyroscope() {
        if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
            DeviceOrientationEvent.requestPermission()
                .then(permissionState => {
                    if (permissionState === 'granted') {
                        this.enableGyroscope();
                    } else {
                        alert('Permesso sensori negato. Controlla le impostazioni del browser.');
                    }
                })
                .catch(err => {
                    console.error('Errore richiesta permesso:', err);
                    alert('Errore nella richiesta del permesso: ' + err.message);
                });
        } else if (window.DeviceOrientationEvent) {
            this.enableGyroscope();
        } else {
            alert('I sensori di orientamento non sono supportati su questo dispositivo.');
        }
    }

    enableGyroscope() {
        let orientationDetected = false;

        window.addEventListener('deviceorientation', (event) => {
            if (event.beta !== null && event.gamma !== null) {
                const beta = event.beta;
                const gamma = event.gamma;

                this.gyroX = gamma / 90;
                this.gyroY = (beta - 45) / 90;

                if (!orientationDetected) {
                    orientationDetected = true;
                    this.gyroActive = true;
                    document.getElementById('gyroStatus').textContent = 'Attivo';
                    document.getElementById('gyroStatus').style.color = '#27ae60';
                    console.log('Orientamento rilevato! Beta:', beta, 'Gamma:', gamma);
                }
            }
        }, true);

        setTimeout(() => {
            if (!orientationDetected) {
                console.log('Tentativo con DeviceMotion come fallback...');

                window.addEventListener('devicemotion', (event) => {
                    if (event.accelerationIncludingGravity) {
                        this.gyroX = (event.accelerationIncludingGravity.x || 0) / 10;
                        this.gyroY = (event.accelerationIncludingGravity.y || 0) / 10;

                        if (!this.gyroActive) {
                            this.gyroActive = true;
                            document.getElementById('gyroStatus').textContent = 'Attivo';
                            document.getElementById('gyroStatus').style.color = '#27ae60';
                            console.log('DeviceMotion attivato come fallback');
                        }
                    }
                });
            }
        }, 1000);

        setTimeout(() => {
            if (!this.gyroActive) {
                alert('Sensori non rilevati. Assicurati di:\n1. Essere su un dispositivo mobile\n2. Usare HTTPS (non http://)\n3. Aver dato il permesso nelle impostazioni del browser');
            }
        }, 3000);
    }

    addBall() {
        const size = parseInt(document.getElementById('size').value);
        const speed = parseInt(document.getElementById('speed').value);
        const color = document.getElementById('color').value;

        this.lastBallConfig = { size, speed, color };

        const quickAddBtn = document.getElementById('quickAdd');
        quickAddBtn.style.display = 'flex';

        const x = Math.random() * (this.canvas.width - size * 2) + size;
        const y = Math.random() * (this.canvas.height - size * 2) + size;

        this.balls.push(new Ball(x, y, size, color, speed));
        this.updateBallCount();
    }

    addBallWithConfig(config) {
        const x = Math.random() * (this.canvas.width - config.size * 2) + config.size;
        const y = Math.random() * (this.canvas.height - config.size * 2) + config.size;

        this.balls.push(new Ball(x, y, config.size, config.color, config.speed));
        this.updateBallCount();
    }

    updateBallCount() {
        document.getElementById('ballCount').textContent = this.balls.length;
    }

    checkCollision(ball1, ball2) {
        const dx = ball2.x - ball1.x;
        const dy = ball2.y - ball1.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < ball1.radius + ball2.radius) {
            const angle = Math.atan2(dy, dx);
            const sin = Math.sin(angle);
            const cos = Math.cos(angle);

            const vx1 = ball1.vx * cos + ball1.vy * sin;
            const vy1 = ball1.vy * cos - ball1.vx * sin;
            const vx2 = ball2.vx * cos + ball2.vy * sin;
            const vy2 = ball2.vy * cos - ball2.vx * sin;

            const vx1Final = ((ball1.mass - ball2.mass) * vx1 + 2 * ball2.mass * vx2) / (ball1.mass + ball2.mass);
            const vx2Final = ((ball2.mass - ball1.mass) * vx2 + 2 * ball1.mass * vx1) / (ball1.mass + ball2.mass);

            ball1.vx = vx1Final * cos - vy1 * sin;
            ball1.vy = vy1 * cos + vx1Final * sin;
            ball2.vx = vx2Final * cos - vy2 * sin;
            ball2.vy = vy2 * cos + vx2Final * sin;

            const overlap = ball1.radius + ball2.radius - distance;
            const separateX = overlap * cos / 2;
            const separateY = overlap * sin / 2;

            ball1.x -= separateX;
            ball1.y -= separateY;
            ball2.x += separateX;
            ball2.y += separateY;
        }
    }

    handleCollisions() {
        for (let i = 0; i < this.balls.length; i++) {
            for (let j = i + 1; j < this.balls.length; j++) {
                this.checkCollision(this.balls[i], this.balls[j]);
            }
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.balls.forEach(ball => {
            ball.update(this.canvas, this.gravity, this.gyroX, this.gyroY);
            ball.draw(this.ctx);
        });

        this.handleCollisions();

        requestAnimationFrame(() => this.animate());
    }
}

window.addEventListener('DOMContentLoaded', () => {
    new Game();
});
