import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import { EventList } from "./Events";
import { EventStyle, Event } from "./Event";
import { Button } from "./FormElements";
import { removeFromCart } from "./actions";

class RemovableEvent extends React.Component {
    state = {
        editable: false
    };

    toggleEditable = () => this.setState({ editable: !this.state.editable });

    remove = () => this.props.removeFromCart(this.props.event);

    render() {
        const { event } = this.props,
            { editable } = this.state;

        return (
            <EventStyle onClick={this.toggleEditable}>
                <Event event={event} />
                {editable ? (
                    <Button label="Remove" onClick={this.remove} />
                ) : null}
            </EventStyle>
        );
    }
}

const RemovableEventContainer = connect(null, {
    removeFromCart
})(RemovableEvent);

class ShoppingCart extends React.Component {
    render() {
        const { items } = this.props;

        return (
            <div>
                <h1>Your shopping cart</h1>
                <EventList events={items}>
                    {({ event }) => (
                        <RemovableEventContainer event={event} key={event.id} />
                    )}
                </EventList>
            </div>
        );
    }
}

export default connect(state => ({
    items: state.shoppingCart.items
}))(ShoppingCart);
