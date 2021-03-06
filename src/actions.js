import Api from "./Api";
import { SubmissionError } from "redux-form";

function fetchEvents() {
    return function(dispatch) {
        return Api.events().then(({ numFound, events }) => {
            dispatch({
                type: "EVENTS_RECEIVED",
                events
            });
        });
    };
}

function fetchEventsNextPage() {
    return function(dispatch, getState) {
        const { page } = getState().events;

        return Api.events(page + 1).then(({ events }) => {
            dispatch({
                type: "EVENTS_RECEIVED",
                events
            });
            dispatch({
                type: "EVENTS_INC_PAGE",
                page: page + 1
            });
        });
    };
}

function addToCart(item) {
    return {
        type: "ADD_TO_CART",
        item
    };
}

function removeFromCart(item) {
    return {
        type: "REMOVE_FROM_CART",
        item
    };
}

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

function checkoutTickets({ firstName, lastName, email }) {
    return function(dispatch, getState) {
        return sleep(1000).then(() => {
            let errors = {};

            if (!firstName) {
                errors = {
                    ...errors,
                    firstName: "First name is required",
                    _error: "Missing values!"
                };
            }
            if (!lastName) {
                errors = {
                    ...errors,
                    lastName: "Last name is required",
                    _error: "Missing values!"
                };
            }
            if (!email) {
                errors = {
                    ...errors,
                    email: "Email is required",
                    _error: "Missing values!"
                };
            } else if (!email.match(/@/)) {
                errors = {
                    ...errors,
                    email: "Invalid email",
                    _error: "Email must contain @"
                };
            }

            if (Object.entries(errors).length > 0) {
                throw new SubmissionError(errors);
            }

            dispatch({
                type: "PURCHASED",
                purchase: getState().shoppingCart.items,
                person: { firstName, lastName, email }
            });

            return {
                firstName,
                lastName,
                email,
                purchased: getState().shoppingCart.items
            };
        });
    };
}

export {
    fetchEvents,
    fetchEventsNextPage,
    addToCart,
    removeFromCart,
    checkoutTickets
};
