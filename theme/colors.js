import { alpha } from '@mui/material/styles';

const withAlphas = (color) => {
  return {
    ...color,
    alpha4: alpha(color.main, 0.04),
    alpha8: alpha(color.main, 0.08),
    alpha12: alpha(color.main, 0.12),
    alpha30: alpha(color.main, 0.30),
    alpha50: alpha(color.main, 0.50)
  };
};

export const neutral = {
  25: '#E7E8EC',
  50: '#CFD1D9',
  100: '#B7BAC6',
  200: '#9FA4B3',
  300: '#888DA1',
  400: '#70768E',
  500: '#58607B',
  600: '#404968',
  700: '#283255',
  800: '#111C43',
  900: '#0F193C',
};

export const primary = withAlphas({
  lightest: '#DACDF5',
  light: '#A98BE9',
  main: '#845ADF',
  dark: '#5224B8',
  darkest: '#230F4F',
  contrastText: '#FFFFFF'
});

export const secondary = withAlphas({
  lightest: '#BDE9F7',
  light: '#65CDED',
  main: '#23B7E5',
  dark: '#1483A5',
  darkest: '#083847',
  contrastText: '#FFFFFF'
});

export const success = withAlphas({
  lightest: '#B9F1E1',
  light: '#5BDEB9',
  main: '#26BF94',
  dark: '#1B8668',
  darkest: '#0B392C',
  contrastText: '#FFFFFF'
});

export const info = withAlphas({
  lightest: '#C8E9FC',
  light: '#80CCF8',
  main: '#49B6F5',
  dark: '#0C8AD3',
  darkest: '#053B5A',
  contrastText: '#FFFFFF'
});

export const warning = withAlphas({
  lightest: '#FCEAC8',
  light: '#F8CD80',
  main: '#F5B849',
  dark: '#D38C0C',
  darkest: '#5A3C05',
  contrastText: '#FFFFFF'
});

export const error = withAlphas({
  lightest: '#F7CBC4',
  light: '#ED8776',
  main: '#E6533C',
  dark: '#BE284B',
  darkest: '#4D130A',
  contrastText: '#FFFFFF'
});

