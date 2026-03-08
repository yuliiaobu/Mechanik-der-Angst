// ==========================================================
// SCRIPT.JS - ОСНОВНА ЛОГІКА ТА СЦЕНАРІЙ (РЕЖИСУРА)
// ==========================================================

// --- 1. ІНІЦІАЛІЗАЦІЯ ДИНАМІЧНИХ ЕЛЕМЕНТІВ ---
createScatteredWords(); // Викликаємо генерацію з utils.js
generateAngstWords();   // Викликаємо генерацію з utils.js

// --- 2. ПІДГОТОВКА ВСІХ ТЕКСТІВ ---
const spansSlide1Fr = prepareText(document.getElementById('fr-line-1'));
const spansSlide1De = prepareText(document.getElementById('de-line-1'));
const spansSlide3Fr = prepareText(document.getElementById('fr-line-3'));
const spansSlide3De = prepareText(document.getElementById('de-line-3'));
const spansSlide4Fr = prepareText(document.getElementById('fr-line-4'));
const spansSlide4De = prepareText(document.getElementById('de-line-4'));
const spansSlide5Fr = prepareText(document.getElementById('fr-line-5'));
const spansSlide5De = prepareText(document.getElementById('de-line-5'));

const spansWinterTitle = prepareText(document.getElementById('winter-title'));
const spansWinterDesc = prepareText(document.getElementById('winter-desc'));
const spansAutumnTitle = prepareText(document.getElementById('autumn-title'));
const spansAutumnDesc = prepareText(document.getElementById('autumn-desc'));
const spansSummerTitle = prepareText(document.getElementById('summer-title'));
const spansSummerDesc = prepareText(document.getElementById('summer-desc'));
const spansSpringTitle = prepareText(document.getElementById('spring-title'));
const spansSpringDesc = prepareText(document.getElementById('spring-desc'));
const spansAutonomTitle = prepareText(document.getElementById('autonom-title'));
const spansAutonomDesc = prepareText(document.getElementById('autonom-desc'));

const spansAmygdalaTitle = prepareText(document.getElementById('amygdala-title'));
const spansAmygdalaDesc = prepareText(document.getElementById('amygdala-desc'));
const spansGeboreneTitle = prepareText(document.getElementById('geborene-title'));
const spansGeboreneList = prepareText(document.getElementById('geborene-list'));

const spansZentrumTitle = prepareText(document.getElementById('zentrum-title'));
const spansZentrumDesc = prepareText(document.getElementById('zentrum-desc'));

const spansDeltaTitle = prepareText(document.getElementById('delta-title'));
const spansDeltaDesc = prepareText(document.getElementById('delta-desc'));

const spansArkateionTitle = prepareText(document.getElementById('arkateion-title'));
const spansArkateionDesc = prepareText(document.getElementById('arkateion-desc'));

const spansQuartierTitle = prepareText(document.getElementById('quartier-title'));
const spansQuartierDesc = prepareText(document.getElementById('quartier-desc'));

const spansKurilenTitle = prepareText(document.getElementById('kurilen-title'));
const spansKurilenDesc = prepareText(document.getElementById('kurilen-desc'));

const spansVolkerkreuzerTitle = prepareText(document.getElementById('volkerkreuzer-title'));
const spansVolkerkreuzerDesc = prepareText(document.getElementById('volkerkreuzer-desc'));

const spansSummerHauptstadtTitle = prepareText(document.getElementById('summer-hauptstadt-title'));
const spansSummerHauptstadtDesc = prepareText(document.getElementById('summer-hauptstadt-desc'));

const spansSummerGeneralstabTitle = prepareText(document.getElementById('summer-generalstab-title'));
const spansSummerGeneralstabDesc = prepareText(document.getElementById('summer-generalstab-desc'));

const spansWaffenfabrikTitle = prepareText(document.getElementById('waffenfabrik-title'));
const spansWaffenfabrikDesc = prepareText(document.getElementById('waffenfabrik-desc'));

const spansGebrechenTitle = prepareText(document.getElementById('gebrechen-title'));
const spansGebrechenList = prepareText(document.getElementById('gebrechen-list'));

// Фінальні слайди
const spansSlide15Fr = prepareText(document.getElementById('fr-line-15'));
const spansSlide15De = prepareText(document.getElementById('de-line-15'));
const spansSlide16Fr = prepareText(document.getElementById('fr-line-16'));
const spansSlide16De = prepareText(document.getElementById('de-line-16'));
const spansSlide17Fr = prepareText(document.getElementById('fr-line-17'));
const spansSlide17De = prepareText(document.getElementById('de-line-17'));
const spansSlide18Fr = prepareText(document.getElementById('fr-line-18'));
const spansSlide18De = prepareText(document.getElementById('de-line-18'));
const spansSlide19Fr = prepareText(document.getElementById('fr-line-19'));
const spansSlide19De = prepareText(document.getElementById('de-line-19'));

// --- 3. СТАН ДОДАТКУ ---
//let currentState = 'START'; 
let currentState = 'READY_FOR_MAP'; // Зміни на START для повної презентації
const typingSpeed = 20;

let hasSeenAmygdala = false;
let hasSeenGebrechen = false;
let mapPointsRevealed = false;

// =========================================================
// --- АУДІО-МЕНЕДЖЕР (КЕРУВАННЯ МУЗИКОЮ) ---
// =========================================================
let currentAudioId = null;

function switchMusic(newAudioId, targetVolume = 0.5) {
    if (currentAudioId === newAudioId) return; // Якщо цей трек вже грає - нічого не робимо
    
    // Зупиняємо попередній трек
    if (currentAudioId) {
        const oldAudio = document.getElementById(currentAudioId);
        if (oldAudio) {
            oldAudio.pause();
            // Ми навмисно не скидаємо час на 0. Коли юзер повернеться на карту, музика продовжиться з того ж місця!
        }
    }
    
    // Вмикаємо новий трек
    if (newAudioId) {
        const newAudio = document.getElementById(newAudioId);
        if (newAudio) {
            newAudio.volume = targetVolume;
            newAudio.play().catch(e => console.log("Браузер чекає кліку:", e));
        }
    }
    currentAudioId = newAudioId;
}

