import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";

import { useGetSingleDateQuery } from "../../redux/api";
import { useParams } from "react-router-dom";

const SingleDate = ({dateId}) => {
    const {id} = useParams();
    const {data, isLoading} = useGetSingleDateQuery(id);

    if (isLoading) {
        return <div> </div>
    }

    console.log(data)

    return (
        <Card sx={{my: 10, p: 3}}>
            <Typography variant="h5">
                {data.title}
            </Typography>
            {/* <Typography>
                {data.start}
            </Typography> */}
        </Card>
    )
}

export default SingleDate;