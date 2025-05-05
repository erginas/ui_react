// tailwind.config.js
const plugin = require('tailwindcss/plugin');

module.exports = {
    content: [
        './index.html',
        './src/**/*.{js,ts,jsx,tsx}',
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                primary: '#4F46E5',
                'primary-dark': '#4338CA',
                secondary: '#10B981',
                background: '#F9FAFB',
                surface: '#FFFFFF',
                muted: '#6B7280',
                text: '#111827',
                error: '#EF4444',
                // Dark Mode
                'dark-background': '#1F2937',
                'dark-surface': '#374151',
                'dark-text': '#F9FAFB',
                'dark-muted': '#9CA3AF',
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
        plugin(({addUtilities}) => {
            const newUtilities = {
                '.scrollbar-hide': {
                    '&::-webkit-scrollbar': {display: 'none'},
                    'scrollbar-width': 'none',
                },
            };
            addUtilities(newUtilities);
        }),
    ],
};
