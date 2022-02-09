import { useState } from "react";
import { useForm, Controller } from "react-hook-form";

import { useMutation } from "@apollo/client";
import { CREATE_CLUB, UPDATE_CLUB } from "mutations/clubs";
import { ADMIN_GET_ALL_CLUBS, GET_ALL_CLUBS, GET_CLUB_BY_ID } from "queries/clubs";
import ClubCategories from "constants/ClubCategories";

import { Box, TextField, MenuItem, Button } from "@material-ui/core";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "components/modals";

import ResponseToast from "components/ResponseToast";
import { PrimaryActionButton, SecondaryActionButton } from "components/buttons";

const ClubFormModal = ({ club = null, controller: [open, setOpen] }) => {
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

    return (
        <>
            <Modal controller={[open, setOpen]}>
                <ModalHeader controller={[open, setOpen]} title="Add a new club" />

                <ModalBody mini>
                    <form id="ClubForm" onSubmit={handleSubmit(onSubmit)}>
                        <Box mb={3}>
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
                                render={({ field: { onChange, value }, fieldState: { error } }) => (
                                    <TextField
                                        fullWidth
                                        label="Name*"
                                        placeholder="My Club"
                                        variant="outlined"
                                        value={value}
                                        onChange={onChange}
                                        error={!!error}
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
                                render={({ field: { onChange, value }, fieldState: { error } }) => (
                                    <TextField
                                        fullWidth
                                        label="Email*"
                                        type="email"
                                        placeholder="club.name@students.iiit.ac.in"
                                        variant="outlined"
                                        value={value}
                                        onChange={onChange}
                                        error={!!error}
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
                                    club?.category?.toLowerCase() || Object.keys(ClubCategories)[0]
                                }
                                render={({ field: { onChange, value }, fieldState: { error } }) => (
                                    <TextField
                                        select
                                        fullWidth
                                        label="Category*"
                                        variant="outlined"
                                        value={value}
                                        onChange={onChange}
                                        error={!!error}
                                        helperText={error ? error.message : null}
                                    >
                                        {Object.entries(ClubCategories).map(([value, label]) => (
                                            <MenuItem key={value} value={value}>
                                                {label}
                                            </MenuItem>
                                        ))}
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
                                render={({ field: { onChange, value }, fieldState: { error } }) => (
                                    <TextField
                                        fullWidth
                                        label="Website"
                                        placeholder="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                                        variant="outlined"
                                        value={value}
                                        onChange={onChange}
                                        error={!!error}
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
                                render={({ field: { onChange, value }, fieldState: { error } }) => (
                                    <TextField
                                        fullWidth
                                        label="Tagline"
                                        placeholder="This is the greatest club of all time"
                                        variant="outlined"
                                        value={value}
                                        onChange={onChange}
                                        error={!!error}
                                        helperText={error ? error.message : null}
                                    />
                                )}
                            />
                        </Box>
                        <Box>
                            <Controller
                                name="description"
                                control={control}
                                shouldUnregister={true}
                                defaultValue={club?.description || ""}
                                render={({ field: { onChange, value }, fieldState: { error } }) => (
                                    <TextField
                                        multiline
                                        fullWidth
                                        label="Description"
                                        placeholder="Some very long description about the club."
                                        variant="outlined"
                                        rows={6}
                                        value={value || null}
                                        onChange={onChange}
                                        error={!!error}
                                        helperText={error ? error.message : null}
                                    />
                                )}
                            />
                        </Box>
                    </form>
                </ModalBody>

                <ModalFooter rightAligned>
                    <Box mr={1}>
                        <SecondaryActionButton size="large" onClick={() => setOpen(false)}>
                            Cancel
                        </SecondaryActionButton>
                    </Box>
                    <Box>
                        <PrimaryActionButton
                            type="submit"
                            form="ClubForm"
                            variant="outlined"
                            size="large"
                        >
                            Save
                        </PrimaryActionButton>
                    </Box>
                </ModalFooter>
            </Modal>

            <ResponseToast
                controller={[toast, setToast]}
                successText={`Club ${club ? "edited" : "created"} successfully.`}
            />
        </>
    );
};

export default ClubFormModal;
