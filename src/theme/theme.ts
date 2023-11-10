'use client'

import { experimental_extendTheme as extendTheme } from '@mui/material/styles'
import { Roboto } from 'next/font/google'

const RobotoFont = Roboto({
  weight: ['300', '500', '700'],
  subsets: ['cyrillic', 'cyrillic-ext', 'latin', 'latin-ext'],
  style: ['italic', 'normal'],
})

export const theme = extendTheme({
  typography: { fontSize: 16, fontFamily: RobotoFont.style.fontFamily },
})
