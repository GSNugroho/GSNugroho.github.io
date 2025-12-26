// Ganti tanggal ini dengan tanggal anniversary kalian (format: 'YYYY-MM-DD')
const anniversaryDate = new Date('2026-06-21');

// Tombol pesan spesial
const loveButton = document.getElementById('loveButton');
const specialMessage = document.getElementById('specialMessage');

loveButton.addEventListener('click', () => {
    if (specialMessage.classList.contains('hidden')) {
        specialMessage.classList.remove('hidden');
        loveButton.textContent = '💕 Terima Kasih Sudah Klik 💕';
        
        // Buat efek hati jatuh
        createFallingHearts();
    }
});

// Fungsi untuk membuat hati jatuh
function createFallingHearts() {
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.innerHTML = '❤️';
            heart.style.position = 'fixed';
            heart.style.left = Math.random() * 100 + '%';
            heart.style.top = '-50px';
            heart.style.fontSize = (Math.random() * 20 + 20) + 'px';
            heart.style.opacity = '0.8';
            heart.style.pointerEvents = 'none';
            heart.style.zIndex = '9999';
            heart.style.animation = `fall ${Math.random() * 3 + 3}s linear`;
            
            document.body.appendChild(heart);
            
            setTimeout(() => {
                heart.remove();
            }, 6000);
        }, i * 200);
    }
}

// CSS untuk animasi jatuh
const style = document.createElement('style');
style.textContent = `
    @keyframes fall {
        to {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Countdown timer
function updateCountdown() {
    const now = new Date();
    const difference = now - anniversaryDate;
    
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    
    document.getElementById('days').textContent = days;
    document.getElementById('hours').textContent = hours;
    document.getElementById('minutes').textContent = minutes;
    document.getElementById('seconds').textContent = seconds;
}

// Update countdown setiap detik
updateCountdown();
setInterval(updateCountdown, 1000);

// Animasi scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(el);
});

// Efek cursor hati
document.addEventListener('mousemove', (e) => {
    if (Math.random() < 0.05) {
        const heart = document.createElement('div');
        heart.innerHTML = '💗';
        heart.style.position = 'fixed';
        heart.style.left = e.clientX + 'px';
        heart.style.top = e.clientY + 'px';
        heart.style.fontSize = '12px';
        heart.style.opacity = '0.6';
        heart.style.pointerEvents = 'none';
        heart.style.zIndex = '9999';
        heart.style.animation = 'fadeOut 2s ease-out forwards';
        
        document.body.appendChild(heart);
        
        setTimeout(() => {
            heart.remove();
        }, 2000);
    }
});

// CSS untuk fade out
const fadeOutStyle = document.createElement('style');
fadeOutStyle.textContent = `
    @keyframes fadeOut {
        to {
            opacity: 0;
            transform: translateY(-30px);
        }
    }
`;
document.head.appendChild(fadeOutStyle);

console.log('💕 Website dibuat dengan cinta 💕');