// --- 4. ГОЛОВНИЙ ОБРОБНИК КЛІКІВ (Слайди 1-8 та поява внутрішніх точок) ---
let isMusicPlaying = false;
document.body.addEventListener('click', () =>  {
    // --- ЗАПУСК МУЗИКИ ПРИ ПЕРШОМУ КЛІКУ ---
    if (!isMusicPlaying) {
        switchMusic('music-intro', 0.4); // <-- ВМИКАЄМО part1.mp3 (Вступ)
        isMusicPlaying = true;
    }
    if (currentState === 'START') {
        currentState = 'TYPING_1';
        document.getElementById('slide-1').classList.add('visible');
        revealText(spansSlide1Fr, typingSpeed, () => {
            revealText(spansSlide1De, typingSpeed, () => { currentState = 'READY_FOR_SLIDE_2'; });
        });
    } 
    else if (currentState === 'READY_FOR_SLIDE_2') {
        currentState = 'TRANSITIONING_2';
        document.getElementById('slide-1').style.opacity = '0';
        setTimeout(() => {
            document.getElementById('slide-1').style.display = 'none';
            const centerIndex = 7;
            let otherIndices = generatedWords.map((_, i) => i).filter(i => i !== centerIndex);
            otherIndices.sort(() => Math.random() - 0.5);
            const sequence = [centerIndex, ...otherIndices];
            sequence.forEach((idx, i) => {
                setTimeout(() => {
                    generatedWords[idx].classList.add('revealed');
                    if (i === sequence.length - 1) currentState = 'READY_FOR_SLIDE_3';
                }, i * 400);
            });
        }, 500);
    }
    else if (currentState === 'READY_FOR_SLIDE_3') {
        currentState = 'TYPING_3';
        generatedWords.forEach(w => w.classList.remove('revealed'));
        setTimeout(() => {
            const s3 = document.getElementById('slide-3');
            s3.style.display = 'flex';
            setTimeout(() => {
                s3.classList.add('visible');
                revealText(spansSlide3Fr, typingSpeed, () => {
                    revealText(spansSlide3De, typingSpeed, () => { currentState = 'READY_FOR_SLIDE_4'; });
                });
            }, 50);
        }, 500);
    }
    else if (currentState === 'READY_FOR_SLIDE_4') {
        currentState = 'TYPING_4';
        document.getElementById('slide-3').style.opacity = '0';
        setTimeout(() => {
            document.getElementById('slide-3').style.display = 'none';
            const s4 = document.getElementById('slide-4');
            s4.style.display = 'flex';
            setTimeout(() => {
                s4.classList.add('visible');
                revealText(spansSlide4Fr, typingSpeed, () => {
                    revealText(spansSlide4De, typingSpeed, () => { currentState = 'READY_FOR_SLIDE_5'; });
                });
            }, 50);
        }, 500);
    }
    else if (currentState === 'READY_FOR_SLIDE_5') {
        currentState = 'TYPING_5';
        document.getElementById('slide-4').style.opacity = '0';
        setTimeout(() => {
            document.getElementById('slide-4').style.display = 'none';
            const s5 = document.getElementById('slide-5');
            s5.style.display = 'flex';
            setTimeout(() => {
                s5.classList.add('visible');
                revealText(spansSlide5Fr, typingSpeed, () => {
                    revealText(spansSlide5De, typingSpeed, () => { currentState = 'READY_FOR_SLIDE_6'; });
                });
            }, 50);
        }, 500);
    }
    else if (currentState === 'READY_FOR_SLIDE_6') {
        currentState = 'TRANSITIONING_6';
        document.getElementById('slide-5').style.display = 'none';
        document.getElementById('slide-6-7').style.display = 'block';
        document.getElementById('peur-text').classList.add('revealed');
        generatedAngst[0].classList.add('revealed');
        
        switchMusic('music-angst', 0.8); // <-- ВМИКАЄМО angst.mp3 (Паніка)
        
        currentState = 'READY_FOR_SLIDE_7';
    }
    else if (currentState === 'READY_FOR_SLIDE_7') {
        currentState = 'PANIC_MODE';
        let i = 1;
        function flashAngst() {
            if (i < generatedAngst.length) {
                generatedAngst[i].classList.add('revealed');
                i++;
                setTimeout(flashAngst, Math.random() * 100 + 50);
            } else {
                startAngstFlood();
            }
        }
        function startAngstFlood() {
            let count = 0;
            function spawn() {
                if (count < 150) {
                    const el = document.createElement('div');
                    el.className = 'random-angst';
                    el.innerText = 'ANGST';
                    el.style.left = `${Math.random() * 120 - 10}%`;
                    el.style.top = `${Math.random() * 120 - 10}%`;
                    el.style.fontSize = `${Math.random() * 20 + 5}vw`;
                    el.style.transform = `translate(-50%, -50%) rotate(${Math.random() * 360}deg)`;
                    document.getElementById('angst-container').appendChild(el);
                    count++;
                    setTimeout(spawn, Math.max(10, 80 - (count * 0.5)));
                } else {
                    document.getElementById('red-screen').style.opacity = '1';
                    currentState = 'READY_FOR_MAP';
                }
            }
            spawn();
        }
        flashAngst();
    }
    else if (currentState === 'READY_FOR_MAP') {
        currentState = 'TRANSITIONING_MAP';
        
        // --- НОВЕ: ВМИКАЄМО ТИШУ НА КАРТІ ---
        switchMusic(null); 
        // ------------------------------------
        
        const slide8 = document.getElementById('slide-8');
        slide8.style.display = 'flex';
        setTimeout(() => {
            slide8.classList.add('visible');
            document.getElementById('map-image-element').classList.add('revealed');

            // Показуємо ТІЛЬКИ стрілочки (без точок карти)
            setTimeout(() => {
                const arrowRight = document.getElementById('next-arrow-amygdala');
                if (arrowRight) arrowRight.classList.add('revealed');
                
                const arrowLeft = document.getElementById('prev-arrow-gebrechen');
                if (arrowLeft) arrowLeft.classList.add('revealed');
                
                currentState = 'WAITING_FOR_SIDE_SLIDES'; 
            }, 400);
        }, 50);
    }
});


// --- 5. КЛІКИ ПО ТОЧКАХ ГОЛОВНОЇ КАРТИ ---

// ЗИМА
document.getElementById('cp-3').addEventListener('click', (e) => {
    e.stopPropagation();
    if (currentState === 'MAP_INTERACTIVE') {
        switchMusic('music-map', 0.4);
        currentState = 'IN_WINTER_REGION';
        const s9 = document.getElementById('slide-9');
        s9.style.display = 'flex';
        setTimeout(() => {
            s9.classList.add('visible');
            setTimeout(() => {
                document.querySelector('.winter-image').classList.add('revealed');
                revealText(spansWinterTitle, 15, () => {
                    revealText(spansWinterDesc, 5, () => {
                        setTimeout(() => {
                            currentState = 'WINTER_REGION_POINTS_SHOWN'; 
                            const points = document.querySelectorAll('.winter-checkpoint-group');
                            points.forEach((cp, idx) => setTimeout(() => cp.classList.add('revealed'), idx * 200));
                            
                            // Кнопка загоряється тільки після останньої точки
                            setTimeout(() => activateBackButton('slide-9'), points.length * 200);
                        }, 400);
                    });
                });
            }, 400);
        }, 50);
    }
});

// ОСІНЬ
document.getElementById('cp-2').addEventListener('click', (e) => {
    e.stopPropagation();
    if (currentState === 'MAP_INTERACTIVE') {
        switchMusic('music-map', 0.4);
        currentState = 'IN_AUTUMN_REGION';
        const s10 = document.getElementById('slide-10');
        s10.style.display = 'flex';
        setTimeout(() => {
            s10.classList.add('visible');
            setTimeout(() => {
                document.querySelector('.autumn-island-img').classList.add('revealed');
                revealText(spansAutumnTitle, 15, () => {
                    revealText(spansAutumnDesc, 5, () => {
                        setTimeout(() => {
                            currentState = 'AUTUMN_REGION_POINTS_SHOWN'; 
                            const points = document.querySelectorAll('.autumn-checkpoint-group');
                            points.forEach((cp, idx) => setTimeout(() => cp.classList.add('revealed'), idx * 200));
                            
                            // Кнопка загоряється тільки після останньої точки
                            setTimeout(() => activateBackButton('slide-10'), points.length * 200);
                        }, 400);
                    });
                });
            }, 400);
        }, 50);
    }
});

