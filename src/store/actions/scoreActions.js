// actions/scoreActions.js

export const saveScore = (amount) => ({
  type: "SAVE_SCORE",
  payload: amount
});

export const saveRoundHistory = (amount) => ({
  type: "SAVE_ROUNDHISTORY",
  payload: amount
})

export const saveWithdrawInfo = (detail) => ({
  type: "SAVE_WITHDRAWINFO",
  info: detail
})

export const saveCoefficient = (value) => ({
  type: "SAVE_COEFFICIENT",
  current: value
})