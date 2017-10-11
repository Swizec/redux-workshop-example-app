import { combineReducers } from "redux";
import isAfter from "date-fns/is_after";

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

const rootReducer = combineReducers({
    events
});

export default rootReducer;
