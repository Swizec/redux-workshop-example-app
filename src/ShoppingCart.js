import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { Route, withRouter } from "react-router";
import { Link } from "react-router-dom";

import { EventList } from "./Events";
import { EventStyle, Event } from "./Event";
import { Button, ManagedInput } from "./FormElements";
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

const Home = ({ items, match }) => (
    <div>
        <h1>Your shopping cart</h1>
        <EventList events={items}>
            {({ event }) => (
                <RemovableEventContainer event={event} key={event.id} />
            )}
        </EventList>
        {items.length > 0 ? (
            <Link to={`${match.url}/checkout`}>Checkout</Link>
        ) : null}
    </div>
);

const Checkout = ({ items, match }) => (
    <div>
        <h1>Checkout {items.length} tickets</h1>
        <Link to="/cart">Back</Link>
    </div>
);

class ShoppingCart extends React.Component {
    render() {
        const { items, match } = this.props;

        return (
            <div>
                <Route
                    exact
                    path={`${match.url}/`}
                    component={({ match }) => (
                        <Home items={items} match={match} />
                    )}
                />
                <Route
                    path={`${match.url}/checkout`}
                    component={({ match }) => (
                        <Checkout items={items} match={match} />
                    )}
                />
            </div>
        );
    }
}

export default withRouter(
    connect(state => ({
        items: state.shoppingCart.items
    }))(ShoppingCart)
);
