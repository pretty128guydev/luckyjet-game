// reducers/scoreReducer.js


const initialState = {
  scoreList: [],
  roundList: [],
};

const scoreReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SAVE_SCORE":
      return {
        ...state,
        scoreList: [...state.scoreList, action.payload]
      };
    case "SAVE_ROUNDHISTORY":
      return {
        ...state,
        roundList: [...state.roundList, action.payload]
      };
    default:
      return state;
  }
};

export default scoreReducer;
