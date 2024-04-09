import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { Link } from "react-router-dom";

import AdminDropdown from "./AdminDropdown";

const NavBar = () => {
    //different color navbar?
    return (
        // <div >
            <Stack direction="row" className="nav" sx={{py: 1}}>
                <Typography variant="h2" sx={{ mx: 10, color: "beige", mt: 1 }}>
                    Gina Vandellos
                </Typography>
                <Box sx={{ maxHeight: '50px', backgroundColor: "#355E3B", borderRadius: "50px", mt: 2, ml: 20 }}>
                    <Stack direction="row" sx={{ py: 1, px: 2 }}>
                        <Link to="/" style={{ textDecoration: "none", color: "white" }}>
                            <Button variant="text" sx={{ color: "white", textTransform: "none", fontWeight: "bold", fontSize: "16px" }}>
                                Home
                            </Button>
                        </Link>
                        <Link to="/about">
                            <Button variant="text" sx={{ color: "white", textTransform: "none", fontWeight: "bold", fontSize: "16px" }}>
                                About Me
                            </Button>
                        </Link>
                        <Link to="/policy">
                            <Button variant="text" sx={{ color: "white", textTransform: "none", fontWeight: "bold", fontSize: "16px" }}>
                                Policy
                            </Button>
                        </Link>
                        <Link to="/calendar">
                            <Button variant="text" sx={{ color: "white", textTransform: "none", fontWeight: "bold", fontSize: "16px" }}>
                                Calendar
                            </Button>
                        </Link>
                        <Link to="/contact">
                            <Button variant="text" sx={{ color: "white", textTransform: "none", fontWeight: "bold", fontSize: "16px" }}>
                                Contact Me
                            </Button>
                        </Link>
                        <a href="https://www.mtac.org/programs/cm/" target="_blank" >
                            <Button variant="text" sx={{ color: "white", textTransform: "none", fontWeight: "bold", fontSize: "16px" }}>
                                Certificate of Merit
                            </Button>
                        </a>
                        <AdminDropdown />
                    </Stack>
                </Box>
            </Stack>
        //</div>
    )
}

export default NavBar;