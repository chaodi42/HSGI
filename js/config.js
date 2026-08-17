// Configuration
const CONFIG = {
    totalPages: 10,
    questionsPerPage: 20,
    totalQuestions: 200,
    googleSheetURL: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSvOrFy7rmP1DKxgTz4I3LrCrfPh-UaCWEIlbhLh7ThGZogOiTskxnmYxNf30x91syWbe3zS6xkkoM4/pub?gid=0&single=true&output=csv',
    scale: {
        4: '經常',
        3: '時常',
        2: '有時',
        1: '偶爾',
        0: '從不'
    },
    scoring: {
        entries: 20,
        calculateGroup: function(category) {
            return parseInt(category) - 1;
        }
    }
};

// Debug: Log the URL being used
console.log('Google Sheet URL:', CONFIG.googleSheetURL);
