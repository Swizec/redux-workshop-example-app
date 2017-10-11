import { combineReducers } from "redux";
import isAfter from "date-fns/is_after";

const events = (state = [], action) => {
    switch (action.type) {
        case "EVENTS_RECEIVED":
            return action.events.sort(
                (a, b) => (isAfter(a.eventDateLocal, b.eventDateLocal) ? 1 : -1)
            );
        default:
            return state;
    }
};

const rootReducer = combineReducers({
    events
});

export default rootReducer;
