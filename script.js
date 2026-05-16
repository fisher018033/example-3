// Плавный скролл для навигации
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href && href.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Тема
const themeToggle = document.getElementById('themeToggle');
themeToggle.addEventListener('click', () => document.body.classList.toggle('light'));

// Счётчик идей
let ideaCount = localStorage.getItem('obsidianIdeaCount') ? +localStorage.getItem('obsidianIdeaCount') : 0;
document.getElementById('statCounter').innerText = ideaCount;
function addIdea() {
    ideaCount++;
    localStorage.setItem('obsidianIdeaCount', ideaCount);
    document.getElementById('statCounter').innerText = ideaCount;
}

// Рандомайзер цитат
const quotes = ["Обсидиан режет реальность", "Творчество — застывшая лава", "Фиолетовый цвет мысли", "Контраст рождает форму"];
document.getElementById('newQuoteBtn').addEventListener('click', () => {
    document.getElementById('quoteDisplay').innerText = quotes[Math.floor(Math.random() * quotes.length)];
});

// Генератор палитры
const palettes = [['#6a4e9b', '#9b6fcf', '#c9aef0', '#2c1a4a'], ['#4a2c6d', '#8b5cf6', '#c4b5fd', '#1e102f']];
document.getElementById('paletteBtn').addEventListener('click', () => {
    const pal = palettes[Math.floor(Math.random() * palettes.length)];
    document.getElementById('paletteResult').innerHTML = pal.map(c => `<div class="palette-color" style="background:${c}"></div>`).join('');
});

// Архитектурные термины
const terms = ['Вулканический модерн', 'Стеклянный брутализм', 'Обсидиановая арка', 'Кристаллический свод'];
document.getElementById('newTermBtn').addEventListener('click', () => {
    document.getElementById('termDisplay').innerText = terms[Math.floor(Math.random() * terms.length)];
});

// Таймер + стоп
let timerInterval, timerSeconds = 25 * 60;
const timerDisplay = document.getElementById('timerDisplay');
function updateTimerDisplay() {
    const mins = Math.floor(timerSeconds / 60), secs = timerSeconds % 60;
    timerDisplay.innerText = `${mins.toString().padStart(2,'0')}:${secs.toString().padStart(2,'0')}`;
}
document.getElementById('startTimerBtn').addEventListener('click', () => {
    if (timerInterval) clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        if (timerSeconds <= 0) { clearInterval(timerInterval); alert('Время вышло'); return; }
        timerSeconds--;
        updateTimerDisplay();
    }, 1000);
});
document.getElementById('stopTimerBtn').addEventListener('click', () => {
    if (timerInterval) clearInterval(timerInterval);
    timerSeconds = 25 * 60;
    updateTimerDisplay();
});

// Слайдер до/после
const slider = document.querySelector('.slider-input');
const afterImg = document.querySelector('.comparison-img.after');
if(slider && afterImg) {
    slider.addEventListener('input', (e) => afterImg.style.clipPath = `polygon(0 0, ${e.target.value}% 0, ${e.target.value}% 100%, 0 100%)`);
}

// Генератор идей
const ideasMap = {
    'обсидиан': ['текстура вулканического стекла', 'логотип с острыми гранями'],
    'стекло': ['эффект битого стекла css', 'витражная анимация'],
    'вулкан': ['лава в пиксельной графике', 'симуляция потока']
};
document.getElementById('generateIdeaBtn').addEventListener('click', () => {
    let topic = document.getElementById('ideaTopic').value.trim().toLowerCase();
    let idea = 'Ищи вдохновение в природных формах';
    for (let key in ideasMap) {
        if (topic.includes(key)) {
            idea = ideasMap[key][Math.floor(Math.random() * ideasMap[key].length)];
            break;
        }
    }
    document.getElementById('ideaResult').innerText = idea;
    addIdea();
    localStorage.setItem('obsidianLastIdea', idea);
});

// Админка
let isAdmin = localStorage.getItem('obsidianAdmin') === 'true';
const adminBtn = document.getElementById('adminBtn');
const modal = document.getElementById('adminModal');
const loginDiv = document.getElementById('adminLoginBlock');
const panelDiv = document.getElementById('adminPanelBlock');
const closeSpan = document.querySelector('.admin-modal-close');

adminBtn.onclick = () => {
    if (isAdmin) {
        loginDiv.style.display = 'none';
        panelDiv.style.display = 'block';
        document.getElementById('viewCount').innerText = localStorage.getItem('obsidianViews') || 42;
        document.getElementById('totalIdeasCount').innerText = ideaCount;
        document.getElementById('lastIdea').innerText = localStorage.getItem('obsidianLastIdea') || '—';
    } else {
        loginDiv.style.display = 'block';
        panelDiv.style.display = 'none';
        document.getElementById('adminPassword').value = '';
        document.getElementById('adminError').innerHTML = '';
    }
    modal.style.display = 'flex';
};
closeSpan.onclick = () => modal.style.display = 'none';
window.onclick = (e) => { if(e.target === modal) modal.style.display = 'none'; };

document.getElementById('adminLoginBtn').onclick = () => {
    if(document.getElementById('adminPassword').value === 'admin123') {
        isAdmin = true;
        localStorage.setItem('obsidianAdmin', 'true');
        adminBtn.innerHTML = '👑 Админ';
        loginDiv.style.display = 'none';
        panelDiv.style.display = 'block';
        document.getElementById('viewCount').innerText = localStorage.getItem('obsidianViews') || 42;
        document.getElementById('totalIdeasCount').innerText = ideaCount;
        document.getElementById('lastIdea').innerText = localStorage.getItem('obsidianLastIdea') || '—';
    } else {
        document.getElementById('adminError').innerHTML = '❌ Неверный пароль (admin123)';
    }
};
document.getElementById('adminLogoutBtn').onclick = () => {
    isAdmin = false;
    localStorage.setItem('obsidianAdmin', 'false');
    adminBtn.innerHTML = '🔮 Админка';
    modal.style.display = 'none';
};
let views = localStorage.getItem('obsidianViews') ? +localStorage.getItem('obsidianViews') : 42;
views++;
localStorage.setItem('obsidianViews', views);