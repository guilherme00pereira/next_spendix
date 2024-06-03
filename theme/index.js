'use client'
import {experimental_extendTheme as extendTheme} from "@mui/material/styles";
import {createDarkPalette, createLightPalette} from './create-palette';
import {createComponents} from './create-components';
import {createShadows} from './create-shadows';
import {createTypography} from './create-typography';

export function createTheme() {
  const lightPalette = createLightPalette();
  const darkPalette = createDarkPalette();
  const components = createComponents();
  const shadows = createShadows();
  const typography = createTypography();

  const breakpoints = {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1600
    }
  };

  return extendTheme({
    breakpoints,
    shadows,
    shape: {
      borderRadius: 8
    },
    typography,
    components,
    colorSchemes: {
      light: {
        palette: lightPalette,
      },
      dark: {
        palette: darkPalette,
      },
    }
  });

}
