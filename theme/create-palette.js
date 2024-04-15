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
      default: lightBase.background.default,
      paper: lightBase.background.paper,
    },
    divider: lightBase.divider,
    error,
    info,
    mode: 'light',
    neutral,
    secondary,
    primary,
    success,
    text: {
      primary: lightBase.text.primary,
      secondary: lightBase.text.secondary,
      disabled: lightBase.text.disabled
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
      default: darkBase.background.default,
      paper: darkBase.background.paper,
    },
    divider: darkBase.divider,
    error,
    info,
    mode: 'dark',
    neutral,
    secondary,
    primary,
    success,
    text: {
      primary: darkBase.text.primary,
      secondary: darkBase.text.secondary,
      disabled: darkBase.text.disabled
    },
    warning,
  };
}
