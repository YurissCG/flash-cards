import { Fredoka, Plus_Jakarta_Sans } from 'next/font/google'

export const display = Fredoka({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-display',
  display: 'swap',
})

export const body = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '800'],
  variable: '--font-body',
  display: 'swap',
})
