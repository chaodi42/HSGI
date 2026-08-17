// Initialize quiz
document.addEventListener('DOMContentLoaded', async function() {
    console.log('Quiz initialization started');
    
    // Show loading message
    const container = document.getElementById('questionsContainer');
    container.innerHTML = '<p style="text-align: center; color: #757575;">正在載入問題...</p>';
    
    // Load questions first
    await loadQuestions();
    
    if (QUESTIONS.length === 0) {
        console.error('No questions loaded, stopping initialization');
        return;
    }
    
    console.log('Questions loaded successfully, initializing quiz');
    
    // Get current page from URL
    const urlParams = new URLSearchParams(window.location.search);
    currentPage = parseInt(urlParams.get('page')) || 1;
    
    // Load saved answers from localStorage
    loadSavedAnswers();
    
    // Render current page
    renderPage(currentPage);
    renderPageIndicators();
    updateNavigation();
    
    // Update URL without reload
    updateURL(currentPage);
});
