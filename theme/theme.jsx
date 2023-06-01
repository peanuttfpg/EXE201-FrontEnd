import { extendTheme } from "@chakra-ui/react";
const theme = extendTheme({
  colors: {
    primary: {
      main: "#F5CAC3",
      light: "#F2D8DC"
    },
    secondary: {
      light:"#BF6060",
      main: "#A25F4F"
    },
    text:"#BF6060",
    background_main: "#F7EDE2",
    background_light: "#FAF6F6",
    warning: "#ffaa00",
    error: "#e50e0e",
    link: "#017fed",
  },

  fonts: {
    body: "Inter, system-ui, sans-serif",
    heading: "Inter, Georgia, serif",
    mono: "Inter, Menlo, monospace"
  },
  breakpoints: {
    xs: "50px",
    sm: "375px",
    md: "768px",
    lg: "1024px",
    xl: "1440px",
    "2xl": "2560px",
  },
});

export default theme;
