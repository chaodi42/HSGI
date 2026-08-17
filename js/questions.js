let QUESTIONS = [];

async function loadQuestions() {
    try {
        const response = await fetch(CONFIG.googleSheetURL);
        const csvText = await response.text();
        
        // Parse CSV manually or use Papa Parse
        const parsed = parseCSV(csvText);
        
        QUESTIONS = parsed
            .filter(row => row.Question_ID && row.Question_ID.startsWith('Q'))
            .map(row => ({
                id: row.Question_ID.trim(),
                text: row.Question_Text.trim(),
                category: parseInt(row.Category)
            }))
            .sort((a, b) => {
                // Sort by question number
                const numA = parseInt(a.id.replace('Q', ''));
                const numB = parseInt(b.id.replace('Q', ''));
                return numA - numB;
            });
        
        console.log(`Loaded ${QUESTIONS.length} questions`);
        return QUESTIONS;
    } catch (error) {
        console.error('Error loading questions:', error);
        // Show error message to user
        document.getElementById('questionsContainer').innerHTML = 
            '<p style="color: red; text-align: center;">無法載入問題，請稍後再試。</p>';
        return [];
    }
}

// Simple CSV parser (in case you don't want to use Papa Parse)
function parseCSV(csvText) {
    const lines = csvText.split('\n');
    const headers = lines[0].split(',').map(h => h.trim());
    const result = [];
    
    for (let i = 1; i < lines.length; i++) {
        if (!lines[i].trim()) continue;
        
        const values = lines[i].split(',');
        const obj = {};
        
        headers.forEach((header, index) => {
            // Remove quotes if present
            obj[header] = values[index] ? values[index].replace(/^"|"$/g, '') : '';
        });
        
        result.push(obj);
    }
    
    return result;
}
