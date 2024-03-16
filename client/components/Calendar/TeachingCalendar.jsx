import { Calendar, dateFnsLocalizer } from 'react-big-calendar' //https://jquense.github.io/react-big-calendar/examples/index.html?path=/docs/props-full-prop-list--page
import "react-big-calendar/lib/css/react-big-calendar.css";
import format from 'date-fns/format' //https://date-fns.org/docs/Getting-Started
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'
import enUS from 'date-fns/locale/en-US'

import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

import { useGetDatesQuery } from '../../redux/api'
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import SingleDate from './SingleDate';
import NewDateButton from './NewDateButton';

const locales = {
    'en-US': enUS,
}

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
})

const TeachingCalendar = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [instrument, setInstrument] = useState(null)
    const { data, error, isLoading } = useGetDatesQuery();

    if (isLoading) {
        return <div></div>
    }
    if (error) {
        return <div>Sorry! There's a problem loading the info.</div>
    }

    console.log(data);

    return (
        <div>
            <Stack direction="row">

                <Card sx={{ m: 10, p: 2 }}>

                    <Typography variant='h3' sx={{ textAlign: "center", m: 1 }}>
                        Calendar
                    </Typography>
                    <Typography textAlign="center">
                        <FormControl sx={{ textAlign: "center" }}>
                            <RadioGroup
                                row
                                defaultValue="piano"
                                onChange={((event) => {
                                    console.log(event.target.value);
                                    setInstrument(event.target.value);
                                })} >
                                <FormControlLabel value="piano" control={<Radio />} label="Piano" />
                                <FormControlLabel value="voice" control={<Radio />} label="Voice" />
                            </RadioGroup>
                        </FormControl>
                    </Typography>
                    <div className='calendar'>
                        <Calendar
                            localizer={localizer}
                            events={data.filter((entry) => entry.instrument === instrument || entry.instrument === "both")}
                            defaultView='month'
                            startAccessor={(event) => { return new Date(event.start) }}
                            endAccessor={(event) => { return new Date(event.end) }}
                            allDayAccessor="allDay"
                            defaultDate={new Date()}
                            views={['month', "agenda"]}
                            onSelectEvent={(event) => { navigate(`/calendar/${event.id}`); }}
                            style={{ height: "60vh", width: "60vw" }}
                        />
                    </div>
                </Card>
                {id &&
                    <SingleDate />
                }
            </Stack>
            <NewDateButton />
        </div>
    )
}

export default TeachingCalendar;