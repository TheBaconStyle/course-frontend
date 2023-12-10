'use client';

import { Experimental_CssVarsProvider as CSSVarsProvider } from '@mui/material';
import { SessionProvider } from 'next-auth/react';
import { PropsWithChildren } from 'react';
import { theme } from './theme';

export function AppProviders({ children }: PropsWithChildren) {
  return (
    <SessionProvider>
      <CSSVarsProvider theme={theme} defaultMode="system">
        {children}
      </CSSVarsProvider>
    </SessionProvider>
  );
}
