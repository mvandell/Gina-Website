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

import { useGetDatesQuery } from '../../redux/api'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SingleDate from './SingleDate';

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
    const [alert, setAlert] = useState(false);
    const { data, error, isLoading } = useGetDatesQuery();

    if (isLoading) {
        return <div></div>
    }
    if (error) {
        return <div>Sorry! There's a problem loading the info.</div>
    }

    console.log(data);

    //button to close popup
    //bigger month title
    //color-coded events - stretch
    return (
        <>
            <Stack direction="row">
                <Card sx={{ m: 10, p: 2 }}>
                    <Typography variant='h2' sx={{ textAlign: "center" }}>
                        Calendar
                    </Typography>
                    <div className='calendar'>
                        <Calendar
                            localizer={localizer}
                            events={data}
                            defaultView='month'
                            startAccessor="start"
                            endAccessor="end"
                            allDayAccessor="allDay" //not working
                            defaultDate={new Date()}
                            views={['month', "agenda"]}
                            onSelectEvent={(event) => {
                                setAlert(event.id);
                                navigate(`/calendar/${event.id}`);
                            }}
                            style={{ height: "60vh", width: "60vw" }}
                        />
                    </div>
                </Card>
                {alert &&
                    <SingleDate />
                }
            </Stack>
        </>
    )
}

export default TeachingCalendar;