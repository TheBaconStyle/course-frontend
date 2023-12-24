'use client';
import { getInitColorSchemeScript } from '@mui/material';
import Head from 'next/head';

export const InitialColorSchemeScript = () => {
  return <Head>{getInitColorSchemeScript()}</Head>;
};
