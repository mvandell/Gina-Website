import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const NavBar = () => {

    return (
        <Stack direction="row">
            <Typography variant="h2" sx={{mx: 10}}>
                Gina Vandellos
            </Typography>
        <Box sx={{maxHeight: '50px', backgroundColor: "#C8B8A7", borderRadius: "50px", mt: 1.5, ml: 20}}>
            <Stack direction="row" sx={{py: 1, px: 2}}>
                <Button variant="text" sx={{color: "#303036"}}>
                    Home
                </Button>
                <Button variant="text" sx={{color: "#303036"}}>
                    About Me
                </Button>
                <Button variant="text" sx={{color: "#303036"}}>
                    Policy
                </Button>
                <Button variant="text" sx={{color: "#303036"}}>
                    Certificate of Merit
                </Button>
                <Button variant="text" sx={{color: "#303036"}}>
                    Contact Me
                </Button>
            </Stack>
        </Box>
        </Stack>
    )
}

export default NavBar;