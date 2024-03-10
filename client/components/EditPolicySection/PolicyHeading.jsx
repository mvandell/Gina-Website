import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";

import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { usePatchPolicyMutation, useGetPianoPolicyQuery } from "../../redux/api";

const PolicyHeading = ({ id }) => {
    const navigate = useNavigate();
    const [heading, setHeading] = useState(null);
    const [alert, setAlert] = useState(null);

    const { data, error, isLoading } = useGetPianoPolicyQuery();
    const [patchPolicy, { error: patchError }] = usePatchPolicyMutation(id);

    if (isLoading) {
        return <div></div>
    }
    if (error) {
        return <div>Sorry! There's a problem loading the info.</div>
    }

    const handlePatchHeading = async (event) => {
        try {
            event.preventDefault();
            const response = await patchPolicy({ instrument: "piano", heading: heading });
        }
        catch (error) {
            console.error(error)
        }
    }

    const head = data.find((entry) => { return entry.id == id })

    return (
        <>
            <Box sx={{ pb: 2 }}>
                <Stack direction="row">
                    <IconButton onClick={() => setAlert(head.id)} sx={{ color: "black", m: 0, p: 0, mr: 1 }}>
                        <EditIcon fontSize="small" />
                    </IconButton>
                    <Stack direction="column">
                        <Stack direction="row">
                            <Typography variant="h4">
                                {head.heading}
                            </Typography>
                            <Button variant="outlined" onClick={() => navigate("/policy/piano")} sx={{ml: 10}}>
                                <Typography sx={{textTransform: "none"}}>
                                    Back
                                </Typography>
                            </Button>
                        </Stack>
                        {alert === head.id &&
                            <form onSubmit={handlePatchHeading}>
                                <TextField
                                    label="Updated heading"
                                    value={heading}
                                    onChange={(event) => setHeading(event.target.value)}
                                    size="small"
                                    sx={{ m: 1, backgroundColor: "white" }}
                                    multiline />
                                <IconButton type="submit" color="success">
                                    <CheckIcon />
                                </IconButton>
                                <IconButton onClick={() => setAlert(null)} color="error">
                                    <CloseIcon />
                                </IconButton>
                            </form>
                        }
                    </Stack>
                </Stack>
            </Box>
        </>
    )
}

export default PolicyHeading;