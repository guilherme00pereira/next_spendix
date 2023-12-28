import { common } from '@mui/material/colors';
import { alpha } from '@mui/material/styles';
import { error, indigo, info, neutral, success, warning } from './colors';

export function createPalette() {
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
      default: common.white,
      paper: common.white,
      sidebar: neutral[800]
    },
    divider: '#F2F4F7',
    error: {
      main: '#f16366'
    },
    info: {
      main: '#63adf1'
    },
    mode: 'light',
    neutral,
    primary: indigo,
    success: {
      main: "#66f163"
    },
    text: {
      primary: neutral[900],
      secondary: neutral[500],
      sidebar: neutral[100],
      disabled: alpha(neutral[900], 0.38)
    },
    warning,
  };
}