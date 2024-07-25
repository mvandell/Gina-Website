import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";

import { useNavigate, useParams } from "react-router-dom";

import { useGetSingleBioQuery, usePatchBioMutation } from "../../redux/api";
import { useState } from "react";

const EditBio = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const { data, isLoading, error: bioError } = useGetSingleBioQuery(id);
    const [patchBio, { error }] = usePatchBioMutation();
    const [paragraph, setParagraph] = useState("");

    if (isLoading) {
        return <div> </div>
    }
    if (bioError) {
        console.error(bioError)
    }
    console.log("bio", data)

    const handleSubmit = async (event) => {
        try {
            event.preventDefault();
            const response = await patchBio({ paragraph });
            navigate("/about");
        }
        catch (error) {
            console.error(error)
        }
    }

    const populateForm = (event) => {
        event.preventDefault();
        setParagraph(data.paragraph);
    }

    return data && (
        <div>
            <Grid container>
                <Grid item xs={3}>
                </Grid>
                <Grid item xs={6}>
                    <Card sx={{ p: 3, maxWidth: 600, mt: 5 }}>
                        <form onSubmit={handleSubmit}>
                            <Typography textAlign="center">
                                <Button onClick={populateForm} variant="contained" sx={{ textTransform: "none", backgroundColor: "#8DAF83", color: "black", mb: 1.5, p: 1, fontWeight: "bold" }}>
                                    Populate the form
                                </Button>
                            </Typography>
                            <TextField
                                label="Update Bio"
                                value={paragraph}
                                onChange={(event) => setParagraph(event.target.value)}
                                size="small"
                                variant="filled"
                                fullWidth
                                multiline
                                minRows={3}
                                sx={{ m: 1 }}
                            />
                            <Typography textAlign="center">
                                <Button type="submit" sx={{ textTransform: "none", backgroundColor: "#8DAF83", color: "black", my: 2, p: 1, fontWeight: "bold" }}>
                                    Save Changes
                                </Button>
                            </Typography>
                            <Typography textAlign="center">
                                <Button
                                    onClick={() => navigate("/about")}
                                    sx={{ textTransform: "none", backgroundColor: "#A9C6EF", color: "black", p: 1, fontWeight: "bold" }}>
                                    Cancel
                                </Button>
                            </Typography>
                        </form>
                    </Card>
                </Grid>
                <Grid item xs={1}>
                </Grid>
            </Grid>
        </div>
    )
}

export default EditBio;