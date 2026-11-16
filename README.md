# Varshini Blog — Modern Tech, Design & Engineering Insights

An editorial-grade, responsive blogging platform built with **React**, **Vite**, **JavaScript**, **HTML5**, and modern **CSS3**. Engineered with an editorial magazine aesthetic, dark/light theme switching, fluid typography, combined search and category filtering, and an immersive full-article reader.

![Varshini Blog Preview](https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80)

---

## 🌟 Key Features

### 1. 🧭 Responsive Navigation Bar
- **Brand Identity**: Custom "Varshini.Blog" editorial logo with gradient badge.
- **Navigation Links**: Quick jump to Home, Featured, Articles, About, and Newsletter.
- **Search Shortcut**: Quick trigger button with `⌘K` / `Ctrl+K` keyboard shortcut support.
- **Bookmarks Counter**: Live badge displaying number of saved articles with quick modal drawer.
- **Theme Switcher**: One-click toggle between **Light Mode** and **Dark Mode** with persisted preferences.
- **Mobile Drawer**: Slide-in mobile menu with touch-friendly navigation.

### 2. ⚡ Engaging Hero Section
- **Editorial Badging**: Highlights weekly publication issues.
- **Typography**: Modern typography combining Plus Jakarta Sans and serif accents.
- **Integrated Search**: Fast search bar with instant query clearing.
- **Action CTAs**: "Explore All Articles" and "Read Spotlight Story".
- **Metric Cards**: Real-time stats showcasing 9+ articles, 5 focus domains, 15,000+ readers, and 4.9★ community rating.

### 3. 🏆 Featured Story Spotlight
- Hand-picked primary spotlight article with a widescreen layout.
- Category tag, reading time, publication date, full excerpt, and author credentials.
- Interactive action controls: **Like** (with live count), **Bookmark**, **Share** (copies link with toast notification), and **Read Full Story**.

### 4. 🗂️ Dynamic Category Filter & Sorting
- **Category Pills**: Filter across *All Stories*, *Technology*, *UI/UX Design*, *AI & Innovation*, *Web Development*, and *Career & Growth*.
- **Live Counts**: Dynamic badges displaying article count per topic.
- **Sort Dropdown**: Sort articles by *Latest First*, *Most Popular (Likes)*, or *Quickest Read*.
- **Combined Filtering**: Search query and category filter work together seamlessly.
- **Empty State**: Friendly illustration and "Reset Filters" action when no articles match.

### 5. 📰 Modern Responsive Blog Grid
- **Fluid Grid**: 3 columns on desktop, 2 on tablet, 1 on mobile.
- **Card Aesthetics**: Subtle elevation shadows, hover zoom on thumbnails, and smooth `translateY` hover lifts.
- **Category Color Coding**: Unique color badges for AI (violet), Design (rose), Tech (blue), Web Dev (emerald), and Career (amber).
- **Author & Meta**: Avatar, author name, role, publication date, and tags.
- **Direct Actions**: Individual Like, Bookmark, and Share buttons on each card.

### 6. 📖 Immersive "Read More" Full Article Reader
- **Overlay Reader**: Backdrop blur modal with smooth scaling animations and background scroll-lock.
- **Reading Progress Bar**: Dynamic gradient progress bar tracking scroll depth.
- **Font Size Adjuster**: Interactive `A-`, `A`, `A+` font size controls for readability.
- **Editorial Structure**: Multi-section layout with subheadings, styled blockquotes with quote icons, and tags.
- **Interactive Comments**: Reader discussion thread with an interactive form to publish comments optimistically.
- **Related Articles**: Recommended reading cards at the end of every article.
- **Keyboard Navigation**: Press `Esc` to close, click outside, or use the "Back to Articles" button.

### 7. 🔖 Saved Articles Reading List
- Bookmarks modal showing all saved stories.
- One-click reading access or item removal.
- Persistent state saved to `localStorage`.

### 8. 📬 Newsletter & Author Bio
- **Author Profile**: Spotlight on Varshini M with philosophy pillars, avatar, status indicator, and social profiles.
- **Newsletter**: Interactive subscription form with validation, success banner, and privacy guarantees.

### 9. 🎨 Dark & Light Mode Theme Support
- Full CSS Custom Properties architecture.
- Seamless transitions with contrast compliance across all components.

---

## 🛠️ Technology Stack

| Technology | Purpose |
| :--- | :--- |
| **React 19** | Component-driven UI architecture, hooks, and state management |
| **Vite 8** | Next-generation frontend build tooling and hyper-fast HMR |
| **JavaScript (ES6+)** | Dynamic filtering, sorting, clipboard actions, and local storage |
| **CSS3 Custom Properties** | Modern design system tokens, responsive grid, and fluid typography |
| **Lucide Icons** | Modern SVG vector icons |
| **JSON** | Decoupled editorial dataset (`src/data/blogs.json`) |

---

## 📂 Project Structure

```text
varshini-ReactBlogUI-Task3/
├── index.html                   # HTML5 template with Google Fonts & metadata
├── package.json                 # Project dependencies and npm scripts
├── vite.config.js               # Vite configuration
├── README.md                    # Project documentation
├── public/                      # Static assets
└── src/
    ├── main.jsx                 # Application entry point
    ├── App.jsx                  # Main application orchestrator & state manager
    ├── App.css                  # Modern editorial responsive stylesheet
    ├── index.css                # Global design tokens, themes & CSS reset
    ├── data/
    │   └── blogs.json           # Decoupled article content dataset
    └── components/
        ├── Navbar.jsx           # Sticky navigation, theme toggle, mobile drawer
        ├── Hero.jsx             # Hero banner, search bar & statistics
        ├── FeaturedPost.jsx     # Large spotlight story card
        ├── CategoryFilter.jsx   # Filter pills with dynamic article counts
        ├── BlogGrid.jsx         # Responsive grid container & sort controls
        ├── BlogCard.jsx         # Reusable card with interactive actions
        ├── BlogDetailModal.jsx  # Full article reader, progress bar & comments
        ├── SavedArticlesModal.jsx # Bookmarked reading list drawer
        ├── AuthorBio.jsx        # About Varshini M & technical pillars
        ├── Newsletter.jsx       # Email subscription form with validation
        ├── Footer.jsx           # Multi-column footer & back-to-top button
        ├── Toast.jsx            # Floating feedback notifications
        └── SocialIcons.jsx      # Clean vector SVG icons (GitHub, LinkedIn, X)
```

---

## 🚀 Getting Started

Follow these steps to run the project locally on your machine:

### 1. Prerequisites
Ensure you have [Node.js](https://nodejs.org/) (v18 or higher recommended) installed.

### 2. Installation
Open your terminal in the project directory and install dependencies:
```bash
npm install
```

### 3. Development Server
Start the local development server with Hot Module Replacement (HMR):
```bash
npm run dev
```
Open your browser and navigate to:
```text
http://localhost:5173
```

### 4. Production Build
To create an optimized production build:
```bash
npm run build
```

### 5. Preview Production Build
To test the generated production build locally:
```bash
npm run preview
```

---

## 💡 Keyboard Shortcuts

- `⌘K` or `Ctrl+K`: Jump focus directly into the search bar.
- `Escape`: Close any open reader modal or reading list dialog.

---

## 📄 License
This project was designed and built as a professional React Blog UI showcase by **Varshini M**.
Licensed under the [MIT License](LICENSE).
