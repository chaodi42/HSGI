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
    
    // Initialize 20 scores (for 20 spiritual gifts)
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
    console.log('Question counts:', questionCounts);
    
    // Define the 20 spiritual gifts (in order 1-20)
// Define Chinese names only
const giftNamesChinese = [
    '宣言',                    // 1
    '服事',                    // 2
    '教導真道',                // 3
    '鼓勵',                    // 4
    '慷慨',                    // 5
    '培養同工',                // 6
    '憐憫',                    // 7
    '智慧',                    // 8
    '知識',                    // 9
    '信心',                    // 10
    '醫病',                    // 11
    '行異能',                  // 12
    '辨別',                    // 13
    '說方言',                  // 14
    '翻方言',                  // 15
    '使徒',                    // 16
    '助人',                    // 17
    '治理領導',                // 18
    '傳福音',                  // 19
    '牧養'                     // 20
];

    // Define English names only
    const giftNamesEnglish = [
        'Proclamation',                    // 1
        'Servanthood',                     // 2
        'Teaching the Faith',              // 3
        'Encouragement',                   // 4
        'Generosity',                      // 5
        'Nurturing Leadership',            // 6
        'Mercy',                           // 7
        'Wisdom',                          // 8
        'Knowing',                         // 9
        'Faith',                           // 10
        'Healing',                         // 11
        'Miracles',                        // 12
        'Discernment',                     // 13
        'Tongues',                         // 14
        'Interpretation of Tongues',       // 15
        'Apostleship',                     // 16
        'Helping',                         // 17
        'Visionary and Managing Leadership', // 18
        'Evangelism',                      // 19
        'Shepherding'                      // 20
    ];
    
    // Create result objects
    const results = scores.map((score, index) => {
        const maxScore = (questionCounts[index] || 10) * 4;
        const percentage = maxScore > 0 ? ((score / maxScore) * 100).toFixed(1) : 0;
        
        return {
            category: index + 1,
            nameChinese: giftNamesChinese[index] || `恩賜 ${index + 1}`,
            nameEnglish: giftNamesEnglish[index] || `Gift ${index + 1}`,
            name: `${giftNamesChinese[index]} (${giftNamesEnglish[index]})`, // Full name for table
            score: score,
            maxScore: maxScore,
            percentage: percentage,
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
