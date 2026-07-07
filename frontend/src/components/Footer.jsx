import { useTheme } from '../context/ThemeContext';

export default function Footer() {
  const { theme } = useTheme();
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className={`py-8 border-t text-center ${
        theme === 'dark'
          ? 'bg-gray-800 border-gray-700'
          : 'bg-gray-50 border-gray-200'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4">
        <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
          &copy; {currentYear}{' '}
          <span className="font-semibold gradient-text">Dhirendra Bhoi</span>
          {' '}— Built with React, Vite, TailwindCSS &amp; Node.js
        </p>
      </div>
    </footer>
  );
}
