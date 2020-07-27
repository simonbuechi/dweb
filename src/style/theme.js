import { blueGrey } from "@material-ui/core/colors";
import { createMuiTheme } from "@material-ui/core/styles";
//import logo from '../assets/logo.svg';

// A custom theme for this app
const theme = createMuiTheme({
  palette: {
    type: "light",
    common: {
      black: "rgba(40, 31, 31, 1)",
      white: "#fff",
    },
    background: {
      paper: "#fff",
      default: blueGrey[50],
    },
    error: {
      light: "#e57373",
      main: "#f44336",
      dark: "#d32f2f",
      contrastText: "rgba(185, 149, 149, 1)",
    },
    text: {
      primary: "rgba(0, 0, 0, 0.87)",
      secondary: "rgba(0, 0, 0, 0.54)",
      disabled: "rgba(0, 0, 0, 0.38)",
      hint: "rgba(0, 0, 0, 0.38)",
    },
    primary: {
      light: blueGrey[400],
      main: blueGrey[600],
      dark: blueGrey[800],
      contrastText: "#fff",
    },
    secondary: {
      light: blueGrey[400],
      main: blueGrey[600],
      dark: blueGrey[800],
      contrastText: "#fff",
    },
  },
  typography: {
    fontFamily: ["Roboto Slab", "serif"].join(","),
  },
  overrides: {
    MuiTabs: {
      vertical: {
        borderRight: `1px solid ${blueGrey[300]}`,
        marginRight: 32,
      },
    },
    MuiTab: {
      root: {
        textTransform: "none",
        fontFamily: "Basetica",
      },
    },
    MuiTypography: {
      h1: {
        display: "inline",
        fontFamily: "Basetica",
        lineHeight: "1.5",
        fontSize: "3rem",
        backgroundImage:
          "gradient( linear, left top, right top, color-stop(0, " +
          blueGrey[900] +
          "), color-stop(0.3, " +
          blueGrey[700] +
          "), color-stop(0.7, " +
          blueGrey[500] +
          ") )",
        color: "transparent",
        "-webkitBackgroundClip": "text",
        backgroundClip: "text",
      },
      h2: {
        fontFamily: "Basetica",
        fontSize: "1.8rem",
        lineHeight: "1.5",
        backgroundImage:
          "gradient( linear, left top, right top, color-stop(0, " +
          blueGrey[900] +
          "), color-stop(0.3, " +
          blueGrey[700] +
          "), color-stop(0.7, " +
          blueGrey[500] +
          ") )",
        color: "transparent",
        "-webkitBackgroundClip": "text",
        backgroundClip: "text",
      },
      h3: {
        fontFamily: "Roboto Slab",
        fontSize: "1rem",
        fontWeight: 300,
      },
      body1: {
        fontSize: "0.875rem",
      }
    },
    MuiButton: {
      root: {
        fontFamily: "Basetica",
        textTransform: "none",
        marginBottom: 4,
      },
      containedPrimary: {
        backgroundImage: "linear-gradient(to right," + blueGrey[700] + " 0%, " + blueGrey[500] + " 51%) ",
      },
    },
    MuiRating: {
      root: {
        color: blueGrey[600],
      },
      iconEmpty: {
        color: blueGrey[100],
      },
    },
    MuiPaper: {
      root: {
        //    backgroundColor: "rgba(255,255,255,0.5)",
      },
      outlined: {
        backgroundColor: "rgba(255,255,255,0)",
        borderColor: blueGrey[300],
      },
    },
    MuiListItemSecondaryAction: {
      root: {
        display: "flex",
      },
    },
    MuiExpansionPanelDetails: {
      root: {
        display: "block",
      },
    },
    MuiListItemIcon: {
      root: {
        color: blueGrey[500],
      },
    },
    MuiGrid: {
      "spacing-xs-3": {
        margin: 0,
      },
    },
  },
});

export default theme;
