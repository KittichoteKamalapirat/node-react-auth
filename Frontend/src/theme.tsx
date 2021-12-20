import {
  extendTheme,
  withDefaultColorScheme,
  theme as baseTheme,
} from "@chakra-ui/react";
import { createBreakpoints } from "@chakra-ui/theme-tools";

const breakpoints = createBreakpoints({
  sm: "40em",
  md: "52em",
  lg: "64em",
  xl: "80em",
});

const theme = extendTheme({
  components: {
    Button: {
      baseStyle: {
        borderRadius: "20px",
        padding: "10px",
        width: "100%",
        mt: 4,
      },
    },
  },
  breakpoints,
});

export default theme;
