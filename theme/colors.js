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
  50: '#F8F9FA',
  100: '#F3F4F6',
  200: '#E5E7EB',
  300: '#D2D6DB',
  400: '#9DA4AE',
  500: '#6C737F',
  600: '#4D5761',
  700: '#2F3746',
  800: '#1C2536',
  900: '#111927'
};

export const indigo = withAlphas({
  lightest: '#F5F7FF',
  light: '#EBEEFE',
  main: '#6366F1',
  dark: '#4338CA',
  darkest: '#312E81',
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
  lightest: '#C8DEDF',
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

