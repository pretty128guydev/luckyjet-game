import { shallowEqual, useSelector } from "react-redux";
import style from "./HistoryBlock.module.css";
import { useState } from "react";

const HistoryBlock = () => {
  const history_data = useSelector((state) => state.history.historyData, shallowEqual());
  const my_score_list = useSelector((state) => state.score.scoreList, shallowEqual());

  const cash_outs = history_data?.cash_outs || [];

  const [activeTab, setActiveTab] = useState('tab-0');
  const [activeScoreMenu, setActiveScoreMenu] = useState('topWins');
  const [activeDateMenu, setActiveDateMenu] = useState('year');
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
        {activeTab === 'tab-1' && my_score_list.length > 0 && my_score_list.map((scoreList) => {
          return (
            <div className={style.betDone}>
              <div className={style.time}>{scoreList?.time}</div>
              <div className={style.price}>{scoreList?.consumAmount} ₽</div>
              <div className={`${2 > Math.floor(scoreList?.coefficient) >= 1 ? style.low : 10 > Math.floor(scoreList?.coefficient) >= 2 ? style.medium : style.high}`}>{scoreList?.coefficient}x</div>
              <div className={style.cashOut}>{scoreList?.earnAmount > 0 ? scoreList?.earnAmount + '$' : '-'}</div>
              <div className={style.sb}>
                <div className={style.send}>
                  <img src="/public/send.svg" alt="" />
                </div>
                <div className={style.verify}>
                  <img src="/public/verify.svg" alt="" />
                </div>
              </div>
            </div>
          );
        })}
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