// ЛІТО
document.getElementById('cp-1').addEventListener('click', (e) => {
    e.stopPropagation();
    if (currentState === 'MAP_INTERACTIVE') {
        switchMusic('music-map', 0.4);
        currentState = 'IN_SUMMER_REGION';
        const s11 = document.getElementById('slide-11');
        s11.style.display = 'flex';
        setTimeout(() => {
            s11.classList.add('visible');
            setTimeout(() => {
                document.querySelector('.summer-island-img').classList.add('revealed');
                revealText(spansSummerTitle, 15, () => {
                    revealText(spansSummerDesc, 5, () => {
                        setTimeout(() => {
                            currentState = 'SUMMER_REGION_POINTS_SHOWN'; 
                            const points = document.querySelectorAll('.summer-checkpoint-group');
                            points.forEach((cp, idx) => setTimeout(() => cp.classList.add('revealed'), idx * 200));
                            
                            // Кнопка загоряється тільки після останньої точки
                            setTimeout(() => activateBackButton('slide-11'), points.length * 200);
                        }, 400);
                    });
                });
            }, 400);
        }, 50);
    }
});

// ВЕСНА
document.getElementById('cp-5').addEventListener('click', (e) => {
    e.stopPropagation();
    if (currentState === 'MAP_INTERACTIVE') {
        switchMusic('music-map', 0.4);
        currentState = 'IN_SPRING_REGION';
        const s12 = document.getElementById('slide-12');
        s12.style.display = 'flex';
        setTimeout(() => {
            s12.classList.add('visible');
            setTimeout(() => {
                document.querySelector('.spring-island-img').classList.add('revealed');
                revealText(spansSpringTitle, 15, () => {
                    revealText(spansSpringDesc, 5, () => {
                        setTimeout(() => {
                            currentState = 'SPRING_REGION_POINTS_SHOWN'; 
                            const points = document.querySelectorAll('.spring-checkpoint-group');
                            points.forEach((cp, idx) => setTimeout(() => cp.classList.add('revealed'), idx * 200));
                            
                            // Кнопка загоряється тільки після останньої точки
                            setTimeout(() => activateBackButton('slide-12'), points.length * 200);
                        }, 400);
                    });
                });
            }, 400);
        }, 50);
    }
});

// НАПІВАВТОНОМНА ЗОНА
document.getElementById('cp-4').addEventListener('click', (e) => {
    e.stopPropagation();
    if (currentState === 'MAP_INTERACTIVE') {
        switchMusic('music-map', 0.4);
        currentState = 'IN_AUTONOM_REGION';
        const s13 = document.getElementById('slide-13');
        s13.style.display = 'flex';
        setTimeout(() => {
            s13.classList.add('visible');
            setTimeout(() => {
                document.querySelector('.autonom-island-img').classList.add('revealed');
                revealText(spansAutonomTitle, 15, () => {
                    revealText(spansAutonomDesc, 5, () => {
                        setTimeout(() => {
                            currentState = 'AUTONOM_REGION_POINTS_SHOWN'; 
                            const points = document.querySelectorAll('.autonom-checkpoint-group');
                            points.forEach((cp, idx) => setTimeout(() => cp.classList.add('revealed'), idx * 200));
                            
                            // Кнопка загоряється тільки після останньої точки
                            setTimeout(() => activateBackButton('slide-13'), points.length * 200);
                        }, 400);
                    });
                });
            }, 400);
        }, 50);
    }
});

// Амигдала (стрілка направо)
const arrowBtn = document.getElementById('next-arrow-amygdala');
if (arrowBtn) {
    arrowBtn.addEventListener('click', (e) => {
        e.stopPropagation(); 
        if (currentState === 'MAP_INTERACTIVE' || currentState === 'WAITING_FOR_SIDE_SLIDES') {
            hasSeenAmygdala = true; 
            
            // --- НОВЕ: Ховаємо крапочку при кліку ---
            const badge = document.getElementById('badge-amygdala');
            if (badge) badge.style.display = 'none';

            triggerAmygdalaSlide();
        }
    });
}

// Gebrechen (стрілка наліво)
const arrowLeftBtn = document.getElementById('prev-arrow-gebrechen');
if (arrowLeftBtn) {
    arrowLeftBtn.addEventListener('click', (e) => {
        e.stopPropagation(); 
        if (currentState === 'MAP_INTERACTIVE' || currentState === 'WAITING_FOR_SIDE_SLIDES') {
            hasSeenGebrechen = true; 
            
            // --- НОВЕ: Ховаємо крапочку при кліку ---
            const badge = document.getElementById('badge-gebrechen');
            if (badge) badge.style.display = 'none';

            triggerGebrechenSlide(); 
        }
    });
}

// ================== АМИГДАЛА ==================
function triggerAmygdalaSlide() {
    switchMusic('music-fears', 0.5);
    currentState = 'IN_AMYGDALA_SLIDE';
    const s14 = document.getElementById('slide-14');
    s14.style.display = 'flex';
    
    setTimeout(() => {
        s14.classList.add('visible');
        setTimeout(() => {
            document.querySelector('.amygdala-bg-img').classList.add('revealed');
            
            // Якщо ми тут вперше - показуємо пульс
            if (!baseFearsRevealed) {
                setTimeout(() => {
                    document.getElementById('amygdala-pulse-trigger').style.display = 'block';
                }, 2000); 
            } else {
                // Якщо вже були - пульс не потрібен, відразу перевіряємо чи є НОВІ страхи
                setTimeout(() => {
                    showErworbene('fears', 'erworbene-fears-section', 'erworbene-fears-list');
                }, 400);
            }
        }, 50);
    }, 50);
}

function handleAmygdalaPulseClick() {
    if (currentState === 'IN_AMYGDALA_SLIDE') {
        currentState = 'AMYGDALA_TYPING_INFO'; 
        baseFearsRevealed = true; 
        
        const pulseIcon = document.querySelector('#amygdala-pulse-trigger .pulse-icon');
        if (pulseIcon) pulseIcon.style.animation = 'none';
        
        const pointerLine = document.querySelector('.amygdala-pointer-line');
        if (pointerLine) pointerLine.classList.add('drawn');
        
        setTimeout(() => {
            const amygdalaGroup = document.getElementById('amygdala-text-content');
            if (amygdalaGroup) amygdalaGroup.style.opacity = '1';
            
            revealText(spansAmygdalaTitle, 15, () => {
                revealText(spansAmygdalaDesc, 5, () => {
                    setTimeout(() => {
                        currentState = 'AMYGDALA_FEARS_SHOWN'; 
                        const fearsGroup = document.getElementById('fears-text-content');
                        if (fearsGroup) fearsGroup.style.opacity = '1';
                        
                        revealText(spansGeboreneTitle, 15, () => {
                            revealText(spansGeboreneList, 5, () => {
                                
                                // РОЗУМНА АКТИВАЦІЯ КНОПКИ:
                                const allItems = getCollectedItems('fears');
                                const newItems = allItems.filter(item => !printedFears.includes(item));
                                
                                // Якщо нових страхів немає — активуємо відразу
                                if (newItems.length === 0) {
                                    activateBackButton('slide-14');
                                } else {
                                    // Якщо є — почнеться друк нових, і кнопка увімкнеться в кінці
                                    setTimeout(() => {
                                        showErworbene('fears', 'erworbene-fears-section', 'erworbene-fears-list');
                                    }, 400); 
                                }
                                
                            });
                        });
                    }, 400);
                });
            });
        }, 600);
    }
}

