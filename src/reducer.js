import { combineReducers } from "redux";

const events = (state = [], action) => {
    console.log("hai reducer", action);
    switch (action.type) {
        default:
            return state;
    }
};

const rootReducer = combineReducers({
    events
});

export default rootReducer;
