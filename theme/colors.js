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
  25: '#F2F4F7',
  50: '#8e89eb',
  100: '#d1d4d8',
  200: '#babfc5',
  300: '#a4aab2',
  400: '#8d959f',
  500: '#76808b',
  600: '#606b78',
  700: '#495665',
  800: '#324152',
  900: '#1C2C3F',
};

export const primary = withAlphas({
  lightest: '#DDCCF8',
  light: '#B087F0',
  main: '#8E54E9',
  dark: '#5C19C5',
  darkest: '#270B54',
  contrastText: '#FFFFFF'
});

export const secondary = withAlphas({
  lightest: '#FCD4C9',
  light: '#F89A81',
  main: '#F56F4B',
  dark: '#D4360C',
  darkest: '#5B1705',
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

