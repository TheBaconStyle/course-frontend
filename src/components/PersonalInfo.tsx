'use client';

import { Button, Typography } from '@mui/material';
import { Session } from 'next-auth';
import { signOut } from 'next-auth/react';

export type TPersonalInfo = {
  userData: Session | null;
};

export function PersonalInfo({ userData }: TPersonalInfo) {
  return (
    <>
      <Typography>{userData?.user.name}</Typography>
      <Button
        onClick={() => userData && signOut()}
        sx={{
          display: !userData ? 'none' : 'initial',
          color: 'inherit',
        }}>
        Выйти
      </Button>
    </>
  );
}
