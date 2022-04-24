import { useState } from "react";
import { useForm, Controller } from "react-hook-form";

import { useMutation } from "@apollo/client";

import { Button, Grid, Box, TextField, Typography } from "@mui/material";

import CurrencyFormat from "components/CurrencyFormat";

const FinanceField = ({ event }) => {
    const { control, handleSubmit } = useForm();

    const onSubmit = async (data) => {
        // TODO: make api calls, clear fields
        console.log(data);
    };

    return (
        <>
            <Typography mb={1} variant="h6">
                Add a requirement
            </Typography>

            <form id="EventForm" onSubmit={handleSubmit(onSubmit)}>
                <Box mb={2}>
                    <Controller
                        name="amount"
                        control={control}
                        shouldUnregister={true}
                        defaultValue={null}
                        render={({ field: { onChange, value }, fieldState: { error } }) => (
                            <TextField
                                label="Amount*"
                                fullWidth
                                placeholder="₹ 0"
                                InputProps={{
                                    inputComponent: CurrencyFormat,
                                }}
                                variant="outlined"
                                value={value}
                                onChange={onChange}
                                error={!!error}
                                helperText={error ? error.message : null}
                            />
                        )}
                        rules={{ required: "Amount can not be empty!" }}
                    />
                </Box>
                <Box mb={2}>
                    <Controller
                        name="description"
                        control={control}
                        shouldUnregister={true}
                        defaultValue={""}
                        render={({ field: { onChange, value }, fieldState: { error } }) => (
                            <TextField
                                multiline
                                fullWidth
                                label="Description*"
                                placeholder="What is this money for?"
                                variant="outlined"
                                rows={4}
                                value={value}
                                onChange={onChange}
                                error={!!error}
                                helperText={error ? error.message : null}
                            />
                        )}
                        rules={{ required: "Description can not be empty!" }}
                    />
                </Box>
                <Box>
                    <Button type="submit" color="warning" variant="outlined" size="large" fullWidth>
                        Add
                    </Button>
                </Box>
            </form>
        </>
    );
};

const FinanceForm = ({ event = null }) => {
    return (
        <Grid container spacing={3}>
            <Grid item xs={12} lg={4}>
                <FinanceField event={event} />
            </Grid>
            <Grid item xs lg>
                TODO: display current financial requirements as a datagrid, make editable +
                deletable + paginated + show total amount
            </Grid>
        </Grid>
    );
};

export default FinanceForm;
