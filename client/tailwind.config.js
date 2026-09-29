/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        theme: {
          dark: '#384959',      // Primary Dark Slate (#384959)
          darker: '#283542',    // Deepest Dark Slate
          steel: '#6A89A7',     // Steel Muted Blue (#6A89A7)
          sky: '#88BDF2',       // Vibrant Sky Blue Accent (#88BDF2)
          ice: '#BDDDFC',       // Light Ice Blue (#BDDDFC)
          light: '#F0F6FC',     // Clean Light Background
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Poppins', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        glass: '0 8px 32px 0 rgba(56, 73, 89, 0.12)',
        card: '0 4px 20px -2px rgba(56, 73, 89, 0.08)',
        glow: '0 0 25px rgba(136, 189, 242, 0.4)',
      },
    },
  },
  plugins: [],
};
