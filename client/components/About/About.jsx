import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";

import { useGetBioQuery } from "../../redux/api";
import naturePic from "../../images/Nature/YosemiteRiver.jpg"
//hobbies?
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
            <Typography variant="h3" sx={{mx: 4, my: 1}}>
                About Me
            </Typography>
            <Card sx={{m:2, p:1, mx:10}}>
                {data && data.map((paragraph) => (
                    <Typography key={paragraph.id} sx={{p: 1, m: 2}}>
                        {paragraph.paragraph}
                    </Typography>
                ))}
            </Card>
            <Card sx={{ p: 3, mx: 60, backgroundColor: "black" }}>
                <Typography textAlign="center">
                    <img src={naturePic} alt="a small waterfall in Tuolome Meadows" width="700" />
                </Typography>
            </Card>
        </>
    )
}

export default About;