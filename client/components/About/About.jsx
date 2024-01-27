import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";

import { useGetUserQuery } from "../../redux/api";

const About = () => {
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
            <Typography variant="h3">
                About Me
            </Typography>
            <Card sx={{m:2, p:1}}>
                <Typography>
                    {data[0].about} {/* Needs work - new table? */}
                </Typography>
            </Card>
        </>
    )
}

export default About;