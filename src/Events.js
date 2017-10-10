import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import { fetchEvents } from "./actions";
import { Button } from "./FormElements";

const EventStyle = styled.div`
    display: flex;
    flex-direction: row;
    padding: 10px 0;
    align-items: center;
`;

const EventThumbContainer = styled.div`
    width: 250px;
`;

const EventMeta = styled.div`
    display: flex;
    flex-direction: column;
    flex: 2;
    padding: 20px;
`;

const EventListStyled = styled.div`
    display: flex;
    flex-direction: column;
    width: 760px;
    margin: 0 auto;
`;

const Event = ({ event }) => (
    <EventStyle>
        <EventThumbContainer>
            <img src={event.imageUrl} style={{ width: "100%" }} />
        </EventThumbContainer>
        <EventMeta>
            <h2>{event.name}</h2>
            <p>{event.description}</p>
        </EventMeta>
    </EventStyle>
);

const EventList = ({ events }) => (
    <EventListStyled>
        {events.map(event => <Event event={event} key={event.id} />)}
    </EventListStyled>
);

const Events = connect(
    state => ({
        events: state.events
    }),
    {
        fetchEvents
    }
)(({ events, fetchEvents }) => (
    <div>
        <h1>Events in San Francisco</h1>
        <EventList events={events} />
        <Button onClick={fetchEvents} label="Fetch Events" />
    </div>
));

export default Events;
