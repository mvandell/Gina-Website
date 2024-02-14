import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

import { useSelector } from "react-redux";

const NewDateButton = () => {
    const token = useSelector((state) => state.auth.token);

    return (
        <>
            {token &&
                <Link to="/new_date">
                    <Button sx={{ textTransform: "none", m: 1 }}>
                        New Event
                    </Button>
                </Link>
            }
        </>
    )
}

export default NewDateButton;