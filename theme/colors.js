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
  50: '#D3D5D7',
  100: '#BDC0C3',
  200: '#A7ABAF',
  300: '#92969B',
  400: '#7C8187',
  500: '#666C73',
  600: '#50565F',
  700: '#3A424B',
  800: '#252D38',
  900: '#212832'
};

export const indigo = withAlphas({
  lightest: '#A7B2E0',
  light: '#7284CE',
  main: '#4F66C2',//'#6366F1',
  dark: '#3F519B',
  darkest: '#273361',
  contrastText: '#FFFFFF'
});

export const success = withAlphas({
  lightest: '#C1E7C8',
  light: '#5AC06E',
  main: '#32B14A',
  dark: '#237B33',
  darkest: '#14461D',
  contrastText: '#FFFFFF'
});

export const info = withAlphas({
  lightest: '#D8E7E8',
  light: '#6EA7AA',
  main: '#4A9195',
  dark: '#3B7477',
  darkest: '#25484A',
  contrastText: '#FFFFFF'
});

export const warning = withAlphas({
  lightest: '#FEEAB7',
  light: '#FEC740',
  main: '#FEB911',
  dark: '#CB940D',
  darkest: '#7F5C08',
  contrastText: '#FFFFFF'
});

export const error = withAlphas({
  lightest: '#F9BCA9',
  light: '#F58A69',
  main: '#F1592A',
  dark: '#C04721',
  darkest: '#782C15',
  contrastText: '#FFFFFF'
});

