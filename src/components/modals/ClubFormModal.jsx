import { Button, Box } from "@material-ui/core";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "./base";

const ClubFormModal = ({ club, controller: [open, setOpen] }) => {
    return (
        <Modal controller={[open, setOpen]}>
            <ModalHeader controller={[open, setOpen]} title="Add a new club" />
            <ModalBody full></ModalBody>
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
                    <Button variant="outlined" color="primary" size="large">
                        <Box px={2}>Save</Box>
                    </Button>
                </Box>
            </ModalFooter>
        </Modal>
    );
};

export default ClubFormModal;
