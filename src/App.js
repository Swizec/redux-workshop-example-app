import React, { Component } from "react";
import { Route } from "react-router";
import { Link } from "react-router-dom";
import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import sagaMiddleware from "redux-saga";
import { Provider, connect } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import "./App.css";

import Home from "./Home";
import Events from "./Events";
import ShoppingCart from "./ShoppingCart";

import rootReducer from "./reducer";

const Store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunkMiddleware, sagaMiddleware))
);

class App extends Component {
    render() {
        return (
            <Provider store={Store}>
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
            </Provider>
        );
    }
}

export default App;