// =========================================================
// КЛІК ПО ЧЕРВОНІЙ ТОЧЦІ (АМІГДАЛА) - МАЛЮВАННЯ ЛІНІЇ
// =========================================================
const amygdalaTrigger = document.getElementById('amygdala-trigger');
if (amygdalaTrigger) {
    amygdalaTrigger.addEventListener('click', (e) => {
        e.stopPropagation();
        
        // 1. Ховаємо підказку "Hier eintippen" і вимикаємо подальші кліки
        amygdalaTrigger.style.opacity = '0';
        amygdalaTrigger.style.pointerEvents = 'none';

        // 2. Малюємо стрілочку-лінію
        const pointerLine = document.querySelector('.amygdala-pointer-line');
        if (pointerLine) pointerLine.classList.add('drawn');

        // 3. Через 600мс (коли лінія майже домалювалася), починаємо друкувати текст Амигдали
        setTimeout(() => {
            revealText(spansAmygdalaTitle, 15, () => {
                revealText(spansAmygdalaDesc, 5);
            });
        }, 600);
    });
}

// =========================================================
// ПЕРЕХІД ВІД "EWIGER WINTER" ДО ВНУТРІШНЬОЇ ЛОКАЦІЇ "ZENTRUM"
// =========================================================
const zentrumBtn = document.getElementById('winter-cp-2');
if (zentrumBtn) {
    zentrumBtn.addEventListener('click', (e) => {
        e.stopPropagation(); 
        // Дозволяємо перехід тільки тоді, коли точки вже з'явилися
        if (currentState === 'WINTER_REGION_POINTS_SHOWN') {
            triggerZentrumSlide();
        }
    });
}

function triggerZentrumSlide() {
    currentState = 'IN_ZENTRUM_SLIDE';
    const sZentrum = document.getElementById('slide-zentrum');
    sZentrum.style.display = 'flex';
    
    setTimeout(() => {
        sZentrum.classList.add('visible');
        setTimeout(() => {
            // Спочатку з'являється ілюстрація міста
            document.querySelector('.zentrum-bg-img').classList.add('revealed');
            
            // Потім друкується заголовок і текст
            setTimeout(() => {
                revealText(spansZentrumTitle, 15, () => {
                    revealText(spansZentrumDesc, 5, () => {
                        activateBackButton('slide-zentrum');
                    });
                });
            }, 400); 
        }, 50);
    }, 50);
}

// =========================================================
// ПЕРЕХІД ВІД "EWIGER WINTER" ДО ЛОКАЦІЇ "DELTA-SRC"
// =========================================================
const deltaBtn = document.getElementById('winter-cp-1'); // winter-cp-1 відповідає за Delta-SRC
if (deltaBtn) {
    deltaBtn.addEventListener('click', (e) => {
        e.stopPropagation(); 
        if (currentState === 'WINTER_REGION_POINTS_SHOWN') {
            triggerDeltaSlide();
        }
    });
}

function triggerDeltaSlide() {
    currentState = 'IN_DELTA_SLIDE';
    const sDelta = document.getElementById('slide-delta');
    sDelta.style.display = 'flex';
    
    setTimeout(() => {
        sDelta.classList.add('visible');
        setTimeout(() => {
            // З'являється ілюстрація лікарні/центру
            document.querySelector('.delta-bg-img').classList.add('revealed');
            
            // Друкується текст
            setTimeout(() => {
                revealText(spansDeltaTitle, 15, () => {
                    revealText(spansDeltaDesc, 5, () => {
                        activateBackButton('slide-delta');
                    });
                });
            }, 400); 
        }, 50);
    }, 50);
}

// =========================================================
// ПЕРЕХІД ВІД "EWIGER WINTER" ДО ЛОКАЦІЇ "ARKATEION"
// =========================================================
const arkateionBtn = document.getElementById('winter-cp-3'); 
if (arkateionBtn) {
    arkateionBtn.addEventListener('click', (e) => {
        e.stopPropagation(); 
        if (currentState === 'WINTER_REGION_POINTS_SHOWN') {
            triggerArkateionSlide();
        }
    });
}

function triggerArkateionSlide() {
    currentState = 'IN_ARKATEION_SLIDE';
    const sArkateion = document.getElementById('slide-arkateion');
    sArkateion.style.display = 'flex';
    
    setTimeout(() => {
        sArkateion.classList.add('visible');
        setTimeout(() => {
            // З'являється ілюстрація локації
            document.querySelector('.arkateion-bg-img').classList.add('revealed');
            
            // Друкується текст
            setTimeout(() => {
                revealText(spansArkateionTitle, 15, () => {
                    revealText(spansArkateionDesc, 5, () => {
                        activateBackButton('slide-arkateion');
                    });
                });
            }, 400); 
        }, 50);
    }, 50);
}

// =========================================================
// ПЕРЕХІД ВІД "EWIGER WINTER" ДО ЛОКАЦІЇ "QUARTIER DES ERMITES"
// =========================================================
const quartierBtn = document.getElementById('winter-cp-4'); 
if (quartierBtn) {
    quartierBtn.addEventListener('click', (e) => {
        e.stopPropagation(); 
        if (currentState === 'WINTER_REGION_POINTS_SHOWN') {
            triggerQuartierSlide();
        }
    });
}

function triggerQuartierSlide() {
    currentState = 'IN_QUARTIER_SLIDE';
    const sQuartier = document.getElementById('slide-quartier');
    sQuartier.style.display = 'flex';
    
    setTimeout(() => {
        sQuartier.classList.add('visible');
        setTimeout(() => {
            // З'являється ілюстрація локації
            document.querySelector('.quartier-bg-img').classList.add('revealed');
            
            // Друкується текст
            setTimeout(() => {
                revealText(spansQuartierTitle, 15, () => {
                    revealText(spansQuartierDesc, 5, () => {
                        activateBackButton('slide-quartier');
                    });
                });
            }, 400); 
        }, 50);
    }, 50);
}

// =========================================================
// ПЕРЕХІД ВІД "EWIGER FRÜHLING" ДО ЛОКАЦІЇ "DIE KURILEN"
// =========================================================
const kurilenBtn = document.getElementById('spring-cp-1'); 
if (kurilenBtn) {
    kurilenBtn.addEventListener('click', (e) => {
        e.stopPropagation(); 
        if (currentState === 'SPRING_REGION_POINTS_SHOWN') {
            triggerKurilenSlide();
        }
    });
}

