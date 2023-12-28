import { Footer, Header, JoyrideProvider } from '@/components';
import { Box } from '@mui/material';
import { PropsWithChildren } from 'react';

export default async function BasicLayout({ children }: PropsWithChildren) {
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
