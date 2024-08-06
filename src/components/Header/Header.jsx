import { useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { saveRoundHistory } from "../../store/actions/scoreActions";
import RoundHistory from "../RoundHistory/RoundHistory";
import style from "./Header.module.css";

const Header = () => {
  const moneyData = useSelector((state) => state.money.currentMoney);
  const historyData = useSelector((state) => state.history.historyData, shallowEqual);
  const dispatch = useDispatch();

  const roundPoint = historyData?.current_coefficients[0];
  const [showMore, setShowMore] = useState(false);

  const handleShowMoreButtonClick = () => {
    setShowMore(true);
  }

  const handlCloseMoreButtonClick = () => {
    setShowMore(false);
  }

  useEffect(() => {
    if (historyData?.state === 'ending') {
      setTimeout(() => {
        dispatch(saveRoundHistory(roundPoint));
      }, 2000);
    }
  }, [historyData?.state, dispatch, roundPoint]);

  return (
    <>
      <div className={style.parent}>
        <div className={style.left}>
          <img src="/public/lucky.svg" />
        </div>

        <div className={style.right}>
          <div className={style.one}>
            <div className={style.volume}>
              <img src="/public/volume.svg" />
            </div>
            <div className={style.separator}></div> {/* Добавляем линию */}
            <div className={style.music}>
              <img src="/public/music.svg" />
            </div>
          </div>

          <div className={style.two}>
            <div className={style.what}>
              <img style={{ marginLeft: "-1px" }} src="/public/what.svg" /> <p className={style.textW}>Как играть?</p>
            </div>
            <div className={style.separator}></div> {/* Добавляем линию */}
            <div className={style.money}>
              <img src="/public/money.svg" /> <p className={style.text}>{moneyData?.toLocaleString()} ₽</p>
            </div>
            <div className={style.separator}></div> {/* Добавляем линию */}
            <div className={style.collection}>
              <img src="/public/collection.svg" />
            </div>
          </div>

          <div className={style.three}>
            <div className={style.chat}>
              <img src="/public/chat.svg" />
            </div>
          </div>
        </div>
      </div>

      <div className={style.line}>
        <div className={style.history} id="history">
          <RoundHistory />
        </div>
        <div className={style.shadow} />
        <div className={style.fzknmT}>
          <div className={style.dDvXLf}>
            <button id="history-button" className={style.bteqaw} onClick={handleShowMoreButtonClick}>
              <div className={style.hSepGF}>
                <img src="https://lucky-jet.gamedev-atech.cc/assets/media/57edc186176820b3663ba2191ec251e3.svg" width="20px" />
              </div>
            </button>

          </div>
        </div>
        {showMore && (
          <div className={style.popUpMore}>
            <div className={style.popUpHeader}>
              <div className={style.popUpTitle}>
                <img src="https://lucky-jet.gamedev-atech.cc/assets/media/d9ba6ceb77e9ef980af74784d1cc4a93.svg" width="20px" />
                <h2>History of rounds</h2>
              </div>
              <div className={style.popUpClose} onClick={handlCloseMoreButtonClick}>
                <button id="close-modal" className="bteqaw">
                  <div className={style.dIPjTS}>
                    <div className={style.hdPKzm}>
                    </div>
                  </div>
                </button>
              </div>
            </div>
            <div className={style.popUpList}>
              <RoundHistory />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Header;
