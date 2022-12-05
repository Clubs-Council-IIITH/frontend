import { useContext, useState } from "react";
import { useForm, Controller } from "react-hook-form";

import { useMutation, useQuery } from "@apollo/client";
import { ADMIN_GET_CLUB_EVENTS, GET_CLUB_EVENTS, GET_EVENT_BY_ID } from "queries/events";
import { ADMIN_CC_PENDING_EVENTS, ADMIN_APPROVED_EVENTS, ADMIN_INCOMPLETE_EVENTS } from "queries/events";
import { APPROVECC_EVENT } from "mutations/events";

import { CheckboxesStringtoDict } from "utils/FormUtil";

import {
    Skeleton,
    Chip,
    Box,
    Grid,
    Button,
    Typography,
    TextField,
    FormControl,
    FormLabel,
    FormGroup,
    FormControlLabel,
    Checkbox,
} from "@mui/material";

const ApproveCC = ({ activeEventId, eventLoading, editing, setEditing, currentRoom, approving, setApproving, setOpen }) => {
    const { control, handleSubmit } = useForm();

    const approveccSelect = [
        { value: "slo", label: "SLO" },
        { value: "slc", label: "SLC" },
        { value: "none", label: "Publish" },
    ];

    const [checked, setChecked] = useState(CheckboxesStringtoDict(
        approveccSelect.map((o) => o.value).join(",")
    ));

    const checkCheck = (value, field) => {
        if (value === "none" && checked["none"] === false) {
            var Map = {};

            for (var i in checked) {
                field[i] = false;
                Map[i] = false;
            }

            field["none"] = true;
            Map["none"] = true;

            setChecked(Map);
        }
        else if (value === "none") {
            var Map = {};

            for (var i in checked) {
                field[i] = true;
                Map[i] = true;
            }

            field["none"] = false;
            Map["none"] = false;
            setChecked(Map);
        }
        else {
            var Map = {};
            let count = 0;

            for (var i in checked) {
                if (i === "none")
                    Map[i] = false;
                else if (i === value) {
                    Map[i] = !checked[value];
                    count = count + Map[i];
                }
                else {
                    Map[i] = checked[i];
                    count = count + Map[i];
                }
            }

            if (!count) {
                field["none"] = true;
                Map["none"] = true;
            }

            setChecked(Map);
            field["none"] = false;
        }
    };

    const [approvecc] = useMutation(APPROVECC_EVENT, {
        refetchQueries: [GET_EVENT_BY_ID, GET_CLUB_EVENTS, ADMIN_GET_CLUB_EVENTS, ADMIN_APPROVED_EVENTS, ADMIN_CC_PENDING_EVENTS, ADMIN_INCOMPLETE_EVENTS],
        awaitRefetchQueries: true,
    });

    const onSubmit = async (data) => {
        const transformedData = {
            ...data,
            id: activeEventId,
            roles: Object.entries(checked)
                .filter(([_, value]) => value)
                .map(([key, _]) => key)
                .join(","),
        };

        // add poc
        await approvecc({ variables: { ...transformedData } });

        // stop editing
        setApproving(false);
        setEditing(false);
        setOpen(false);
    };

    return (
        <form
            id="ActiveEventForm"
            onSubmit={handleSubmit(onSubmit)}
            onKeyPress={(e) => {
                e.key === "Enter" && e.preventDefault();
            }}
        >
            <Grid container p={3}>
                <Grid item xs={12}>
                    <FormLabel component="legend">Approve - Clubs Council</FormLabel>
                </Grid>

                {approving ? (
                    <Grid item container mt={0} spacing={3}>
                        <Grid item xs={12}>
                            <FormControl component="fieldset" sx={{ ml: 1 }}>
                                <FormGroup>
                                    <Box>
                                        <Controller
                                            name="roles"
                                            control={control}
                                            shouldUnregister={true}
                                            defaultValue={checked}
                                            render={({ field }) =>
                                                approveccSelect.map((roles, idx) => (
                                                    <FormControlLabel
                                                        key={idx}
                                                        control={
                                                            <Checkbox
                                                                key={idx}
                                                                color="primary"
                                                                checked={
                                                                    checked[roles.value]
                                                                }
                                                                onChange={(e) => {
                                                                    field.onChange({
                                                                        ...field.value,
                                                                        [roles.value]:
                                                                            e.target.checked,
                                                                    });
                                                                    checkCheck(roles.value, field);
                                                                }
                                                                }
                                                            />
                                                        }
                                                        label={roles.label}
                                                        {...field}
                                                    />
                                                ))
                                            }
                                        />
                                    </Box>
                                </FormGroup>
                            </FormControl>
                        </Grid>
                    </Grid>
                ) : null}

            </Grid>
        </form >
    );
};

export default ApproveCC;
