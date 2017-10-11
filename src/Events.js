import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import format from "date-fns/format";
import matchSorter from "match-sorter";

import Downshift from "downshift";
import { fetchEvents } from "./actions";
import { Button, Input } from "./FormElements";

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
            <p>
                {format(new Date(event.eventDateLocal), "ddd Do MMMM, hh:mma")}
            </p>
            <p>{event.description}</p>
        </EventMeta>
    </EventStyle>
);

const EventList = ({ events }) => (
    <EventListStyled>
        {events.map(event => <Event event={event} key={event.id} />)}
    </EventListStyled>
);

const SearchableEventList = ({ events, getItems }) => (
    <Downshift itemToString={item => (item ? item.name : "")}>
        {({ getInputProps, isOpen, inputValue }) => (
            <div>
                <Input
                    {...getInputProps({
                        isOpen,
                        placeholder: `Search from ${events.length} events`
                    })}
                />
                {!isOpen ? null : <EventList events={getItems(inputValue)} />}
            </div>
        )}
    </Downshift>
);

class EventsContainer extends React.Component {
    getItems = value => {
        const { events } = this.props;

        return value
            ? matchSorter(events, value, {
                  keys: ["name"]
              })
            : events;
    };

    render() {
        const { events, fetchEvents } = this.props;

        return (
            <div>
                <h1>Find Events in San Francisco</h1>
                <SearchableEventList events={events} getItems={this.getItems} />
                <Button onClick={fetchEvents} label="Fetch Events" />
            </div>
        );
    }
}

function mapStateToProps({ events }) {
    return {
        events
    };
}

export default connect(mapStateToProps, {
    fetchEvents
})(EventsContainer);
