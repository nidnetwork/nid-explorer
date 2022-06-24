import { extendTheme } from "@chakra-ui/react";
import { createBreakpoints } from "@chakra-ui/theme-tools";
import type { ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const fonts = { mono: `'Menlo', monospace` };

const breakpoints = createBreakpoints({
  sm: "40em",
  md: "52em",
  lg: "64em",
  xl: "80em",
});

const theme = extendTheme({
  config,

  semanticTokens: {
    colors: {
      text: {
        default: "#16161D",
        _dark: "#ade3b8",
      },
      heroGradientStart: {
        default: "#7928CA",
        _dark: "#e3a7f9",
      },
      heroGradientEnd: {
        default: "#FF0080",
        _dark: "#fbec8f",
      },
    },
    radii: {
      button: "12px",
    },
  },
  colors: {
    black: "#16161D",
    blue: {
      "50": "#E5EEFF",
      "100": "#B8CFFF",
      "200": "#8AB1FF",
      "300": "#5C92FF",
      "400": "#2E73FF",
      "500": "#0055FF",
      "600": "#0044CC",
      "700": "#003399",
      "800": "#002266",
      "900": "#001133",
    },
    teal: {
      "50": "#E9FBF6",
      "100": "#C3F4E5",
      "200": "#9CEDD4",
      "300": "#75E5C3",
      "400": "#4FDEB2",
      "500": "#28D7A1",
      "600": "#20AC81",
      "700": "#188160",
      "800": "#105640",
      "900": "#082B20",
    },
    green: {
      "50": "#ECF9EE",
      "100": "#CAEDCF",
      "200": "#A8E1B0",
      "300": "#85D591",
      "400": "#63CA72",
      "500": "#41BE53",
      "600": "#349842",
      "700": "#277232",
      "800": "#1A4C21",
      "900": "#0D2611",
    },
    cyan: {
      "50": "#E7F8FE",
      "100": "#BBECFB",
      "200": "#90E0F9",
      "300": "#64D4F7",
      "400": "#38C7F4",
      "500": "#0DBBF2",
      "600": "#0A96C2",
      "700": "#087091",
      "800": "#054B61",
      "900": "#032530",
    },
    yellow: {
      "50": "#FFF7E5",
      "100": "#FFE9B8",
      "200": "#FFDB8A",
      "300": "#FFCC5C",
      "400": "#FFBE2E",
      "500": "#FFB000",
      "600": "#CC8D00",
      "700": "#996900",
      "800": "#664600",
      "900": "#332300",
    },
    red: {
      "50": "#FDEDE8",
      "100": "#F9CBBE",
      "200": "#F5AA94",
      "300": "#F0896A",
      "400": "#EC6841",
      "500": "#E84717",
      "600": "#BA3912",
      "700": "#8B2A0E",
      "800": "#5D1C09",
      "900": "#2E0E05",
    },
  },
  fonts,
  breakpoints,
});

export default theme;
