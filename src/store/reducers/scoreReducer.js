// reducers/scoreReducer.js


const initialState = {
  scoreList: []
};

const scoreReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SAVE_SCORE":
      return {
        ...state,
        scoreList: [...state.scoreList, action.payload]
      };
    default:
      return state;
  }
};

export default scoreReducer;
