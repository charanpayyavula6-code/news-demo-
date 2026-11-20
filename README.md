# ప్రజా వార్తలు | PRAJA VAARTHALU - Telugu & English Digital Newspaper

A responsive, bilingual (Telugu / English) digital newspaper front end built with
**HTML5, CSS3 and vanilla JavaScript (ES6)**. No frameworks.

> **DEMO CONTENT:** every article, name, quote and event in this project is fictional
> and exists only to demonstrate the design and features.

## Project structure

```
news-portal/
├── index.html          Homepage, categories, district news, search, gallery, videos, bookmarks
├── article.html        Article details page (article.html?id=12)
├── epaper.html         ePaper: editions, dates, pages, zoom, full screen, PDF
├── about.html          About Us
├── contact.html        Contact Us
│
├── css/
│   ├── style.css       Base styles: colours, typography, header, nav, cards, footer
│   ├── article.css     Article, ePaper, gallery, video, forms and print styles
│   └── responsive.css  Desktop / tablet / mobile rules and bottom navigation
│
├── js/
│   ├── news-data.js    Demo news data (JSON-style rows), categories, districts, navigation config
│   ├── language.js     UI strings (Telugu / English), language switch, theme, font size
│   ├── navigation.js   Header, mega menus, footer, breaking ticker, modal, toast, link routing
│   ├── search.js       Search by headline, category, district and author (Telugu + English)
│   ├── epaper.js       ePaper editions, dates, pages, zoom, full screen, PDF download
│   └── main.js         App state, article model, page renderers, events, start-up
│
├── assets/
│   ├── images/         Place local images here (demo images load from picsum.photos)
│   ├── logos/          logo.svg (newspaper logo)
│   ├── icons/          Icon files
│   └── epaper/         Real ePaper PDFs: <edition-id>-<YYYY-MM-DD>.pdf
│
└── README.md
```

Script load order (set in every HTML page):
`news-data.js → language.js → navigation.js → search.js → epaper.js → main.js`

## Features

- Bilingual (తెలుగు / English) UI; choice saved in `localStorage`
- Sticky navigation, dropdown and mega menus, mobile hamburger, bottom navigation
- Breaking news ticker with pause on hover and previous / next controls
- Homepage: left (latest, trending, recent), centre (lead story, category sections), right (top headlines, most read, topics, ads)
- Category pages with Load More; district news for Andhra Pradesh and Telangana with mandal / constituency demo filters
- Article page: breadcrumbs, author, date and time, reading progress bar, share buttons (WhatsApp, Facebook, X, email, copy), related and trending stories
- ePaper: editions, date selection, previous editions, page navigation, zoom, full screen, print, PDF download
- Search by headline, category, district and author in both languages, with a no-results message
- Dark / light theme, font-size control, bookmarks, recently viewed, newsletter demo, contact form validation
- Lazy-loaded images, fallback images, back-to-top button, loading animation

## Running locally

No build step is needed. Open `index.html` in a browser, or serve the folder:

```bash
# Python 3
python -m http.server 8000
# then open http://localhost:8000
```

A local server is recommended so that the ePaper PDF check (`fetch`) works.

## Backend integration (future)

- Replace the `RAW` array in `js/news-data.js` with an API response (`fetch` + `async/await`).
- Keep the article shape returned by `ARTS` (`id, cat, days, author, dist, en{t,s}, te{t,s}, img`).
- Serve real ePaper PDFs from `assets/epaper/` or a CDN; the viewer falls back to print view when no PDF is found.

## Publishing to GitHub

```bash
git init
git add .
git commit -m "Initial commit: Praja Vaarthalu news portal (demo)"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo>.git
git push -u origin main
```

Optional: enable **Settings → Pages → Deploy from branch → main / (root)** to host the site on GitHub Pages.

## Notes

- Images come from `picsum.photos` placeholders; swap in licensed photography before launch.
- Telugu translations are sample copy and should be reviewed by a native editor.
- Article bodies are short demo paragraphs generated from each story's summary.
