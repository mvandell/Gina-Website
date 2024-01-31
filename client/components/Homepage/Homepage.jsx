import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";

const Homepage = () => {
    return (
        <Card sx={{m: 10, p: 5, borderRadius: 5}}>
            <Typography variant="h1">
                Welcome to my Website!
            </Typography>
        </Card>
    )
} 

export default Homepage;