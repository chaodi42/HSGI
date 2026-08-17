// Configuration
const CONFIG = {
    totalPages: 10,
    questionsPerPage: 20,
    totalQuestions: 200,
    // Replace with your actual published URL
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
        // Updated to use Category column
        calculateGroup: function(category) {
            return parseInt(category) - 1; // Category 1-20 maps to index 0-19
        }
    }
};
