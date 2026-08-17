function calculateResults() {
    const answers = JSON.parse(localStorage.getItem('spiritualGiftsAnswers') || '{}');
    
    // Initialize 20 scores (for 20 categories)
    const scores = new Array(20).fill(0);
    const categories = {};
    
    // Group questions by category
    QUESTIONS.forEach(question => {
        if (!categories[question.category]) {
            categories[question.category] = [];
        }
        categories[question.category].push(question.id);
    });
    
    // Calculate scores based on categories
    Object.entries(answers).forEach(([questionId, answerValue]) => {
        // Find which category this question belongs to
        const question = QUESTIONS.find(q => q.id === questionId);
        if (question) {
            const categoryIndex = question.category - 1; // 0-based index
            scores[categoryIndex] += parseInt(answerValue) || 0;
        }
    });
    
    // Define your 20 gift names (customize these!)
    const giftNames = [
        '宣言', '服事', '教導真道','鼓勵',
        '慷慨', '培養同工', '憐憫', '智慧', '知識',
        '信心','醫治', '行異能','辨別',  '說方言', '翻方言', 
        '使徒', '助人', '治理領導','傳福音','牧養'
    ];
    
    // Create result objects
    const results = scores.map((score, index) => ({
        category: index + 1,
        name: giftNames[index] || `恩賜 ${index + 1}`,
        score: score,
        maxScore: categories[index + 1] ? categories[index + 1].length * 4 : 40,
        percentage: categories[index + 1] ? 
            ((score / (categories[index + 1].length * 4)) * 100).toFixed(1) : 0,
        questionCount: categories[index + 1] ? categories[index + 1].length : 10
    }));
    
    // Sort by score descending
    results.sort((a, b) => b.score - a.score);
    
    return {
        results: results,
        totalQuestions: QUESTIONS.length,
        answeredQuestions: Object.keys(answers).length,
        completedAt: new Date().toISOString()
    };
}
