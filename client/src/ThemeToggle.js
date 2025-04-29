import React from "react";

const ThemeToggle = ({ theme, setTheme }) => {
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.body.setAttribute("data-theme", newTheme);
  };

  return (
    <div className="form-check form-switch mb-3">
      <input
        className="form-check-input"
        type="checkbox"
        id="themeSwitch"
        onChange={toggleTheme}
        checked={theme === "dark"}
      />
      <label className="form-check-label" htmlFor="themeSwitch">
        {theme === "dark" ? "🌙 Mode Sombre" : "☀️ Mode Clair"}
      </label>
    </div>
  );
};

export default ThemeToggle;
