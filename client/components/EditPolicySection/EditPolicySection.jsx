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

    const { data, error, isLoading } = useGetPianoPolicyQuery();
    const [patchPolicy, { error: patchError }] = usePatchPolicyMutation(id)
    const [deletePolicy, { error: deleteError }] = useDeletePolicyMutation()

    if (isLoading) {
        return <div></div>
    }
    if (error) {
        return <div>Sorry! There's a problem loading the info.</div>
    }

    return (
        <div>

        </div>
    )
}

export default EditPolicySection;