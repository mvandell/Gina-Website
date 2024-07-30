import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Button from "@mui/material/Button";

import profilePic from "../../images/Profile/ProfileBlack.jpg"
import MTACLogo from "./MTAC Logo.png"

import { useGetBlurbQuery } from "../../redux/api";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Homepage = () => {
    const token = useSelector((state) => state.auth.token);

    const { data, error, isLoading } = useGetBlurbQuery();

    if (isLoading) {
        return <div> </div>;
    }
    if (error) {
        return <div>Error:{error.message}</div>;
    }
    //Logos
    //Manually upload file - could reset site to seed
    //Convert file to URL (ask) and submit via form
    //Upload file properly via form (ask)
    console.log(data)
    return (
        <div className="homepage">
            <Grid container>
                <Grid item xs={1}></Grid>
                <Grid item xs={6}>
                    <Card sx={{ p: 0, m: 0, pb: 0, backgroundColor: "black" }}>
                        <Typography textAlign="center">
                            <img src={profilePic} alt="Gina Vandellos sitting at her piano" width="100%" />
                        </Typography>
                    </Card>
                </Grid>
                <Grid item xs={4}>
                    <Card sx={{ p: 2, mx: 5, my: "12vh", borderRadius: 4, backgroundColor: "black", color: "white" }}>
                        <Typography variant="h3" textAlign="center" sx={{ mb: 3 }}>
                            Welcome to my Website!
                        </Typography>
                        <Typography sx={{ fontSize: 24 }}>
                            {data[0].blurb1}
                        </Typography>
                        <Typography sx={{ my: 2, fontSize: 24 }}>
                            {data[0].blurb2}
                        </Typography>
                        <Typography sx={{ fontSize: 24 }}>
                            {data[0].blurb3}
                        </Typography>
                        <Typography variant="h4" textAlign="right">
                            -Gina Vandellos
                        </Typography>
                        <Stack direction="row" sx={{ justifyContent: "center" }}>
                            {/* TODO: Replace with proper images, preferably urls */}
                            <img src="https://www.nats.org/_Library/template/site_logo.svg" alt="NATS logo" width="100" />
                            <img src={MTACLogo} alt="MTAC logo" width="100" />
                        </Stack>
                    </Card>
                    {token &&
                        <Link to="/blurb/edit">
                            <Button variant="contained">
                                Edit Blurb
                            </Button>
                        </Link>
                    }
                </Grid>
                <Grid item xs={1}></Grid>
            </Grid>
        </div>
    )
}

export default Homepage;