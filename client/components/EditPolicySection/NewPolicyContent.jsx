import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import CheckIcon from '@mui/icons-material/Check';

import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { usePostPolicyContentMutation } from "../../redux/api";

const NewPolicyContent = ({ id }) => {
    const navigate = useNavigate();
    const [postPolicy, { error, isLoading }] = usePostPolicyContentMutation();

    const [newContent, setNewContent] = useState("");

    if (isLoading) {
        return <div></div>
    }
    if (error) {
        return <div>Sorry! There's a problem submitting the info.</div>
    }

    const handlePostContent = async (event) => {
        try {
            event.preventDefault();
            const response = await postPolicy({ headingId: parseInt(id), content: newContent });
            setNewContent("");
            navigate(`/policy/${id}`)
        }
        catch (error) {
            console.error(error)
        }
    }

    return (
        <form onSubmit={handlePostContent}>
            <Typography variant="h5">
                New Entry
            </Typography>
            <TextField
                label="New content"
                value={newContent}
                onChange={(event) => setNewContent(event.target.value)}
                size="small"
                sx={{ m: 1 }}
                multiline />
            <IconButton type="submit" color="success">
                <CheckIcon />
            </IconButton>
        </form>
    )
}

export default NewPolicyContent;