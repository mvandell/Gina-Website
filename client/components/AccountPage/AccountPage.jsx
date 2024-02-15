import Card from "@mui/material/Card";
import Stack from '@mui/material/Stack'
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

import { useGetUserQuery } from "../../redux/api";

const AccountPage = () => {
    const {data, error, isLoading} = useGetUserQuery();

    if (isLoading) {
        return <div> </div>;
    }
    if (error) {
        return <div>Error:{error.message}</div>;
    }

    return (
        <>
            <Grid container>
                <Grid item xs={3}>
                </Grid>
                <Grid item xs={6}>
                    <Card sx={{ backgroundColor: "#AFC7A8", px: 2, py: 1, m: 4, mt: 2, borderRadius: 5 }}>
                        <Typography variant="h3">
                            Welcome, {data[0].username}!
                        </Typography>
                        <Card sx={{p: 3, m: 1}}>
                            <Stack direction="column">
                                <Typography sx={{pb: 2}}>
                                    Email: {data[0].email}
                                </Typography>
                                <Typography sx={{pb: 2}}>
                                    Phone: {data[0].phone}
                                </Typography>
                                <Button variant="contained">
                                    Edit Account Info
                                </Button>
                            </Stack>
                        </Card>
                    </Card>
                </Grid>
                <Grid item xs={1}>
                </Grid>
            </Grid>
        </>
    )
}

export default AccountPage;