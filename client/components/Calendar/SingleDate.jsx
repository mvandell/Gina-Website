import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

import { useGetSingleDateQuery, useDeleteDateMutation } from "../../redux/api";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const SingleDate = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const token = useSelector((state) => state.auth.token);

    const { data, error, isLoading } = useGetSingleDateQuery(id);
    const [deleteDate] = useDeleteDateMutation();

    if (isLoading) {
        return <div> </div>
    }
    if (error) {
        return <div>Error: {error.message}</div>
    }
    console.log("single date", data)
    let time;
    const start = new Date(data.start).toDateString();
    const end = new Date(data.end).toDateString();
    let hours = new Date(data.start).getHours();
    if (hours > 12) {
        hours -= 12;
        time = `${hours} pm`
    } else {
        time = `${hours} am`
    }

    return (
        <Card sx={{ my: 10, p: 3 }}>
            <Button onClick={() => navigate("/calendar")} sx={{ textTransform: "none" }}>
                Close
            </Button>
            <Typography variant="h5" sx={{ mb: 1, textAlign: "center" }}>
                {data.title}
            </Typography>
            {data.allDay ? //all day
                data.start === data.end ? //single day
                    <Typography sx={{ textAlign: "center" }}>
                        {start}
                    </Typography>
                    : //multiple days
                    <div>
                        <Typography sx={{ textAlign: "center" }}>
                            {start}
                        </Typography>
                        <Typography sx={{ textAlign: "center" }}>
                            to
                        </Typography>
                        <Typography sx={{ textAlign: "center" }}>
                            {end}
                        </Typography>
                    </div>
                : //not all day
                <div>
                    <Typography sx={{ textAlign: "center" }}>
                        {start}
                    </Typography>
                    <Typography sx={{ textAlign: "center" }}>
                        {time}
                    </Typography>
                </div>
            }
            {token &&
                <>
                    <Stack direction="column">
                        <Button onClick={() => navigate(`/date/edit/${data.id}`)}
                            sx={{ textTransform: "none", m: 1, mt: 2 }}
                            variant="outlined">
                            Update Date
                        </Button>
                        <Button
                            onClick={() => {
                                if (confirm("Are you sure you want to delete this event?") === true) {
                                    deleteDate(data.id)
                                    navigate("/calendar")
                                }
                            }}
                            variant="outlined"
                            color="error"
                            sx={{ textTransform: "none", m: 1 }}>
                            Delete Date
                        </Button>
                    </Stack>
                </>
            }
        </Card>
    )
}

export default SingleDate;