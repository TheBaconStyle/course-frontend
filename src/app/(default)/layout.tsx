import { PropsWithChildren } from 'react';
import { Footer, Header } from '@/components';
import { Box } from '@mui/material';

export default function BasicLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Header />
      <Box component="main" sx={{ flex: 1, position: 'relative' }}>
        {children}
      </Box>
      <Footer />
    </>
  );
}
