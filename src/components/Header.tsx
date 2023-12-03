'use client';

import { AppBar, Button, Toolbar, Typography } from '@mui/material';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ThemeSwitch } from './ThemeSwitch';

export function Header() {
  const pathname = usePathname();
  const { data, status } = useSession();
  return (
    <AppBar
      component="header"
      position="sticky"
      sx={{ mb: '1rem', overflowX: 'hidden', userSelect: 'none' }}>
      <Toolbar sx={{ gap: '1rem', alignItems: 'center' }}>
        <Typography
          component={Link}
          variant="h5"
          href="/"
          sx={{
            color: 'inherit',
            textDecoration: 'none',
          }}
          draggable={false}>
          {Header.name}
        </Typography>
        <Typography sx={{ ml: 'auto' }}>{data?.user?.name}</Typography>
        <Button
          onClick={() =>
            status === 'authenticated' && signOut({ callbackUrl: pathname })
          }
          sx={{
            display: status !== 'authenticated' ? 'none' : 'initial',
            color: 'inherit',
          }}>
          Выйти
        </Button>
        <ThemeSwitch />
      </Toolbar>
    </AppBar>
  );
}
