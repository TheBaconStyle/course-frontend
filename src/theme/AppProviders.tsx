'use client';

import { theme } from './theme';
import { Experimental_CssVarsProvider as CSSVarsProvider } from '@mui/material';
import { SessionProvider } from 'next-auth/react';
import { PropsWithChildren } from 'react';
import { SnackbarProvider } from 'notistack';

export function AppProviders({ children }: PropsWithChildren) {
  return (
    <SessionProvider>
      <CSSVarsProvider theme={theme} defaultMode="system">
        {children}
      </CSSVarsProvider>
      <SnackbarProvider
        autoHideDuration={5000}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        preventDuplicate
      />
    </SessionProvider>
  );
}
