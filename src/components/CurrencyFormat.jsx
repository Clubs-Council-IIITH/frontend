import { forwardRef } from "react";
import NumberFormat from "react-number-format";

const CurrencyFormat = forwardRef(function CurrencyFormat(props, ref) {
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
            thousandSeparator
            isNumericString
            prefix="₹ "
        />
    );
});

export default CurrencyFormat;
