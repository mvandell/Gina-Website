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

import Contact from "./Contact";
import profilePic from "../../images/Profile/ProfilePiano.jpg"
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';


//TODO: a few paragraphs about lessons
//TODO: more like the blurb on the homepage
//TODO: card background image
//ProfileSide?
//more gray tones

const Lessons = () => {
    const token = useSelector((state) => state.auth.token);
    const { id } = useParams();
    const navigate = useNavigate();

    const { data, error, isLoading } = useGetPolicyQuery();
    const [deletePolicy, { error: deleteError }] = useDeletePolicyMutation(id);

    if (isLoading) {
        return <div></div>
    }
    if (error) {
        return <div>Sorry! There's a problem loading the info.</div>
    }
    const black1 = "#0A0A0A"
    const black2 = "#141414" //TODO: get mom's input on shades of black
    console.log(data)
    return (
        <div>
            <Grid container>
                <Grid item xs={1}>
                </Grid>
                <Grid item xs={5}>
                    <Card sx={{ m: 5, p: 1, mx: 1, pb: 2, backgroundColor: black1, color: "white" }}>
                        <Typography variant="h3" sx={{ m: 2 }}>
                            Lessons
                        </Typography>
                        {data && data.map((policy) => (
                                <Box key={policy.id} sx={{ mx: 1, mt: 3, mb: 0 }}>
                                    <Stack direction="row">
                                        {token &&
                                            <Box>
                                                <IconButton onClick={() => navigate(`/policy/${policy.id}`)} color="secondary" sx={{ pb: 0, pt: 0.5 }}>
                                                    <EditNoteIcon />
                                                </IconButton>
                                                <IconButton
                                                    onClick={() => {
                                                        if (confirm("Are you sure you want to delete this section?") === true) {
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
                                    <Typography >
                                        {policy.content}
                                    </Typography>
                                </Box>
                        ))}
                    </Card>
                    <Contact color={black2}/>
                </Grid>
                <Grid item xs={5}>
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

export default Lessons;