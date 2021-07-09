import { createTheme } from "@material-ui/core/styles";

export const Theme = createTheme({
    palette: {
        background: {
            default: "#fff",
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
