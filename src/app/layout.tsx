import { NotificationProvider, JoyrideProvider } from '@/components';
import { AppProviders, InitialColorSchemeScript } from '@/theme';
import { Box, CssBaseline } from '@mui/material';
import { Metadata } from 'next';
import { PropsWithChildren } from 'react';

export const metadata: Metadata = {
  title: 'Next Course',
};

export default async function RootLayout({ children }: PropsWithChildren) {
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
