'use client';
import { Box, Button, Typography } from '@mui/material';
import { signOut, useSession } from 'next-auth/react';

export default function ProfilePage() {
  const { data } = useSession({ required: true });
  return (
    <>
      <Typography variant="h5">Профиль</Typography>
      <Typography variant="h6">{data?.user?.name}</Typography>
      <Typography variant="h6">{data?.user?.type}</Typography>
      <Box>
        <Button onClick={() => signOut({ callbackUrl: '/' })}>Выход</Button>
      </Box>
    </>
  );
}
