import React, { Component } from "react";
import { Route, withRouter } from "react-router";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import "./App.css";

import Home from "./Home";
import Events from "./Events";
import ShoppingCart from "./ShoppingCart";

class AppContainer extends Component {
    render() {
        const { items } = this.props;

        return (
            <div className="App">
                <header className="App-header">
                    <nav>
                        <Link to="/events">Event Listing</Link>
                        &nbsp;|&nbsp;
                        <Link to="/cart">Shopping Cart ({items})</Link>
                    </nav>
                </header>
                <div>
                    <Route exact path="/" component={Home} />
                    <Route path="/events" component={Events} />
                    <Route path="/cart" component={ShoppingCart} />
                </div>
            </div>
        );
    }
}

function mapStateToProps({ shoppingCart }) {
    return {
        items: shoppingCart.items.length
    };
}

export default withRouter(connect(mapStateToProps)(AppContainer));
