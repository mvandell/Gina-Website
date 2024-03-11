import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import CheckIcon from '@mui/icons-material/Check';

import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { usePostPolicyMutation } from "../../redux/api";

const NewPolicyHeading = ({ id }) => {
    const navigate = useNavigate();
    const [postPolicy, { error, isLoading }] = usePostPolicyMutation();

    const [heading, setHeading] = useState("");

    if (isLoading) {
        return <div></div>
    }
    if (error) {
        return <div>Sorry! There's a problem submitting the info.</div>
    }

    const handlePostHeading = async (event) => {
        try {
            event.preventDefault();
            const response = await postPolicy({ instrument: "piano", heading: heading });
            setHeading("");
            navigate("/policy/piano")
        }
        catch (error) {
            console.error(error)
        }
    }

    return (
        <form onSubmit={handlePostHeading}>
            <Typography variant="h5">
                New Section
            </Typography>
            <TextField
                label="New heading"
                value={heading}
                onChange={(event) => setHeading(event.target.value)}
                size="small"
                sx={{ m: 1, backgroundColor: "white" }}
                multiline />
            <IconButton type="submit" color="success">
                <CheckIcon />
            </IconButton>
        </form>
    )
}

export default NewPolicyHeading;