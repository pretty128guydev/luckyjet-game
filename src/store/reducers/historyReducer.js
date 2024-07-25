// reducers/historyReducer.js

const initialState = {
  historyData: null,
  isLoading: false,
  error: null
};

const historyReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_HISTORY_DATA_REQUEST":
      return {
        ...state,
        isLoading: true,
        error: null
      };
    case "FETCH_HISTORY_DATA_SUCCESS":
      return {
        ...state,
        isLoading: false,
        historyData: action.payload
      };
    case "FETCH_HISTORY_DATA_FAILURE":
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    default:
      return state;
  }
};

export default historyReducer;
