import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";

import { useNavigate, useParams } from "react-router-dom";

import { useGetBioQuery, usePatchBioMutation } from "../../redux/api";
import { useState } from "react";

const EditBio = () => {
    const { id } = useParams();
    const navigate = useNavigate();
// TODO: make backend route for GET single bio paragraph
    const { data, isLoading, error: bioError } = useGetBioQuery();
    const [patchBio, { error }] = usePatchBioMutation();
    const [paragraph, setParagraph] = useState("");

    if (isLoading) {
        return <div> </div>
    }
    if (bioError) {
        console.error(userError)
    }
    console.log("bio", data)

    const currentParagraph = data && data.find((paragraph) => { return paragraph.id === id });
    console.log("currentParagraph", currentParagraph)

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
        setParagraph(currentParagraph.paragraph);
    }

    return data && (
        <div>
            <Grid container>
                <Grid item xs={3}>
                </Grid>
                <Grid item xs={6}>
                    <Card sx={{ p: 3, maxWidth: 600, mt: 5 }}>
                        <form onSubmit={handleSubmit}>
                            <Button onClick={populateForm} variant="contained" sx={{ textTransform: "none", backgroundColor: "#088395", color: "white", p: 1, mx: 20, my: 1 }}>
                                Populate the form
                            </Button>
                            <TextField
                                label="Update Bio"
                                value={paragraph}
                                onChange={(event) => setParagraph(event.target.value)}
                                size="small"
                                variant="filled"
                                fullWidth
                                sx={{ m: 1, backgroundColor: "white" }}
                            />
                            <Typography textAlign="center">
                                <Button type="submit" sx={{ textTransform: "none", backgroundColor: "#8DAF83", color: "black", my: 2, p: 1, fontWeight: "bold" }}>
                                    Save Changes
                                </Button>
                            </Typography>
                            <Typography textAlign="center">
                                <Button
                                    onClick={() => navigate("/account")}
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