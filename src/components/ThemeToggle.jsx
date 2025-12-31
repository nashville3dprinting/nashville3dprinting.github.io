import { useEffect, useState } from "react";
import "../css/ThemeToggle.css";

const KEY = "theme"; // 'light' | 'dark'

export default function ThemeToggle() {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem(KEY);
    if (saved === "light" || saved === "dark") return saved;

    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    return prefersDark ? "dark" : "light";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem(KEY, theme);
  }, [theme]);

  const nextTheme = theme === "dark" ? "light" : "dark";
  const icon = theme === "dark" ? "☀️" : "🌙"; // show the icon for the mode you’re switching to

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={() => setTheme(nextTheme)}
      aria-label={`Switch to ${nextTheme} theme`}
      title={`Switch to ${nextTheme} theme`}
    >
      <span className="theme-toggle__icon" aria-hidden="true">
        {icon}
      </span>
    </button>
  );
}
