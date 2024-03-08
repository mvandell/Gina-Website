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
import { useNavigate, useParams } from 'react-router-dom';
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
    const { data, error, isLoading } = useGetDatesQuery();

    if (isLoading) {
        return <div></div>
    }
    if (error) {
        return <div>Sorry! There's a problem loading the info.</div>
    }

    console.log(data);

    //Link to new date form for admins

    //Toggle for piano/voice
    //Sorts dates by instrument
    //Feeds into Calendar events
    const dateData = [...data];
    dateData.forEach((date) => {
        date.start = new Date(date.start);
        date.end = new Date(date.end);
    })
    return (
        <div>
            <Stack direction="row">
                <Card sx={{ m: 10, p: 2 }}>
                    <Typography variant='h3' sx={{ textAlign: "center", m: 1 }}>
                        Calendar
                    </Typography>
                    <div className='calendar'>
                        <Calendar
                            localizer={localizer}
                            events={data}
                            defaultView='month'
                            startAccessor="start"
                            endAccessor="end"
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