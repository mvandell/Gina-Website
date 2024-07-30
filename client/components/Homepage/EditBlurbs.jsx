import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

import { useNavigate, useParams } from "react-router-dom";

import { useState } from "react";
import { usePatchBlurbMutation, useGetBlurbQuery } from "../../redux/api";

const EditBlurb = () => {
    const navigate = useNavigate();

    const {data, error, isLoading} = useGetBlurbQuery();
    const [patchBlurb] = usePatchBlurbMutation();
    console.log(data)

    const [blurb1, setBlurb1] = useState("");
    const [blurb2, setBlurb2] = useState("");
    const [blurb3, setBlurb3] = useState("");

    if (isLoading) {
        return <div> </div>;
    }
    if (error) {
        return <div>Error:{error.message}</div>;
    }
    const handleSubmit = async (event) => {
        try {
            event.preventDefault();
            const response = await patchBlurb({ blurb1, blurb2, blurb3 });
            navigate("/");
        }
        catch (error) {
            console.error(error)
        }
    }
    const populateForm = (event) => {
        event.preventDefault();
        setBlurb1(data[0].blurb1);
        setBlurb2(data[0].blurb2);
        setBlurb3(data[0].blurb3);
    }

    return (
        <div>
            <Card sx={{ p: 3, m: 5 }}>
            <Typography variant="h4" sx={{ textAlign: "center", p: 1 }}>
                    Update Your Account:
                </Typography>
                <Typography textAlign="center">
                    <Button onClick={populateForm} sx={{backgroundColor: "#8DAF83", color: "black", textTransform: "none", px: 2, py: 1, fontWeight: "bold" }}>
                        Populate Form
                    </Button>
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField 
                        label="Update Blurb1"
                        value={blurb1}
                        onChange={(event) => setBlurb1(event.target.value)}
                        size="small"
                        variant="filled"
                        multiline
                        fullWidth
                        sx={{ m: 1 }}
                    />
                    <TextField 
                        label="Update Blurb2"
                        value={blurb2}
                        onChange={(event) => setBlurb2(event.target.value)}
                        size="small"
                        variant="filled"
                        multiline
                        fullWidth
                        sx={{ m: 1 }}
                    />
                    <TextField 
                        label="Update Blurb3"
                        value={blurb3}
                        onChange={(event) => setBlurb3(event.target.value)}
                        size="small"
                        variant="filled"
                        multiline
                        fullWidth
                        sx={{ m: 1 }}
                    />
                    <Typography textAlign="center">
                            <Button type="submit" sx={{ textTransform: "none", backgroundColor: "#8DAF83", color: "black", my: 2, p: 1, fontWeight: "bold" }}>
                                Save Changes
                            </Button>
                        </Typography>
                        <Typography textAlign="center">
                            <Button
                                onClick={() => navigate("/")}
                                sx={{ textTransform: "none", backgroundColor: "#A9C6EF", color: "black", p: 1, fontWeight: "bold" }}>
                                Cancel
                            </Button>
                        </Typography>
                </form>
            </Card>
        </div>
    )
}

export default EditBlurb;