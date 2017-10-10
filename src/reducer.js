import { combineReducers } from "redux";

const events = (state = [], action) => {
    switch (action.type) {
        case "EVENTS_RECEIVED":
            return action.events;
        default:
            return state;
    }
};

const rootReducer = combineReducers({
    events
});

export default rootReducer;
