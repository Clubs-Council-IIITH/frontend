import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useTheme } from "@mui/styles";

import { useMutation } from "@apollo/client";
import { CREATE_CLUB, UPDATE_CLUB } from "mutations/clubs";
import { ADMIN_GET_ALL_CLUBS, GET_ALL_CLUBS, GET_CLUB_BY_ID } from "queries/clubs";
import ClubCategories from "constants/ClubCategories";

import {
    Divider,
    Typography,
    Box,
    Card,
    CardActions,
    TextField,
    MenuItem,
    Button,
    Fade,
    Modal,
    FormControl,
    InputLabel,
} from "@mui/material";

import ResponseToast from "components/ResponseToast";
import { PrimaryActionButton, SecondaryActionButton } from "components/buttons";
import RichTextEditor from "components/RichTextEditor";
// import { FormHelperText } from '@mui/material';
import {FormControlLabel} from "@mui/material";

const MODAL_HEIGHT = "60vh";
const MODAL_WIDTH = "50vw";

const ClubFormModal = ({ club = null, controller: [open, setOpen] }) => {
    const theme = useTheme();

    const { control, register, handleSubmit } = useForm();

    const [toast, setToast] = useState({ open: false });

    const [createClub, { error: createError }] = useMutation(CREATE_CLUB, {
        refetchQueries: [GET_ALL_CLUBS, ADMIN_GET_ALL_CLUBS],
        awaitRefetchQueries: true,
    });

    const [updateClub, { error: updateError }] = useMutation(UPDATE_CLUB, {
        refetchQueries: [{ query: GET_CLUB_BY_ID, variables: { id: club?.id } }],
        awaitRefetchQueries: true,
    });

    const onSubmit = async (data) => {
        const transformedData = {
            ...data,
            img: data.img[0],
        };

        // update or create new instance of data
        await (club
            ? updateClub({ variables: { ...transformedData, id: club.id } })
            : createClub({ variables: { ...transformedData } }));

        // show response toast based on form submission status
        setToast({ open: true, error: createError || updateError });
        setOpen(false);
    };

    const [editorValue, setEditorValue] = useState(
        '[{"type":"paragraph","children":[{"text":"No description provided."}]}]'
    );

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
                                <Typography variant="h6">Add a new club</Typography>
                            </Box>
                            <Divider />

                            <Box
                                p={2}
                                height={MODAL_HEIGHT}
                                maxHeight={MODAL_HEIGHT}
                                sx={{ overflowY: "auto" }}
                            >
                                <Box
                                    component="form"
                                    id="ClubForm"
                                    onSubmit={handleSubmit(onSubmit)}
                                >
                                    <Box mb={2}>
                                        <Button variant="outlined" component="label">
                                            {club?.img ? "Update" : "Add"} Cover Image
                                            <input
                                                {...register("img")}
                                                name="img"
                                                type="file"
                                                accept="image/png, image/jpeg, image/jpg"
                                                hidden
                                            />
                                        </Button>
                                    </Box>
                                    <Box mb={2}>
                                        <Controller
                                            name="name"
                                            control={control}
                                            shouldUnregister={true}
                                            defaultValue={club?.name || ""}
                                            render={({
                                                field: { onChange, value },
                                                fieldState: { error },
                                            }) => (
                                                <TextField
                                                    fullWidth
                                                    label="Name*"
                                                    placeholder="My Club"
                                                    variant="standard"
                                                    value={value}
                                                    onChange={onChange}
                                                    error={!!error}
                                                    InputLabelProps={{ shrink: true }}
                                                    helperText={error ? error.message : null}
                                                />
                                            )}
                                            rules={{ required: "Club name can not be empty!" }}
                                        />
                                    </Box>
                                    <Box mb={2}>
                                        <Controller
                                            name="mail"
                                            control={control}
                                            shouldUnregister={true}
                                            defaultValue={club?.mail || ""}
                                            render={({
                                                field: { onChange, value },
                                                fieldState: { error },
                                            }) => (
                                                <TextField
                                                    fullWidth
                                                    label="Email*"
                                                    type="email"
                                                    placeholder="club.name@students.iiit.ac.in"
                                                    variant="standard"
                                                    value={value}
                                                    onChange={onChange}
                                                    error={!!error}
                                                    InputLabelProps={{ shrink: true }}
                                                    helperText={error ? error.message : null}
                                                />
                                            )}
                                            rules={{ required: "Club email can not be empty!" }}
                                        />
                                    </Box>
                                    <Box mb={2}>
                                        <Controller
                                            name="category"
                                            control={control}
                                            shouldUnregister={true}
                                            defaultValue={
                                                club?.category?.toLowerCase() ||
                                                Object.keys(ClubCategories)[0]
                                            }
                                            render={({
                                                field: { onChange, value },
                                                fieldState: { error },
                                            }) => (
                                                <TextField
                                                    select
                                                    fullWidth
                                                    label="Category*"
                                                    variant="standard"
                                                    value={value}
                                                    onChange={onChange}
                                                    error={!!error}
                                                    InputLabelProps={{ shrink: true }}
                                                    helperText={error ? error.message : null}
                                                >
                                                    {Object.entries(ClubCategories).map(
                                                        ([value, label]) => (
                                                            <MenuItem key={value} value={value}>
                                                                {label}
                                                            </MenuItem>
                                                        )
                                                    )}
                                                </TextField>
                                            )}
                                            rules={{ required: "Club category can not be empty!" }}
                                        />
                                    </Box>
                                    <Box mb={2}>
                                        <Controller
                                            name="website"
                                            control={control}
                                            shouldUnregister={true}
                                            defaultValue={club?.website || ""}
                                            render={({
                                                field: { onChange, value },
                                                fieldState: { error },
                                            }) => (
                                                <TextField
                                                    fullWidth
                                                    label="Website"
                                                    placeholder="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                                                    variant="standard"
                                                    value={value}
                                                    onChange={onChange}
                                                    error={!!error}
                                                    InputLabelProps={{ shrink: true }}
                                                    helperText={error ? error.message : null}
                                                />
                                            )}
                                        />
                                    </Box>
                                    <Box mb={2}>
                                        <Controller
                                            name="tagline"
                                            control={control}
                                            shouldUnregister={true}
                                            defaultValue={club?.tagline || ""}
                                            render={({
                                                field: { onChange, value },
                                                fieldState: { error },
                                            }) => (
                                                <TextField
                                                    fullWidth
                                                    label="Tagline"
                                                    placeholder="This is the greatest club of all time"
                                                    variant="standard"
                                                    value={value}
                                                    onChange={onChange}
                                                    error={!!error}
                                                    InputLabelProps={{ shrink: true }}
                                                    helperText={error ? error.message : null}
                                                />
                                            )}
                                        />
                                    </Box>
                                    
                                    <Box>
                                        <InputLabel htmlFor="my-input" shrink="true" >Description</InputLabel>
                                        <RichTextEditor editing={true} editorState={[editorValue, setEditorValue]} />
                                    </Box>
                                </Box>
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
                                    <Button
                                        disableElevation
                                        key="save"
                                        variant="contained"
                                        color="info"
                                        type="submit"
                                        form="ClubForm"
                                    >
                                        Save
                                    </Button>
                                </CardActions>
                            </Box>
                        </Card>
                    </Box>
                </Fade>
            </Modal>

            <ResponseToast
                controller={[toast, setToast]}
                successText={`Club ${club ? "edited" : "created"} successfully.`}
            />
        </>
    );
};

export default ClubFormModal;
