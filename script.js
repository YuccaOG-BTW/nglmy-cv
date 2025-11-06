// 1. Інформація про систему користувача
const systemInfo = {
    userAgent: navigator.userAgent,        // Інформація про браузер користувача
    platform: navigator.platform,          // Операційна система (наприклад, Windows, MacOS)
    language: navigator.language,          // Мова інтерфейсу користувача
    cookiesEnabled: navigator.cookieEnabled // Чи увімкнені cookies
};

// Зберігаємо цю інформацію у localStorage (локальне сховище браузера)
localStorage.setItem('systemInfo', JSON.stringify(systemInfo));

// Створюємо нижній блок (footer) з цією інформацією
const footer = document.createElement('footer'); // Створюємо тег <footer>
footer.style.padding = "20px";
footer.style.backgroundColor = "#1a0000"; // Темний фон
footer.style.color = "#fff";              // Білий текст

// Виводимо заголовок і форматовані дані з localStorage у вигляді JSON
footer.innerHTML = `<h3>Дані з localStorage:</h3><pre>${JSON.stringify(systemInfo, null, 2)}</pre>`;

// Додаємо footer до кінця сторінки
document.body.appendChild(footer);

// 2. Завантаження та виведення коментарів з зовнішнього API
fetch('https://jsonplaceholder.typicode.com/posts/23/comments') // Запит на фейковий сервер
    .then(response => response.json()) // Перетворюємо відповідь на JavaScript-об’єкти
    .then(comments => {
        const section = document.createElement('section'); // Створюємо новий блок
        section.innerHTML = `<h2>Коментарі роботодавців</h2>`; // Заголовок секції

        const list = document.createElement('ul'); // Створюємо список

        // Для кожного коментаря створюємо пункт списку
        comments.forEach(c => {
            const li = document.createElement('li');
            li.innerHTML = `<strong>${c.name}</strong>: ${c.body}`; // Ім’я жирним + текст
            list.appendChild(li); // Додаємо пункт до списку
        });

        section.appendChild(list); // Додаємо список до секції
        document.body.appendChild(section); // Додаємо секцію до сторінки
    });

// 3. Виведення модального вікна через 60 секунд після завантаження сторінки
setTimeout(() => {
    const modal = document.createElement('div'); // Створюємо контейнер для вікна
    modal.id = 'feedback-modal'; // Присвоюємо ID (щоб потім стилізувати)

    // Вміст модального вікна — форма зворотного зв’язку
    modal.innerHTML = `
        <form action="https://formspree.io/f/xgvkyvak" method="POST">
            <h2>Зворотній зв'язок</h2>
            <input type="text" name="name" placeholder="Ім’я" required>
            <input type="email" name="email" placeholder="Email" required>
            <input type="tel" name="phone" placeholder="Телефон" required>
            <textarea name="message" placeholder="Ваше повідомлення..." rows="4" required></textarea>
            <button type="submit">Відправити</button>
            <button type="button" onclick="document.getElementById('feedback-modal').remove()">Закрити</button>
        </form>
    `;

    document.body.appendChild(modal); // Додаємо вікно до сторінки
}, 60000); // 60 секунд = 60000 мілісекунд

// 4. Додаємо перемикач теми (світла/темна)
const toggle = document.createElement('div'); // Контейнер для перемикача
toggle.className = 'theme-toggle'; // Клас (щоб стилізувати в CSS)
toggle.innerHTML = `
    <input type="checkbox" id="themeSwitch">      <!-- Прихований чекбокс -->
    <label for="themeSwitch"></label>             <!-- Видимий перемикач -->
`;
document.body.appendChild(toggle); // Додаємо перемикач на сторінку

// Отримуємо сам чекбокс
const themeSwitch = document.getElementById('themeSwitch');

// Функція застосування теми
function applyTheme(theme) {
    if (theme === 'day') {
        // Якщо тема денна — додаємо клас day-theme і забираємо night-theme
        document.body.classList.add('day-theme');
        document.body.classList.remove('night-theme');
    } else {
        // Якщо нічна — навпаки
        document.body.classList.add('night-theme');
        document.body.classList.remove('day-theme');
    }

    // Встановлюємо положення перемикача відповідно до обраної теми
    themeSwitch.checked = theme === 'day';
}

// Визначаємо тему автоматично в залежності від часу (з 7 до 21 — день, інакше ніч)
const hour = new Date().getHours(); // Отримуємо поточну годину (0–23)
const autoTheme = (hour >= 7 && hour < 21) ? 'day' : 'night';
applyTheme(autoTheme); // Застосовуємо тему автоматично

// Встановлюємо обробник події для перемикача — змінює тему вручну
themeSwitch.addEventListener('change', () => {
    const newTheme = themeSwitch.checked ? 'day' : 'night'; // Якщо ввімкнено — день, інакше ніч
    applyTheme(newTheme);
});

