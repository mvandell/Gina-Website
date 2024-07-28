import Card from "@mui/material/Card";
import Stack from '@mui/material/Stack'
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import { useGetAccountQuery } from "../../redux/api";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import naturePic from "../../images/Nature/TuolomeRiver.jpg"

const AccountPage = () => {
    const token = useSelector((state) => state.auth.token);
    const navigate = useNavigate();
    const { data, error, isLoading } = useGetAccountQuery();

    if (!token) {
        navigate("/");
    }
    if (isLoading) {
        return <div> </div>;
    }
    if (error) {
        return <div>Error:{error.message}</div>;
    }

    return (
        <>
            <Card sx={{ backgroundColor: "black", color: "white", px: 2, py: 1, mx: 40, my: 5, borderRadius: 5 }}>
                <Typography variant="h3">
                    Welcome, {data.username}!
                </Typography>
                <Card sx={{ backgroundColor: "black", color: "white", p: 3, m: 1, borderRadius: 3 }}>
                    <Stack direction="column">
                        <Typography sx={{ pb: 2 }}>
                            Email: {data.email}
                        </Typography>
                        <Typography sx={{ pb: 2 }}>
                            Phone: {data.phone}
                        </Typography>
                        <Link to={"/account/edit"}>
                            <Button variant="contained">
                                Edit Account Info
                            </Button>
                        </Link>
                    </Stack>
                </Card>
            </Card>
            <Card sx={{ p: 3, mx: 50, backgroundColor: "black" }}>
                <Typography textAlign="center">
                    <img src={naturePic} alt="a small waterfall in Tuolome Meadows" style={{ width: "100%" }} />
                </Typography>
            </Card>
        </>
    )
}

export default AccountPage;