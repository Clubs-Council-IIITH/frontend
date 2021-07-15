import { useForm, Controller } from "react-hook-form";

import { Button, Box, TextField } from "@material-ui/core";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "components/modals";

const ClubFormModal = ({ club = null, controller: [open, setOpen] }) => {
    const { control, handleSubmit } = useForm();

    const onSubmit = (data) => {
        console.log(data);
    };

    return (
        <Modal controller={[open, setOpen]}>
            <ModalHeader controller={[open, setOpen]} title="Add a new club" />

            <ModalBody half>
                <form id="ClubForm" onSubmit={handleSubmit(onSubmit)}>
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
                                    fullWidth
                                    label="Description"
                                    placeholder="Some very long description about the club."
                                    variant="outlined"
                                    multiline
                                    fullWidth
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
                    <Button
                        variant="text"
                        color="primary"
                        size="large"
                        onClick={() => setOpen(false)}
                    >
                        <Box px={2}>Cancel</Box>
                    </Button>
                </Box>
                <Box>
                    <Button
                        type="submit"
                        form="ClubForm"
                        variant="outlined"
                        color="primary"
                        size="large"
                    >
                        <Box px={2}>Save</Box>
                    </Button>
                </Box>
            </ModalFooter>
        </Modal>
    );
};

export default ClubFormModal;
