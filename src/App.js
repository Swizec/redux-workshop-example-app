import React, { Component } from "react";
import { Route } from "react-router";
import { Link } from "react-router-dom";

import "./App.css";

import Home from "./Home";
import Events from "./Events";
import ShoppingCart from "./ShoppingCart";

class App extends Component {
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <nav>
                        <Link to="/events">Event Listing</Link>
                        &nbsp;|&nbsp;
                        <Link to="/cart">Shopping Cart</Link>
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

export default App;
