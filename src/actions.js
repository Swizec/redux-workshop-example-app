import Api from "./Api";

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

export { fetchEvents, fetchEventsNextPage };
