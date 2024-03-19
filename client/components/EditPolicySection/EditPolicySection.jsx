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

import { useParams } from "react-router-dom";
import { useState } from "react";
import { useDeletePolicyMutation, usePatchPolicyContentMutation, useGetPolicyQuery } from "../../redux/api";
import PolicyHeading from "./PolicyHeading";
import NewPolicyContent from "./NewPolicyContent";
import naturePic from "../../images/Nature/flowers.jpg"

const EditPolicySection = () => {
    const { id } = useParams();

    const [content, setContent] = useState(null);
    const [alert, setAlert] = useState(null);

    const { data, error, isLoading } = useGetPolicyQuery();
    const [patchPolicyContent, { error: patchContentError }] = usePatchPolicyContentMutation(id);
    const [deletePolicy, { error: deleteError }] = useDeletePolicyMutation();

    if (isLoading) {
        return <div></div>
    }
    if (error) {
        return <div>Sorry! There's a problem loading the info.</div>
    }

    const handlePatchContent = async (event) => {
        try {
            event.preventDefault();
            const response = await patchPolicyContent({ headingId: id, content: content });
        }
        catch (error) {
            console.error(error)
        }
    }

    const head = data.find((entry) => { return entry.id == id })

    return (
        <div>
            <Grid container>
                <Grid item xs={1}>
                </Grid>
                <Grid item xs={6}>
                    <Card sx={{ m: 5, p: 2, mx: 1, mb: 3, pr: 3 }}>
                        <PolicyHeading id={id} />
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
                        ))}

                    </Card>
                    <Card sx={{ m: 3, p: 2, mx: 1 }}>
                        <NewPolicyContent id={id} />
                    </Card>
                </Grid>
                <Grid item xs={4}>
                    <Card sx={{ p: 3, mx: 5, my: 5, backgroundColor: "white", mr: 3 }}>
                        <img src={naturePic} alt="white flowers" style={{ width: "100%" }} />
                    </Card>
                </Grid>
                <Grid item xs={1}>
                </Grid>
            </Grid>
        </div>
    )
}

export default EditPolicySection;