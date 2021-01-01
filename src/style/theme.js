import { blueGrey, brown } from "@material-ui/core/colors";
import { createMuiTheme } from "@material-ui/core/styles";
import { fade } from "@material-ui/core/styles/colorManipulator";
//import logo from '../assets/logo.svg';

const black = "#000";
const fontBrown = "#4F4643";

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
      default: "transparent",
    },
    error: {
      light: "#e57373",
      main: "#f44336",
      dark: "#d32f2f",
      contrastText: "rgba(185, 149, 149, 1)",
    },
    text: {
      primary: "rgba(0, 0, 0, 1)",
      secondary: "rgba(0, 0, 0, 0.64)",
      disabled: "rgba(0, 0, 0, 0.5)",
      hint: "rgba(0, 0, 0, 0.6)",
    },
    primary: {
      light: brown[400],
      main: brown[700],
      dark: brown[900],
      contrastText: "#fff",
    },
    secondary: {
      light: blueGrey[400],
      main: blueGrey[600],
      dark: blueGrey[900],
      contrastText: "#fff",
    },
  },
  typography: {
    fontFamily: ["Source Serif Pro", "serif"].join(","),
    fontWeight: 400,
  },
  overrides: {
    MuiTabs: {
      vertical: {
        borderRight: 0,
        marginRight: 32,
      },
    },
    MuiTab: {
      root: {
        textTransform: "none",
        fontFamily: "Source Serif Pro",
        fontWeight: 400,
      },
    },
    MuiTypography: {
      h1: {
        display: "inline-block",
        fontFamily: "Playfair Display",
        fontStyle: "italic",
        lineHeight: "2.5",
        fontSize: "1rem",
        color: brown[900],
        fontWeight: 500,
      },
      h2: {
        display: "inline-block",
        fontFamily: "Playfair Display",
        fontStyle: "italic",
        fontSize: "2rem",
        lineHeight: "1.5",
        fontWeight: 600,
        backgroundImage: "linear-gradient(to right, " + black + ", " + fontBrown + ")",
        color: "transparent",
        "-webkitBackgroundClip": "text",
        backgroundClip: "text",
      },
      h3: {
        fontFamily: "Playfair Display",
        display: "inline-block",
        fontStyle: "italic",
        fontSize: "1rem",
        fontWeight: 600,
        backgroundImage: "linear-gradient(to right, " + black + ", " + fontBrown + ")",
        color: "transparent",
        "-webkitBackgroundClip": "text",
        lineHeight: "1.5",
      },
      body1: {
        fontSize: "0.875rem",
      },
    },
    MuiButton: {
      root: {
        fontFamily: "Source Serif Pro",
        textTransform: "none",
        marginBottom: 4,
      },
      containedPrimary: {
        color: "#000",
        backgroundColor: "#fff",
        backgroundImage: "linear-gradient(to right, " + fade("#B7AEAC", 1) + " 0%, " + fade("#B7AEAC", 0.8) + " 100%) ",
      },
    },
    MuiRating: {
      root: {
        color: brown[600],
      },
      iconEmpty: {
        color: brown[100],
      },
    },
    MuiPaper: {
      root: {
        //    backgroundColor: "rgba(255,255,255,0.5)",
      },
      outlined: {
        backgroundColor: "rgba(255,255,255,0)",
        borderColor: brown[300],
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
        color: blueGrey[600],
      },
    },
    MuiList: {
      padding: {
        paddingTop: 0,
        paddingBottom: 24,
      },
    },
    MuiGrid: {
      "spacing-xs-3": {
        margin: 0,
      },
    },
    MuiFab: {
      root: {
        position: "fixed",
        zIndex: 1000,
        bottom: 16,
        right: 16,
      },
      primary: {
        backgroundColor: brown[500],
        "&:hover": {
          backgroundColor: brown[600],
        },
      },
    },
  },
});

export default theme;
