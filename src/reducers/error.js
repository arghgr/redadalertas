export const SET_EVENTS_ERROR = "SET_EVENTS_ERROR";

const initialState = {
  event: null
};

export default function errorsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_EVENTS_ERROR:
      return { ...state, event: action.payload };
    default:
      return state;
  }
}

export const setEventsError = error => {
  return {
    type: SET_EVENTS_ERROR,
    payload: error
  }
};