function triggerKurilenSlide() {
    currentState = 'IN_KURILEN_SLIDE';
    const sKurilen = document.getElementById('slide-kurilen');
    sKurilen.style.display = 'flex';
    
    setTimeout(() => {
        sKurilen.classList.add('visible');
        setTimeout(() => {
            // З'являється ілюстрація
            document.querySelector('.kurilen-bg-img').classList.add('revealed');
            
            // Друкується текст
            setTimeout(() => {
                revealText(spansKurilenTitle, 15, () => {
                    revealText(spansKurilenDesc, 5, () => {
                        activateBackButton('slide-kurilen');
                    });
                });
            }, 400); 
        }, 50);
    }, 50);
}

// =========================================================
// ПЕРЕХІД ВІД "EWIGER FRÜHLING" ДО ЛОКАЦІЇ "VOLKERKREUZER"
// =========================================================
const volkerkreuzerBtn = document.getElementById('spring-cp-2'); 
if (volkerkreuzerBtn) {
    volkerkreuzerBtn.addEventListener('click', (e) => {
        e.stopPropagation(); 
        if (currentState === 'SPRING_REGION_POINTS_SHOWN') {
            triggerVolkerkreuzerSlide();
        }
    });
}

function triggerVolkerkreuzerSlide() {
    currentState = 'IN_VOLKERKREUZER_SLIDE';
    const sVolkerkreuzer = document.getElementById('slide-volkerkreuzer');
    sVolkerkreuzer.style.display = 'flex';
    
    setTimeout(() => {
        sVolkerkreuzer.classList.add('visible');
        setTimeout(() => {
            // З'являється ілюстрація
            document.querySelector('.volkerkreuzer-bg-img').classList.add('revealed');
            
            // Друкується текст
            setTimeout(() => {
                revealText(spansVolkerkreuzerTitle, 15, () => {
                    revealText(spansVolkerkreuzerDesc, 5, () => {
                        activateBackButton('slide-volkerkreuzer');
                    });
                });
            }, 400); 
        }, 50);
    }, 50);
}

// =========================================================
// УНІВЕРСАЛЬНА ЛОГІКА ШУМУ (АВТОМАТИЧНИЙ ПЕРЕХІД + ЗВУК)
// =========================================================
let noiseTargetCallback = null; 

function showNoiseScreen(callback) {
    currentState = 'IN_NOISE_SCREEN';
    noiseTargetCallback = callback; 
    
    const noise = document.getElementById('noise-screen');
    const noiseSound = document.getElementById('sound-noise'); // Шукаємо наш звук
    
    // Скидаємо звук на початок перед кожним запуском
    if (noiseSound) {
        noiseSound.currentTime = 0; 
        noiseSound.volume = 0.5; // Гучність (можеш зробити 1.0, якщо хочеш голосніше)
    }
    
    noise.style.display = 'block';
    
    setTimeout(() => {
        noise.style.opacity = '1'; // Шум з'являється
        
        // ВМИКАЄМО ЗВУК РАЗОМ ІЗ КАРТИНКОЮ
        if (noiseSound) noiseSound.play().catch(e => console.log(e));
        
        // Тримаємо шум 1.2 секунди на екрані, потім ховаємо
        setTimeout(() => {
            noise.style.opacity = '0';
            
            // РІЗКО ВИМИКАЄМО ЗВУК
            if (noiseSound) noiseSound.pause();
            
            setTimeout(() => {
                noise.style.display = 'none';
                if (noiseTargetCallback) noiseTargetCallback(); // Відкриваємо локацію
            }, 300); // Чекаємо поки згасне прозорість
            
        }, 1200); // ЧАС ШУМУ
        
    }, 50);
}

// =========================================================
// ПЕРЕХІД ВІД "EWIGER SOMMER" ДО "HAUPTSTADT" (З ШУМОМ)
// =========================================================
const summerHauptstadtBtn = document.getElementById('summer-cp-1'); 
if (summerHauptstadtBtn) {
    summerHauptstadtBtn.addEventListener('click', (e) => {
        e.stopPropagation(); 
        if (currentState === 'SUMMER_REGION_POINTS_SHOWN') {
            // ЗАМІСТЬ ПРЯМОГО ПЕРЕХОДУ - ВИКЛИКАЄМО ШУМ
            showNoiseScreen(triggerSummerHauptstadtSlide);
        }
    });
}

function triggerSummerHauptstadtSlide() {
    currentState = 'IN_SUMMER_HAUPTSTADT_SLIDE';
    const sHauptstadt = document.getElementById('slide-summer-hauptstadt');
    sHauptstadt.style.display = 'flex';
    
    setTimeout(() => {
        sHauptstadt.classList.add('visible');
        setTimeout(() => {
            document.querySelector('.summer-hauptstadt-bg-img').classList.add('revealed');
            setTimeout(() => {
                revealText(spansSummerHauptstadtTitle, 15, () => {
                    revealText(spansSummerHauptstadtDesc, 5, () => {
                        activateBackButton('slide-summer-hauptstadt');
                    });
                });
            }, 400); 
        }, 50);
    }, 50);
}

// Повернення на карту Вічного Літа (Слайд 11)
function backToSummer(currentSlideId) {
    const currentSlide = document.getElementById(currentSlideId);
    if (!currentSlide) return;
    
    currentSlide.classList.remove('visible');
    
    setTimeout(() => {
        currentSlide.style.display = 'none';
        
        const summerSlide = document.getElementById('slide-11');
        summerSlide.style.display = 'flex';
        
        setTimeout(() => {
            summerSlide.classList.add('visible');
            currentState = 'SUMMER_REGION_POINTS_SHOWN'; 
        }, 50);
    }, 400);
}

// =========================================================
// ПЕРЕХІД ВІД "EWIGER SOMMER" ДО "GENERALSTAB" (З ШУМОМ)
// =========================================================
const summerGeneralstabBtn = document.getElementById('summer-cp-2'); 
if (summerGeneralstabBtn) {
    summerGeneralstabBtn.addEventListener('click', (e) => {
        e.stopPropagation(); 
        if (currentState === 'SUMMER_REGION_POINTS_SHOWN') {
            // Викликаємо шум, після якого відкриється Generalstab
            showNoiseScreen(triggerSummerGeneralstabSlide);
        }
    });
}

function triggerSummerGeneralstabSlide() {
    currentState = 'IN_SUMMER_GENERALSTAB_SLIDE';
    const sGeneralstab = document.getElementById('slide-summer-generalstab');
    sGeneralstab.style.display = 'flex';
    
    setTimeout(() => {
        sGeneralstab.classList.add('visible');
        setTimeout(() => {
            // Проявлення картинки
            document.querySelector('.summer-generalstab-bg-img').classList.add('revealed');
            
            // Друк тексту
            setTimeout(() => {
                revealText(spansSummerGeneralstabTitle, 15, () => {
                    revealText(spansSummerGeneralstabDesc, 5, () => {
                        activateBackButton('slide-summer-generalstab');
                    });
                });
            }, 400); 
        }, 50);
    }, 50);
}

