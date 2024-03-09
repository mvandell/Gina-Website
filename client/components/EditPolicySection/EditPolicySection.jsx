import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDeletePolicyMutation, usePatchPolicyMutation, useGetPianoPolicyQuery } from "../../redux/api";

const EditPolicySection = () => {
    const {id} = useParams();
    const navigate = useNavigate();

    const [heading, setHeading] = useState(null);
    const [content, setContent] = useState(null);
    const [alert, setAlert] = useState(null);

    const { data, error, isLoading } = useGetPianoPolicyQuery();
    const [patchPolicy, { error: patchError }] = usePatchPolicyMutation(id)
    const [deletePolicy, { error: deleteError }] = useDeletePolicyMutation()

    if (isLoading) {
        return <div></div>
    }
    if (error) {
        return <div>Sorry! There's a problem loading the info.</div>
    }
    const head = data.find((entry) => entry.id === id)
    //PATCH content/heading
    //POST new content
    //DELETE content
    return (
        <div>
            <Card sx={{ m: 5, p: 1, mx: 1 }}>
                {data && 
                    <Typography variant="h4">
                        {head.heading}
                    </Typography>
                }
                {data && data.filter((entry) => entry.headingId === id).map((policy) => (
                    <Typography key={policy.id}>
                        {policy.content}
                    </Typography>
                ))
                }
            </Card>
        </div>
    )
}

export default EditPolicySection;