import { createMakeStyles } from 'tss-react';

const theme = {
  appWrapper: {
    maxWidth: '1200px',
    margin: '0 auto',
  },
  palette: {
    primary: {
      main: '#000000',
      light: '#f2f2f2',
    },
    secondary: {
      main: '#f83245',
      light: '#f8324526',
    },
    background: {
      default: '#f4f5fd',
    },
  },
  overrides: {
    MuiAppBar: {
      root: {
        transform: 'translateZ(0)',
      },
    },
  },
  props: {
    MuiIconButton: {
      disableRipple: true,
    },
  },
};

function useTheme() {
  return theme;
}

export const { makeStyles, useStyles } = createMakeStyles({ useTheme });
