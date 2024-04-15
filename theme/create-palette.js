import {alpha} from '@mui/material/styles';
import {darkBase, error, info, lightBase, neutral, primary, secondary, success, warning} from './colors';

export function createLightPalette() {
  return {
    action: {
      active: neutral[500],
      disabled: alpha(neutral[900], 0.38),
      disabledBackground: alpha(neutral[900], 0.12),
      focus: alpha(neutral[900], 0.16),
      hover: alpha(neutral[900], 0.04),
      selected: alpha(neutral[900], 0.12)
    },
    background: {
      default: lightBase.pageBG,
      paper: lightBase.componentBG,
    },
    divider: '#F2F4F7',
    error,
    info,
    mode: 'light',
    neutral,
    secondary,
    primary,
    success,
    text: {
      primary: neutral[900],
      secondary: neutral[500],
      sidebar: neutral[100],
      disabled: alpha(neutral[900], 0.38)
    },
    warning,
  };
}

export function createDarkPalette() {
  return {
    action: {
      active: neutral[500],
      disabled: alpha(neutral[100], 0.38),
      disabledBackground: alpha(neutral[100], 0.12),
      focus: alpha(neutral[100], 0.16),
      hover: alpha(neutral[100], 0.04),
      selected: alpha(neutral[100], 0.12)
    },
    background: {
      default: darkBase.pageBG,
      paper: darkBase.componentBG,
    },
    divider: '#F2F4F7',
    error,
    info,
    mode: 'dark',
    neutral,
    secondary,
    primary,
    success,
    text: {
      primary: neutral[100],
      secondary: neutral[500],
      sidebar: neutral[500],
      disabled: alpha(neutral[100], 0.38)
    },
    warning,
  };
}
