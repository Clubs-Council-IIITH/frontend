import { makeStyles } from "@mui/styles";

import { Button, Box } from "@mui/material";

import { red } from "@mui/material/colors";

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
