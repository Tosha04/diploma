const canvas = document.getElementById('vizitkaCanvas');
const ctx = canvas.getContext('2d');

const nameInput = document.getElementById('input-name');
const jobInput = document.getElementById('input-job');
const phoneInput = document.getElementById('input-phone');
const emailInput = document.getElementById('input-email');
const downloadBtn = document.getElementById('download-btn');

// 1. Конфігурація шаблонів
const templatesConfigs = {
    'modern-minimal': {
        src: 'img/minimal.jpg',
        name: { x: 240, y: 250, maxWidth: 720, baseSize: 70, color: '#0f172a', font: '900',  align: 'left' },
        job: { x: 240, y: 300, maxWidth: 720, baseSize: 30, color: '#0f172a', font: 'normal',  align: 'left' },
        phone: { x: 240, y: 500, maxWidth: 720, baseSize: 22, color: '#0f172a', font: 'normal',  align: 'left' },
        email: { x: 240, y: 540, maxWidth: 720, baseSize: 22, color: '#0f172a', font: 'normal',  align: 'left' }
    },
    'creative-studio': {
        src: 'img/designandmedia.jpg',
        name: { x: 50, y: 350, maxWidth: 850, baseSize: 100, color: '#0f172a', font: '900', family: "'Playfair Display', serif", align: 'left' },
        job: { x: 950, y: 130, maxWidth: 400, baseSize: 30, color: '#0f172a', font: 'normal', family: "'Playfair Display', serif", align: 'right' },
        phone: { x: 950, y: 500, maxWidth: 400, baseSize: 22, color: '#0f172a', font: 'normal', family: "'Playfair Display', serif", align: 'right' },
        email: { x: 950, y: 540, maxWidth: 400, baseSize: 22, color: '#0f172a', font: 'normal', family: "'Playfair Display', serif", align: 'right' }
    },
    'dark-elite': {
        src: 'img/darkelite.jpg',
        name: { x: 497, y: 300, maxWidth: 850, baseSize: 50, color: '#dab158', font: '900', family: "'Playfair Display', serif", align: 'center' },
        job: { x: 497, y: 130, maxWidth: 400, baseSize: 30, color: '#dab158', font: 'normal', family: "'Playfair Display', serif",  align: 'center' },
        phone: { x: 497, y: 440, maxWidth: 400, baseSize: 22, color: '#dab158', font: 'normal', align: 'center' },
        email: { x: 497, y: 480, maxWidth: 400, baseSize: 22, color: '#dab158', font: 'normal',  align: 'center' }
    },
    'eco-leaf': {
        src: 'img/ecoleaf.jpg',
        name: { x: 240, y: 250, maxWidth: 720, baseSize: 70, color: '#697b43', font: '900', family: "'Roboto Slab', serif", align: 'left' },
        job: { x: 245, y: 300, maxWidth: 720, baseSize: 30, color: '#646044', font: 'normal', family: "'Courier Prime', monospace", align: 'left' },
        phone: { x: 245, y: 340, maxWidth: 720, baseSize: 22, color: '#646044', font: 'normal', family: "'Courier Prime', monospace", align: 'left' },
        email: { x: 245, y: 380, maxWidth: 720, baseSize: 22, color: '#646044', font: 'normal', family: "'Courier Prime', monospace", align: 'left' }
    },
    'tech-pulse': {
        src: 'img/techpulse.jpg',
        name: { x: 50, y: 200, maxWidth: 850, baseSize: 80, color: '#ffffff', font: '900', family: "'Playfair Display', serif", align: 'left' },
        job: { x: 50, y: 250, maxWidth: 400, baseSize: 30, color: '#ffffff', font: 'normal', family: "'Courier Prime', monospace", align: 'left' },
        phone: { x: 50, y: 290, maxWidth: 400, baseSize: 22, color: '#ffffff', font: 'normal', family: "'Courier Prime', monospace", align: 'left' },
        email: { x: 50, y: 330, maxWidth: 400, baseSize: 22, color: '#ffffff', font: 'normal', family: "'Courier Prime', monospace", align: 'left' }
    },
    'gold-line': {
        src: 'img/goldline.jpg',
        name: { x: 497, y: 300, maxWidth: 850, baseSize: 50, color: '#dab158', font: '900',  family: "'Roboto Slab'", align: 'center' },
        job: { x: 497, y: 470, maxWidth: 400, baseSize: 30, color: '#dab158', font: 'normal', family: "'Roboto Slab'", align: 'center' },
        phone: { x: 497, y: 510, maxWidth: 400, baseSize: 22, color: '#dab158', font: 'normal', family: "'Roboto Slab'", align: 'center' },
        email: { x: 497, y: 550, maxWidth: 400, baseSize: 22, color: '#dab158', font: 'normal', family: "'Roboto Slab'", align: 'center' }
    },
    'pure-white': {
        src: 'img/purewhite.jpg',
        name: { x: 497, y: 350, maxWidth: 850, baseSize: 50, color: '#ffffff', font: '900',  family: "'Roboto Slab'", align: 'center' },
        job: { x: 497, y: 400, maxWidth: 400, baseSize: 30, color: '#ffffff', font: '700', family: "'Roboto Slab'", align: 'center' },
        phone: { x: 497, y: 510, maxWidth: 400, baseSize: 22, color: '#ffffff', font: 'normal', family: "'Roboto Slab'", align: 'center' },
        email: { x: 497, y: 550, maxWidth: 400, baseSize: 22, color: '#ffffff', font: 'normal', family: "'Roboto Slab'", align: 'center' }
    },
    'default': {
        src: 'img/visit_proba.jpg',
        name: { x: 60, y: 180, maxWidth: 500, baseSize: 60, color: '#0f172a', font: 'bold', family: "sans-serif", align: 'left' },
        job: { x: 60, y: 240, maxWidth: 500, baseSize: 30, color: '#3b82f6', font: 'normal', family: "sans-serif", align: 'left' },
        phone: { x: 60, y: 480, maxWidth: 500, baseSize: 24, color: '#475569', font: 'normal', family: "sans-serif", align: 'left' },
        email: { x: 60, y: 530, maxWidth: 500, baseSize: 24, color: '#475569', font: 'normal', family: "sans-serif", align: 'left' }
    }
};

