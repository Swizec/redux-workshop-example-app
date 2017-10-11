import { combineReducers } from "redux";
import isAfter from "date-fns/is_after";
import { createSelector } from "reselect";
import { reducer as formReducer } from "redux-form";

const events = (state = { page: 0, events: [] }, action) => {
    switch (action.type) {
        case "EVENTS_RECEIVED":
            return {
                ...state,
                events: state.events
                    .concat(action.events)
                    .sort(
                        (a, b) =>
                            isAfter(a.eventDateLocal, b.eventDateLocal) ? 1 : -1
                    )
            };
        case "EVENTS_INC_PAGE":
            return {
                ...state,
                page: action.page
            };
        default:
            return state;
    }
};

const shoppingCart = (state = { items: [] }, action) => {
    switch (action.type) {
        case "ADD_TO_CART":
            return {
                ...state,
                items: state.items.concat(action.item)
            };
        case "REMOVE_FROM_CART":
            return {
                ...state,
                items: state.items.filter(({ id }) => id !== action.item.id)
            };
        default:
            return state;
    }
};

export const isInShoppingCart = createSelector(
    [(state, event) => event.id, (state, event) => state.shoppingCart],
    (eventId, shoppingCart) => {
        return shoppingCart.items.map(item => item.id).includes(eventId);
    }
);

const rootReducer = combineReducers({
    events,
    shoppingCart,
    form: formReducer
});

export default rootReducer;
