import type { Config } from 'tailwindcss'

export default {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './content/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        roxo: {
          900:'#221A5E', 800:'#2E2489', 700:'#3B2FB8', 600:'#4B3BD8',
          500:'#5B4AE8', 400:'#7B6BF2', 200:'#C9C2FB', 100:'#E8E4FF', 50:'#F5F3FF',
        },
        verde:   { 600:'#45B255', 500:'#5FC96B', 100:'#DFF6E2' },
        amarelo: { 400:'#FFD54A', 100:'#FFF3CC' },
        coral:   { 400:'#FF6E8A' },
        tinta:   { 900:'#1A1636', 600:'#4A4470', 400:'#8B85AD' },
        areia:   { 50:'#FBFAFF' },
      },
      fontFamily: {
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
        sans:    ['var(--font-body)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        hero:  ['var(--text-hero)',  { lineHeight: '1.08', letterSpacing: '-0.02em' }],
        h2:    ['var(--text-h2)',    { lineHeight: '1.15', letterSpacing: '-0.02em' }],
        h3:    ['var(--text-h3)',    { lineHeight: '1.25' }],
        lead:  ['var(--text-lead)',  { lineHeight: '1.55' }],
        price: ['var(--text-price)', { lineHeight: '0.95', letterSpacing: '-0.03em' }],
      },
      borderRadius: { sm:'12px', md:'20px', lg:'28px', xl:'36px', '2xl':'44px' },
      boxShadow: {
        sm:'0 2px 8px rgba(34,26,94,.06)',
        md:'0 8px 24px rgba(34,26,94,.10)',
        lg:'0 18px 48px rgba(34,26,94,.16)',
        card:'0 24px 60px rgba(21,15,70,.35)',
        cta:'0 8px 0 0 #3E9A4C',
      },
      maxWidth: { prose: '62ch', content: '1120px' },
      keyframes: {
        'marquee': { from:{transform:'translateX(0)'}, to:{transform:'translateX(-50%)'} },
        'float':   { '0%,100%':{transform:'translateY(0)'}, '50%':{transform:'translateY(-8px)'} },
      },
      animation: {
        marquee: 'marquee 40s linear infinite',
        float:   'float 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
} satisfies Config
