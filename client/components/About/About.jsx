import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";

import { useGetBioQuery } from "../../redux/api";

const About = () => {
    const { data, error, isLoading } = useGetBioQuery();

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
                {data && data.map((paragraph) => (
                    <Typography key={paragraph.id} sx={{p: 1, m: 2}}>
                        {paragraph.paragraph}
                    </Typography>
                ))}
            </Card>
        </>
    )
}

export default About;