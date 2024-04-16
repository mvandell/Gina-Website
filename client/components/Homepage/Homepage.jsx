import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import Stack from '@mui/material/Stack'
import Grid from '@mui/material/Grid'

import profilePic from "../../images/Profile/ProfilePiano.jpg"
import MTACLogo from "./MTAC Logo.png"
import { useGetBlurbQuery } from "../../redux/api";

const Homepage = () => {
    const { data, error, isLoading } = useGetBlurbQuery();

    if (isLoading) {
        return <div> </div>;
    }
    if (error) {
        return <div>Error:{error.message}</div>;
    }

    const withLinks = data[0].blurb3.replace("Music Teachers Association of California", `${<a href='https://www.mtac.org' target='_blank'>Music Teachers Association of California</a>}`).replace("National Association of Teachers of Singing", `${<a href='https://www.nats.org' target='_blank'>National Association of Teachers of Singing</a>}`);

    console.log(data)
    return (
        <div className="homepage">
            {/* <Card sx={{ m: 2, p: 2, borderRadius: 5, backgroundColor: "beige" }}>
                <Typography variant="h3" textAlign="center">
                    Welcome to my Website!
                </Typography>
            </Card> */}
            <Grid container>
                <Grid item xs={1}></Grid>
                <Grid item xs={5}>
                    <Card sx={{ p: 1, m: 2, pb: 0, backgroundColor: "black" }}>
                        <Typography textAlign="center">
                            <img src={profilePic} alt="Gina Vandellos sitting at her piano" width="100%" />
                        </Typography>
                    </Card>
                </Grid>
                <Grid item xs={5}>
                    <Card sx={{ p: 2, mx: 5, my: "15vh", borderRadius: 4, backgroundColor: "black", color: "white" }}>
                        <Typography variant="h3" textAlign="center" sx={{mb: 3}}>
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
                    </Card>
                </Grid>
                <Grid item xs={1}></Grid>
            </Grid>
            <Stack direction="row" >
                {/* Replace with proper images, preferably urls */}
                <img src="https://www.nats.org/_Library/template/site_logo.svg" alt="NATS logo" width="100" />
                <img src={MTACLogo} alt="MTAC logo" width="100" />
            </Stack>
        </div>
    )
}

export default Homepage;