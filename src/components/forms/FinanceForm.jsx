import { useState, useContext } from "react";
import { useForm, Controller } from "react-hook-form";
import { useTheme } from "@mui/styles";

import { useMutation } from "@apollo/client";

import { Card, IconButton, Button, Grid, Box, TextField, Typography } from "@mui/material";
import {
    Done as AddIcon,
    Close as ClearIcon,
    EditOutlined as EditIcon,
    DeleteOutlined as DeleteIcon,
} from "@mui/icons-material";

import Empty from "components/Empty";
import { CurrencyInput, CurrencyText } from "components/CurrencyFormat";

import { EventFormContext } from "contexts/EventFormContext";

const financeData = [
    { id: 1, amount: 1.0, description: "description 0" },
    { id: 2, amount: 2.0, description: "description 1" },
    { id: 3, amount: 3.0, description: "description 2" },
    { id: 4, amount: 4.0, description: "description 3" },
    // {
    //     id: 5,
    //     amount: 12345.0,
    //     description:
    //         "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    // },
];

const FinanceHeader = ({ items }) => {
    const theme = useTheme();

    return (
        <Grid container spacing={4}>
            <Grid item>
                <Card variant="none">
                    <Box display="flex" flexDirection="column" m={2}>
                        <Typography
                            variant="body"
                            sx={{ color: theme.palette.success.light }}
                            gutterBottom
                        >
                            Total Budget
                        </Typography>
                        <Typography variant="h3" sx={{ color: theme.palette.success.light }}>
                            <CurrencyText value={items.reduce((sum, i) => sum + i.amount, 0)} />
                        </Typography>
                    </Box>
                </Card>
            </Grid>
            <Grid item>
                <Card variant="none">
                    <Box display="flex" flexDirection="column" m={2}>
                        <Typography
                            variant="body"
                            sx={{ color: theme.palette.secondary.dark }}
                            gutterBottom
                        >
                            Requirements
                        </Typography>
                        <Typography variant="h3" sx={{ color: theme.palette.secondary.dark }}>
                            {items.length}
                        </Typography>
                    </Box>
                </Card>
            </Grid>
        </Grid>
    );
};

const FinanceItem = ({ item }) => {
    const [showActions, setShowActions] = useState(false);

    return (
        <Grid container spacing={2}>
            <Grid
                item
                mx={1}
                my={1}
                xs={2}
                display="flex"
                alignItems="center"
                justifyContent="flex-end"
            >
                <CurrencyText value={item.amount} fontSize="1.2em" fontWeight={700} />
            </Grid>
            <Grid
                item
                my={1}
                xs
                display="flex"
                alignItems="center"
                onMouseOver={() => setShowActions(true)}
                onMouseOut={() => setShowActions(false)}
            >
                <Box>{item.description}</Box>
                <Box mx={3} visibility={showActions ? "visible" : "hidden"}>
                    <IconButton type="button" color="warning">
                        <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton type="button" color="error">
                        <DeleteIcon fontSize="small" />
                    </IconButton>
                </Box>
            </Grid>
        </Grid>
    );
};

const FinanceField = ({ event }) => {
    const { control, handleSubmit, reset } = useForm();

    const onSubmit = async (data) => {
        // TODO: make api calls, clear fields
        console.log(data);

        // clear input values
        clearForm();
    };

    const clearForm = () => {
        reset({
            amount: "",
            description: "",
        });
    };

    return (
        <form id="FinanceField" onSubmit={handleSubmit(onSubmit)}>
            <Box display="flex" alignItems="center">
                <Box display="flex" width="100%">
                    <Controller
                        name="amount"
                        control={control}
                        shouldUnregister={true}
                        defaultValue=""
                        render={({ field: { onChange, value }, fieldState: { error } }) => (
                            <TextField
                                label="Amount*"
                                placeholder="₹ 0"
                                InputProps={{
                                    inputComponent: CurrencyInput,
                                }}
                                variant="outlined"
                                value={value}
                                onChange={onChange}
                                error={!!error}
                                helperText={error ? error.message : null}
                                sx={{ margin: 1 }}
                            />
                        )}
                        rules={{ required: "Amount can not be empty!" }}
                    />
                    <Controller
                        name="description"
                        control={control}
                        shouldUnregister={true}
                        defaultValue=""
                        render={({ field: { onChange, value }, fieldState: { error } }) => (
                            <TextField
                                fullWidth
                                label="Description*"
                                placeholder="What is this money for?"
                                variant="outlined"
                                value={value}
                                onChange={onChange}
                                error={!!error}
                                helperText={error ? error.message : null}
                                sx={{ margin: 1 }}
                            />
                        )}
                        rules={{ required: "Description can not be empty!" }}
                    />
                </Box>
                <Box display="flex" alignItems="center" mx={1}>
                    <IconButton type="submit" color="success">
                        <AddIcon />
                    </IconButton>
                    <IconButton type="button" onClick={clearForm}>
                        <ClearIcon />
                    </IconButton>
                </Box>
            </Box>
        </form>
    );
};

const FinanceForm = ({ form_id, event = null }) => {
    const { stepper } = useContext(EventFormContext);

    const { handleSubmit } = useForm();

    const onSubmit = async (data) => {
        // move to the next page
        stepper.next();
    };

    return (
        <form id={form_id} onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <FinanceHeader items={financeData} />
                </Grid>
                <Grid item xs={12}>
                    <Box mb={2}>
                        <Typography m={1} variant="h6">
                            Add a requirement
                        </Typography>
                        <FinanceField event={event} />
                    </Box>
                    <Box>
                        <Typography m={1} variant="h6">
                            Current budget breakdown
                        </Typography>
                        {financeData.length === 0 ? (
                            <Empty />
                        ) : (
                            financeData.map((item) => <FinanceItem item={item} />)
                        )}
                    </Box>
                </Grid>
            </Grid>
        </form>
    );
};

export default FinanceForm;
