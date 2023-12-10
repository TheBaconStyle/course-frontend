import { AuthConfig } from '@/config';
import { AppBar, Toolbar, Typography } from '@mui/material';
import { getServerSession } from 'next-auth';
import Link from 'next/link';

export async function Footer() {
  const data = await getServerSession(AuthConfig);
  return (
    <AppBar
      component="footer"
      position="relative"
      sx={{ mt: '1rem', userSelect: 'none' }}>
      <Toolbar>
        <Typography
          component={Link}
          href={data ? '/courses' : '/'}
          sx={{ color: 'inherit', textDecoration: 'none' }}
          variant="h5">
          Курсовая работа по теме &ldquo;Система тестирования&rdquo;
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