const urlParams = new URLSearchParams(window.location.search);
const templateKey = urlParams.get('template') || 'default';
const config = templatesConfigs[templateKey] || templatesConfigs['default'];

const bgImage = new Image();
bgImage.src = config.src;

bgImage.onload = () => draw();

// Функція для малювання тексту
function drawText(text, settings) {
    if (!text) return;

    let fontSize = settings.baseSize;
    ctx.textAlign = settings.align || "left";
    ctx.fillStyle = settings.color;
    
    // Підбір розміру шрифту
    ctx.font = `${settings.font} ${fontSize}px ${settings.family || 'sans-serif'}`;
    while (ctx.measureText(text).width > settings.maxWidth && fontSize > 10) {
        fontSize -= 1;
        ctx.font = `${settings.font} ${fontSize}px ${settings.family || 'sans-serif'}`;
    }
    
    ctx.fillText(text, settings.x, settings.y);
}

//Основна функція малювання
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    if (bgImage.complete && bgImage.naturalWidth !== 0) {
        ctx.drawImage(bgImage, 0, 0, 1000, 600);
    }

    // Малюємо поля (якщо порожньо — виводимо приклад)
    drawText((nameInput.value || "Ваше Ім'я").toUpperCase(), config.name);
    drawText(jobInput.value || "Посада", config.job);
    drawText(phoneInput.value || "Телефон", config.phone);
    drawText(emailInput.value || "Email", config.email);
}

// Події введення
[nameInput, jobInput, phoneInput, emailInput].forEach(input => {
    input.addEventListener('input', draw);
});

// Завантаження PDF
downloadBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF({ orientation: 'landscape', unit: 'px', format: [1000, 600] });
    const imgData = canvas.toDataURL('image/jpeg', 1.0);
    pdf.addImage(imgData, 'JPEG', 0, 0, 1000, 600);
    pdf.save('vizitka.pdf');
});

// Консоль для координат
canvas.addEventListener('mousedown', (e) => {
    const rect = canvas.getBoundingClientRect();
    const x = Math.round((e.clientX - rect.left) * (canvas.width / rect.width));
    const y = Math.round((e.clientY - rect.top) * (canvas.height / rect.height));
    console.log(`x: ${x}, y: ${y}`);
});