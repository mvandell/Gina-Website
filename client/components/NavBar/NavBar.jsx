import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Toolbar from '@mui/material/Toolbar';

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import AdminDropdown from "./AdminDropdown";

const NavBar = () => {
    //different color navbar?
    const navigate = useNavigate();
    const {active, setActive} = useState("");
    const handleChange = (event, newActive) => {
        setActive(newActive);
        navigate(`./${newActive}`)
    }
    return (
        <div id="nav">    
            <Stack direction="row" id="links" sx={{py: 1}}>
                <Typography variant="h2" sx={{ mx: 1, color: "white", mt: 1 }}>
                    Gina Vandellos
                <img src="client\images\Favicons\planogram.png" width="50" height="50" style={{paddingLeft: "10px", paddingRight: "10px"}}/>
                </Typography>
                <Box sx={{ maxHeight: '50px', mt: 2}}>
                    <Stack direction="row" sx={{ py: 1, px: 2 }}>
                        <Link to="/" style={{ textDecoration: "none", color: "white" }} className="link">
                            <Button variant="text" sx={{ color: "white", textTransform: "none", fontWeight: "bold", fontSize: "16px" }}>
                                Home
                            </Button>
                        </Link>
                        <Link to="/about" className="link">
                            <Button variant="text" sx={{ color: "white", textTransform: "none", fontWeight: "bold", fontSize: "16px" }}>
                                About Me
                            </Button>
                        </Link>
                        <Link to="/policy" className="link">
                            <Button variant="text" sx={{ color: "white", textTransform: "none", fontWeight: "bold", fontSize: "16px" }}>
                                Lessons
                            </Button>
                        </Link>
                        <Link to="/calendar" className="link">
                            <Button variant="text" sx={{ color: "white", textTransform: "none", fontWeight: "bold", fontSize: "16px" }}>
                                Calendar
                            </Button>
                        </Link>
                        <a href="https://www.mtac.org/programs/cm/" target="_blank" className="link">
                            <Button variant="text" sx={{ color: "white", textTransform: "none", fontWeight: "bold", fontSize: "16px" }}>
                                Certificate of Merit
                            </Button>
                        </a>
                        <AdminDropdown />
                    </Stack>
                </Box>
            </Stack>
        </div>

    )
}

export default NavBar;