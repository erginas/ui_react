module.exports = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
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
        xs: '4px', sm: '8px', md: '16px', lg: '24px', xl: '32px',
      },
      borderRadius: {
        sm: '4px', md: '8px', lg: '16px', full: '9999px',
      },
      fontSize: {
        sm: '0.875rem', base: '1rem', lg: '1.125rem', xl: '1.25rem', '2xl': '1.5rem',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms')
      ]
}