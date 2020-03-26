import { lime } from '@material-ui/core/colors';
import { blueGrey } from "@material-ui/core/colors";
import { createMuiTheme } from '@material-ui/core/styles';
// require('@openfonts/merriweather_all');


// A custom theme for this app
const theme = createMuiTheme({
  palette: {
    common: {
      black: "rgba(40, 31, 31, 1)",
      white: "#fff"
    },
    background: {
      paper: "#fff",
      default: blueGrey[50]
    },
    error: {
      light: "#e57373",
      main: "#f44336",
      dark: "#d32f2f",
      contrastText: "rgba(185, 149, 149, 1)"
    },
    text: {
      primary: "rgba(0, 0, 0, 0.87)",
      secondary: "rgba(0, 0, 0, 0.54)",
      disabled: "rgba(0, 0, 0, 0.38)",
      hint: "rgba(0, 0, 0, 0.38)"
    },
    primary: {
      light: lime[400],
      main: lime[600],
      dark: lime[100],
      contrastText: "#fff"
    },
    secondary: {
      light: blueGrey[400],
      main: blueGrey[600],
      dark: blueGrey[100],
      contrastText: "#000"
    }
  },
  typography: {
    fontFamily: [
      'Open Sans',
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
    },
    MuiTypography: {
      h1: {
        fontFamily: "Playfair Display"
      },
      h2: {
        fontFamily: "Playfair Display"
      },
      h3: {
        fontFamily: "Playfair Display"
      },
      h4: {
        fontFamily: "Playfair Display"
      },      
      h5: {
        fontFamily: "Playfair Display"
      },      
      h6: {
        fontFamily: "Playfair Display"
      }
    }
  }
});

export default theme;