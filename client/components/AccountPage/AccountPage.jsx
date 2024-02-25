import Card from "@mui/material/Card";
import Stack from '@mui/material/Stack'
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import { useGetAccountQuery } from "../../redux/api";
import { Link } from "react-router-dom";
import naturePic from "../../images/Nature/TuolomeRiver.jpg"

const AccountPage = () => {
    const { data, error, isLoading } = useGetAccountQuery();

    if (isLoading) {
        return <div> </div>;
    }
    if (error) {
        return <div>Error:{error.message}</div>;
    }

    return (
        <>
            <Card sx={{ backgroundColor: "#AFC7A8", px: 2, py: 1, mx: 40, my: 5, borderRadius: 5 }}>
                <Typography variant="h3">
                    Welcome, {data.username}!
                </Typography>
                <Card sx={{ p: 3, m: 1 }}>
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
            <Card sx={{ p: 3, mx: 54 }}>
                <Typography textAlign="center">
                    <img src={naturePic} alt="a small waterfall in Tuolome Meadows" width="800" />
                </Typography>
            </Card>
        </>
    )
}

export default AccountPage;