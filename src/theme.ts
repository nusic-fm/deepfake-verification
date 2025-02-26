import { createTheme, responsiveFontSizes } from "@mui/material";
import WebFont from "webfontloader";

WebFont.load({
  google: {
    families: ["Inter:400,500,600,700", "Space Grotesk:500,700"],
  },
});

declare module "@mui/material/styles/createPalette" {
  interface Palette {
    customPaper: { main: string; border: string };
  }

  interface PaletteOptions {
    customPaper?: { main: string; border: string };
  }
}

const themeSettings = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#64FFDA", // Aurora green
      light: "#95FFE6",
      contrastText: "#000", // Black text on light colors
    },
    secondary: {
      main: "#BD93F9", // Soft purple
    },
    info: {
      main: "#8BE9FD", // Ice blue
    },
    warning: {
      main: "#FFB86C", // Soft orange
    },
    customPaper: {
      main: "#282A36", // Deep charcoal
      border: "#44475A", // Midnight blue border
    },
    background: {
      default: "#1A1C2C", // Deep twilight
      paper: "#282A36",
    },
  },
  typography: {
    fontFamily: `"Inter", sans-serif`,
    h1: {
      fontFamily: `"Space Grotesk", sans-serif`,
      fontWeight: 700,
    },
    h2: {
      fontFamily: `"Space Grotesk", sans-serif`,
      fontWeight: 700,
    },
    h3: {
      fontFamily: `"Space Grotesk", sans-serif`,
      fontWeight: 700,
    },
    h4: {
      fontFamily: `"Space Grotesk", sans-serif`,
      fontWeight: 700,
    },
    h5: {
      fontFamily: `"Space Grotesk", sans-serif`,
      fontWeight: 500,
    },
    h6: {
      fontFamily: `"Space Grotesk", sans-serif`,
      fontWeight: 500,
    },
    allVariants: {
      color: "#ffffff", // Changed to pure white
    },
  },
});

const theme = responsiveFontSizes(themeSettings);

export default theme;
