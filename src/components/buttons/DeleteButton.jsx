import { makeStyles } from "@material-ui/core/styles";

import { Button, Box } from "@material-ui/core";

import { red } from "@material-ui/core/colors";

// styles {{{
const useStyles = makeStyles({
    deleteButton: {
        borderColor: red["A700"],
        color: red["A700"],
    },
});
// }}}

const DeleteButton = ({ noPadding = false, children, ...props }) => {
    const classes = useStyles();

    return (
        <Button className={classes.deleteButton} {...props}>
            {noPadding ? children : <Box px={2}>{children}</Box>}
        </Button>
    );
};

export default DeleteButton;
