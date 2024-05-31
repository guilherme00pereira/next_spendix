import { alpha } from '@mui/material/styles';

const withAlphas = (color) => {
  return {
    ...color,
    alpha4: alpha(color.main, 0.04),
    alpha8: alpha(color.main, 0.08),
    alpha12: alpha(color.main, 0.12),
    alpha20: alpha(color.main, 0.20),
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

export const lightBase = {
  background: {
    default: '#F0F1F7',
    paper: '#FFFFFF',
    sidebar: '#111C43',
  },
  divider: '#E3E6E9',
  text: {
    primary: '#333',
    secondary: '#616163',
    headers: '#536485',
    disabled: alpha('#333333', 0.38)
  },
}

export const darkBase = {
  background: {
    default: '#262C3C',//'#24272d',
    paper: '#1C212C',//'#212325',
    sidebar: '#1C212C',
  },
  divider: '#2E3034',
  text: {
    primary: '#BEBFBF',
    secondary: '#A6A6A6',
    headers: '#BEBFBF',
    disabled: alpha('#BEBFBF', 0.38)
  },
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
  lightest: '#FCD4C9',
  light: '#F89081',
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


export const chartColors = {
  lightThemeLabel: '#333333',
  darkThemeLabel: '#BEBFBF',
  spendingColor: error.dark,
  incomeColor: success.dark,
}
