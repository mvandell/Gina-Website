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
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDeletePolicyMutation, usePatchPolicyMutation, usePatchPolicyContentMutation, usePostPolicyContentMutation, useGetPianoPolicyQuery } from "../../redux/api";
import PolicyHeading from "./PolicyHeading";

const EditPolicySection = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [heading, setHeading] = useState(null);
    const [content, setContent] = useState(null);
    const [newHeading, setNewHeading] = useState(null);
    const [newContent, setNewContent] = useState(null);
    const [alert, setAlert] = useState(null);

    const { data, error, isLoading } = useGetPianoPolicyQuery();
    const [patchPolicy, { error: patchError }] = usePatchPolicyMutation(id);
    const [patchPolicyContent, { error: patchContentError }] = usePatchPolicyContentMutation(id);
    const [deletePolicy, { error: deleteError }] = useDeletePolicyMutation();
    const [postPolicy, { error: postError }] = usePostPolicyContentMutation();

    if (isLoading) {
        return <div></div>
    }
    if (error) {
        return <div>Sorry! There's a problem loading the info.</div>
    }

    const handlePatchContent = async (event) => {
        try {
            event.preventDefault();
            const response = await patchPolicyContent({ instrument: "piano", headingId: id, content: content });
        }
        catch (error) {
            console.error(error)
        }
    }

    const head = data.find((entry) => { return entry.id == id })
    
    //PATCH heading
    //PATCH content X
    //POST new content
    //DELETE content X
    return (
        <div>
            <Grid container>
                <Grid item xs={1}>
                </Grid>
                <Grid item xs={6}>
                </Grid>
                <Card sx={{ m: 5, p: 1, mx: 1 }}>
                    <PolicyHeading id={id}/>
                    {data && data.filter((entry) => entry.headingId == id).map((policy) => (
                        <Box key={policy.id} sx={{ py: 1 }}>
                            <Stack direction="row">
                                <IconButton onClick={() => setAlert(policy.id)} sx={{ color: "black", m: 0, p: 0, mr: 1 }}>
                                    <EditIcon fontSize="small" />
                                </IconButton>
                                <IconButton
                                    onClick={() => {
                                        if (confirm("Are you sure you want to delete this policy?") === true) {
                                            deletePolicy(policy.id)
                                        }
                                    }}
                                    color="error"
                                    sx={{ textTransform: "none", m: 0, p: 0, mr: 1 }}>
                                    <DeleteForeverIcon fontSize="small" />
                                </IconButton>
                                <Stack direction="column">
                                    <Typography>
                                        {policy.content}
                                    </Typography>
                                    {alert === policy.id &&
                                        <form onSubmit={handlePatchContent}>
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
                    ))
                    }
                </Card>
            </Grid>
            <Grid item xs={4}>

            </Grid>
        </div>
    )
}

export default EditPolicySection;