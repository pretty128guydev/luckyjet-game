import { useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { saveRoundHistory } from "../../store/actions/scoreActions";
import RoundHistory from "../RoundHistory/RoundHistory";
import style from "./Header.module.css";
import useSmoothMoney from "../../hooks/useSmoothMoney";

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

  const formatNumber = (number) => {
    const formattedNumber = new Intl.NumberFormat('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(number)
    return formattedNumber.replace(',', '.');
  }

  const smoothMoney = useSmoothMoney(moneyData);

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
          <img src="../lucky.svg" />
        </div>

        <div className={style.right}>
          <div className={style.one}>
            <div className={style.volume}>
              <button id="volume-button" className={`${style.bteqaw} ${style.btnBorder}`}>
                <div className={style.hSepGF}>
                  <img src="../volume.svg" />
                </div>
              </button>
            </div>
            <div className={style.music}>
              <button id="sound-button" className={style.bteqaw}>
                <div className={style.hSepGF}>
                  <img src="../music.svg" />
                </div>
              </button>
            </div>
          </div>

          <div className={style.two}>
            <div className={style.help}>
              <button id="help-button" className={`${style.bteqaw} ${style.btnBorder}`}>
                <div className={`${style.hSepGF} ${style.helpDiv}`}>
                  <img style={{ marginLeft: "-1px", width: "21px", height: "20px"}} src="../what.svg" /> <p className={style.text}>Как играть?</p>
                </div>
              </button>
            </div>
            <div className={style.money}>
              <button id="money-button" className={`${style.bteqaw} ${style.btnBorder}`}>
                <div className={`${style.hSepGF} ${style.helpDiv}`}>
                  <img src="../money.svg" style={{width: "21px", height: "20px"}}/> <div className={style.balance}>{formatNumber(smoothMoney)} ₽</div>
                </div>
              </button>
            </div>
            <div className={style.collection}>
              <button id="collection-button" className={style.bteqaw}>
                <div className={`${style.hSepGF} ${style.collectionDiv}`}>
                  <img src="../collection.svg" width="21px" height="20px" style={{width: "21px", height: "20px"}}/>
                </div>
              </button>
            </div>
          </div>

          <div className={style.three}>
            <div className={style.chat}>
              <button id="help-button" className={style.bteqaw}>
                <div className={`${style.hSepGF} ${style.collectionDiv}`}>
                  <img src="../chat.svg" />
                </div>
              </button>
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
