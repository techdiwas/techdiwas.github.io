/**
 * @file script.js
 * Handles theme toggling with persistence using localStorage and respects
 * the user's OS-level color scheme preference.
 */
document.addEventListener('DOMContentLoaded', () => {

  const themeToggle = document.querySelector('.theme-toggle');
  const storageKey = 'theme-preference';

  /**
   * Applies the given theme to the body and updates the toggle button's icon.
   * @param {string} theme - The theme to apply ('dark' or 'light').
   */
  const applyTheme = (theme) => {
    // Apply the theme to the body's data attribute.
    document.body.dataset.theme = theme;
    
    // Update the toggle button's text/icon if the button exists.
    if (themeToggle) {
      themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
    }
    
    // Save the user's preference to localStorage.
    localStorage.setItem(storageKey, theme);
  };

  /**
   * Toggles the theme between 'light' and 'dark' and applies it.
   */
  const toggleTheme = () => {
    const currentTheme = document.body.dataset.theme === 'dark' ? 'light' : 'dark';
    applyTheme(currentTheme);
  };

  /**
   * Determines the initial theme based on saved preference or system settings.
   * @returns {string} The determined theme ('dark' or 'light').
   */
  const getInitialTheme = () => {
    const savedTheme = localStorage.getItem(storageKey);
    if (savedTheme) {
      return savedTheme;
    }
    
    // If no saved theme, check the user's OS/browser preference.
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return prefersDark ? 'dark' : 'light';
  };

  // --- MAIN EXECUTION ---

  // Set the initial theme when the page loads.
  applyTheme(getInitialTheme());

  // Add the click event listener to the toggle button if it exists.
  if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
  }

});
