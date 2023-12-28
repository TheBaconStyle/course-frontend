import { AuthConfig } from '@/config';
import { AppBar, Toolbar, Typography } from '@mui/material';
import { getServerSession } from 'next-auth';
import Link from 'next/link';
import { PersonalInfo } from './PersonalInfo';
import { ThemeSwitch } from './ThemeSwitch';
import { HelpButton } from './HelpButton';

export async function Header() {
  const data = await getServerSession(AuthConfig);

  return (
    <AppBar
      component="header"
      position="sticky"
      sx={{ mb: '1rem', overflowX: 'hidden', userSelect: 'none' }}>
      <Toolbar sx={{ gap: '1rem', alignItems: 'center' }}>
        <Typography
          component={Link}
          variant="h5"
          href={data ? '/courses' : '/'}
          sx={{
            color: 'inherit',
            textDecoration: 'none',
            mr: 'auto',
          }}
          draggable={false}>
          Викторина
        </Typography>
        {data && <HelpButton />}
        <PersonalInfo userData={data} />
        <ThemeSwitch />
      </Toolbar>
    </AppBar>
  );
}
