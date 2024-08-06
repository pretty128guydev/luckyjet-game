// actions/scoreActions.js

export const saveScore = (amount) => ({
  type: "SAVE_SCORE",
  payload: amount
});

export const saveRoundHistory = (amount) => ({
  type: "SAVE_ROUNDHISTORY",
  payload: amount
})