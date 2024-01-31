import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";

import MTACLogo from "./MTAC Logo.png"

const Homepage = () => {
    return (
        <div>
            <Card sx={{ m: 10, p: 5, borderRadius: 5 }}>
                <Typography variant="h1">
                    Welcome to my Website!
                </Typography>
            </Card>
            <img src={MTACLogo} alt="MTAC logo"/>
        </div>
    )
}

export default Homepage;