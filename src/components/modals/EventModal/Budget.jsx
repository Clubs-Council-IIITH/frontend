import { useState, useEffect } from "react";
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
    Skeleton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    FormControl,
    FormLabel,
    RadioGroup,
    Radio,
    FormControlLabel,
} from "@mui/material";
import {
    Done as AddIcon,
    RestartAltOutlined as ClearIcon,
    DeleteOutlined as DeleteIcon,
} from "@mui/icons-material";

import Empty from "components/Empty";

import { CurrencyInput, CurrencyText } from "components/CurrencyFormat";

const BudgetHeader = ({ items, loading }) => {
    const theme = useTheme();

    return (
        <Grid container spacing={2}>
            <Grid item>
                <Card variant="none" sx={{ p: 1 }}>
                    <Box display="flex" flexDirection="column">
                        <Typography
                            variant="body"
                            sx={{ color: theme.palette.success.light }}
                            gutterBottom
                        >
                            Total Budget
                        </Typography>
                        <Typography variant="h3" sx={{ color: theme.palette.success.light }}>
                            {loading ? (
                                <Skeleton animation="wave" />
                            ) : (
                                <CurrencyText
                                    value={items?.reduce((sum, i) => sum + parseFloat(i.amount), 0)}
                                />
                            )}
                        </Typography>
                    </Box>
                </Card>
            </Grid>
            <Grid item>
                <Card variant="none" sx={{ p: 1 }}>
                    <Box display="flex" flexDirection="column">
                        <Typography
                            variant="body"
                            sx={{ color: theme.palette.secondary.dark }}
                            gutterBottom
                        >
                            Requirements
                        </Typography>
                        <Typography variant="h3" sx={{ color: theme.palette.secondary.dark }}>
                            {loading ? <Skeleton animation="wave" /> : items?.length}
                        </Typography>
                    </Box>
                </Card>
            </Grid>
        </Grid>
    );
};

const BudgetItem = ({ item, activeEventId, editing }) => {
    const [deleteRequirement, { error: deleteError }] = useMutation(DELETE_BUDGET_REQUIREMENT, {
        refetchQueries: [ADMIN_GET_EVENT_BUDGET],
        awaitRefetchQueries: true,
    });

    const handleDelete = async () => {
        await deleteRequirement({ variables: { eventId: activeEventId, id: item.id } });
    };

    return (
        <TableRow
            sx={{
                "&:last-child th, &:last-child td": {
                    borderBottom: 0,
                },
            }}
        >
            <TableCell sx={{ fontSize: "1em" }}>
                <CurrencyText value={item?.amount} />
            </TableCell>
            <TableCell sx={{ fontSize: "1em" }}>{item?.description}</TableCell>
            <TableCell sx={{ fontSize: "1em" }}>
                {item?.reimbursable ? "Reimbursement" : "Advance"}
            </TableCell>
            <TableCell align="right">
                <Box visibility={editing ? "visible" : "hidden"}>
                    <IconButton type="button" color="error" onClick={handleDelete}>
                        <DeleteIcon fontSize="small" />
                    </IconButton>
                </Box>
            </TableCell>
        </TableRow>
    );
};

