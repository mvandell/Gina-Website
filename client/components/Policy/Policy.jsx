import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import EditNoteIcon from '@mui/icons-material/EditNote';

import { useGetPolicyQuery, useDeletePolicyMutation } from "../../redux/api";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import profilePic from "../../images/Profile/ProfileBlack.jpg"
import NewPolicyHeading from "./NewPolicyHeading";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const Policy = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const token = useSelector((state) => state.auth.token);
    const [heading, setHeading] = useState(null);

    const { data, error, isLoading } = useGetPolicyQuery();
    const [deletePolicy, { error: deleteError }] = useDeletePolicyMutation(id);

    if (isLoading) {
        return <div></div>
    }
    if (error) {
        return <div>Sorry! There's a problem loading the info.</div>
    }

    console.log(data)
    return (
        <div>
            <Grid container>
                <Grid item xs={1}>
                </Grid>
                <Grid item xs={6}>
                    <Card sx={{ m: 5, p: 1, mx: 1, pb: 2, backgroundColor: "black", color: "white" }}>
                        <Typography variant="h3" sx={{ m: 2 }}>
                            Policy
                        </Typography>
                        {data && data.map((policy) => (
                            <>
                                {policy.heading !== null && //if there's a heading, display it
                                    <Box key={policy.id} sx={{ borderTop: 2, mx: 1, mt: 3, mb: 0 }}>
                                        <Stack direction="row">
                                            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                                                {policy.heading}
                                            </Typography>
                                            {token &&
                                                <Box>
                                                    <IconButton onClick={() => navigate(`/policy/${policy.id}`)} color="secondary" sx={{ pb: 0, pt: 0.5 }}>
                                                        <EditNoteIcon />
                                                    </IconButton>
                                                    <IconButton
                                                        onClick={() => {
                                                            if (confirm("Are you sure you want to delete this entire policy section?") === true) {
                                                                deletePolicy(policy.id)
                                                            }
                                                        }}
                                                        color="error"
                                                        sx={{ textTransform: "none", m: 0, p: 0, mr: 1 }}>
                                                        <DeleteForeverIcon fontSize="small" />
                                                    </IconButton>
                                                </Box>
                                            }
                                        </Stack>
                                    </Box>
                                }
                                {data.filter(entry => entry.headingId === policy.id).map((paragraph) => (
                                    <Typography key={paragraph.id} sx={{ pt: 1, mx: 1 }}>
                                        {paragraph.content}
                                    </Typography>
                                ))}
                            </>
                        ))}
                    </Card>
                    {token && 
                    <Card sx={{ m: 3, p: 2, mx: 1 }}>
                        <NewPolicyHeading />
                    </Card>
                    }
                </Grid>
                <Grid item xs={4}>
                    <Card sx={{ p: 3, mx: 5, my: 5, backgroundColor: "black", mr: 3 }}>
                        <img src={profilePic} alt="Gina sitting at her piano" style={{ width: "100%" }} />
                    </Card>
                </Grid>
                <Grid item xs={1}>
                </Grid>
            </Grid>
        </div>
    )
}

export default Policy;