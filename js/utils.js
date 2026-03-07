// ==========================================================
// UTILS.JS - ДОПОМІЖНІ ФУНКЦІЇ ТА ГЕНЕРАЦІЯ ЕЛЕМЕНТІВ
// ==========================================================

// --- 1. ГЕНЕРАЦІЯ ХМАРИ СЛІВ (Слайд 2) ---
const bgContainer = document.getElementById('background-words');
const generatedWords = [];

function createScatteredWords() {
    if (!bgContainer) return;
    // Використовує pairedProblemsList та coords із constants.js
    pairedProblemsList.forEach((pair, i) => { 
        const wordContainer = document.createElement('div');
        wordContainer.className = 'bg-word';
        wordContainer.style.left = `${coords[i][0]}%`;
        wordContainer.style.top = `${coords[i][1]}%`;
        wordContainer.innerHTML = `
            <div class="cloud-fr" style="text-align: center;">${pair[0]}</div>
            <div class="cloud-de" style="text-align: center;">${pair[1]}</div>
        `;
        bgContainer.appendChild(wordContainer);
        generatedWords.push(wordContainer);
    });
}

// --- 2. ГЕНЕРАЦІЯ СЛІВ ANGST (Слайди 6-7) ---
const angstContainer = document.getElementById('angst-container');
const generatedAngst = [];

function generateAngstWords() {
    if (!angstContainer) return;
    // Використовує angstData із constants.js
    angstData.forEach(data => { 
        const el = document.createElement('div');
        el.className = 'angst-word';
        el.innerText = 'ANGST';
        el.style.left = `${data.x}%`; el.style.top = `${data.y}%`;
        el.style.fontSize = `${data.size}vw`;
        el.style.transform = `translateY(-80%) ${data.transform}`;
        angstContainer.appendChild(el);
        generatedAngst.push(el);
    });
}

// --- 3. ФУНКЦІЇ ДЛЯ АНІМАЦІЇ ТЕКСТУ (Друкарська машинка) ---
function prepareText(element) {
    if (!element) return []; 
    const text = element.innerText; 
    element.innerHTML = ''; 
    const spans = [];
    for (let i = 0; i < text.length; i++) {
        const span = document.createElement('span');
        span.className = 'char';
        span.innerText = text[i];
        element.appendChild(span);
        spans.push(span);
    }
    return spans; 
}

function revealText(spans, speed, callback) {
    let i = 0;
    function revealNext() {
        if (i < spans.length) {
            spans[i].classList.add('visible');
            i++;
            setTimeout(revealNext, speed);
        } else if (callback) {
            setTimeout(callback, 200);
        }
    }
    if (spans && spans.length > 0) revealNext();
    else if (callback) callback();
}

// Спеціальна функція для фінального слайду (ефект сумніву/страху)
function hesitantReveal(spans, callback) {
    const speed = 80;   // Швидкість друку
    const pause = 400;  // Пауза перед стиранням

    // Допоміжна функція: друкує вперед
    function typeForward(start, end, nextStep) {
        let i = start;
        function step() {
            if (i <= end) {
                spans[i].classList.add('visible');
                i++;
                setTimeout(step, speed);
            } else {
                setTimeout(nextStep, pause);
            }
        }
        step();
    }

    // Допоміжна функція: стирає назад (Backspace)
    function deleteBackward(start, end, nextStep) {
        let i = start;
        function step() {
            if (i >= end) {
                spans[i].classList.remove('visible');
                i--;
                setTimeout(step, speed);
            } else {
                setTimeout(nextStep, pause);
            }
        }
        step();
    }

    // Сценарій сумніву:
    // 1. Друкуємо 1-шу букву
    typeForward(0, 0, () => {
        // 2. Стираємо 1-шу букву
        deleteBackward(0, 0, () => {
            setTimeout(() => {
                // 3. Друкуємо дві букви
                typeForward(0, 1, () => {
                    // 4. Стираємо дві букви
                    deleteBackward(1, 0, () => {
                        // 5. Довга пауза (збирається з духом)
                        setTimeout(() => {
                            // 6. Друкує весь текст до кінця
                            typeForward(0, spans.length - 1, () => {
                                if (callback) setTimeout(callback, 500);
                            });
                        }, 800);
                    });
                });
            }, 300);
        });
    });
}