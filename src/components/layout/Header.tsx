import { useEffect, useState } from "react";
import { NavLink } from "react-router";
import "../../styles/header.css";

export const Header = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme === "dark" ? true : false;
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode((currentMode) => !currentMode);
  };

  return (
    <header className="app-header">
      <div className="app-header-inner">
        <nav className="app-nav">
          <NavLink
            to="/"
            end
            className={({ isActive }) => `app-nav-link${isActive ? " app-nav-link-active" : ""}`}
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) => `app-nav-link${isActive ? " app-nav-link-active" : ""}`}
          >
            About
          </NavLink>
        </nav>

        <button
          type="button"
          aria-label="Toggle dark mode"
          aria-pressed={isDarkMode}
          onClick={toggleDarkMode}
          className="inline-flex items-center rounded-lg border border-(--border) px-3 py-1.5 text-sm font-medium text-(--text-h) transition-colors hover:bg-(--accent-bg)"
        >
          {isDarkMode ? "Light" : "Dark"}
        </button>
      </div>
    </header>
  );
};
