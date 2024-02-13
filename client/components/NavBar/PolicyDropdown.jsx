import Button from "@mui/material/Button";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import { useState } from "react";
import { Link } from "react-router-dom";

const PolicyDropdown = () => {
    const [anchorEl, setAnchorEl] = useState(null);

    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <>
            <Button
                variant="text"
                aria-controls={open ? 'policy-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                sx={{ color: "#303036", textTransform: "none", fontWeight: "bold", fontSize: "16px" }}
            >
                Policy
            </Button>
            <Menu
                id="policy-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}>
                <MenuItem onClick={handleClose}>
                    <Link to="/policy/voice">
                        <Button variant="text" sx={{ color: "#303036", textTransform: "none" }}>
                            Voice Policy
                        </Button>
                    </Link>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <Link to="/policy/piano">
                        <Button variant="text" sx={{ color: "#303036", textTransform: "none" }}>
                            Piano Policy
                        </Button>
                    </Link>
                </MenuItem>
            </Menu>
        </>
    )
}

export default PolicyDropdown;