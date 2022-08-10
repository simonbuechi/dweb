import { blueGrey, brown } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";
//import logo from '../assets/logo.svg';

const black = "#000";
const fontBrown = "#604941";
const iconBrown = "#776A67";

// A custom theme for this app
const theme = createTheme({
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
  components: {
    MuiAppBar: {
      styleOverrides: {
        colorTransparent: {
          boxShadow: "none",
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paperFullScreen: {
          overflow: "hidden",
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        vertical: {
          borderRight: 0,
          marginRight: 32,
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontFamily: "Source Serif Pro",
          fontWeight: 400,
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        h1: {
          lineHeight: "2.5",
          fontSize: "1rem",
          color: brown[900],
          fontWeight: 400,
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
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          paddingLeft: 4,
        },
        h3: {
          fontSize: "1.3rem",
          fontWeight: 400,
          backgroundImage: "linear-gradient(to right, " + black + ", " + fontBrown + ")",
          color: "transparent",
          WebkitBackgroundClip: "text",
          lineHeight: "1.5",
        },
        body1: {
          fontSize: "0.875rem",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontFamily: "Source Serif Pro",
          textTransform: "none",
          marginBottom: 4,
        },
        containedPrimary: {
          color: "#000",
          backgroundColor: "#fff",
          backgroundImage: "linear-gradient(to right, " + brown[400] + " 0%, " + brown[200] + " 100%) ",
        },
      },
    },
    MuiRating: {
      styleOverrides: {
        root: {
          color: brown[600],
        },
        iconEmpty: {
          color: brown[100],
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          //    backgroundColor: "rgba(255,255,255,0.5)",
        },
        outlined: {
          backgroundColor: "rgba(255,255,255,0)",
          borderColor: brown[300],
        },
      },
    },
    MuiListItemSecondaryAction: {
      styleOverrides: {
        root: {
          display: "flex",
        },
      },
    },
    MuiExpansionPanelDetails: {
      styleOverrides: {
        root: {
          display: "block",
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          color: iconBrown,
        },
      },
    },
    MuiList: {
      styleOverrides: {
        padding: {
          paddingBottom: 24,
        },
      },
    },
    MuiGrid: {
      styleOverrides: {
        "spacing-xs-3": {
          margin: 0,
        },
      },
    },
    MuiFab: {
      styleOverrides: {
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
    MuiAvatar: {
      styleOverrides: {
        colorDefault: {
          color: black,
          backgroundColor: brown[100],
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          marginRight: 5,
          marginBottom: 5,
          backgroundColor: brown[100],
        },
      },
    },
  },
});

export default theme;
