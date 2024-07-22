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
            <Typography variant="h3" sx={{ mt: 1, color: "white" }}>
                Contact Me
            </Typography>
                <Card sx={{m:2, p:1, backgroundColor: "black", color: "white"}}>
                    <Typography variant="h4">
                        Email:
                    </Typography>
                    <Typography>
                        {data[0].email}
                    </Typography>
                </Card>
                <Card sx={{m:2, p:1, backgroundColor: "black", color: "white"}}>
                    <Typography variant="h4">
                        Cell:
                    </Typography>
                    <Typography>
                        {data[0].phone}
                    </Typography>
                </Card>
            </Card>
        </div>
    )
}

export default Contact;