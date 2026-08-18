# 屬靈恩賜調查問卷 (Spiritual Gifts Questionnaire)

## 簡介

這是一個基於郝甘能屬靈恩賜調查（HSGI）的線上問卷系統，用於幫助基督徒認識和發掘自己的屬靈恩賜。本問卷包含 200 道題目，涵蓋 20 種不同的屬靈恩賜。

**問卷網址：** https://chaodi42.github.io/HSGI/

## 所屬機構

- **機構名稱：** 波士頓郊區華人聖經教會 (CBCGB)
- **課程：** CC105 - 屬靈恩賜與服事
- **用途：** 主日學課程教學使用
- **版權：** © 2026 CBCGB 主日學課程。僅供非商業用途。


## 20 種屬靈恩賜

| 編號 | 中文名稱 | English Name |
|------|---------|--------------|
| 1 | 宣言 | Proclamation |
| 2 | 服事 | Servanthood |
| 3 | 教導真道 | Teaching the Faith |
| 4 | 鼓勵 | Encouragement |
| 5 | 慷慨 | Generosity |
| 6 | 培養同工 | Nurturing Leadership |
| 7 | 憐憫 | Mercy |
| 8 | 智慧 | Wisdom |
| 9 | 知識 | Knowing |
| 10 | 信心 | Faith |
| 11 | 醫病 | Healing |
| 12 | 行異能 | Miracles |
| 13 | 辨別 | Discernment |
| 14 | 說方言 | Tongues |
| 15 | 翻方言 | Interpretation of Tongues |
| 16 | 使徒 | Apostleship |
| 17 | 助人 | Helping |
| 18 | 治理領導 | Visionary and Managing Leadership |
| 19 | 傳福音 | Evangelism |
| 20 | 牧養 | Shepherding |

## Features

- ✅ 200 spiritual gifts assessment questions
- ✅ Divided into 10 pages, 20 questions per page
- ✅ Auto-save answers (localStorage)
- ✅ Real-time calculation of 20 spiritual gift scores
- ✅ Visual results display
- ✅ Email results functionality
- ✅ No backend server required
- ✅ Uses Google Sheets as data source

## How to Use

### Taking the Questionnaire

1. Visit the questionnaire homepage
2. Read the instructions and purpose
3. Click the "開始問卷" (Start Questionnaire) button
4. Answer each question honestly based on your actual situation
5. Select the frequency that best matches (4=Always, 3=Often, 2=Sometimes, 1=Rarely, 0=Never)
6. Complete all 10 pages with 200 questions total
7. Submit to view your results automatically

### Viewing Results

- The results page displays your top 3 spiritual gifts
- The complete results table shows scores for all 20 gifts
- Higher scores indicate more prominent gifts

### Sending Results via Email

- Enter your email address on the results page
- Click the "發送結果" (Send Results) button
- Your email client will open with the results pre-filled
- Review and send the email

## Technical Architecture

### Frontend Technologies
- HTML5
- CSS3 (custom styles)
- Vanilla JavaScript
- Responsive design

### Data Storage
- Google Sheets (question data)
- localStorage (user answers)

### Deployment
- GitHub Pages
- No backend server required

## Project Structure
  HSGI/
  ├── index.html # Homepage (questionnaire instructions)
  ├── pages/
  │ ├── quiz.html # Quiz page
  │ ├── results.html # Results page
  │ └── test.html # Test page (for development)
  ├── js/
  │ ├── config.js # Configuration file
  │ ├── questions.js # Question loading logic
  │ ├── quiz.js # Quiz logic
  │ └── scoring.js # Scoring logic
  ├── css/ # Style files (if needed)
  ├── assets/ # Static assets (if needed)
  └── README.md # Project documentation

## Developer Information

### Developer

- **Email:** chaodi42@gmail.com
- **GitHub:** https://github.com/chaodi42

### Contribution Guidelines

If you want to contribute or improve this project:

1. **Fork this project**
2. **Create a feature branch** (`git checkout -b feature/AmazingFeature`)
3. **Commit your changes** (`git commit -m 'Add some AmazingFeature'`)
4. **Push to the branch** (`git push origin feature/AmazingFeature`)
5. **Open a Pull Request**

### Bug Reports & Suggestions

If you find any issues or have improvement suggestions:

1. Send email to chaodi42@gmail.com
2. Describe the problem or suggestion
3. Attach screenshots (if applicable)
4. Provide reproduction steps (if it's a bug)

## Setup Guide (For Developers)

### Google Sheets Configuration

1. Create a Google Sheet
2. Set up three columns: `Question_ID`, `Question_Text`, `Category`
3. Publish to web: File → Share → Publish to web
4. Select CSV format
5. Copy the published URL
6. Update `googleSheetURL` in `js/config.js`


## Changelog

v1.0.0 (2026)
- ✅ Initial release
- ✅ 200 questions
- ✅ 20 spiritual gifts
- ✅ Results calculation
- ✅ Email sending
- ✅ Responsive design

## License

This project is for use by the Boston Chinese Bible Study Group (CBCGB) Sunday School class only.
- ❌ Commercial use prohibited
- ✅ Church internal use allowed
- ✅ Non-commercial study and research allowed
- © 2026 波士頓郊區華人聖經教會 (CBCGB). All rights reserved.

## Acknowledgments
- 郝甘能屬靈恩賜調查（HSGI） - Questionnaire design foundation
- 波士頓郊區華人聖經教會 (CBCGB) - Course support and guidance
- All testers - Providing valuable user feedback

- May God bless your ministry! 🙏
