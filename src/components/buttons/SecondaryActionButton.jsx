import { Button, Box } from "@mui/material";

const SecondaryActionButton = ({ noPadding = false, children, ...props }) => {
    return <Button {...props}>{noPadding ? children : <Box px={2}>{children}</Box>}</Button>;
};

export default SecondaryActionButton;
