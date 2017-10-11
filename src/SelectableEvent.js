import React from "react";
import { addToCart } from "./actions";
import styled from "styled-components";
import format from "date-fns/format";
import { connect } from "react-redux";

import { isInShoppingCart } from "./reducer";

const EventStyle = styled.div`
    display: flex;
    flex-direction: row;
    padding: 20px;
    margin: 10px 0;
    align-items: center;
`;

const SelectableEventStyle = EventStyle.extend`
    cursor: pointer;
    &:hover {
        background: rgba(219, 112, 147, 0.3);
    }
`;

const SelectedEventStyle = EventStyle.extend`
    cursor: default;
    background: rgba(219, 112, 147, 0.3);
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

const Event = ({ event }) => [
    <EventThumbContainer key="thumb">
        <img src={event.imageUrl} style={{ width: "100%" }} />
    </EventThumbContainer>,
    <EventMeta key="meta">
        <h2>{event.name}</h2>
        <p>{format(new Date(event.eventDateLocal), "ddd Do MMMM, hh:mma")}</p>
    </EventMeta>
];

const SelectableEvent = ({ event, addToCart }) => (
    <SelectableEventStyle onClick={() => addToCart(event)}>
        <Event event={event} />
    </SelectableEventStyle>
);

const SelectedEvent = ({ event }) => (
    <SelectedEventStyle>
        <Event event={event} />
    </SelectedEventStyle>
);

const SelectableEventContainer = connect(
    (state, props) => ({ selected: isInShoppingCart(state, props.event) }),
    {
        addToCart
    }
)(({ event, selected, addToCart }) => {
    return selected ? (
        <SelectedEvent event={event} />
    ) : (
        <SelectableEvent event={event} addToCart={addToCart} />
    );
});

export default SelectableEventContainer;
