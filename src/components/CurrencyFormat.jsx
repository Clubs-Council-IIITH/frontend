import { forwardRef } from "react";
import NumberFormat from "react-number-format";
import { Box } from "@mui/material";

export const CurrencyInput = forwardRef(function CurrencyFormat(props, ref) {
    const { onChange, ...other } = props;

    return (
        <NumberFormat
            {...other}
            getInputRef={ref}
            onValueChange={(values) => {
                onChange({
                    target: {
                        name: props.name,
                        value: values.value,
                    },
                });
            }}
            thousandsGroupStyle="lakh"
            thousandSeparator
            isNumericString
            prefix="₹ "
        />
    );
});

export const CurrencyText = ({ value, ...styles }) => {
    return (
        <NumberFormat
            value={value}
            thousandsGroupStyle="lakh"
            thousandSeparator
            isNumericString
            prefix="₹"
            displayType={"text"}
            renderText={(value, props) => (
                <Box {...props} {...styles}>
                    {value}
                </Box>
            )}
        />
    );
};
