'use client'

import { AppBar, Box, Tab, Tabs, Toolbar, Typography } from '@mui/material'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ThemeSwitch } from './ThemeSwitch'

export function Header() {
  const pathname = usePathname()
  const { data, status } = useSession()
  // const { scrollYProgress } = useScroll()
  // useEffect(() => {
  //   scrollYProgress.set(0)
  // }, [pathname, scrollYProgress])
  return (
    <AppBar
      component="header"
      position="sticky"
      sx={{ mb: '1rem', overflowX: 'hidden' }}
    >
      {/* <Box
        component={motion.div}
        bgcolor="white"
        sx={{
          height: '0.3rem',
          transformOrigin: 'left',
        }}
        style={{ scaleX: scrollYProgress }}
      /> */}
      <Toolbar>
        <Typography
          component={Link}
          variant="h5"
          href="/"
          sx={{
            color: 'inherit',
            textDecoration: 'none',
            userSelect: 'none',
          }}
        >
          {Header.name}
        </Typography>
        <Box sx={{ ml: 'auto' }}>
          {status === 'authenticated' && (
            <Tabs
              value={pathname}
              textColor="inherit"
              TabIndicatorProps={{ sx: { bgcolor: 'white' } }}
            >
              <Tab
                label="Тесты"
                value={pathname.startsWith('/tasks') && pathname}
                LinkComponent={Link}
                href="/tasks"
              />
              <Tab
                label={data.user?.name}
                value="/profile"
                LinkComponent={Link}
                href="/profile"
              />
            </Tabs>
          )}
        </Box>
        <ThemeSwitch />
      </Toolbar>
    </AppBar>
  )
}
