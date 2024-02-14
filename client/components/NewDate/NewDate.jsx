import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import RadioGroup from "@mui/material/RadioGroup";
import Switch from "@mui/material/Switch";
import Select from "@mui/material/Select";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

import { usePostDateMutation } from "../../redux/api";

//toggle for allDay sets allDay and reveals/hides start/endTime
//day, month, and year concat into a date string, with or w/o time

//dropdown for title, month, day, and time
//text input for year, only allow 4 numbers
//radio for instrument

const NewDate = () => {
    const [allDay, setAllDay] = useState(false);
    const [title, setTitle] = useState("");
    const [instrument, setInstrument] = useState(null);
    const [startYear, setStartYear] = useState(null);
    const [startMonth, setStartMonth] = useState(null);
    const [startDay, setStartDay] = useState(null);
    const [startTime, setStartTime] = useState("");
    const [endYear, setEndYear] = useState(null);
    const [endMonth, setEndMonth] = useState(null);
    const [endDay, setEndDay] = useState(null);
    const [endTime, setEndTime] = useState(null);

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
            const result = await postDate({ start, end, title, allDay, instrument })
        } catch (error) {
            console.error(error)
        }
    }

    const handleChange = (event) => {
        setStartTime(event.target.value)
    }

    const time = [];
    for (let i = 9; i < 18; i++) {
        for (let j = 0; j < 46; j += 15) {
            let minute = j;
            if (j === 0) {
                minute = "00";
                if (i > 12) {
                    time.push({
                        value: `${i}:${minute}`,
                        display: `${i - 12}:${minute} PM`
                    })
                } else {
                    time.push({
                        value: `${i}:${minute}`,
                        display: `${i}:${minute} AM`
                    })
                }
            }
            else {
                if (i > 12) {
                    time.push({
                        value: `${i}:${minute}`,
                        display: `${i - 12}:${minute} PM`
                    })
                } else {
                    time.push({
                        value: `${i}:${minute}`,
                        display: `${i}:${minute} AM`
                    })
                }
            }
        }
    }

    return (
        <>

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
                                    // labelId="allDayLabel"
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
                            <Stack direction="column">
                                {allDay === false &&
                                    <>
                                    {/* vanilla html dropdown */}
                                        {/* <FormControl>
                                            <InputLabel id="startTime">Start Time</InputLabel>
                                            <Select
                                                id="startTime"
                                                //labelId="startTimeLabel"
                                                label="StartTime"
                                                variant="filled"
                                                value={startTime}
                                                onChange={handleChange}>
                                                {time && time.map((hour) => {
                                                    <MenuItem value={hour.value}>
                                                        {hour.display}
                                                    </MenuItem>
                                                })}
                                            </Select>
                                        </FormControl> */}
                                    </>
                                }
                            </Stack>
                        </form>
                    </Card>
                </Grid>
                <Grid item xs={1}>
                </Grid>
            </Grid>
        </>
    )
}

export default NewDate;