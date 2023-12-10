import { InitialColorSchemeScript, AppProviders } from '@/theme';
import { Box, CssBaseline } from '@mui/material';
import { Metadata } from 'next';
import { PropsWithChildren } from 'react';
import { getServerPathname } from '@/actions';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { NotificationProvider } from '@/components';

export const metadata: Metadata = {
  title: 'Next Course',
};

export default async function RootLayout({ children }: PropsWithChildren) {
  const pathname = await getServerPathname();
  const data = await getServerSession();

  if (pathname === '/' && data?.user) {
    redirect('/courses');
  }

  return (
    <html lang="ru">
      <InitialColorSchemeScript />
      <AppProviders>
        <Box
          component="body"
          sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <NotificationProvider>{children}</NotificationProvider>
        </Box>
        <CssBaseline />
      </AppProviders>
    </html>
  );
}
