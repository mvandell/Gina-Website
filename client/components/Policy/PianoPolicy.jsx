import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";

import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';


import { useGetPianoPolicyQuery, usePatchPolicyMutation } from "../../redux/api";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useParams } from "react-router-dom";
import profilePic from "../../images/Profile/ProfileSisters.jpg"

const PianoPolicy = () => {
    const { id } = useParams();
    const token = useSelector((state) => state.auth.token);

    const [alert, setAlert] = useState(null);
    const [heading, setHeading] = useState(null);
    const [content, setContent] = useState(null);

    const { data, error, isLoading } = useGetPianoPolicyQuery();
    const [patchPolicy, { error: patchError }] = usePatchPolicyMutation(id)

    if (isLoading) {
        return <div></div>
    }
    if (error) {
        return <div>Sorry! There's a problem loading the info.</div>
    }

    const handleSubmit = async (event) => {
        try {
            event.preventDefault();
            const response = await patchPolicy({ instrument: "piano", content: content });
        }
        catch (error) {
            console.error(error)
        }
    }

    console.log(data)
    return (
        <div>
            <Grid container>
                {/* <Stack direction="row"> */}
                <Grid item xs={1}>
                </Grid>
                <Grid item xs={6}>
                    <Card sx={{ m: 5, p: 1, mx: 1 }}>
                        <Typography variant="h3" sx={{ m: 2 }}>
                            Piano Policy
                        </Typography>
                        {data && data.map((policy) => (
                            <Box key={policy.id} sx={{ p: 0.5, m: 1 }}>
                                {policy.heading &&
                                    <Typography variant="h6" sx={{ fontWeight: "bold", borderTop: 2 }}>
                                        {policy.heading}
                                    </Typography>
                                }
                                <Stack direction="row">
                                    {token &&
                                        <IconButton onClick={() => setAlert(policy.id)} sx={{ color: "black", m: 0, p: 0, mr: 1 }}>
                                            <EditIcon fontSize="small" />
                                        </IconButton>
                                    }
                                    <Stack direction="column">
                                        <Typography>
                                            {policy.content}
                                        </Typography>
                                        {alert === policy.id &&
                                            <form onSubmit={handleSubmit}>
                                                <TextField
                                                    label="Updated info"
                                                    value={content}
                                                    onChange={(event) => setContent(event.target.value)}
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
                        ))}
                    </Card>
                </Grid>
                <Grid item xs={4}>
                    <Card sx={{ p: 3, mx: 5, my: 5, backgroundColor: "white", mr: 3 }}>
                        <Typography textAlign="center">
                            <img src={profilePic} alt="Gina sitting at her piano" width="440" />
                        </Typography>
                    </Card>
                </Grid>
                {/* </Stack> */}
                <Grid item xs={1}>
                </Grid>
            </Grid>
        </div>
    )
}

export default PianoPolicy;