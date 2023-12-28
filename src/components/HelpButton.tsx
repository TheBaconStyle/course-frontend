'use client';
import { useJoyrideRun } from '@/app/store';
import { Help } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import Link from 'next/link';

export function HelpButton() {
  const startJoyride = useJoyrideRun((state) => state.restart);
  return (
    <IconButton
      sx={{ color: 'inherit' }}
      LinkComponent={Link}
      download
      href="/Help.chm">
      <Help />
    </IconButton>
  );
}
