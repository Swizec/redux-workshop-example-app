import React from "react";
import { connect } from "react-redux";

import { fetchEvents } from "./actions";
import { Button } from "./FormElements";

const EventList = () => null;

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
