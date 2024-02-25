import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import Stack from '@mui/material/Stack'

import profilePic from "../../images/Profile/ProfilePiano.jpg"
import MTACLogo from "./MTAC Logo.png"

//need inspiration
//picture of mom?
//as a student?

const Homepage = () => {
    return (
        <div>
            <Stack direction="column">
                <Card sx={{ m: 2, p: 2, borderRadius: 5 }}>
                    <Typography variant="h3" textAlign="center">
                        Welcome to my Website!
                    </Typography>
                </Card>
                <Card sx={{ backgroundColor: "black", p: 3, mx: 65 }}>
                    <Typography textAlign="center">
                        <img src={profilePic} alt="Gina Vandellos sitting at her piano" width="600" />
                    </Typography>
                </Card>
                <img src={MTACLogo} alt="MTAC logo" width="100" />
            </Stack>
        </div>
    )
}

export default Homepage;