import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";

import { useGetUserQuery } from "../../redux/api"
import profilePic from "../../images/Profile/ProfileSmile.jpg"

const Contact = () => {
    const { data, error, isLoading } = useGetUserQuery();

    if (isLoading) {
        return <div></div>
    }
    if (error) {
        return <div>Sorry! There's a problem loading the info.</div>
    }

    console.log(data);
    return (
        <div>
            <Card sx={{ backgroundColor: "black", px: 2, py: 1, m: 4, mt: 2, borderRadius: 5 }}>
            <Typography variant="h3" sx={{ mx: 5, mt: 1, color: "white" }}>
                Contact Me
            </Typography>
                <Card sx={{m:2, p:1, backgroundColor: "black", color: "white", border: 1, borderColor: "white", borderRadius: 3}}>
                    <Typography variant="h4">
                        Email:
                    </Typography>
                    <Typography>
                        {data[0].email}
                    </Typography>
                </Card>
                <Card sx={{m:2, p:1, backgroundColor: "black", color: "white", border: 1, borderColor: "white", borderRadius: 3}}>
                    <Typography variant="h4">
                        Cell:
                    </Typography>
                    <Typography>
                        {data[0].phone}
                    </Typography>
                </Card>
            </Card>
            <Card sx={{ p: 3, mx: 40, backgroundColor: "black" }}>
                <Typography textAlign="center">
                    <img src={profilePic} alt="a small waterfall in Tuolome Meadows" style={{width: "100%"}} />
                </Typography>
            </Card>
        </div>
    )
}

export default Contact;