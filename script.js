const canvas = document.getElementById('ambient-canvas');
const ctx = canvas?.getContext('2d');

let width, height;
let particles = [];

function init() {
    if (!canvas) return;
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    
    // Create particles
    particles = [];
    const particleCount = Math.min(Math.floor(width * height / 15000), 100);
    
    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            radius: Math.random() * 1.5 + 0.5,
            vx: (Math.random() - 0.5) * 0.2,
            vy: (Math.random() - 0.5) * 0.2,
            alpha: Math.random() * 0.4 + 0.1
        });
    }
}

function animate() {
    if (!canvas) return;
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, width, height);
    
    particles.forEach(p => {
        // Move
        p.x += p.vx;
        p.y += p.vy;
        
        // Wrap around
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;
        
        // Draw
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(6, 182, 212, ${p.alpha})`; // Cyan dots
        ctx.fill();
    });
}

if (canvas) {
    window.addEventListener('resize', init);
    init();
    animate();
}

// --- Mobile Menu Logic ---
const menuBtn = document.getElementById('mobile-menu-btn');
const closeBtn = document.getElementById('close-menu-btn');
const drawer = document.getElementById('mobile-menu-drawer');
const overlay = document.getElementById('mobile-menu-overlay');
const mobileLinks = document.querySelectorAll('.mobile-nav-link');

function toggleMenu(open) {
    if (open) {
        drawer.classList.remove('translate-x-full');
        overlay.classList.remove('opacity-0');
        overlay.classList.add('opacity-100');
        document.body.style.overflow = 'hidden';
    } else {
        drawer.classList.add('translate-x-full');
        overlay.classList.remove('opacity-100');
        overlay.classList.add('opacity-0');
        document.body.style.overflow = '';
    }
}

menuBtn?.addEventListener('click', () => toggleMenu(true));
closeBtn?.addEventListener('click', () => toggleMenu(false));
overlay?.addEventListener('click', () => toggleMenu(false));

mobileLinks.forEach(link => {
    link.addEventListener('click', () => toggleMenu(false));
});

// --- Smooth Scroll for Anchor Links ---
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});




