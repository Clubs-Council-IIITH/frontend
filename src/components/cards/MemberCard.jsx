import { useState } from "react";

import { Box, Typography, Card, CardContent, Avatar, Tooltip, IconButton } from "@mui/material";
import {
    EditOutlined as EditIcon,
    DeleteOutlined as DeleteIcon,
    Done as ApprovedIcon,
    Autorenew as PendingIcon,
} from "@mui/icons-material";

const MemberCard = ({ id, user, role, approved, triggerEdit, triggerDelete, manage = false }) => {
    const [showActions, setShowActions] = useState(false);

    const handleEdit = (e) => {
        e.stopPropagation();
        e.preventDefault();
        triggerEdit(id);
    };

    const handleDelete = (e) => {
        e.stopPropagation();
        e.preventDefault();
        triggerDelete(id);
    };

    return (
        <Box onMouseOver={() => setShowActions(true)} onMouseOut={() => setShowActions(false)}>
            <Card variant="none">
                <CardContent
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Avatar sx={{ width: "180px", height: "180px" }} />

                    <Typography variant="h5" mb={1} mt={2} sx={{ textAlign: "center" }}>
                        {`${user.firstName} ${user.lastName}`}
                    </Typography>

                    <Box display="flex" alignItems="center">
                        <Typography variant="subtitle" mx={1}>
                            {role}
                        </Typography>

                        {/* show approval status in manage mode */}
                        {manage &&
                            (approved ? (
                                <Tooltip title="Approved">
                                    <ApprovedIcon fontSize="small" color="success" />
                                </Tooltip>
                            ) : (
                                <Tooltip title="Pending Approval">
                                    <PendingIcon fontSize="small" color="warning" />
                                </Tooltip>
                            ))}
                    </Box>

                    {manage && (
                        <Box display={showActions ? "flex" : "none"} position="static">
                            <IconButton
                                type="button"
                                color="warning"
                                onClick={handleEdit}
                                onMouseDown={(e) => e.stopPropagation()}
                            >
                                <EditIcon fontSize="small" />
                            </IconButton>
                            <IconButton
                                type="button"
                                color="error"
                                onClick={handleDelete}
                                onMouseDown={(e) => e.stopPropagation()}
                            >
                                <DeleteIcon fontSize="small" />
                            </IconButton>
                        </Box>
                    )}

                    <Box mt={2}>
                        <Typography sx={{ color: "#888888" }}>{user.batch}</Typography>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
};

export default MemberCard;
