import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import Stack from '@mui/material/Stack'
import Grid from '@mui/material/Grid'

import profilePic from "../../images/Profile/ProfilePiano.jpg"
import MTACLogo from "./MTAC Logo.png"

const Homepage = () => {
    return (
        <div>
            <Card sx={{ m: 2, p: 2, borderRadius: 5 }}>
                <Typography variant="h3" textAlign="center">
                    Welcome to my Website!
                </Typography>
            </Card>
            <Grid container>
                <Grid item xs={1}></Grid>
                <Grid item xs={5}>
                <Card sx={{ backgroundColor: "black", p: 3, mx: 10 }}>
                    <Typography textAlign="center"> 
                        <img src={profilePic} alt="Gina Vandellos sitting at her piano" width="100%"/>
                    </Typography>
                </Card>
                </Grid>
                <Grid item xs={5}>
                <Card sx={{ p: 1, mx: 10 }}>
                    <Typography>
                         I have been teaching private piano and voice lessons on the peninsula for 20 years.
                    </Typography>
                    <Typography sx={{my: 1}}>
                        My teaching philosophy consists of providing a warm, supportive atmosphere where students can excel. I give careful attention to technique to ease the delivery of the music.
                        
                    </Typography>
                    <Typography>
                        I am an active member of the Music Teachers Association of California and the National Association of Teachers of Singing.
                    </Typography>
                </Card>
                </Grid>
                <Grid item xs={1}></Grid>
            </Grid>
            <Stack direction="row" >
                <img src="https://www.nats.org/_Library/template/site_logo.svg" alt="NATS logo" width="100" />
                <img src="https://www.mtac.org/wp-content/uploads/2023/01/MTAC-LogoGlow100.png" alt="MTAC logo contemporary" width="125" />
            </Stack>
        </div>
    )
}

export default Homepage;