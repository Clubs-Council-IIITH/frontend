import { useState, useEffect, useContext } from 'react'

import EventModel from 'models/EventModel'

import { Box, Grid, Card, CardMedia } from '@material-ui/core'

import { SessionContext } from 'contexts/SessionContext'

import { useQuery } from '@apollo/client'
import { GET_ALL_EVENTS } from 'queries/events'

import { Container } from '@material-ui/core'

import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import "react-big-calendar/lib/css/react-big-calendar.css"


const HomeCalendar = () => {
  const { session } = useContext(SessionContext)

  const localizer = momentLocalizer(moment)

  const { data, loading } = useQuery(GET_ALL_EVENTS)
  const [events, setEvents] = useState([])
  useEffect(() => {
	  console.log("a", data)
    const targetEvents = data?.allEvents
	  console.log("o", targetEvents)
    const event_list = targetEvents?.map((e) => new EventModel(e))
	  console.log("e", event_list)
    setEvents(event_list == undefined ? event_list : [])
  }, [data])

  return (
    <Container>
      <div>
        <Calendar
          localizer={localizer}
          events={events}
          style={{ height: "100vh" }}
        />
      </div>
    </Container>
  )
}

export default HomeCalendar
