import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";

import { useGetSingleDateQuery } from "../../redux/api";
import { useParams, useNavigate } from "react-router-dom";

const SingleDate = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data, isLoading } = useGetSingleDateQuery(id);

    if (isLoading) {
        return <div> </div>
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
                <Button onClick={() => navigate("/calendar")} sx={{textTransform: "none"}}>
                    Close
                </Button>
            <Typography variant="h5" sx={{ mb: 1, textAlign: "center" }}>
                {data.title}
            </Typography>
            {data.allDay ?
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
                :
                <div>
                    <Typography sx={{ textAlign: "center" }}>
                        {start}
                    </Typography>
                    <Typography sx={{ textAlign: "center" }}>
                        {time}
                    </Typography>
                </div>
            }

        </Card>
    )
}

export default SingleDate;