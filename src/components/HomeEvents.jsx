import { useState, useEffect, useContext } from 'react'

import EventModel from 'models/EventModel'

import { Box, Grid, Card, CardMedia } from '@material-ui/core'

import { SessionContext } from 'contexts/SessionContext'

import { useQuery } from '@apollo/client'
import { GET_ALL_EVENTS } from 'queries/events'

import Carousel from 'react-material-ui-carousel'
import { Container, AppBar, Grow } from '@material-ui/core'

import HomeEventCard from './cards/HomeEventCard'
import HomeNextEventCard from './cards/HomeNextEvent'

const HomeEvents = () => {
  const { session } = useContext(SessionContext)

  // create/edit event form modal
  const GET_EVENTS = GET_ALL_EVENTS
  const { data, loading } = useQuery(GET_EVENTS)
  const [events, setEvents] = useState([])
  useEffect(() => {
    const targetEvents = data?.allEvents
    setEvents(targetEvents?.map((o) => new EventModel(o)))
  }, [data])

  console.log(events)

  const sliderItems = Number(events?.length > 3 ? 3 : events?.length)
  const items = []

  for (let i = 0; i < events?.length; i += sliderItems) {
    if (i % sliderItems === 0) {
      items.push(
        <Card raised className="Banner" key={i.toString()}>
          <Grid container spacing={2} className="BannerGrid">
            {events.slice(i, i + sliderItems).map((event, index) => {
              return (
                <Grid item sm={4} key={index}>
                  <HomeEventCard {...event} />
                </Grid>
              )
            })}
          </Grid>
        </Card>,
      )
    }
  }

  return (
    <Container maxidth="lg">
      <AppBar>Coming up soon...</AppBar>
      <Grow in>
        <Grid container spacing={5}>
          <Grid item xs={12} sm={12}>
            <Grid container spacing={2} className="BannerGrid">
              <Grid item xs={12} sm={4}>
                <CardMedia
                  component="img"
                  height="500"
                  image="https://i.insider.com/60817ec5354dde0018c06960?width=700"
                  alt="green iguana"
                  style={{borderRadius: "1rem" }}
                />
              </Grid>
              <Grid item xs={12} sm={7}>
                {events?.length ? <HomeNextEventCard {...events[0]} /> : null}
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} sm={12}>
            <Carousel>{items}</Carousel>
          </Grid>
        </Grid>
      </Grow>
    </Container>
  )
}

export default HomeEvents
