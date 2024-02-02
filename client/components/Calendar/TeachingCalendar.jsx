import { Calendar, dateFnsLocalizer } from 'react-big-calendar' //https://jquense.github.io/react-big-calendar/examples/index.html?path=/docs/props-full-prop-list--page
import "react-big-calendar/lib/css/react-big-calendar.css";
import format from 'date-fns/format' //https://date-fns.org/docs/Getting-Started
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'
import enUS from 'date-fns/locale/en-US'

import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";

import { useGetDatesQuery } from '../../redux/api'

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
    const { data, error, isLoading } = useGetDatesQuery();

    if (isLoading) {
        return <div></div>
    }
    if (error) {
        return <div>Sorry! There's a problem loading the info.</div>
    }

    console.log(data);
//List of events on the side
//broken day/week with events
//bigger month title
//color-coded events - stretch
    return (
        <>
            <Card sx={{ m: 10, p: 2 }}>
                <Typography variant='h2' sx={{textAlign: "center"}}>
                    Calendar
                </Typography>
                <div className='calendar'>
                {data &&
                        <Calendar
                            localizer={localizer}
                            events={data}
                            defaultView='month'
                            defaultDate={new Date()}
                            style={{ height: "60vh", width: "60vw" }}
                            showMultiDayTimes
                        />
                    }
                    </div>
            </Card>
        </>
    )
}

export default TeachingCalendar;