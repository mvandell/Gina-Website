import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";

import { useGetVoicePolicyQuery } from "../../redux/api";

const VoicePolicy = () => {
    const { data, error, isLoading } = useGetVoicePolicyQuery();

    if (isLoading) {
        return <div></div>
    }
    if (error) {
        return <div>Sorry! There's a problem loading the info.</div>
    }
//update policy and dates with PDF from mom
    console.log(data)

    return (
        <>
            <Typography variant="h3" sx={{ ml: 5, mt: 3 }}>
                Voice Policy
            </Typography>
            <Card sx={{ m: 2, p: 1 }}>
                {data && data.map((policy) => (
                    <Box key={policy.id} sx={{ p: 0.5, m: 1 }}>
                        {policy.heading &&
                            <Typography variant="h6" sx={{ fontWeight: "bold", borderTop: 2 }}>
                                {policy.heading}
                            </Typography>
                        }
                        <Typography>
                            {policy.content}
                        </Typography>
                    </Box>
                ))}
            </Card>
        </>
    )
}

export default VoicePolicy;