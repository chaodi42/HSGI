function calculateResults() {
    console.log('=== Calculating Results ===');
    
    // Load answers
    const savedAnswers = localStorage.getItem('spiritualGiftsAnswers');
    if (!savedAnswers) {
        console.error('No answers found');
        return {
            results: [],
            totalQuestions: 0,
            answeredQuestions: 0
        };
    }
    
    const answers = JSON.parse(savedAnswers);
    console.log('Answers loaded:', Object.keys(answers).length);
    
    // If QUESTIONS is loaded, use categories from questions
    // Otherwise, calculate based on question number pattern
    const scores = new Array(20).fill(0);
    const questionCounts = new Array(20).fill(0);
    
    if (typeof QUESTIONS !== 'undefined' && QUESTIONS.length > 0) {
        console.log('Using questions data for scoring');
        
        // Build category mapping from questions
        QUESTIONS.forEach(question => {
            const categoryIndex = question.category - 1;
            if (categoryIndex >= 0 && categoryIndex < 20) {
                questionCounts[categoryIndex]++;
                
                const answerValue = answers[question.id];
                if (answerValue !== undefined) {
                    scores[categoryIndex] += parseInt(answerValue) || 0;
                }
            }
        });
    } else {
        console.log('Using question number pattern for scoring');
        
        // Fallback: Q1, Q21, Q41... = Category 1
        // Q2, Q22, Q42... = Category 2, etc.
        Object.entries(answers).forEach(([questionId, answerValue]) => {
            const qNumber = parseInt(questionId.replace('Q', ''));
            if (qNumber >= 1 && qNumber <= 200) {
                const categoryIndex = (qNumber - 1) % 20;
                scores[categoryIndex] += parseInt(answerValue) || 0;
                questionCounts[categoryIndex]++;
            }
        });
    }
    
    console.log('Scores calculated:', scores);
    
    // Define gift names (customize these!)
    const giftNames = [
        '教導', '服事', '領導', '憐憫', '勸勉',
        '給予', '行政', '傳福音', '牧養', '信心',
        '分辨', '智慧', '知識', '醫治', '行異能',
        '先知', '說方言', '翻方言', '幫助', '款待'
    ];
    
    // Create result objects
    const results = scores.map((score, index) => {
        const maxScore = (questionCounts[index] || 10) * 4;
        return {
            category: index + 1,
            name: giftNames[index] || `恩賜 ${index + 1}`,
            score: score,
            maxScore: maxScore,
            percentage: maxScore > 0 ? ((score / maxScore) * 100).toFixed(1) : 0,
            questionCount: questionCounts[index] || 10
        };
    });
    
    // Sort by score descending
    results.sort((a, b) => b.score - a.score);
    
    console.log('Top 3 gifts:', results.slice(0, 3));
    
    return {
        results: results,
        totalQuestions: typeof QUESTIONS !== 'undefined' ? QUESTIONS.length : 200,
        answeredQuestions: Object.keys(answers).length,
        completedAt: new Date().toISOString()
    };
}
