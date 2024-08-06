import { shallowEqual, useSelector } from "react-redux";
import style from "./HistoryBlock.module.css";
import { useState } from "react";

const HistoryBlock = () => {
  const history_data = useSelector((state) => state.history.historyData, shallowEqual());
  const my_score_list = useSelector((state) => state.score.scoreList, shallowEqual());

  const cash_outs = history_data?.cash_outs || [];

  const [activeTab, setActiveTab] = useState('tab-0');
  const [activeMenu, setActiveMenu] = useState('topWins');
  const [topMenuClick, setTopMenuClick] = useState(false);

  // console.log("CASHOUT IS ", cash_outs);

  const handleTabClick = (e) => {
    setActiveTab(e.target.id);
  }

  const handleTopMenuClick = () => {
    setTopMenuClick(!topMenuClick);
  }

  const handleTopMenuCheck = (e) => {
    setActiveMenu(e.target.id);
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
              <div className={style.logo}>{scoreList?.time}</div>
              <div className={style.first}>{scoreList?.consumAmount} ₽</div>
              <div className={style.iks}>{scoreList?.coefficient}x</div>
              <div className={style.last}>{scoreList?.earnAmount} ₽</div>
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
                  <button id="menu-box-dropdown-type" className={style.bteqaw} onClick={handleTopMenuClick}>
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
                  )
                }
                
              </div>
            </div>
          )
        }
      </div>

      {/* <div className={style.betDone}>
        <div className={style.logo}>15:16:44</div>
        <div className={style.first}>1 000.00 ₽</div>
        <div className={style.iks}>7.00x</div>
        <div className={style.last}>7 000.00 ₽</div>
        <div className={style.sb}>
          <div className={style.send}>
            <img src="/public/send.svg" alt="" />
          </div>
          <div className={style.verify}>
            <img src="/public/verify.svg" alt="" />
          </div>
        </div>
      </div>

      <div className={style.betDone}>
        <div className={style.logo}>15:16:44</div>
        <div className={style.first}>1 000.00 ₽</div>
        <div className={style.iks}>7.00x</div>
        <div className={style.last}>7 000.00 ₽</div>
        <div className={style.sb}>
          <div className={style.send}>
            <img src="/public/send.svg" alt="" />
          </div>
          <div className={style.verify}>
            <img src="/public/verify.svg" alt="" />
          </div>
        </div>
      </div>

      <div className={style.betDone}>
        <div className={style.logo}>15:16:44</div>
        <div className={style.first}>1 000.00 ₽</div>
        <div className={style.iks}>7.00x</div>
        <div className={style.last}>7 000.00 ₽</div>
        <div className={style.sb}>
          <div className={style.send}>
            <img src="/public/send.svg" alt="" />
          </div>
          <div className={style.verify}>
            <img src="/public/verify.svg" alt="" />
          </div>
        </div>
      </div>

      <div className={style.bet}>
        <div className={style.logo}>15:19:44</div>
        <div className={style.first}>1 000.00 ₽</div>
        <div className={style.iks}>9.00x</div>
        <div className={style.nope}>-</div>
        <div className={style.sb}>
          <div className={style.send}>
            <img src="/public/send.svg" alt="" />
          </div>
          <div className={style.verify}>
            <img src="/public/verify.svg" alt="" />
          </div>
        </div>
      </div>

      <div className={style.betDone}>
        <div className={style.logo}>15:16:44</div>
        <div className={style.first}>1 000.00 ₽</div>
        <div className={style.iks}>7.00x</div>
        <div className={style.last}>7 000.00 ₽</div>
        <div className={style.sb}>
          <div className={style.send}>
            <img src="/public/send.svg" alt="" />
          </div>
          <div className={style.verify}>
            <img src="/public/verify.svg" alt="" />
          </div>
        </div>
      </div>

      <div className={style.betDone}>
        <div className={style.logo}>15:17:44</div>
        <div className={style.first}>1 000.00 ₽</div>
        <div className={style.iks}>2.40x</div>
        <div className={style.last}>2 400.00 ₽</div>
        <div className={style.sb}>
          <div className={style.send}>
            <img src="/public/send.svg" alt="" />
          </div>
          <div className={style.verify}>
            <img src="/public/verify.svg" alt="" />
          </div>
        </div>
      </div>

      <div className={style.bet}>
        <div className={style.logo}>15:19:44</div>
        <div className={style.first}>1 000.00 ₽</div>
        <div className={style.iks}>9.00x</div>
        <div className={style.nope}>-</div>
        <div className={style.sb}>
          <div className={style.send}>
            <img src="/public/send.svg" alt="" />
          </div>
          <div className={style.verify}>
            <img src="/public/verify.svg" alt="" />
          </div>
        </div>
      </div>

      <div className={style.bet}>
        <div className={style.logo}>15:19:44</div>
        <div className={style.first}>1 000.00 ₽</div>
        <div className={style.iks}>9.00x</div>
        <div className={style.nope}>-</div>
        <div className={style.sb}>
          <div className={style.send}>
            <img src="/public/send.svg" alt="" />
          </div>
          <div className={style.verify}>
            <img src="/public/verify.svg" alt="" />
          </div>
        </div>
      </div>

      <div className={style.bet}>
        <div className={style.logo}>15:19:44</div>
        <div className={style.first}>1 000.00 ₽</div>
        <div className={style.iks}>9.00x</div>
        <div className={style.nope}>-</div>
        <div className={style.sb}>
          <div className={style.send}>
            <img src="/public/send.svg" alt="" />
          </div>
          <div className={style.verify}>
            <img src="/public/verify.svg" alt="" />
          </div>
        </div>
      </div>

      <div className={style.bet}>
        <div className={style.logo}>15:26:44</div>
        <div className={style.first}>1 000.00 ₽</div>
        <div className={style.iks}>1.20x</div>
        <div className={style.nope}>-</div>
        <div className={style.sb}>
          <div className={style.send}>
            <img src="/public/send.svg" alt="" />
          </div>
          <div className={style.verify}>
            <img src="/public/verify.svg" alt="" />
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default HistoryBlock;
