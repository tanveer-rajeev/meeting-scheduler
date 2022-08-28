import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: ["Averta"],
  },
  palette: {
    primary: {
      main: "#2CCED2",
      light: "#d8f9fafd",
      lightest: "#f2fefffd",
    },
    secondary: {
      main: "#F9968B",
    },
    ternary: {
      main: "#26474E",
    },
  },
  components: {
    MuiMenuItem: {
      styleOverrides: {
        root: {
          "&.Mui-selected": {
            color: "white",
            backgroundColor: "#2CCED2",
            "&:hover": {
              color: "#2CCED2",
              backgroundColor: "#d8f9fafd",
            },
          },
        },
      },
    },
  },
});

export default theme;
