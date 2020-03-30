 import { lime } from '@material-ui/core/colors';
import { blueGrey } from "@material-ui/core/colors";
import { createMuiTheme } from '@material-ui/core/styles';
// require('@openfonts/merriweather_all');


// A custom theme for this app
const theme = createMuiTheme({
  palette: {
    type: 'light',
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
      light: blueGrey[400],
      main: blueGrey[600],
      dark: blueGrey[800],
      contrastText: "#fff"
    },
    secondary: {
      light: blueGrey[400],
      main: blueGrey[600],
      dark: blueGrey[800],
      contrastText: "#000"
    }
  },
  typography: {
    fontFamily: [
      'Roboto Slab',
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
        fontFamily: "Playfair Display",
        fontWeight: 500,
        fontSize: "3rem",
        backgroundImage: "-webkit-gradient( linear, left top, right top, color-stop(0, #263238), color-stop(0.3, #546e7a), color-stop(0.7, #78909c) )",
        backgroundImage: "gradient( linear, left top, right top, color-stop(0, #263238), color-stop(0.3, #546e7a), color-stop(0.7, #78909c) )",
        color: "transparent",
        "-webkitBackgroundClip": "text",
        backgroundClip: "text"
      },
      h2: {
        fontFamily: "Playfair Display",
        fontSize: "2.2rem",
        fontWeight: 500,
        backgroundImage: "-webkit-gradient( linear, left top, right top, color-stop(0, #263238), color-stop(0.3, #546e7a), color-stop(0.7, #78909c) )",
        backgroundImage: "gradient( linear, left top, right top, color-stop(0, #263238), color-stop(0.3, #546e7a), color-stop(0.7, #78909c) )",
        color: "transparent",
        "-webkitBackgroundClip": "text",
        backgroundClip: "text"
      },
      h3: {
        fontFamily: "Playfair Display",
        fontSize: "1rem",
        fontWeight: 500,
      }    
    },
    MuiRating: {
      root: {
        color: lime[700],
      },
      iconEmpty: {
        color: blueGrey[200]
      }
    },
    MuiPaper: {
      root: {
   //     backgroundColor: "rgba(255,255,255,0.5)"
      },
      outlined: {
        backgroundColor: "rgba(255,255,255,0.5)"
      }
    },
    MuiListItemSecondaryAction: {
      root: {
        width: 200,
        display: 'flex',
      }
    },
    MuiExpansionPanelDetails: {
      root: {
        display: 'block'
      }
    }
  }
});

export default theme;