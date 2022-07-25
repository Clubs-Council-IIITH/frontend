import { createTheme } from "@mui/material/styles";

export const Theme = createTheme({
    palette: {
        background: {
            default: "#fff",
        },
        primary: {
            main: "#111",
        },
        secondary: {
            main: "#eee",
        },
    },
    typography: {
        fontFamily: `'Jost', sans-serif`,
        fontFamilySecondary: `'Quicksand', sans-serif`,
        button: {
            fontFamily: `'Quicksand', sans-serif`,
            fontWeight: 600,
        },
    },
    borderRadius: "8px",
    overrides: {
        MuiTableRow: {
            root: {
                "&:last-child td": {
                    borderBottom: 0,
                },
            },
        },
    },
});