// =========================================================
// ÜBERGANG VON "HALBAUTONOME ZONE" ZU "WAFFENFABRIK" (MIT RAUSCHEN)
// =========================================================
const waffenfabrikBtn = document.getElementById('autonom-cp-1'); 
if (waffenfabrikBtn) {
    waffenfabrikBtn.addEventListener('click', (e) => {
        e.stopPropagation(); 
        if (currentState === 'AUTONOM_REGION_POINTS_SHOWN') {
            // Signalverlust-Rauschen vor dem Wechsel
            showNoiseScreen(triggerWaffenfabrikSlide);
        }
    });
}

function triggerWaffenfabrikSlide() {
    currentState = 'IN_WAFFENFABRIK_SLIDE';
    const sWaffenfabrik = document.getElementById('slide-autonom-waffenfabrik');
    sWaffenfabrik.style.display = 'flex';
    
    setTimeout(() => {
        sWaffenfabrik.classList.add('visible');
        setTimeout(() => {
            // Bild einblenden
            document.querySelector('.waffenfabrik-bg-img').classList.add('revealed');
            
            // Text tippen lassen
            setTimeout(() => {
                revealText(spansWaffenfabrikTitle, 15, () => {
                    revealText(spansWaffenfabrikDesc, 5, () => {
                        activateBackButton('slide-autonom-waffenfabrik');
                    });
                });
            }, 400); 
        }, 50);
    }, 50);
}

// Zurück zur Karte der Halbautonomen Zone (Slide 13)
function backToAutonom(currentSlideId) {
    const currentSlide = document.getElementById(currentSlideId);
    if (!currentSlide) return;
    
    currentSlide.classList.remove('visible');
    
    setTimeout(() => {
        currentSlide.style.display = 'none';
        
        const autonomSlide = document.getElementById('slide-13');
        autonomSlide.style.display = 'flex';
        
        setTimeout(() => {
            autonomSlide.classList.add('visible');
            currentState = 'AUTONOM_REGION_POINTS_SHOWN'; 
        }, 50);
    }, 400);
}

// =========================================================
// КЛІК ПО ТОЧЦІ "HAUPTSTADT" В ОСОНІ (БЛОКУВАННЯ / МЕРТВА ТОЧКА)
// =========================================================
const autumnHauptstadtBtn = document.getElementById('autumn-cp-1'); 
if (autumnHauptstadtBtn) {
    autumnHauptstadtBtn.addEventListener('click', (e) => {
        e.stopPropagation(); 
        if (currentState === 'AUTUMN_REGION_POINTS_SHOWN') {
            
            // Викликаємо екран шуму
            showNoiseScreen(() => {
                // Ця функція спрацює після кліку по шуму.
                // Замість переходу на новий слайд, ми просто відновлюємо стан Осені,
                // щоб юзер міг натиснути кнопку "Назад на глобальну карту".
                currentState = 'AUTUMN_REGION_POINTS_SHOWN'; 
            });
            
        }
    });
}

// ================== GEBRECHEN ==================
function triggerGebrechenSlide() {
    switchMusic('music-fears', 0.5);
    currentState = 'IN_GEBRECHEN_SLIDE';
    const sGebrechen = document.getElementById('slide-gebrechen');
    sGebrechen.style.display = 'flex';
    
    setTimeout(() => {
        sGebrechen.classList.add('visible');
        setTimeout(() => {
            document.querySelector('.gebrechen-bg-img').classList.add('revealed');
            
            if (!baseGebrechenRevealed) {
                setTimeout(() => {
                    document.getElementById('gebrechen-pulse-trigger').style.display = 'block';
                }, 2000); 
            } else {
                // Якщо вже були - автоматично перевіряємо нові хвороби
                setTimeout(() => {
                    showErworbene('gebrechen', 'erworbene-gebrechen-section', 'erworbene-gebrechen-list');
                }, 400);
            }
        }, 50);
    }, 50);
}

function handleGebrechenPulseClick() {
    if (currentState === 'IN_GEBRECHEN_SLIDE') {
        currentState = 'GEBRECHEN_SLIDE_INTERACTIVE';
        baseGebrechenRevealed = true; 
        
        const pulseIcon = document.querySelector('#gebrechen-pulse-trigger .pulse-icon');
        if (pulseIcon) pulseIcon.style.animation = 'none';
        
        const content = document.getElementById('gebrechen-text-content');
        if (content) content.style.opacity = '1';
        
        revealText(spansGebrechenTitle, 15, () => {
            revealText(spansGebrechenList, 5, () => {
                
                // РОЗУМНА АКТИВАЦІЯ КНОПКИ:
                const allItems = getCollectedItems('gebrechen');
                const newItems = allItems.filter(item => !printedGebrechen.includes(item));
                
                // Якщо нових хвороб немає — активуємо відразу
                if (newItems.length === 0) {
                    activateBackButton('slide-gebrechen');
                } else {
                    // Якщо є — почнеться друк нових, і кнопка увімкнеться в кінці
                    setTimeout(() => {
                        showErworbene('gebrechen', 'erworbene-gebrechen-section', 'erworbene-gebrechen-list');
                    }, 400); 
                }
                
            });
        });
    }
}

// Активує кнопку "Назад" у вказаному слайді
function activateBackButton(slideId) {
    const btn = document.querySelector(`#${slideId} .back-btn`);
    if (btn) btn.classList.add('ready');
}

// Скидає кнопку до сірого стану (при виході або вході)
function resetBackButton(slideId) {
    const btn = document.querySelector(`#${slideId} .back-btn`);
    if (btn) btn.classList.remove('ready');
}

// =========================================================
// ФУНКЦІЇ ДЛЯ КНОПОК "НАЗАД"
// =========================================================

// Універсальний помічник для миттєвого зникнення кнопки і швидкого переходу
function hideSlideSnappy(slideId, callback) {
    const currentSlide = document.getElementById(slideId);
    if (!currentSlide) return;
    
    // МИТТЄВО прибираємо кнопку, щоб вона не "сіріла" перед очима
    const btn = currentSlide.querySelector('.back-btn');
    if (btn) btn.style.display = 'none';

    currentSlide.classList.remove('visible');
    
    // Перехід тепер триває 300мс (0.3с) замість 400мс
    setTimeout(() => {
        currentSlide.style.display = 'none';
        if (btn) btn.style.display = 'block'; // Повертаємо для наступного разу
        resetBackButton(slideId); 
        if(callback) callback();
    }, 300); 
}

