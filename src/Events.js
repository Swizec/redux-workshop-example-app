import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import matchSorter from "match-sorter";

import Downshift from "downshift";
import { fetchEventsNextPage } from "./actions";
import { Button, Input } from "./FormElements";

import { SelectableEvent } from "./Event";

const EventListStyled = styled.div`
    display: flex;
    flex-direction: column;
    width: 760px;
    margin: 0 auto;
`;

export const EventList = ({ events, children }) => (
    <EventListStyled>
        <h3>{events.length} events</h3>
        {events.map(event => children({ event }))}
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
                {!isOpen ? null : (
                    <EventList events={getItems(inputValue)}>
                        {({ event }) => (
                            <SelectableEvent event={event} key={event.id} />
                        )}
                    </EventList>
                )}
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
        const { events, fetchEventsNextPage } = this.props;

        return (
            <div>
                <h1>Find Events in San Francisco</h1>
                <SearchableEventList events={events} getItems={this.getItems} />
                <Button
                    onClick={fetchEventsNextPage}
                    style={{ marginTop: "15px" }}
                    label="Fetch More Events"
                />
            </div>
        );
    }
}

function mapStateToProps({ events }) {
    return {
        events: events.events
    };
}

export default connect(mapStateToProps, {
    fetchEventsNextPage
})(EventsContainer);
