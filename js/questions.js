let QUESTIONS = [];
let questionsLoaded = false;

async function loadQuestions() {
    console.log('Starting to load questions...');
    console.log('Fetching from:', CONFIG.googleSheetURL);
    
    try {
        // Check if URL is configured
        if (!CONFIG.googleSheetURL || CONFIG.googleSheetURL.includes('YOUR_SHEET_ID')) {
            throw new Error('Google Sheet URL is not configured. Please update config.js');
        }
        
        const response = await fetch(CONFIG.googleSheetURL);
        console.log('Response status:', response.status);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const csvText = await response.text();
        console.log('CSV data received (first 200 chars):', csvText.substring(0, 200));
        
        // Parse CSV
        const parsed = parseCSV(csvText);
        console.log('Parsed rows:', parsed.length);
        console.log('First row:', parsed[0]);
        
        // Process questions
        QUESTIONS = parsed
            .filter(row => row.Question_ID && row.Question_ID.trim().startsWith('Q'))
            .map(row => ({
                id: row.Question_ID.trim(),
                text: row.Question_Text.trim(),
                category: parseInt(row.Category)
            }))
            .sort((a, b) => {
                const numA = parseInt(a.id.replace('Q', ''));
                const numB = parseInt(b.id.replace('Q', ''));
                return numA - numB;
            });
        
        console.log('Total questions loaded:', QUESTIONS.length);
        console.log('First question:', QUESTIONS[0]);
        console.log('Last question:', QUESTIONS[QUESTIONS.length - 1]);
        
        if (QUESTIONS.length === 0) {
            throw new Error('No questions were parsed from the CSV data');
        }
        
        questionsLoaded = true;
        return QUESTIONS;
        
    } catch (error) {
        console.error('Error loading questions:', error);
        
        // Show error message on the page
        const container = document.getElementById('questionsContainer');
        if (container) {
            container.innerHTML = `
                <div style="text-align: center; padding: 20px; background: #ffebee; border-radius: 8px;">
                    <h3 style="color: #c62828; margin-bottom: 10px;">載入問題時發生錯誤</h3>
                    <p style="color: #424242;">錯誤信息: ${error.message}</p>
                    <p style="color: #757575; margin-top: 10px;">請檢查以下事項：</p>
                    <ul style="text-align: left; margin-top: 10px; color: #424242;">
                        <li>Google Sheet 是否已發布為 CSV 格式</li>
                        <li>config.js 中的 URL 是否正確</li>
                        <li>Google Sheet 的權限是否設定為「任何人有連結都可檢視」</li>
                        <li>瀏覽器控制台是否有其他錯誤信息</li>
                    </ul>
                    <button onclick="retryLoadQuestions()" 
                            style="margin-top: 15px; padding: 10px 20px; background: #1976d2; color: white; border: none; border-radius: 5px; cursor: pointer;">
                        重試
                    </button>
                </div>
            `;
        }
        
        // Don't fall back to placeholder questions
        return [];
    }
}

function retryLoadQuestions() {
    const container = document.getElementById('questionsContainer');
    container.innerHTML = '<p style="text-align: center; color: #757575;">重新載入中...</p>';
    
    loadQuestions().then(() => {
        if (QUESTIONS.length > 0) {
            renderPage(currentPage);
            renderPageIndicators();
            updateNavigation();
        }
    });
}

// Improved CSV parser
function parseCSV(csvText) {
    const lines = csvText.split('\n').filter(line => line.trim());
    if (lines.length === 0) return [];
    
    // Parse headers
    const headers = lines[0].split(',').map(h => h.trim().replace(/^"|"$/g, ''));
    console.log('CSV Headers:', headers);
    
    const result = [];
    
    for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;
        
        // Handle quoted fields
        const values = [];
        let current = '';
        let inQuotes = false;
        
        for (let j = 0; j < line.length; j++) {
            const char = line[j];
            
            if (char === '"') {
                inQuotes = !inQuotes;
            } else if (char === ',' && !inQuotes) {
                values.push(current.trim());
                current = '';
            } else {
                current += char;
            }
        }
        values.push(current.trim());
        
        const obj = {};
        headers.forEach((header, index) => {
            obj[header] = values[index] ? values[index].replace(/^"|"$/g, '') : '';
        });
        
        result.push(obj);
    }
    
    return result;
}

// Remove the placeholder function
function generatePlaceholderQuestions() {
    return []; // Return empty array instead
}
