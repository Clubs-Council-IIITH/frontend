import { Button, Box } from "@material-ui/core";

const SecondaryActionButton = ({ noPadding = false, children, ...props }) => {
    return <Button {...props}>{noPadding ? children : <Box px={2}>{children}</Box>}</Button>;
};

export default SecondaryActionButton;
