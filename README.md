# 🎬 CineSeek (Premium Movie App)

CineSeek is a modern, high-end movie discovery application built with **React** and **Vite**. It fetches real-time data from the **TVMaze API** and provides a premium "Netflix-style" user experience with glassmorphism effects and smooth animations.

> [!IMPORTANT]
> This project was upgraded to React for the **Milestone 3 Evaluation**. All core features like searching, filtering, and sorting are implemented using **Array Higher-Order Functions (HOFs)** as per the project requirements.

## 🌐 Live Demo

🚀 **Experience CineSeek here**: [https://cineseek-app.vercel.app/](https://cineseek-app.vercel.app/)

---

## 🚀 Features (Milestone 3)

*   **🔍 Live Search**: Real-time searching functionality with query persistence.
*   **🎭 Genre Filtering**: Dynamically extracted genres using `Array.reduce()` and filtered using `Array.filter()`.
*   **📊 Dynamic Sorting**: Sort movies by Rating, Release Year, or Alphabetically using `Array.sort()`.
*   **⭐ Favorites System**: Save your favorite movies to your browser's local storage.
*   **🌙 Premium Dark/Light UI**: A sleek glassmorphic design that supports both dark and light modes.
*   **📱 Responsive Grid**: Fully optimized for mobile, tablet, and desktop views.

## 🛠️ Tech Stack

*   **Core**: React 18, Vite
*   **Icons**: Lucide React
*   **Styling**: Vanilla CSS (Modern Design Tokens, Glassmorphism)
*   **API**: TVMaze API (Public)

## 📂 Project Structure

```text
CineSeek/
├── public/           # Static assets
├── src/
│   ├── components/   # Reusable UI components (Navbar, MovieCard, etc.)
│   ├── App.jsx       # Main application logic & State management
│   ├── index.css     # Global styles & Design system
│   └── main.jsx      # Entry point
├── legacy/           # Original vanilla JS files (backed up)
├── package.json      # Dependencies and scripts
└── vite.config.js    # Vite configuration
```

## ⚙️ How to Run Locally

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/ravi912066-netizen/CineSeek.git
    ```
2.  **Navigate to the project**:
    ```bash
    cd CineSeek
    ```
3.  **Install dependencies**:
    ```bash
    npm install
    ```
4.  **Start development server**:
    ```bash
    npm run dev
    ```

## 🏆 Grading Criteria Compliance

*   **Integration of public API**: Uses `fetch` within `useEffect` hooks.
*   **Array HOFs**: 
    - `filter()`: Used for search and genre filtering.
    - `sort()`: Used for ranking and alphabetical sorting.
    - `reduce()`: Used for dynamic category extraction.
    - `map()`: Used for rendering component lists.
*   **UI/UX**: Implements modern design principles and responsive layouts.

---

**Author**: Ravi Yadav  
**Project**: Graded Individual Project (Milestone 3)
