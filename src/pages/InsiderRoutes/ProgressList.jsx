import { Divider, Box, Typography, List, ListItem } from "@mui/material";
import { useTheme } from "@mui/styles";

import Data from "./progress.json";

const ProgressList = (props) => {
    const theme = useTheme();

    return (
        <>
            <Box justifyContent="left" width="100%" pl={2} pr={2}>
                {
                    Data.filter(({ version }) => version === props.id)
                        .sort((a, b) => {
                            return (
                                new Date(`${b.month}`) - new Date(`${a.month}`)
                            );
                        })
                        .map((data, key) => (
                            <>
                                <Typography variant="h6" color={theme.palette.secondary.dark} gutterBottom mt={4}>
                                    {data.month}
                                </Typography>
                                <List
                                    sx={{
                                        listStyleType: 'disc',
                                        pl: 2,
                                        '& .MuiListItem-root': {
                                            display: 'list-item',
                                        },
                                    }}>
                                    {data.tasks.map((task, key) => (
                                        <ListItem key={key} disablePadding>
                                            <Typography variant="body1" fontWeight={400}>
                                                {task}
                                            </Typography>
                                        </ListItem>
                                    ))}

                                </List>
                            </>
                        ))
                }
            </Box>
        </>
    );
}

export default ProgressList;