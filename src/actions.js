import Api from "./Api";

function fetchEvents() {
    return function(dispatch) {
        return Api.events().then(({ numFound, events }) => {
            dispatch({
                type: "EVENTS_RECEIVED",
                events,
                numFound
            });
        });
    };
}

export { fetchEvents };
