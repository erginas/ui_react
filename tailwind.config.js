// tailwind.config.js
const plugin = require('tailwindcss/plugin');
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class', // veya 'media'
  theme: {
    extend: {
      colors: {
        primary: '#4F46E5',
        secondary: '#10B981',
        background: '#F9FAFB',
        surface: '#FFFFFF',
        text: '#111827',
        muted: '#6B7280',
        // dark mode overrides
        'dark-primary': '#6366F1',
        'dark-background': '#1F2937',
        'dark-surface': '#374151',
        'dark-text': '#F9FAFB',
      },
      spacing: {
        xs: '4px',
        sm: '8px',
        md: '16px',
        lg: '24px',
        xl: '32px',
      },
      borderRadius: {
        sm: '4px',
        md: '8px',
        lg: '16px',
        full: '9999px',
      },
      fontSize: {
        sm: '0.875rem',
        base: '1rem',
        lg: '1.125rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
      },
      boxShadow: {
        sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        DEFAULT: '0 1px 3px rgba(0, 0, 0, 0.1)',
        md: '0 4px 6px rgba(0, 0, 0, 0.1)',
        lg: '0 10px 15px rgba(0, 0, 0, 0.1)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    plugin(function({ addUtilities, theme }) {
      const newUtilities = {
        '.scrollbar-hide': {
          /* Safari and Chrome */
          '&::-webkit-scrollbar': { display: 'none' },
          /* Firefox */
          'scrollbar-width': 'none',
        },
      };
      addUtilities(newUtilities);
    }),
  ],
};