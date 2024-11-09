document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById('cubesCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const squares = [];
    const squareCount = 20;

    class Square {
        constructor(x, y, size, dx, dy, color) {
            this.x = x;
            this.y = y;
            this.size = size;
            this.dx = dx;
            this.dy = dy;
            this.color = color;
        }

        draw() {
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x, this.y, this.size, this.size);
        }

        update() {
            if (this.x + this.size > canvas.width || this.x < 0) {
                this.dx = -this.dx;
                this.changeColor();
            }
            if (this.y + this.size > canvas.height || this.y < 0) {
                this.dy = -this.dy;
                this.changeColor();
            }
            this.x += this.dx;
            this.y += this.dy;
            this.draw();
        }

        changeColor() {
            this.color = `hsl(${Math.random() * 360}, 100%, 50%)`;
        }
    }

    function init() {
        for (let i = 0; i < squareCount; i++) {
            const size = Math.random() * 50 + 20;
            const x = Math.random() * (canvas.width - size);
            const y = Math.random() * (canvas.height - size);
            const dx = (Math.random() - 0.5) * 4;
            const dy = (Math.random() - 0.5) * 4;
            const color = `hsl(${Math.random() * 360}, 100%, 50%)`;
            squares.push(new Square(x, y, size, dx, dy, color));
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        squares.forEach(square => square.update());
        requestAnimationFrame(animate);
    }

    init();
    animate();

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        squares.length = 0;
        init();
    });
});
