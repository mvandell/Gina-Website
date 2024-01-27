import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";

import { useGetVoicePolicyQuery } from "../../redux/api";

const VoicePolicy = () => {


    return (
        <>
            <Typography variant="h3">
                Voice Policy
            </Typography>
            <Card sx={{ m: 2, p: 1 }}>

            </Card>
        </>
    )
}

export default VoicePolicy;