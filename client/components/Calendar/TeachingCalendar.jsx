import { Calendar, dateFnsLocalizer } from 'react-big-calendar' //https://www.npmjs.com/package/react-big-calendar#date-fns-v2
import format from 'date-fns/format' //https://date-fns.org/docs/Getting-Started
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'
import enUS from 'date-fns/locale/en-US'

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

    

    return (
        <div>
            <Calendar
                localizer={localizer}
                //events={myEventsList}
                startAccessor="start"
                endAccessor="end"
                //style={{ height: 200 }}
            />
        </div>
    )
}

export default TeachingCalendar;