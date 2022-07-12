import { useState, useEffect, useContext } from "react";
import { useForm, Controller } from "react-hook-form";
import { useTheme } from "@mui/styles";

import { useMutation, useQuery } from "@apollo/client";
import { ADMIN_GET_EVENT_BUDGET } from "queries/finance";
import { CREATE_BUDGET_REQUIREMENT, DELETE_BUDGET_REQUIREMENT } from "mutations/finance";

import {
    Card,
    IconButton,
    Grid,
    Box,
    TextField,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from "@mui/material";
import {
    Done as AddIcon,
    Close as ClearIcon,
    DeleteOutlined as DeleteIcon,
} from "@mui/icons-material";

import Loading from "components/Loading";
import Empty from "components/Empty";

import { CurrencyInput, CurrencyText } from "components/CurrencyFormat";

import { EventFormContext } from "contexts/EventFormContext";

const FinanceHeader = ({ items }) => {
    const theme = useTheme();

    return (
        <Grid container spacing={4}>
            <Grid item>
                <Card variant="none">
                    <Box display="flex" flexDirection="column" mx={2}>
                        <Typography
                            variant="body"
                            sx={{ color: theme.palette.success.light }}
                            gutterBottom
                        >
                            Total Budget
                        </Typography>
                        <Typography variant="h3" sx={{ color: theme.palette.success.light }}>
                            <CurrencyText
                                value={items?.reduce((sum, i) => sum + parseFloat(i.amount), 0)}
                            />
                        </Typography>
                    </Box>
                </Card>
            </Grid>
            <Grid item>
                <Card variant="none">
                    <Box display="flex" flexDirection="column" mx={2}>
                        <Typography
                            variant="body"
                            sx={{ color: theme.palette.secondary.dark }}
                            gutterBottom
                        >
                            Requirements
                        </Typography>
                        <Typography variant="h3" sx={{ color: theme.palette.secondary.dark }}>
                            {items?.length}
                        </Typography>
                    </Box>
                </Card>
            </Grid>
        </Grid>
    );
};

const FinanceItem = ({ item, event }) => {
    const [showActions, setShowActions] = useState(false);

    const [deleteRequirement, { error: deleteError }] = useMutation(DELETE_BUDGET_REQUIREMENT, {
        refetchQueries: [ADMIN_GET_EVENT_BUDGET],
        awaitRefetchQueries: true,
    });

    const handleDelete = async () => {
        await deleteRequirement({ variables: { eventId: event.id, id: item.id } });
    };

    return (
        <TableRow onMouseOver={() => setShowActions(true)} onMouseOut={() => setShowActions(false)}>
            <TableCell sx={{ fontSize: "1em" }}>
                <CurrencyText value={item?.amount} />
            </TableCell>
            <TableCell sx={{ fontSize: "1em" }}>{item?.description}</TableCell>
            <TableCell align="right">
                <Box visibility={showActions ? "visible" : "hidden"}>
                    <IconButton type="button" color="error" onClick={handleDelete}>
                        <DeleteIcon fontSize="small" />
                    </IconButton>
                </Box>
            </TableCell>
        </TableRow>
    );
};

const FinanceField = ({ event }) => {
    const {
        control,
        handleSubmit,
        reset,
        formState: { isSubmitSuccessful },
    } = useForm();

    const [createRequirement, { error: createError }] = useMutation(CREATE_BUDGET_REQUIREMENT, {
        refetchQueries: [ADMIN_GET_EVENT_BUDGET],
        awaitRefetchQueries: true,
    });

    // clear input values
    const clearForm = () => {
        reset(
            {},
            {
                keepDefaultValues: true,
            }
        );
    };

    const onSubmit = async (data) => {
        const transformedData = {
            ...data,
            eventId: event?.id,
        };

        await createRequirement({ variables: { ...transformedData } });
    };

    // clear input values on form submit
    useEffect(clearForm, [isSubmitSuccessful]);

    return (
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
                <IconButton type="button" color="success" onClick={handleSubmit(onSubmit)}>
                    <AddIcon />
                </IconButton>
                <IconButton type="button" onClick={clearForm}>
                    <ClearIcon />
                </IconButton>
            </Box>
        </Box>
    );
};

const FinanceForm = ({ form_id }) => {
    const { stepper, activeEvent } = useContext(EventFormContext);

    const { handleSubmit } = useForm();

    const { data, loading } = useQuery(ADMIN_GET_EVENT_BUDGET, {
        variables: { eventId: activeEvent?.id },
    });

    const onSubmit = async () => {
        // move to the next page
        stepper.next();
    };

    return (
        <form id={form_id} onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
                {loading ? (
                    <Loading />
                ) : (
                    <>
                        <Grid item xs={12}>
                            <FinanceHeader items={data?.adminEventBudget} />
                        </Grid>

                        <Grid item xs={12}>
                            <Box mb={2}>
                                <Typography m={1} variant="h6">
                                    Add a requirement
                                </Typography>
                                <FinanceField event={activeEvent} />
                            </Box>
                            <Box>
                                <Typography m={1} variant="h6">
                                    Current budget breakdown
                                </Typography>
                                {data?.adminEventBudget?.length === 0 ? (
                                    <Empty />
                                ) : (
                                    <TableContainer
                                        component={Paper}
                                        variant="outlined"
                                        sx={{ mx: 1, my: 2 }}
                                    >
                                        <Table>
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell> Amount </TableCell>
                                                    <TableCell> Description </TableCell>
                                                    <TableCell align="right"> </TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {data?.adminEventBudget?.map((item) => (
                                                    <FinanceItem item={item} event={activeEvent} />
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                )}
                            </Box>
                        </Grid>
                    </>
                )}
            </Grid>
        </form>
    );
};

export default FinanceForm;
