// Debug version of quiz.js
let currentPage = 1;
let answers = {};

// Define all functions FIRST
function loadSavedAnswers() {
    const saved = localStorage.getItem('spiritualGiftsAnswers');
    if (saved) {
        answers = JSON.parse(saved);
        console.log('Loaded saved answers:', Object.keys(answers).length);
    }
}

function saveAnswers() {
    localStorage.setItem('spiritualGiftsAnswers', JSON.stringify(answers));
}

function renderPage(page) {
    console.log('Rendering page:', page);
    
    const startIndex = (page - 1) * CONFIG.questionsPerPage;
    const endIndex = Math.min(startIndex + CONFIG.questionsPerPage, QUESTIONS.length);
    const pageQuestions = QUESTIONS.slice(startIndex, endIndex);
    
    console.log('Questions for this page:', pageQuestions.length);
    
    const container = document.getElementById('questionsContainer');
    if (!container) {
        console.error('questionsContainer not found!');
        return;
    }
    
    let html = '<ul class="questions-list">';
    
    pageQuestions.forEach((question, index) => {
        const qNumber = startIndex + index + 1;
        const savedAnswer = answers[question.id];
        const answeredClass = savedAnswer !== undefined ? 'answered' : '';
        
        html += `
            <li class="question-item ${answeredClass}" id="question-${question.id}">
                <div class="question-number">問題 ${qNumber} / ${QUESTIONS.length}</div>
                <div class="question-text">${question.text}</div>
                <div class="options">
                    ${[4, 3, 2, 1, 0].map(value => `
                        <label class="option-label ${savedAnswer == value ? 'selected' : ''}" 
                               onclick="selectAnswer('${question.id}', ${value})">
                            <input type="radio" name="${question.id}" value="${value}" 
                                   ${savedAnswer == value ? 'checked' : ''}>
                            ${value} - ${CONFIG.scale[value]}
                        </label>
                    `).join('')}
                </div>
            </li>
        `;
    });
    
    html += '</ul>';
    container.innerHTML = html;
    
    document.getElementById('currentPage').textContent = page;
    document.getElementById('progressBar').style.width = `${(page / CONFIG.totalPages) * 100}%`;
    
    window.scrollTo(0, 0);
    console.log('Page rendered successfully');
}

function selectAnswer(questionId, value) {
    console.log('Answer selected:', questionId, value);
    answers[questionId] = value;
    saveAnswers();
    
    const questionItem = document.getElementById(`question-${questionId}`);
    if (questionItem) {
        questionItem.classList.add('answered');
        const labels = questionItem.querySelectorAll('.option-label');
        labels.forEach(label => {
            const input = label.querySelector('input');
            if (input.value == value) {
                label.classList.add('selected');
            } else {
                label.classList.remove('selected');
            }
        });
    }
    
    renderPageIndicators();
}

function navigatePage(direction) {
    const newPage = currentPage + direction;
    
    if (newPage >= 1 && newPage <= CONFIG.totalPages) {
        currentPage = newPage;
        renderPage(currentPage);
        renderPageIndicators();
        updateNavigation();
        updateURL(currentPage);
    } else if (newPage > CONFIG.totalPages) {
        submitQuestionnaire();
    }
}

function updateNavigation() {
    const prevButton = document.getElementById('prevButton');
    const nextButton = document.getElementById('nextButton');
    
    if (prevButton) {
        prevButton.disabled = currentPage === 1;
        prevButton.style.opacity = currentPage === 1 ? '0.5' : '1';
    }
    
    if (nextButton) {
        if (currentPage === CONFIG.totalPages) {
            nextButton.textContent = '提交問卷 ✓';
            nextButton.className = 'nav-button submit-button';
        } else {
            nextButton.textContent = '下一頁 →';
            nextButton.className = 'nav-button next-button';
        }
    }
}

function renderPageIndicators() {
    const container = document.getElementById('pageIndicators');
    if (!container) return;
    
    let html = '';
    for (let i = 1; i <= CONFIG.totalPages; i++) {
        const startIndex = (i - 1) * CONFIG.questionsPerPage;
        const endIndex = Math.min(startIndex + CONFIG.questionsPerPage, QUESTIONS.length);
        const pageQuestions = QUESTIONS.slice(startIndex, endIndex);
        
        const allAnswered = pageQuestions.every(q => answers[q.id] !== undefined);
        let dotClass = '';
        
        if (i === currentPage) {
            dotClass = 'active';
        } else if (allAnswered) {
            dotClass = 'completed';
        }
        
        html += `<div class="page-dot ${dotClass}" onclick="goToPage(${i})">${i}</div>`;
    }
    
    container.innerHTML = html;
}

function goToPage(page) {
    currentPage = page;
    renderPage(currentPage);
    renderPageIndicators();
    updateNavigation();
    updateURL(currentPage);
    window.scrollTo(0, 0);
}

function updateURL(page) {
    const newURL = `${window.location.pathname}?page=${page}`;
    window.history.replaceState({}, '', newURL);
}

function submitQuestionnaire() {
    const unanswered = QUESTIONS.filter(q => answers[q.id] === undefined);
    
    if (unanswered.length > 0) {
        const proceed = confirm(`您還有 ${unanswered.length} 題未回答。確定要提交嗎？\n\n未回答的題目將被計為 0 分（從不）。`);
        if (!proceed) return;
        
        unanswered.forEach(q => {
            answers[q.id] = 0;
        });
    }
    
    saveAnswers();
    window.location.href = 'results.html';
}

// Initialize quiz - THIS MUST BE AT THE END
document.addEventListener('DOMContentLoaded', async function() {
    console.log('=== Quiz Initialization Started ===');
    
    const container = document.getElementById('questionsContainer');
    if (!container) {
        console.error('questionsContainer element not found!');
        return;
    }
    
    container.innerHTML = '<p style="text-align: center; color: #757575;">正在載入問題...</p>';
    
    try {
        console.log('Loading questions...');
        await loadQuestions();
        console.log('Questions loaded:', QUESTIONS.length);
        
        if (QUESTIONS.length === 0) {
            console.error('No questions loaded!');
            container.innerHTML = '<p style="text-align: center; color: red;">載入問題失敗 - 沒有找到問題</p>';
            return;
        }
        
        // Get current page from URL
        const urlParams = new URLSearchParams(window.location.search);
        currentPage = parseInt(urlParams.get('page')) || 1;
        console.log('Current page:', currentPage);
        
        // Load saved answers (function is now defined above)
        loadSavedAnswers();
        
        // Render page
        renderPage(currentPage);
        renderPageIndicators();
        updateNavigation();
        updateURL(currentPage);
        
        console.log('=== Quiz Initialization Complete ===');
        
    } catch (error) {
        console.error('Initialization error:', error);
        container.innerHTML = `<p style="text-align: center; color: red;">錯誤: ${error.message}</p>`;
    }
});
