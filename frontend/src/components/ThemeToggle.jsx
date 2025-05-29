import { useState, useEffect } from 'react'
import { SunIcon, MoonIcon } from 'lucide-react'

const ThemeToggle = () => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'forest');
  
  // Switch between light and dark themes
  const toggleTheme = () => {
    const newTheme = theme === 'forest' ? 'garden' : 'forest';
    setTheme(newTheme);
  };
  
  // Update theme in localStorage and document whenever it changes
  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <button 
      onClick={toggleTheme}
      className="btn btn-ghost btn-sm p-1 rounded-lg"
      aria-label="Toggle theme"
    >
      {theme === 'forest' ? (
        <SunIcon size={18} className="text-amber-300" />
      ) : (
        <MoonIcon size={18} className="text-slate-700" />
      )}
    </button>
  );
};

export default ThemeToggle;