// Повернення на глобальну карту світу (Слайд 8)
function backToMap(currentSlideId) {
    hideSlideSnappy(currentSlideId, () => {
        if (isGameFullyCompleted() && !isEndingTriggered) {
            isEndingTriggered = true;
            triggerEndingSequence();
            return;
        }
        
        // Вмикаємо музику карти
        switchMusic('music-map', 0.4); 
        
        const mapSlide = document.getElementById('slide-8');
        mapSlide.style.display = 'flex';
        
        setTimeout(() => {
            mapSlide.classList.add('visible');
            if (hasSeenAmygdala && hasSeenGebrechen && !mapPointsRevealed) {
                mapPointsRevealed = true;
                document.querySelectorAll('.map-checkpoint').forEach((cp, idx) => {
                    setTimeout(() => cp.classList.add('revealed'), idx * 200);
                });
                setTimeout(() => { currentState = 'MAP_INTERACTIVE'; }, 400);
            } else if (mapPointsRevealed) {
                currentState = 'MAP_INTERACTIVE'; 
            } else {
                currentState = 'WAITING_FOR_SIDE_SLIDES';
            }
        }, 50);
    });
}

// Повернення на карту Вічної Зими (Слайд 9)
function backToWinter(currentSlideId) {
    hideSlideSnappy(currentSlideId, () => {
        const winterSlide = document.getElementById('slide-9');
        winterSlide.style.display = 'flex';
        setTimeout(() => {
            winterSlide.classList.add('visible');
            currentState = 'WINTER_REGION_POINTS_SHOWN';
        }, 50);
    });
}

// Повернення на карту Вічної Весни (Слайд 12)
function backToSpring(currentSlideId) {
    hideSlideSnappy(currentSlideId, () => {
        const springSlide = document.getElementById('slide-12');
        springSlide.style.display = 'flex';
        setTimeout(() => {
            springSlide.classList.add('visible');
            currentState = 'SPRING_REGION_POINTS_SHOWN'; 
        }, 50);
    });
}

// Повернення на карту Вічного Літа (Слайд 11)
function backToSummer(currentSlideId) {
    hideSlideSnappy(currentSlideId, () => {
        const summerSlide = document.getElementById('slide-11');
        summerSlide.style.display = 'flex';
        setTimeout(() => {
            summerSlide.classList.add('visible');
            currentState = 'SUMMER_REGION_POINTS_SHOWN'; 
        }, 50);
    });
}

// Повернення на карту Напівавтономної Зони (Слайд 13)
function backToAutonom(currentSlideId) {
    hideSlideSnappy(currentSlideId, () => {
        const autonomSlide = document.getElementById('slide-13');
        autonomSlide.style.display = 'flex';
        setTimeout(() => {
            autonomSlide.classList.add('visible');
            currentState = 'AUTONOM_REGION_POINTS_SHOWN'; 
        }, 50);
    });
}

// =========================================================
// --- 7. ЛОГІКА ЗДОБУТИХ СТРАХІВ ТА ХВОРОБ (ERWORBENE) ---
// =========================================================

// Змінні для збереження стану (щоб не друкувати двічі)
let printedFears = [];
let printedGebrechen = [];
let baseFearsRevealed = false;
let baseGebrechenRevealed = false;

// Функція збору здобутих елементів з відвіданих локацій
function getCollectedItems(type) {
    let collected = [];
    visitedLocations.forEach(locId => {
        if (acquiredData[locId] && acquiredData[locId][type]) {
            collected = collected.concat(acquiredData[locId][type]);
        }
    });
    return collected;
}

// Головна функція запуску блоку "Erworbene"
function showErworbene(type, sectionId, listId) {
    const allItems = getCollectedItems(type);
    const printedList = type === 'fears' ? printedFears : printedGebrechen;
    
    // Знаходимо тільки ТІ слова, які ще не були надруковані
    const newItems = allItems.filter(item => !printedList.includes(item));
    const slideId = type === 'fears' ? 'slide-14' : 'slide-gebrechen';
    
    // --- ЗАХИСТ ВІД ПАСТКИ: Якщо немає нових елементів, просто активуємо кнопку і виходимо ---
    if (newItems.length === 0) {
        activateBackButton(slideId);
        return;
    }
    
    if (allItems.length > 0) {
        const section = document.getElementById(sectionId);
        section.style.display = 'flex'; 
        
        const title = section.querySelector('h1');
        
        // Якщо це ПЕРШИЙ раз, коли ми щось додаємо в цей список
        if (printedList.length === 0 && newItems.length > 0) {
            title.innerHTML = type === 'fears' ? 'Erworbene Ängste' : 'Erworbene Gebrechen';
            const spansTitle = prepareText(title);
            revealText(spansTitle, 15, () => {
                typeNewItems(listId, newItems, printedList);
            });
        } else if (newItems.length > 0) {
            // Якщо заголовок вже є, просто додруковуємо НОВІ елементи
            typeNewItems(listId, newItems, printedList);
        }
    }
}

function typeNewItems(listId, newItems, printedList) {
    const container = document.getElementById(listId);
    let i = 0;
    function typeNextItem() {
        if (i < newItems.length) {
            const div = document.createElement('div');
            div.innerText = newItems[i];
            container.appendChild(div);

            const spans = prepareText(div);
            revealText(spans, 15, () => {
                printedList.push(newItems[i]);
                i++;
                setTimeout(typeNextItem, 200); 
            });
        } else {
            // --- КОЛИ ВСІ НОВІ ПУНКТИ СКІНЧИЛИСЯ ---
            // Визначаємо, який це слайд по ID списку і активуємо кнопку
            const slideId = listId.includes('fears') ? 'slide-14' : 'slide-gebrechen';
            activateBackButton(slideId);
        }
    }
    typeNextItem();
}

// =========================================================
// --- 8. ТРЕКЕР ВІДВІДУВАНЬ ТА ЗМІНА КОЛЬОРУ НА СІРИЙ ---
// =========================================================

// Проста і надійна функція: записує в пам'ять і фарбує точку
// (Перевірку стану прибрано, бо невидимі слайди і так не клікабельні)
function markAsVisited(slideId, elementId) {
    if (!visitedLocations.has(slideId)) {
        visitedLocations.add(slideId);
        const el = document.getElementById(elementId);
        if (el) el.classList.add('visited');

        // ПЕРЕВІРКА НА ОНОВЛЕННЯ:
        if (acquiredData[slideId]) {
            // Якщо локація дає новий страх — показуємо крапку на правій стрілці
            if (acquiredData[slideId].fears && acquiredData[slideId].fears.length > 0) {
                const badge = document.getElementById('badge-amygdala');
                if (badge) badge.style.display = 'block';
            }
            // Якщо локація дає нову хворобу — показуємо крапку на лівій стрілці
            if (acquiredData[slideId].gebrechen && acquiredData[slideId].gebrechen.length > 0) {
                const badge = document.getElementById('badge-gebrechen');
                if (badge) badge.style.display = 'block';
            }
        }
    }
}
// Регіони (Головна карта)
document.getElementById('cp-3')?.addEventListener('click', () => markAsVisited('slide-9', 'cp-3'));
document.getElementById('cp-2')?.addEventListener('click', () => markAsVisited('slide-10', 'cp-2'));
document.getElementById('cp-1')?.addEventListener('click', () => markAsVisited('slide-11', 'cp-1'));
document.getElementById('cp-5')?.addEventListener('click', () => markAsVisited('slide-12', 'cp-5'));
document.getElementById('cp-4')?.addEventListener('click', () => markAsVisited('slide-13', 'cp-4'));

