import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { saveRoundHistory } from "../../store/actions/scoreActions";
import "./RoundHistory.css";
import { useEffect } from "react";

const RoundHistory = () => {
  const round_list = useSelector((state) => state.score.roundList, shallowEqual);

  return (
    <>
      {round_list.length > 0 && (
        <>
          {/* Display the newly added value */}
          <div className="history_box">
            <div className={`history_item ${Math.floor(round_list[round_list.length - 1]) > 1 && Math.floor(round_list[round_list.length - 1]) < 10 ? "history_second" : Math.floor(round_list[round_list.length - 1]) > 9 ? "history_third" : ''}`}>
              {round_list[round_list.length - 1]} x
            </div>
          </div>

          {/* Display the rest of the array in reverse order, excluding the last element */}
          {round_list.slice(0, -1).reverse().map((roundList, index) => (
            <div key={index} className="history_box">
              <div 
                className={`history_item ${
                  Math.floor(roundList) > 1 && Math.floor(roundList) < 10 
                    ? "history_second" 
                    : Math.floor(roundList) > 9 
                    ? "history_third" 
                    : ''
                }`}
              >
                {roundList} x
              </div>
            </div>
          ))}
        </>
      )}
    </>
  );
};

export default RoundHistory;
