import { makeStyles } from "@mui/styles";

import { Button, Box } from "@mui/material";

import { blue } from "@mui/material/colors";

// styles {{{
const useStyles = makeStyles({
    primaryActionButton: {
        borderColor: blue["A700"],
        color: blue["A700"],
    },
});
// }}}

const PrimaryActionButton = ({ noPadding = false, children, ...props }) => {
    const classes = useStyles();

    return (
        <Button className={classes.primaryActionButton} {...props}>
            {noPadding ? children : <Box px={2}>{children}</Box>}
        </Button>
    );
};

export default PrimaryActionButton;