const BudgetField = ({ activeEventId }) => {
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
        reset({}, { keepDefaultValues: true });
    };

    const onSubmit = async (data) => {
        const transformedData = {
            ...data,
            eventId: activeEventId,
        };

        await createRequirement({ variables: { ...transformedData } });
    };

    // clear input values on form submit
    useEffect(clearForm, [isSubmitSuccessful]);

    return (
        <form
            id="BudgetFieldForm"
            onKeyPress={async (e) => {
                e.key === "Enter" && (await handleSubmit(onSubmit)());
            }}
        >
            <Box display="flex" alignItems="flex-end">
                <Grid container px={1} spacing={2}>
                    <Grid item xs={12}>
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
                                    variant="standard"
                                    value={value}
                                    onChange={onChange}
                                    error={!!error}
                                    InputLabelProps={{ shrink: true }}
                                    helperText={error ? error.message : null}
                                />
                            )}
                            rules={{ required: "Amount can not be empty!" }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Controller
                            name="description"
                            control={control}
                            shouldUnregister={true}
                            defaultValue=""
                            render={({ field: { onChange, value }, fieldState: { error } }) => (
                                <TextField
                                    fullWidth
                                    multiline
                                    rows={2}
                                    label="Description*"
                                    placeholder="What is this money for?"
                                    variant="standard"
                                    value={value}
                                    onChange={onChange}
                                    error={!!error}
                                    InputLabelProps={{ shrink: true }}
                                    helperText={error ? error.message : null}
                                />
                            )}
                            rules={{ required: "Description can not be empty!" }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Controller
                            name="reimbursable"
                            control={control}
                            shouldUnregister={true}
                            defaultValue={false}
                            render={({ field: { onChange, value }, fieldState: { error } }) => (
                                <FormControl>
                                    <FormLabel component="legend" sx={{ fontSize: 12 }}>
                                        Type
                                    </FormLabel>
                                    <RadioGroup
                                        row
                                        name="reimbursable"
                                        value={value}
                                        onChange={onChange}
                                    >
                                        <FormControlLabel
                                            value={false}
                                            control={<Radio />}
                                            label="Advance"
                                        />
                                        <FormControlLabel
                                            value={true}
                                            control={<Radio />}
                                            label="Reimbursement"
                                        />
                                    </RadioGroup>
                                </FormControl>
                            )}
                        />
                    </Grid>
                </Grid>
                <Box height="100%" display="flex" mx={1}>
                    <IconButton type="button" color="success" onClick={handleSubmit(onSubmit)}>
                        <AddIcon />
                    </IconButton>
                    <IconButton type="button" onClick={clearForm} sx={{ ml: 1 }}>
                        <ClearIcon />
                    </IconButton>
                </Box>
            </Box>
        </form>
    );
};

const Budget = ({ activeEventId, editing, setEditing }) => {
    const { handleSubmit } = useForm();

    const { data: budgetData, loading: budgetLoading } = useQuery(ADMIN_GET_EVENT_BUDGET, {
        variables: { eventId: activeEventId },
    });

    const onSubmit = async () => {
        // stop editing
        setEditing(false);
    };

    return (
        <form
            id="ActiveEventForm"
            onSubmit={handleSubmit(onSubmit)}
            onKeyPress={(e) => {
                e.key === "Enter" && e.preventDefault();
            }}
        >
            <Grid container p={2} spacing={2}>
                <Grid item xs={12}>
                    <BudgetHeader items={budgetData?.adminEventBudget} loading={budgetLoading} />
                </Grid>
                {editing ? (
                    <Grid item xs={12}>
                        <Typography m={1} variant="h6">
                            Add a requirement
                        </Typography>
                        <Card variant="outlined" sx={{ px: 1, pt: 2, pb: 1 }}>
                            <BudgetField activeEventId={activeEventId} />
                        </Card>
                    </Grid>
                ) : null}
                <Grid item xs={12}>
                    <Typography m={1} variant="h6">
                        Current budget breakdown
                    </Typography>
                    <TableContainer component={Paper} variant="outlined">
                        {budgetData?.adminEventBudget?.length === 0 ? (
                            <Empty />
                        ) : (
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell> Amount </TableCell>
                                        <TableCell> Description </TableCell>
                                        <TableCell> Type </TableCell>
                                        <TableCell align="right"> </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {budgetLoading ? (
                                        <>
                                            <BudgetItem
                                                item={{ description: <Skeleton />, amount: 0.0 }}
                                                activeEventId={activeEventId}
                                            />
                                            <BudgetItem
                                                item={{ description: <Skeleton />, amount: 0.0 }}
                                                activeEventId={activeEventId}
                                            />
                                        </>
                                    ) : (
                                        budgetData?.adminEventBudget?.map((item) => (
                                            <BudgetItem
                                                item={item}
                                                activeEventId={activeEventId}
                                                editing={editing}
                                            />
                                        ))
                                    )}
                                </TableBody>
                            </Table>
                        )}
                    </TableContainer>
                </Grid>
            </Grid>
        </form>
    );
};

export default Budget;
