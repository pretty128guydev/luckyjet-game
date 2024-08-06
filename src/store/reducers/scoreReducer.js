// reducers/scoreReducer.js


const initialState = {
  scoreList: [],
  roundList: [],
  withdrawInfo: {},
  coefficient: 0,
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
    case "SAVE_WITHDRAWINFO":
      return {
        ...state,
        withdrawInfo: action.info
      }
    case "SAVE_COEFFICIENT":
      return {
        ...state,
        coefficient: action.current
      }
      
    default:
      return state;
  }
};

export default scoreReducer;
