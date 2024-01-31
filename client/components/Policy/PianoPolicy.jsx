import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";

import { useGetPianoPolicyQuery } from "../../redux/api";

const PianoPolicy = () => {
    const { data, error, isLoading } = useGetPianoPolicyQuery();

    if (isLoading) {
        return <div></div>
    }
    if (error) {
        return <div>Sorry! There's a problem loading the info.</div>
    }

    console.log(data)
    return (
        <div>
            <Typography variant="h3" sx={{ ml: 5, mt: 3 }}>
                Piano Policy
            </Typography>
            <Card sx={{ m: 2, p: 1 }}>
                {data && data.map((policy) => (
                    <Box key={policy.id} sx={{p:0.5, m: 1 }}>
                        {policy.heading &&
                            <Typography variant="h6" sx={{fontWeight: "bold", borderTop: 2}}>
                                {policy.heading}
                            </Typography>
                        }
                        <Typography>
                            {policy.content}
                        </Typography>
                    </Box>
                ))}
            </Card>
        </div>
    )
}

export default PianoPolicy;