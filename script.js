// 1. Dynamic Typing Effect for Hero Banner
const words = ["Network Infrastructure", "IT Support & Maintenance", "Web Development", "Data Processing"];
let i = 0;
let timer;

function typingEffect() {
    let word = words[i].split("");
    var loopTyping = function() {
        if (word.length > 0) {
            document.getElementById('typed-text').innerHTML += word.shift();
        } else {
            setTimeout(deletingEffect, 2000);
            return false;
        }
        timer = setTimeout(loopTyping, 80);
    };
    loopTyping();
}

function deletingEffect() {
    let word = words[i].split("");
    var loopDeleting = function() {
        if (word.length > 0) {
            word.pop();
            document.getElementById('typed-text').innerHTML = word.join("");
        } else {
            if (words.length > (i + 1)) {
                i++;
            } else {
                i = 0;
            }
            setTimeout(typingEffect, 500);
            return false;
        }
        timer = setTimeout(loopDeleting, 40);
    };
    loopDeleting();
}

typingEffect();

// 2. Mobile Menu Toggle
const menuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const menuIcon = document.getElementById('menu-icon');

menuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
    if (mobileMenu.classList.contains('hidden')) {
        menuIcon.className = 'fas fa-bars text-xl';
    } else {
        menuIcon.className = 'fas fa-times text-xl';
    }
});

// 3. Interactive Network Node Particle Canvas Effect
const canvas = document.getElementById('network-canvas');
const ctx = canvas.getContext('2d');

let width, height;
let particles = [];
const mouse = { x: null, y: null, radius: 140 };

function resizeCanvas() {
    if (!canvas.parentElement) return;
    width = canvas.width = canvas.parentElement.offsetWidth;
    height = canvas.height = canvas.parentElement.offsetHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

window.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
});

class Particle {
    constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 1.2;
        this.vy = (Math.random() - 0.5) * 1.2;
        this.radius = Math.random() * 2 + 1;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 159, 28, 0.6)';
        ctx.fill();
    }
}

function initParticles() {
    particles = [];
    const count = Math.floor((width * height) / 14000);
    for (let i = 0; i < count; i++) {
        particles.push(new Particle());
    }
}

initParticles();
window.addEventListener('resize', initParticles);

function animateCanvas() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();

        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 110) {
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.strokeStyle = `rgba(121, 40, 202, ${1 - dist / 110})`;
                ctx.lineWidth = 0.6;
                ctx.stroke();
            }
        }

        if (mouse.x && mouse.y) {
            const mdx = particles[i].x - mouse.x;
            const mdy = particles[i].y - mouse.y;
            const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
            if (mdist < mouse.radius) {
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(mouse.x, mouse.y);
                ctx.strokeStyle = `rgba(255, 159, 28, ${1 - mdist / mouse.radius})`;
                ctx.lineWidth = 1;
                ctx.stroke();
            }
        }
    }

    requestAnimationFrame(animateCanvas);
}

animateCanvas();