import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { Link } from "react-router-dom";

import PolicyDropdown from "./PolicyDropdown";

const NavBar = () => {

    return (
        <Stack direction="row">
            <Typography variant="h2" sx={{ mx: 10 }}>
                Gina Vandellos
            </Typography>
            <Box sx={{ maxHeight: '50px', backgroundColor: "#C8B8A7", borderRadius: "50px", mt: 1.5, ml: 20 }}>
                <Stack direction="row" sx={{ py: 1, px: 2 }}>
                    <Link to="/" style={{ textDecoration: "none", color: "#303036" }}>
                        <Button variant="text" sx={{ color: "#303036", textTransform: "none" }}>
                            Home
                        </Button>
                    </Link>
                    <Link to="/about">
                        <Button variant="text" sx={{ color: "#303036", textTransform: "none" }}>
                            About Me
                        </Button>
                    </Link>
                    <PolicyDropdown />
                    <Link to="/calendar">
                        <Button variant="text" sx={{ color: "#303036", textTransform: "none" }}>
                            Calendar
                        </Button>
                    </Link>
                    <Link to="/cm">
                        <Button variant="text" sx={{ color: "#303036", textTransform: "none" }}>
                            Certificate of Merit
                        </Button>
                    </Link>
                    <Link to="/contact">
                        <Button variant="text" sx={{ color: "#303036", textTransform: "none" }}>
                            Contact Me
                        </Button>
                    </Link>
                </Stack>
            </Box>
        </Stack>
    )
}

export default NavBar;