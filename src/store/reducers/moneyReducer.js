// reducers/moneyReducer.js

const initialState = {
  currentMoney: 120000
};

const moneyReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INCREASE_MONEY':
      console.log('Increasing money by:', action.payload);
      return {
        ...state,
        currentMoney: state.currentMoney + action.payload,
      };
    case 'DECREASE_MONEY':
      console.log('Decreasing money by:', action.payload);
      return {
        ...state,
        currentMoney: state.currentMoney - action.payload,
      };
    default:
      return state;
  }
};

export default moneyReducer;
