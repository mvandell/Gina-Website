import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

import { useSelector } from "react-redux";

const NewDateButton = () => {
    const token = useSelector((state) => state.auth.token);

    return (
        <>
            {token &&
                <Link to="/new_date">
                    <Button variant="contained" sx={{ ml: 10, backgroundColor: "#19488A", color: "white", py: 2, px: 3, fontWeight: "bold" }}>
                        New Event
                    </Button>
                </Link>
            }
        </>
    )
}

export default NewDateButton;