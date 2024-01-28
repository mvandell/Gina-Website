import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";

import { useGetPolicyQuery } from "../../redux/api";

const PianoPolicy = () => {
    const { data, error, isLoading } = useGetPolicyQuery();

    if (isLoading) {
        return <div></div>
    }
    if (error) {
        return <div>Sorry! There's a problem loading the info.</div>
    }

    console.log(data)
    return (
        <>
            <Typography variant="h3">
                Piano Policy
            </Typography>
            <Card sx={{ m: 2, p: 1 }}>

            </Card>
        </>
    )
}

export default PianoPolicy;