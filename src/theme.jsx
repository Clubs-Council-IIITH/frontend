import { createTheme } from "@mui/material/styles";

export const Theme = createTheme({
    palette: {
        background: {
            default: "#fff",
        },
        primary: {
            main: "#000",
        },
        secondary: {
            main: "#eee",
        },
    },
    typography: {
        fontFamily: `'Jost', sans-serif`,
        fontFamilySecondary: `'Quicksand', sans-serif`,
    },
    overrides: {
        MuiButton: {
            label: {
                fontFamily: `'Quicksand', sans-serif`,
                fontWeight: 600,
            },
        },
    },
});
