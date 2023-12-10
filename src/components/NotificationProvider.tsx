'use client';
import { PropsWithChildren } from 'react';
import { SnackbarProvider } from 'notistack';

export function NotificationProvider({ children }: PropsWithChildren) {
  return (
    <SnackbarProvider
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      preventDuplicate>
      {children}
    </SnackbarProvider>
  );
}
