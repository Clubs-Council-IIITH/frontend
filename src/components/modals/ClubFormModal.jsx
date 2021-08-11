import { useState } from "react";
import { useForm, Controller } from "react-hook-form";

import { CreateClub, UpdateClub } from "services/ClubService";

import { Box, TextField, Button } from "@material-ui/core";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "components/modals";

import ResponseToast from "components/ResponseToast";
import { PrimaryActionButton, SecondaryActionButton } from "components/buttons";

const ClubFormModal = ({ club = null, refetch, controller: [open, setOpen] }) => {
    const { control, register, handleSubmit } = useForm();

    const [toast, setToast] = useState({ open: false });

    const onSubmit = async (data) => {
        const transformedData = {
            ...data,
            img: data.img[0],
        };

        // update or create new instance of data
        const { error } = club ? UpdateClub(club.id, transformedData) : CreateClub(transformedData);
        // const { error } = await (club
        //     ? ClubService.updateClub(club.id, transformedData)
        //     : ClubService.addClub(transformedData));

        // revalidate local data
        refetch();

        // show response toast based on form submission status
        setToast({ open: true, error });
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
                                        label="Name"
                                        placeholder="The Greatest Club of All Time"
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
                                        label="Email"
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
                                        value={value}
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
