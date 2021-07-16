import { makeStyles } from "@material-ui/core/styles";

import { Button, Box } from "@material-ui/core";

import { amber } from "@material-ui/core/colors";

// styles {{{
const useStyles = makeStyles({
    editButton: {
        borderColor: amber["A700"],
        color: amber["A700"],
    },
});
// }}}

const EditButton = ({ noPadding = false, children, ...props }) => {
    const classes = useStyles();

    return (
        <Button className={classes.editButton} {...props}>
            {noPadding ? children : <Box px={2}>{children}</Box>}
        </Button>
    );
};

export default EditButton;
