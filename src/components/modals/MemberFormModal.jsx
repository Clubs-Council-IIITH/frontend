import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useTheme } from "@mui/styles";

import { useMutation, useLazyQuery } from "@apollo/client";
import { CREATE_USER, ADD_MEMBER, UPDATE_MEMBER } from "mutations/members";
import { GET_USER, GET_CLUB_MEMBERS, ADMIN_GET_CLUB_MEMBERS } from "queries/members";

import {
    Avatar,
    Box,
    Card,
    CardActions,
    Fade,
    TextField,
    Typography,
    Button,
    Grid,
    Modal,
    Divider,
} from "@mui/material";

import ResponseToast from "components/ResponseToast";

const MODAL_HEIGHT = "60vh";
const MODAL_WIDTH = "50vw";

const MemberFormModal = ({ member = null, controller: [open, setOpen] }) => {
    const theme = useTheme();

    const { control, register, handleSubmit } = useForm();

    const [toast, setToast] = useState({ open: false });

    // track progress of form phases
    // 0: waiting for member email
    // 1: user does not exist in db, waiting for creation
    // 2: waiting for member role and year input
    const [formProgress, setFormProgress] = useState(0);

    // fetch targetUser if editing existing member
    useEffect(() => {
        if (member) {
            setFormProgress(2);
            getTargetUser({ variables: { mail: member?.user?.mail } });
        }
    }, [member]);

    const [targetMail, setTargetMail] = useState("");

    const [createUser, { error: createError }] = useMutation(CREATE_USER, {
        refetchQueries: [GET_USER],
        awaitRefetchQueries: true,
    });

    const [addMember, { error: addError }] = useMutation(ADD_MEMBER, {
        refetchQueries: [GET_CLUB_MEMBERS, ADMIN_GET_CLUB_MEMBERS],
        awaitRefetchQueries: true,
    });

    const [updateMember, { error: updateError }] = useMutation(UPDATE_MEMBER, {
        refetchQueries: [GET_CLUB_MEMBERS, ADMIN_GET_CLUB_MEMBERS],
        awaitRefetchQueries: true,
    });

    // on query completion, proceed to phase 1 if target user doesn't exist, else directly to phase 2
    const [getTargetUser, { data: targetUser }] = useLazyQuery(GET_USER, {
        onCompleted: (data) => setFormProgress(data?.user ? 2 : 1),
    });

    // reset form progress and close modal
    const cancelAll = () => {
        setOpen(false);
        setTargetMail("");
        setFormProgress(0);
    };

    const onSubmitMail = async (data) => {
        setTargetMail(data.mail);
        getTargetUser({ variables: { mail: data.mail } });
    };

    const onSubmitUser = async (data) => {
        const transformedData = {
            ...data,
            img: data.img[0],
        };

        // create new user
        await createUser({ variables: { ...transformedData } });

        if (createError) {
            // show response toast based on form submission status
            setToast({ open: true, error: createError });
            cancelAll();
        } else {
            setFormProgress(2);
        }
    };

    const onSubmitMember = async (data) => {
        const transformedData = {
            ...data,
            userId: targetUser?.user.id,
        };

        // update or create new instance of data
        await (member
            ? updateMember({ variables: { ...transformedData, id: member.id } })
            : addMember({ variables: { ...transformedData } }));

        // show response toast based on form submission status
        setToast({ open: true, error: addError || updateError });
        cancelAll();
    };

    return (
        <>
            <Modal
                open={open}
                onClose={() => setOpen(false)}
                closeAfterTransition
                BackdropProps={{ timeout: 500 }}
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    outline: "none",
                }}
            >
                <Fade in={open}>
                    <Box
                        sx={{
                            backgroundColor: "none",
                            borderRadius: theme.borderRadius,
                            outline: "none",
                            width: MODAL_WIDTH,
                        }}
                    >
                        <Card variant="none">
                            <Box p={2}>
                                <Typography variant="h6">Add a new member</Typography>
                            </Box>
                            <Divider />

                            <Box p={2} maxHeight={MODAL_HEIGHT} sx={{ overflowY: "auto" }}>
                                {formProgress === 0 && (
                                    <form id="MailForm" onSubmit={handleSubmit(onSubmitMail)}>
                                        <Box>
                                            <Controller
                                                name="mail"
                                                control={control}
                                                shouldUnregister={true}
                                                render={({
                                                    field: { onChange, value },
                                                    fieldState: { error },
                                                }) => (
                                                    <TextField
                                                        fullWidth
                                                        label="Email*"
                                                        type="email"
                                                        placeholder="firstname.lastname@students.iiit.ac.in"
                                                        variant="standard"
                                                        value={value}
                                                        onChange={onChange}
                                                        error={!!error}
                                                        InputLabelProps={{ shrink: true }}
                                                        helperText={error ? error.message : null}
                                                    />
                                                )}
                                                rules={{ required: "Email can not be empty!" }}
                                            />
                                        </Box>
                                    </form>
                                )}

                                {formProgress === 1 && (
                                    <Fade in>
                                        <form id="UserForm" onSubmit={handleSubmit(onSubmitUser)}>
                                            <Box mb={3}>
                                                <Button variant="outlined" component="label">
                                                    {member?.img ? "Update" : "Add"} Profile Image
                                                    <input
                                                        {...register("img")}
                                                        name="img"
                                                        type="file"
                                                        accept="image/png, image/jpeg, image/jpg"
                                                        hidden
                                                    />
                                                </Button>
                                            </Box>

                                            <Grid container mb={2} spacing={2}>
                                                <Grid item md={6}>
                                                    <Controller
                                                        name="firstName"
                                                        control={control}
                                                        shouldUnregister={true}
                                                        render={({
                                                            field: { onChange, value },
                                                            fieldState: { error },
                                                        }) => (
                                                            <TextField
                                                                fullWidth
                                                                label="First Name*"
                                                                placeholder="Firstname"
                                                                variant="standard"
                                                                value={value}
                                                                onChange={onChange}
                                                                error={!!error}
                                                                InputLabelProps={{ shrink: true }}
                                                                helperText={
                                                                    error ? error.message : null
                                                                }
                                                            />
                                                        )}
                                                        rules={{
                                                            required:
                                                                "First name can not be empty!",
                                                        }}
                                                    />
                                                </Grid>
                                                <Grid item md={6}>
                                                    <Controller
                                                        name="lastName"
                                                        control={control}
                                                        shouldUnregister={true}
                                                        render={({
                                                            field: { onChange, value },
                                                            fieldState: { error },
                                                        }) => (
                                                            <TextField
                                                                fullWidth
                                                                label="Last Name*"
                                                                placeholder="Lastname"
                                                                variant="standard"
                                                                value={value}
                                                                onChange={onChange}
                                                                error={!!error}
                                                                InputLabelProps={{ shrink: true }}
                                                                helperText={
                                                                    error ? error.message : null
                                                                }
                                                            />
                                                        )}
                                                        rules={{
                                                            required: "Last name can not be empty!",
                                                        }}
                                                    />
                                                </Grid>
                                            </Grid>

                                            <Box mb={2}>
                                                <Controller
                                                    name="mail"
                                                    control={control}
                                                    shouldUnregister={true}
                                                    defaultValue={targetMail}
                                                    render={({
                                                        field: { onChange, value },
                                                        fieldState: { error },
                                                    }) => (
                                                        <TextField
                                                            fullWidth
                                                            label="Email*"
                                                            type="email"
                                                            placeholder="firstname.lastname@students.iiit.ac.in"
                                                            variant="standard"
                                                            value={value}
                                                            onChange={onChange}
                                                            error={!!error}
                                                            InputLabelProps={{ shrink: true }}
                                                            helperText={
                                                                error ? error.message : null
                                                            }
                                                        />
                                                    )}
                                                    rules={{
                                                        required: "User email can not be empty!",
                                                    }}
                                                />
                                            </Box>

                                            <Box>
                                                <Controller
                                                    name="batch"
                                                    control={control}
                                                    shouldUnregister={true}
                                                    render={({
                                                        field: { onChange, value },
                                                        fieldState: { error },
                                                    }) => (
                                                        <TextField
                                                            fullWidth
                                                            label="Batch*"
                                                            type="text"
                                                            placeholder="UG2k19"
                                                            variant="standard"
                                                            value={value}
                                                            onChange={onChange}
                                                            error={!!error}
                                                            InputLabelProps={{ shrink: true }}
                                                            helperText={
                                                                error ? error.message : null
                                                            }
                                                        />
                                                    )}
                                                    rules={{
                                                        required: "User's batch can not be empty!",
                                                    }}
                                                />
                                            </Box>
                                        </form>
                                    </Fade>
                                )}

                                {formProgress === 2 && (
                                    <Fade in>
                                        <form
                                            id="MemberForm"
                                            onSubmit={handleSubmit(onSubmitMember)}
                                        >
                                            <Card variant="outlined">
                                                <Box p={2}>
                                                    <Box
                                                        display="flex"
                                                        alignItems="center"
                                                        justifyContent="space-between"
                                                    >
                                                        <Box display="flex" flexDirection="column">
                                                            <Typography variant="h4">
                                                                {`${targetUser?.user?.firstName} ${targetUser?.user?.lastName}`}
                                                            </Typography>
                                                            <Typography
                                                                variant="h6"
                                                                mt={1}
                                                                sx={{
                                                                    color: theme.palette.secondary
                                                                        .dark,
                                                                }}
                                                            >
                                                                {targetUser?.user?.batch}
                                                            </Typography>
                                                            <Typography variant="subtitle2" mt={4}>
                                                                <code>
                                                                    {targetUser?.user?.mail}
                                                                </code>
                                                            </Typography>
                                                        </Box>
                                                        <Box display="flex">
                                                            <Avatar
                                                                variant="rounded"
                                                                sx={{ height: 150, width: 150 }}
                                                                src={targetUser?.user?.img}
                                                            />
                                                        </Box>
                                                    </Box>
                                                </Box>
                                            </Card>

                                            <Box mt={3} mb={2}>
                                                <Controller
                                                    name="role"
                                                    control={control}
                                                    shouldUnregister={true}
                                                    defaultValue={member?.role || ""}
                                                    render={({
                                                        field: { onChange, value },
                                                        fieldState: { error },
                                                    }) => (
                                                        <TextField
                                                            fullWidth
                                                            label="Role*"
                                                            type="text"
                                                            placeholder="Coordinator"
                                                            variant="standard"
                                                            value={value}
                                                            onChange={onChange}
                                                            error={!!error}
                                                            InputLabelProps={{ shrink: true }}
                                                            helperText={
                                                                error ? error.message : null
                                                            }
                                                        />
                                                    )}
                                                    rules={{
                                                        required: "Member role can not be empty!",
                                                    }}
                                                />
                                            </Box>
                                            <Box>
                                                <Controller
                                                    name="year"
                                                    control={control}
                                                    shouldUnregister={true}
                                                    defaultValue={
                                                        member?.year || new Date().getFullYear()
                                                    }
                                                    render={({
                                                        field: { onChange, value },
                                                        fieldState: { error },
                                                    }) => (
                                                        <Box display="flex" alignItems="center">
                                                            <TextField
                                                                type="number"
                                                                min="2000"
                                                                max="3000"
                                                                label="Year*"
                                                                placeholder="2022"
                                                                variant="standard"
                                                                value={value}
                                                                onChange={onChange}
                                                                error={!!error}
                                                                InputLabelProps={{ shrink: true }}
                                                                helperText={
                                                                    error ? error.message : null
                                                                }
                                                            />
                                                            <Box mx={1} mt={2}>
                                                                {value &&
                                                                    ` — ${parseInt(value) + 1}`}
                                                            </Box>
                                                        </Box>
                                                    )}
                                                    rules={{ required: "Year can not be empty!" }}
                                                />
                                            </Box>
                                        </form>
                                    </Fade>
                                )}
                            </Box>

                            <Divider />
                            <Box p={2} display="flex" justifyContent="space-between">
                                <Button
                                    key="cancel"
                                    variant="outlined"
                                    onClick={() => setOpen(false)}
                                >
                                    Close
                                </Button>
                                <CardActions sx={{ p: 0, m: 0 }}>
                                    {formProgress === 0 ? (
                                        <Button
                                            disableElevation
                                            key="next"
                                            variant="contained"
                                            color="info"
                                            type="submit"
                                            form="MailForm"
                                        >
                                            Next
                                        </Button>
                                    ) : formProgress === 1 ? (
                                        <Button
                                            disableElevation
                                            key="create"
                                            variant="contained"
                                            color="info"
                                            type="submit"
                                            form="UserForm"
                                        >
                                            Create
                                        </Button>
                                    ) : formProgress === 2 ? (
                                        <Button
                                            disableElevation
                                            key="create"
                                            variant="contained"
                                            color="info"
                                            type="submit"
                                            form="MemberForm"
                                        >
                                            Create
                                        </Button>
                                    ) : null}
                                </CardActions>
                            </Box>
                        </Card>
                    </Box>
                </Fade>
            </Modal>

            <ResponseToast
                controller={[toast, setToast]}
                successText={`Member ${member ? "edited" : "added"} successfully.`}
            />
        </>
    );
};

export default MemberFormModal;