// Підлокації (Внутрішні карти) - Зима
document.getElementById('winter-cp-2')?.addEventListener('click', () => markAsVisited('slide-zentrum', 'winter-cp-2'));
document.getElementById('winter-cp-1')?.addEventListener('click', () => markAsVisited('slide-delta', 'winter-cp-1'));
document.getElementById('winter-cp-3')?.addEventListener('click', () => markAsVisited('slide-arkateion', 'winter-cp-3'));
document.getElementById('winter-cp-4')?.addEventListener('click', () => markAsVisited('slide-quartier', 'winter-cp-4'));

// Підлокації - Осінь (Мертва точка з шумом)
document.getElementById('autumn-cp-1')?.addEventListener('click', () => markAsVisited('slide-autumn-hauptstadt', 'autumn-cp-1'));

// Підлокації - Літо
document.getElementById('summer-cp-1')?.addEventListener('click', () => markAsVisited('slide-summer-hauptstadt', 'summer-cp-1'));
document.getElementById('summer-cp-2')?.addEventListener('click', () => markAsVisited('slide-summer-generalstab', 'summer-cp-2'));

// Підлокації - Весна
document.getElementById('spring-cp-1')?.addEventListener('click', () => markAsVisited('slide-kurilen', 'spring-cp-1'));
document.getElementById('spring-cp-2')?.addEventListener('click', () => markAsVisited('slide-volkerkreuzer', 'spring-cp-2'));

// Підлокації - Напівавтономна Зона
document.getElementById('autonom-cp-1')?.addEventListener('click', () => markAsVisited('slide-autonom-waffenfabrik', 'autonom-cp-1'));

// =========================================================
// --- 9. ФІНАЛЬНА СЦЕНА (КІНЕЦЬ ГРИ) ---
// =========================================================

let isEndingTriggered = false; // Захист від подвійного запуску

function isGameFullyCompleted() {
    // 1. Перевіряємо, чи гравець відвідав усі сюжетні локації з бази даних
    const requiredLocations = Object.keys(acquiredData);
    for (let loc of requiredLocations) {
        if (!visitedLocations.has(loc)) return false;
    }
    
    // 2. Перевіряємо, чи юзер прочитав усі знайдені страхи та хвороби
    const allFears = getCollectedItems('fears');
    const allGebrechen = getCollectedItems('gebrechen');
    
    const unreadFears = allFears.filter(item => !printedFears.includes(item));
    const unreadGebrechen = allGebrechen.filter(item => !printedGebrechen.includes(item));
    
    // Якщо залишилося хоч щось непрочитане — гра ще не закінчена
    return unreadFears.length === 0 && unreadGebrechen.length === 0;
}

function triggerEndingSequence() {
    currentState = 'ENDING_SEQUENCE';
    switchMusic('music-final', 0.6);
    
    // 1. Вимикаємо старий червоний екран ТА слова ANGST
    const redScreen = document.getElementById('red-screen');
    if (redScreen) redScreen.style.display = 'none';
    
    const angstSlide = document.getElementById('slide-6-7'); // <-- ДОДАНО: Знаходимо слайд зі страхом
    if (angstSlide) angstSlide.style.display = 'none';       // <-- ДОДАНО: Назавжди ховаємо його
    
    // 2. Гарантовано ховаємо карту
    const mapSlide = document.getElementById('slide-8');
    if (mapSlide) {
        mapSlide.style.opacity = '0';
        setTimeout(() => { mapSlide.style.display = 'none'; }, 500);
    }
    
    // 3. Робимо чорний екран і вирівнюємо текст РІВНО по центру
    for (let i = 15; i <= 19; i++) {
        const slide = document.getElementById(`slide-${i}`);
        if (slide) {
            slide.style.position = 'absolute';
            slide.style.top = '0';
            slide.style.left = '0';
            slide.style.width = '100vw'; 
            slide.style.height = '100vh';
            slide.style.boxSizing = 'border-box'; 
            slide.style.justifyContent = 'center';
            slide.style.alignItems = 'center';
            slide.style.backgroundColor = '#000000'; 
            slide.style.zIndex = '9999'; 
        }
    }
    
    // Слайд 15 (Перший слайд фіналу)
    const s15 = document.getElementById('slide-15');
    s15.style.display = 'flex';
    setTimeout(() => {
        s15.classList.add('visible');
        revealText(spansSlide15Fr, 35, () => {
            revealText(spansSlide15De, 35, () => {
                setTimeout(() => transitionToEndingSlide('slide-15', 'slide-16', spansSlide16Fr, spansSlide16De, playSlide17), 2500);
            });
        });
    }, 500); 
}

function transitionToEndingSlide(oldSlideId, newSlideId, frSpans, deSpans, nextCallback) {
    const oldSlide = document.getElementById(oldSlideId);
    if (oldSlide) oldSlide.style.opacity = '0';
    
    setTimeout(() => {
        if (oldSlide) oldSlide.style.display = 'none';
        
        const newSlide = document.getElementById(newSlideId);
        newSlide.style.display = 'flex';
        setTimeout(() => {
            newSlide.classList.add('visible');
            
            // МАГІЯ ТУТ: Останній слайд з ефектом сумніву та згасанням у темряву
            if (newSlideId === 'slide-19') {
                hesitantReveal(frSpans, () => {
                    revealText(deSpans, 40, () => {
                        
                        // --- ДОДАНО: Повільне і драматичне згасання тексту ---
                        setTimeout(() => {
                            newSlide.style.transition = 'opacity 4s ease-in-out'; // Дуже повільно
                            newSlide.style.opacity = '0'; // Текст зникає, залишається вічна темрява
                        }, 3000); // 3 секунди юзер дивиться на слова "Я боюсь", після чого вони тануть
                        
                    });
                });
            } else {
                // Звичайний друк для слайдів 16, 17, 18
                revealText(frSpans, 35, () => {
                    revealText(deSpans, 35, () => {
                        if (nextCallback) setTimeout(nextCallback, 2500); 
                    });
                });
            }
        }, 50);
    }, 400); 
}

// Ланцюжок викликів наступних слайдів
function playSlide17() { transitionToEndingSlide('slide-16', 'slide-17', spansSlide17Fr, spansSlide17De, playSlide18); }
function playSlide18() { transitionToEndingSlide('slide-17', 'slide-18', spansSlide18Fr, spansSlide18De, playSlide19); }
function playSlide19() { transitionToEndingSlide('slide-18', 'slide-19', spansSlide19Fr, spansSlide19De, null); }

// =========================================================
// --- ЗАХИСТ ВІД ВИПАДКОВОГО ПЕРЕЗАВАНТАЖЕННЯ ---
// =========================================================
window.addEventListener('beforeunload', function (e) {
    // Показуємо попередження тільки якщо гравець вже зайшов у гру (пройшов перший екран), 
    // але ще не дійшов до фінальних титрів
    if (currentState !== 'START' && currentState !== 'ENDING_SEQUENCE') {
        e.preventDefault();
        e.returnValue = ''; // Сучасні браузери самі покажуть стандартне попередження
    }
});