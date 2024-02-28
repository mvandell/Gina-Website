import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import EditIcon from '@mui/icons-material/Edit';

import { useGetBioQuery } from "../../redux/api";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import naturePic from "../../images/Nature/YosemiteRiver.jpg"
//hobbies?
const About = () => {
    const token = useSelector((state) => state.auth.token);
    const navigate = useNavigate();

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
            <Typography variant="h3" sx={{ mx: 4, my: 1 }}>
                About Me
            </Typography>
            <Card sx={{ m: 2, p: 1, mx: 10 }}>
                {data && data.map((paragraph) => (
                    <Box key={paragraph.id} sx={{ p: 1, m: 2 }}>
                        <Stack direction="row">
                            {token &&
                                <IconButton onClick={() => navigate(`/about/edit/${paragraph.id}`)}>
                                    <EditIcon fontSize="small" />
                                </IconButton>
                            }
                            <Stack direction="column">
                                <Typography>
                                    {paragraph.paragraph}
                                </Typography>
                            </Stack>
                        </Stack>
                    </Box>
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