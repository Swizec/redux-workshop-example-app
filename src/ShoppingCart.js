import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import { EventList } from "./Events";
import { EventStyle, Event } from "./Event";

const RemovableEvent = ({ event }) => (
    <EventStyle>
        <Event event={event} />
    </EventStyle>
);

class ShoppingCartContainer extends React.Component {
    render() {
        const { items } = this.props;

        return (
            <div>
                <h1>Your shopping cart</h1>
                <EventList events={items}>
                    {({ event }) => (
                        <RemovableEvent event={event} key={event.id} />
                    )}
                </EventList>
            </div>
        );
    }
}

export default connect(state => ({
    items: state.shoppingCart.items
}))(ShoppingCartContainer);
