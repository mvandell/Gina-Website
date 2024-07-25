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
import { ThemeProvider, createTheme } from '@mui/material/styles';

import { useGetDatesQuery } from '../../redux/api'
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import SingleDate from './SingleDate';
import NewDateButton from './NewDateButton';

//calendar of the year
//light mode?
//fix agenda

const lightTheme = createTheme({
    palette: {
        mode: 'light',
    },
});

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
    const { data, error, isLoading } = useGetDatesQuery();

    if (isLoading) {
        return <div></div>
    }
    if (error) {
        return <div>Sorry! There's a problem loading the info.</div>
    }

    console.log(data);
    
// const color = ["floralwhite", "oldlace", "seashell"]
const color1 = "floralwhite";
const color2 = "oldlace";
const color3 = "seashell";

    return (
        <ThemeProvider theme={lightTheme}>
            <div>
                <Stack direction="row">
                    <Card sx={{ m: 10, p: 2, backgroundColor: color1 }}>
                        <Typography variant='h3' sx={{ textAlign: "center", m: 1 }}>
                            Calendar
                        </Typography>
                        <div className='calendar'>
                            <Calendar
                                localizer={localizer}
                                events={data}
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
        </ThemeProvider>
    )
}

export default TeachingCalendar;