import { AppBar, Toolbar, Typography } from '@mui/material'
import Link from 'next/link'

export function Footer() {
  return (
    <AppBar
      component="footer"
      position="relative"
      sx={{ mt: '1rem', userSelect: 'none' }}
    >
      <Toolbar>
        <Typography
          component={Link}
          href="/"
          sx={{ color: 'inherit', textDecoration: 'none' }}
          variant="h5"
        >
          {Footer.name}
        </Typography>
      </Toolbar>
    </AppBar>
  )
}
