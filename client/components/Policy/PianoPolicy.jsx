import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

import { useGetPianoPolicyQuery } from "../../redux/api";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import profilePic from "../../images/Profile/ProfileSisters.jpg"

const PianoPolicy = () => {
    const token = useSelector((state) => state.auth.token);

    const { data, error, isLoading } = useGetPianoPolicyQuery();

    if (isLoading) {
        return <div></div>
    }
    if (error) {
        return <div>Sorry! There's a problem loading the info.</div>
    }

    const contentArr = data.filter(entry => entry.headingId);

    //TODO: edit section page
    console.log(data)
    return (
        <div>
            <Grid container>
                <Grid item xs={1}>
                </Grid>
                <Grid item xs={6}>
                    <Card sx={{ m: 5, p: 1, mx: 1 }}>
                        <Typography variant="h3" sx={{ m: 2 }}>
                            Piano Policy
                        </Typography>
                        {data && data.map((policy) => (
                            <Box key={policy.id} sx={{ p: 0.5, m: 1 }}>
                                <Stack direction="column">
                                    {policy.heading !== null && //if there's a heading, display it
                                        <div>
                                            <Typography variant="h6" sx={{ fontWeight: "bold", borderTop: 2 }}>
                                                {policy.heading}
                                            </Typography>
                                            {token &&
                                                <Link to="/" style={{ textDecoration: "none", color: "#303036" }}>
                                                    <Button variant="text" sx={{ color: "#303036", textTransform: "none" }}>
                                                        Edit Section
                                                    </Button>
                                                </Link>
                                            }
                                        </div>
                                    }
                                    {contentArr.filter(entry => entry.headingId === policy.id).map((paragraph) => (
                                        <Typography key={paragraph.id} sx={{ pt: 1 }}>
                                            {paragraph.content}
                                        </Typography>
                                    ))}
                                </Stack>
                            </Box>
                        ))}
                    </Card>
                </Grid>
                <Grid item xs={4}>
                    <Card sx={{ p: 3, mx: 5, my: 5, backgroundColor: "white", mr: 3 }}>
                        <Typography textAlign="center">
                            <img src={profilePic} alt="Gina sitting at her piano" width="440" />
                        </Typography>
                    </Card>
                </Grid>
                <Grid item xs={1}>
                </Grid>
            </Grid>
        </div>
    )
}

export default PianoPolicy;