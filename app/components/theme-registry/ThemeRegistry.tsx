'use client';
import React from 'react';
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import NextAppDirEmotionCacheProvider from './EmotionCache';
import { createTheme } from '@/theme';

export default function ThemeRegistry({ children }: { children: React.ReactNode }) {
  const theme = createTheme();

  return (
    // <NextAppDirEmotionCacheProvider options={{ key: 'mui' }}>
      <CssVarsProvider theme={theme} defaultMode="light">
        <CssBaseline />
        {children}
      </CssVarsProvider>
    // </NextAppDirEmotionCacheProvider>
  );
}