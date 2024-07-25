// actions/moneyActions.js

export const increaseMoney = (amount) => ({
  type: "INCREASE_MONEY",
  payload: amount
});

export const decreaseMoney = (amount) => ({
  type: "DECREASE_MONEY",
  payload: amount
});
