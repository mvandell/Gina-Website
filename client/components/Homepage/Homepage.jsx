import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";

import { Link } from "react-router-dom";

import MTACLogo from "./MTAC Logo.png"

//need inspiration
//picture of mom?
//as a student?

const Homepage = () => {
    return (
        <div>
            <Card sx={{ m: 10, p: 5, borderRadius: 5 }}>
                <Typography variant="h1">
                    Welcome to my Website!
                </Typography>
            </Card>
            <img src={MTACLogo} alt="MTAC logo" />
            <Link to="/login">
                <Button variant="text" sx={{ color: "#303036", textTransform: "none" }}>
                    Admin Login
                </Button>
            </Link>
        </div>
    )
}

export default Homepage;