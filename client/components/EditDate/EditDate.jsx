import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Switch from "@mui/material/Switch";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";

import { format } from "date-fns";
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
    const [instrument, setInstrument] = useState("");

    const { data, error, isLoading } = useGetSingleDateQuery(id);
    const [editDate, { isError }] = usePatchDateMutation();

    if (isLoading) {
        return <div> </div>
    }
    if (error) {
        console.error(error)
    }
    console.log(data)
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
        const start = new Date(data.start);
        const end = new Date(data.end);
        setAllDay(data.allDay);
        setTitle(data.title);
        setInstrument(data.instrument);
        setStart(format(new Date(data.start), "yyyy-MM-dd'T'HH:mm"));
        setEnd(format(new Date(data.end), "yyyy-MM-dd'T'HH:mm"));
        if (data.allDay === true) {
            setStart(format(new Date(data.start), "yyyy-MM-dd"));
            setEnd(format(new Date(data.end), "yyyy-MM-dd"));
        }
        else {
            setStart(format(new Date(data.start), "yyyy-MM-dd'T'HH:mm"));
            setEnd(format(new Date(data.end), "yyyy-MM-dd'T'HH:mm"));
        }
    }

    //dropdown for title?
    //radio for instrument

    return data && (
        <div>
            <Grid container>
                <Grid item xs={3}>
                </Grid>
                <Grid item xs={6}>
                    <Card sx={{ p: 3, maxWidth: 600, mt: 5 }}>
                        <form onSubmit={handleSubmit}>
                            <Stack direction="column">
                                <Button onClick={populateForm}  variant= "contained" sx={{ textTransform: "none", backgroundColor: "#088395", color: "white", p: 1, mx: 20, my: 1 }}>
                                    Populate the form
                                </Button>
                                {allDay ? //all day
                                    <>
                                        <label> Start Date:
                                            <input
                                                type="date"
                                                name="startTime"
                                                value={start}
                                                required
                                                onChange={(event) => { setStart(event.target.value) }} />
                                        </label>
                                        <label> End Date:
                                            <input
                                                type="date"
                                                name="endTime"
                                                value={end}
                                                required
                                                onChange={(event) => { setEnd(event.target.value) }} />
                                        </label>
                                    </>
                                    : //not all day
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
                                        <label> Start Date and Time:
                                            <input
                                                type="datetime-local"
                                                name="startTime"
                                                value={start}
                                                onChange={(event) => { setStart(event.target.value) }}
                                                required />
                                        </label>
                                        <label> End Date and Time:
                                            <input
                                                type="datetime-local"
                                                name="endTime"
                                                value={end}
                                                onChange={(event) => { setEnd(event.target.value) }}
                                                required />
                                        </label>
                                    </>
                                }
                                <FormControl>
                                    <RadioGroup
                                        row
                                        defaultValue={data.instrument}
                                        onChange={((event) => {
                                            console.log(event.target.value);
                                            setInstrument(event.target.value);
                                        })} >
                                        <FormControlLabel value="piano" control={<Radio />} label="Piano" />
                                        <FormControlLabel value="voice" control={<Radio />} label="Voice" />
                                        <FormControlLabel value="both" control={<Radio />} label="Both" />
                                    </RadioGroup>
                                </FormControl>
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
                                <Button onClick={() => { navigate("/calendar") }}>
                                    Cancel
                                </Button>
                            </Stack>
                        </form>
                    </Card>
                </Grid>
            </Grid>
            <Grid item xs={1}>
            </Grid>
        </div>
    )
}

export default EditDate;