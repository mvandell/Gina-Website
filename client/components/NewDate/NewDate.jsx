import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import RadioGroup from "@mui/material/RadioGroup";
import Switch from "@mui/material/Switch";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";

import { usePostDateMutation } from "../../redux/api";

// TODO: needs styling in CSS 

//dropdown for title?
//radio for instrument

const NewDate = () => {
    const [allDay, setAllDay] = useState(false);
    const [title, setTitle] = useState("");
    const [start, setStart] = useState("");
    const [end, setEnd] = useState("");

    const navigate = useNavigate();

    const [postDate, { isError }] = usePostDateMutation();

    if (isError) {
        return (
            <div>
                <Alert severity="error">
                    Whoops! Something went wrong posting the event.
                </Alert>
            </div>
        )
    }

    const handleSubmit = async (event) => {
        try {
            event.preventDefault();
            const result = await postDate({ start: start, end: end, title: title, allDay: allDay })
            console.log(result);
            navigate("/calendar");
        } catch (error) {
            console.error(error)
        }
    }

    const handleStart = (event) => {
        setStart(event.target.value)
    }
    const handleEnd = (event) => {
        setEnd(event.target.value)
    }

    return (
        <div>
            <Grid container>
                <Grid item xs={3}>
                </Grid>
                <Grid item xs={6}>
                    <Card sx={{ p: 3, backgroundColor: "white", maxWidth: 600, mt: 5 }}>
                        <Typography variant="h3" sx={{ mb: 2 }}>
                            New Event
                        </Typography>
                        <form onSubmit={handleSubmit}>
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
                                    required
                                    onChange={() => {
                                        setAllDay(!allDay);
                                        console.log(`allDay: ${!allDay}`);
                                    }}
                                />
                                <Typography>
                                    true
                                </Typography>
                            </Stack>
                            <Stack direction="column">
                                {allDay ? //all day
                                    <>
                                        <label> Start Date:
                                            <input
                                                type="date"
                                                name="startTime"
                                                value={start}
                                                onChange={handleStart}
                                                required />
                                        </label>
                                        <label> End Date:
                                            <input
                                                type="date"
                                                name="endTime"
                                                value={end}
                                                onChange={handleEnd}
                                                required />
                                        </label>
                                    </>
                                    : //not all day
                                    <>
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
                                    </>
                                }
                                <TextField
                                    label="Event"
                                    value={title}
                                    onChange={(event) => setTitle(event.target.value)}
                                    size="small"
                                    required={true} />
                                <Button
                                    type="submit"
                                    variant="contained"
                                    sx={{ textTransform: "none", backgroundColor: "#088395", color: "white", p: 1, mx: 20, my: 3 }}>
                                    Submit Date
                                </Button>
                            </Stack>
                        </form>
                    </Card>
                </Grid>
                <Grid item xs={1}>
                </Grid>
            </Grid>
        </div>
    )
}

export default NewDate;