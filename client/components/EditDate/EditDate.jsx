import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import RadioGroup from "@mui/material/RadioGroup";
import Switch from "@mui/material/Switch";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";

import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { usePatchDateMutation, useGetSingleDateQuery } from "../../redux/api";

const EditDate = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [allDay, setAllDay] = useState(false);
    const [title, setTitle] = useState("");
    const [start, setStart] = useState("");
    const [end, setEnd] = useState("");

    const { data, error, isLoading } = useGetSingleDateQuery(id);
    const [editDate, { isError }] = usePatchDateMutation();

    if (isLoading) {
        return <div> </div>
    }
    if (error) {
        console.error(error)
    }

    const handleSubmit = async (event) => {
        try {
            event.preventDefault();
            const response = await editDate({ allDay: allDay, title: title, start: start, end: end });
            navigate("/calendar");
        }
        catch (error) {
            console.error(error)
        }
    }
    const populateForm = (event) => {
        event.preventDefault();
        setAllDay(data.allDay);
        setTitle(data.title);
        setStart(data.start);
        setEnd(data.end);
    }

    // TODO: needs styling in CSS

    //dropdown for title?
    //radio for instrument

    return data && (
        <div>
            <form onSubmit={handleSubmit}>
                <Stack direction="column">
                    <Button onClick={populateForm} sx={{ textTransform: "none" }}>
                        Please populate the form
                    </Button>
                    {allDay === false &&
                        <>
                            <Typography variant="h5">
                                All Day:
                            </Typography>
                            <Stack direction="row">
                                <Typography>
                                    false
                                </Typography>
                                <Switch
                                    id="allDay"
                                    label="allDay"
                                    defaultChecked={false}
                                    onChange={() => {
                                        setAllDay(!allDay);
                                        console.log(`allDay: ${!allDay}`);
                                    }}
                                />
                                <Typography>
                                    true
                                </Typography>
                            </Stack>
                        </>
                    }
                    <label> Start Date and Time:
                        <input
                            type="datetime-local"
                            name="startTime"
                            value={start}
                            onChange={handleStart}
                            required />
                    </label>
                    <label> End Date and Time:
                        <input
                            type="datetime-local"
                            name="endTime"
                            value={end}
                            onChange={handleEnd}
                            required />
                    </label>
                    <TextField
                        label="Event"
                        value={title}
                        onChange={(event) => setTitle(event.target.value)}
                        size="small" />
                    <Button
                        type="submit"
                        variant="contained"
                        sx={{ textTransform: "none", backgroundColor: "#088395", color: "white", p: 1, mx: 20, my: 3 }}>
                        Update Date
                    </Button>
                </Stack>
            </form>
        </div>
    )
}

export default EditDate;