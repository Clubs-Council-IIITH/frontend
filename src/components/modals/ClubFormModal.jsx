import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useTheme } from "@mui/styles";

import { useMutation, useQuery } from "@apollo/client";
import { ADMIN_CREATE_CLUB, ADMIN_UPDATE_CLUB } from "mutations/clubs";
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
    InputLabel,
} from "@mui/material";

import ResponseToast from "components/ResponseToast";
import RichTextEditor from "components/RichTextEditor";

const MODAL_HEIGHT = "60vh";
const MODAL_WIDTH = "50vw";

const ClubFormModal = ({ clubId, controller: [open, setOpen] }) => {
    const theme = useTheme();

    const { control, register, handleSubmit } = useForm();

    const [toast, setToast] = useState({ open: false });

    // track input in state variable
    const [editorValue, setEditorValue] = useState(null);

    // fetch club
    const { data: clubData, loading: clubLoading } = useQuery(GET_CLUB_BY_ID, {
        variables: { id: clubId },
        onCompleted: (data) => {
            if (data?.club?.description) {
                setEditorValue(JSON.parse(data?.club?.description));
            } else {
                setEditorValue([{ type: "paragraph", children: [{ text: "" }] }]);
            }
        },
    });

    const [createClub, { error: createError }] = useMutation(ADMIN_CREATE_CLUB, {
        refetchQueries: [GET_ALL_CLUBS, ADMIN_GET_ALL_CLUBS],
        awaitRefetchQueries: true,
    });

    const [updateClub, { error: updateError }] = useMutation(ADMIN_UPDATE_CLUB, {
        refetchQueries: [{ query: GET_CLUB_BY_ID, variables: { id: clubId } }],
        awaitRefetchQueries: true,
    });

    const onSubmit = async (data) => {
        const transformedData = {
            ...data,
            description: JSON.stringify(editorValue),
            img: data.img[0],
        };

        // update or create new instance of data
        await (clubId
            ? updateClub({ variables: { ...transformedData, id: clubId } })
            : createClub({ variables: { ...transformedData } }));

        // show response toast based on form submission status
        setToast({ open: true, error: createError || updateError });
        setOpen(false);
    };

    return clubLoading ? null : (
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
                                            {clubData?.club?.img ? "Update" : "Add"} Cover Image
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
                                            defaultValue={clubData?.club?.name || ""}
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
                                            defaultValue={clubData?.club?.mail || ""}
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
                                                clubData?.club?.category?.toLowerCase() ||
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
                                            name="tagline"
                                            control={control}
                                            shouldUnregister={true}
                                            defaultValue={clubData?.club?.tagline || ""}
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
                                    <Box mb={2}>
                                        <Controller
                                            name="website"
                                            control={control}
                                            shouldUnregister={true}
                                            defaultValue={clubData?.club?.website || ""}
                                            render={({
                                                field: { onChange, value },
                                                fieldState: { error },
                                            }) => (
                                                <TextField
                                                    fullWidth
                                                    label="Website"
                                                    placeholder="https://club.clubs.iiit.ac.in"
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
                                            name="instagram"
                                            control={control}
                                            shouldUnregister={true}
                                            defaultValue={clubData?.club?.instagram || ""}
                                            render={({
                                                field: { onChange, value },
                                                fieldState: { error },
                                            }) => (
                                                <TextField
                                                    fullWidth
                                                    label="Instagram"
                                                    placeholder="https://instagram.com/username"
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
                                            name="facebook"
                                            control={control}
                                            shouldUnregister={true}
                                            defaultValue={clubData?.club?.facebook || ""}
                                            render={({
                                                field: { onChange, value },
                                                fieldState: { error },
                                            }) => (
                                                <TextField
                                                    fullWidth
                                                    label="Facebook"
                                                    placeholder="https://facebook.com"
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
                                            name="youtube"
                                            control={control}
                                            shouldUnregister={true}
                                            defaultValue={clubData?.club?.youtube || ""}
                                            render={({
                                                field: { onChange, value },
                                                fieldState: { error },
                                            }) => (
                                                <TextField
                                                    fullWidth
                                                    label="Youtube"
                                                    placeholder="https://youtube.com/username"
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
                                            name="twitter"
                                            control={control}
                                            shouldUnregister={true}
                                            defaultValue={clubData?.club?.twitter || ""}
                                            render={({
                                                field: { onChange, value },
                                                fieldState: { error },
                                            }) => (
                                                <TextField
                                                    fullWidth
                                                    label="Twitter"
                                                    placeholder="https://twitter.com"
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
                                            name="linkedin"
                                            control={control}
                                            shouldUnregister={true}
                                            defaultValue={clubData?.club?.linkedin || ""}
                                            render={({
                                                field: { onChange, value },
                                                fieldState: { error },
                                            }) => (
                                                <TextField
                                                    fullWidth
                                                    label="LinkedIn"
                                                    placeholder="https://linkedin.com/username"
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
                                            name="discord"
                                            control={control}
                                            shouldUnregister={true}
                                            defaultValue={clubData?.club?.discord || ""}
                                            render={({
                                                field: { onChange, value },
                                                fieldState: { error },
                                            }) => (
                                                <TextField
                                                    fullWidth
                                                    label="Discord Server"
                                                    placeholder="https://discord.com"
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
                                        <InputLabel htmlFor="my-input" shrink={true}>
                                            Description
                                        </InputLabel>
                                        {editorValue ? (
                                            <RichTextEditor
                                                editing={true}
                                                editorState={[editorValue, setEditorValue]}
                                            />
                                        ) : null}
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
                successText={`Club ${clubData ? "edited" : "created"} successfully.`}
            />
        </>
    );
};

export default ClubFormModal;
