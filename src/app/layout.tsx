import { InitialColorSchemeScript, AppProviders } from '@/theme';
import { Box, CssBaseline } from '@mui/material';
import { Metadata } from 'next';
import { PropsWithChildren } from 'react';
import { SnackbarProvider } from 'notistack';

export const metadata: Metadata = {
  title: 'Next Course',
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="ru">
      <InitialColorSchemeScript />
      <AppProviders>
        <Box
          component="body"
          sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          {children}
        </Box>
        <CssBaseline />
      </AppProviders>
    </html>
  );
}