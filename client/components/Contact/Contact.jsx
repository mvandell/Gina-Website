import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";

import { useGetUserQuery } from "../../redux/api"

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
        <>
            <Typography variant="h3" sx={{ ml: 7, mt: 3 }}>
                Contact Me
            </Typography>
            <Card sx={{ backgroundColor: "#AFC7A8", px: 2, py: 1, m: 4, mt: 2, borderRadius: 5 }}>
                <Card sx={{m:2, p:1}}>
                    <Typography variant="h4">
                        Email:
                    </Typography>
                    <Typography>
                        {data[0].email}
                    </Typography>
                </Card>
                <Card sx={{m:2, p:1}}>
                    <Typography variant="h4">
                        Phone:
                    </Typography>
                    <Typography>
                        {data[0].phone}
                    </Typography>
                </Card>
            </Card>
        </>
    )
}

export default Contact;