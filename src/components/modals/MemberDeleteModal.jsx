import { useState } from "react";

import { useMutation } from "@apollo/client";
import { REMOVE_MEMBER } from "mutations/members";
import { ADMIN_GET_CLUB_MEMBERS, GET_CLUB_MEMBERS } from "queries/members";

import { Box, Typography } from "@mui/material";
import { Modal, ModalBody, ModalFooter } from "components/modals";

import ResponseToast from "components/ResponseToast";
import { DeleteButton, SecondaryActionButton } from "components/buttons";

const MemberDeleteModal = ({ member = null, controller: [open, setOpen] }) => {
    const [toast, setToast] = useState({ open: false });

    const [deleteMember, { error: deleteError }] = useMutation(REMOVE_MEMBER, {
        refetchQueries: [GET_CLUB_MEMBERS, ADMIN_GET_CLUB_MEMBERS],
        awaitRefetchQueries: true,
    });

    const onSubmit = async () => {
        if (member?.id) {
            // remove instance of member
            await deleteMember({ variables: { id: member.id } });

            // show response toast based on form submission status
            setToast({ open: true, error: deleteError });
            setOpen(false);
        }
    };

    return (
        <>
            <Modal controller={[open, setOpen]}>
                <ModalBody mini>
                    <Box p={1}>
                        <Typography variant="h5">
                            Are you sure you want to remove{" "}
                            <Box component="span" fontWeight={500}>
                                {member?.user?.firstName}
                            </Box>{" "}
                            from the club?
                        </Typography>
                    </Box>
                </ModalBody>

                <ModalFooter rightAligned>
                    <Box mr={1}>
                        <SecondaryActionButton size="large" onClick={() => setOpen(false)}>
                            Cancel
                        </SecondaryActionButton>
                    </Box>
                    <Box>
                        <DeleteButton variant="outlined" size="large" onClick={onSubmit}>
                            Yes, remove them
                        </DeleteButton>
                    </Box>
                </ModalFooter>
            </Modal>

            <ResponseToast
                controller={[toast, setToast]}
                successText={`Member removed successfully.`}
            />
        </>
    );
};

export default MemberDeleteModal;
