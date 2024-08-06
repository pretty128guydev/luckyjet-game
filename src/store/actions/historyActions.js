// actions/historyActions.js

export const fetchHistoryDataRequest = () => ({
  type: "FETCH_HISTORY_DATA_REQUEST"
});

export const fetchHistoryDataSuccess = (data) => ({
  type: "FETCH_HISTORY_DATA_SUCCESS",
  payload: data
});

export const fetchHistoryDataFailure = (error) => ({
  type: "FETCH_HISTORY_DATA_FAILURE",
  payload: error
});

export const fetchHistoryData = () => async (dispatch) => {
  dispatch(fetchHistoryDataRequest());
  try {
    const response = await fetch("https://lucky-jet-history.gamedev-atech.cc/public/history/api/history/replay");
    const data = await response.json();

    dispatch(fetchHistoryDataSuccess(data));
  } catch (error) {
    dispatch(fetchHistoryDataFailure(error.message));
  }
};
