import { shallowEqual, useSelector } from "react-redux";
import style from "./HistoryBlock.module.css";
import { useState } from "react";

const HistoryBlock = () => {
  const my_score_list = useSelector((state) => state.score.scoreList, shallowEqual());

  const trimmedScoreList = my_score_list.length > 10 ? my_score_list.slice(my_score_list.length - 10, my_score_list.length) : my_score_list;

  console.log(trimmedScoreList)
  console.log(my_score_list)

  const [activeTab, setActiveTab] = useState('tab-0');
  const [topMenuClick, setTopMenuClick] = useState(false);
  const [dateMenuClick, setDateMenuClick] = useState(false);

  // console.log("CASHOUT IS ", cash_outs);

  const handleTabClick = (e) => {
    setActiveTab(e.target.id);
  }

  const handleTopScoreMenuClick = () => {
    setTopMenuClick(!topMenuClick);
    setDateMenuClick(false);
  }

  const handleDateMenuClick = () => {
    setDateMenuClick(!dateMenuClick);
    setTopMenuClick(false);
  }

  const handleTopMenuCheck = (e) => {
    setActiveScoreMenu(e.target.id);
  }

  const handleTopDateCheck = (e) => {
    setActiveDateMenu(e.target.id)
  }

  const formatNumber = (number) => {
    const formattedNumber = new Intl.NumberFormat('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(number)
    return formattedNumber.replace(',', '.');
  }



  return (
    <div className={style.history}>
      <div className={style.block} id="tabs-switcher">
        <div className={style.tabsGroup}>
          <div className={`${style.tab} ${activeTab === 'tab-0' ? style.active : ''}`} id="tab-0" onClick={handleTabClick}>Все</div>
          <div className={`${style.tab} ${activeTab === 'tab-1' ? style.active : ''}`} id="tab-1" onClick={handleTabClick}>Мои</div>
          <div className={`${style.tab} ${activeTab === 'tab-2' ? style.active : ''}`} id="tab-2" onClick={handleTabClick}>Топ</div>
        </div>
      </div>
      <div className={style.betList}>
        {activeTab === 'tab-1' && trimmedScoreList.length > 0 &&
          (
            <>
              <div className={`${trimmedScoreList[trimmedScoreList.length - 1]?.earnAmount > 0 ? style.withdrawbetItem : style.betItem}`}>
                <div className={style.time}>{trimmedScoreList[trimmedScoreList.length - 1]?.time}</div>
                <div className={style.price} style={{ fontSize: trimmedScoreList[trimmedScoreList.length - 1]?.consumAmount > 10000 ? '9px' : trimmedScoreList[trimmedScoreList.length - 1]?.consumAmount > 1000 ? '11px' : '12px' }}>{formatNumber(trimmedScoreList[trimmedScoreList.length - 1]?.consumAmount)} ₽</div>
                <div className={
                  Math.floor(trimmedScoreList[trimmedScoreList.length - 1]?.coefficient) < 2
                    ? style.low
                    : Math.floor(trimmedScoreList[trimmedScoreList.length - 1]?.coefficient) < 10
                      ? style.medium
                      : style.high
                } style={{ fontSize: '12px' }}>
                  {formatNumber(trimmedScoreList[trimmedScoreList.length - 1]?.coefficient)}x
                </div>
                <div className={`${style.cashOut}`} style={{fontSize: trimmedScoreList[trimmedScoreList.length - 1]?.consumAmount > 10000 ? '9px' : trimmedScoreList[trimmedScoreList.length - 1]?.consumAmount > 1000 ? '11px' : '12px' }}>{trimmedScoreList[trimmedScoreList.length - 1]?.earnAmount > 0 ? formatNumber(trimmedScoreList[trimmedScoreList.length - 1]?.earnAmount) + '$' : '-'}</div>
                <div className={style.sb}>
                  <div className={style.send}>
                    <img src="../send.svg" alt="" />
                  </div>
                  <div className={style.verify}>
                    <img src="../verify.svg" alt="" />
                  </div>
                </div>
              </div>
              {trimmedScoreList.slice(0, -1).reverse().map((scoreList) => (
                <div className={`${scoreList.earnAmount > 0 ? style.withdrawbetItem : style.betItem}`}>
                  <div className={style.time}>{scoreList?.time}</div>
                  <div className={style.price} style={{fontSize: trimmedScoreList[trimmedScoreList.length - 1]?.consumAmount > 10000 ? '9px' : trimmedScoreList[trimmedScoreList.length - 1]?.consumAmount > 1000 ? '11px' : '12px' }}>{formatNumber(scoreList?.consumAmount)} ₽</div>
                  <div className={
                    Math.floor(scoreList?.coefficient) < 2
                      ? style.low
                      : Math.floor(scoreList?.coefficient) < 10
                        ? style.medium
                        : style.high
                  } style={{fontSize: "12px" }}>
                    {formatNumber(scoreList?.coefficient)}x
                  </div>
                  <div className={`${style.cashOut}`} style={{fontSize: trimmedScoreList[trimmedScoreList.length - 1]?.consumAmount > 10000 ? '9px' : trimmedScoreList[trimmedScoreList.length - 1]?.consumAmount > 1000 ? '11px' : '12px' }}>{scoreList?.earnAmount > 0 ? formatNumber(scoreList?.earnAmount) + '$' : '-'}</div>
                  <div className={style.sb}>
                    <div className={style.send}>
                      <img src="../send.svg" alt="" />
                    </div>
                    <div className={style.verify}>
                      <img src="../verify.svg" alt="" />
                    </div>
                  </div>
                </div>

              ))}
            </>
          )
        }
        {activeTab === 'tab-2' &&
          (
            <div id="menu-box-betList" className={style.menuTopBetList}>
              <div>
                <div className={style.dDvXLf}>
                  <button id="menu-box-dropdown-type" className={style.bteqaw} onClick={handleTopScoreMenuClick}>
                    <div className={style.bCBpzi}>
                      <span className={style.topWinsText}>Top Wins</span>
                      <img src="https://lucky-jet.gamedev-atech.cc/assets/media/f1753c1954e578e77a775be88cf3453d.svg"></img>
                    </div>
                  </button>
                </div>
                {topMenuClick && (
                  <div className={style.drpItemList}>
                    <div className={style.drpItem} id="topWins" onClick={handleTopMenuCheck}>Top wins</div>
                    <div className={style.drpItem} id="topWinning" onClick={handleTopMenuCheck}>Top winning</div>
                    <div className={style.drpItem} id="topCoef" onClick={handleTopMenuCheck}>Top coef</div>
                  </div>
                )}
              </div>
              <div>
                <div className={style.dDvXLf}>
                  <button id="menu-box-dropdown-type" className={style.bteqaw} onClick={handleDateMenuClick}>
                    <div className={style.bCBpzi}>
                      <span className={style.topWinsText}>Year</span>
                      <img src="https://lucky-jet.gamedev-atech.cc/assets/media/f1753c1954e578e77a775be88cf3453d.svg"></img>
                    </div>
                  </button>
                </div>

                {dateMenuClick && (
                  <div className={style.drpItemList}>
                    <div className={style.drpItem} id="year" onClick={handleTopDateCheck}>Year</div>
                    <div className={style.drpItem} id="month" onClick={handleTopDateCheck}>Month</div>
                    <div className={style.drpItem} id="day" onClick={handleTopDateCheck}>Day</div>
                  </div>
                )}
              </div>
            </div>
          )
        }
      </div>
    </div>
  );
};

export default HistoryBlock;
