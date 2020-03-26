import { red } from '@material-ui/core/colors';
import { blueGrey } from "@material-ui/core/colors";
import { createMuiTheme } from '@material-ui/core/styles';
require('@openfonts/merriweather_all');


// A custom theme for this app
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#fff',
    },
  },
  typography: {
    fontFamily: [
      'Merriweather',
      'serif',
    ].join(','),
  },
  overrides: {
    MuiTabs: {
      root: {
        borderRight: `1px solid ${blueGrey[300]}`
      }
    },
    MuiTab: {
      root: {
        textTransform: "none"
      }
    }
  }
});

export default theme;