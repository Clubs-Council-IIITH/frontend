import { makeStyles } from "@material-ui/core/styles";

import { Button, Box } from "@material-ui/core";

import { blue } from "@material-ui/core/colors";

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
