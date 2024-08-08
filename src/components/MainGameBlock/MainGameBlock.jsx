import React, { startTransition, useEffect, useState } from "react";
import "./MainGameBlock.css"; // Import the CSS file
import usePolling from "../../hooks/usePolling";
import useSmoothIncrement from "../../hooks/useSmoothIncrement";
import GameAnimation from "./GameAnimation";
import { useDispatch, useSelector } from "react-redux";

import style from "./ButtonGameBlock.module.css";
import { decreaseMoney, increaseMoney } from "../../store/actions/moneyActions";
import { fetchHistoryData } from "../../store/actions/historyActions";
import { saveScore } from "../../store/actions/scoreActions";

const MainGameBlock = () => {
  const [animationKey, setAnimationKey] = useState(0); // State to reset animation
  const [flyAway, setFlyAway] = useState(false);
  const [resetCoefficient, setResetCoefficient] = useState(true);
  const [showToast, setShowToast] = useState(false);
  const [withdrawValue, setWithdrawValue] = useState(1);
  const [totalAmount, setTotalAmount] = useState(0);
  const dispatch = useDispatch();

  const historyData = useSelector((state) => state.history.historyData);
  const withdrawInfo = useSelector((state) => state.score.withdrawInfo);
  const current_amount = useSelector((state) => state.money.currentMoney);

  useEffect(() => {
    console.log("Current money" , current_amount)
  }, [current_amount])

  const [amount, setAmount] = useState(20);
  const [status, setStatus] = useState("START");

  const now = new Date();
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const seconds = now.getSeconds().toString().padStart(2, '0');
  const time24 = `${hours}:${minutes}:${seconds}`;

  usePolling(() => dispatch(fetchHistoryData()), 1000);

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };
  const handleAmountIncrement = (value) => {
    setAmount(amount + value);
  };
  const handleFlyAway = () => {
    setFlyAway(true);
  };
  // Function to restart animations
  const restartAnimations = () => {
    setFlyAway(false); // Reset flyAway state
    setAnimationKey((prev) => prev + 1); // Trigger animation reset
    setResetCoefficient(true); // Reset coefficient at the start of a new round
  };

  const targetCoefficient = resetCoefficient ? 1 : historyData?.current_coefficients[0] || 0;
  // console.log(targetCoefficient);
  const displayCoefficient = useSmoothIncrement(targetCoefficient);

  const formatNumber = (number) => {
    const formattedNumber = new Intl.NumberFormat('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(number)
    return formattedNumber.replace(',', '.');
  }

  useEffect(() => {
    if ((historyData?.state === "betting" || historyData?.state === "waiting")
      && status === "CANCEL") {
      setStatus("WAITING");
    }

    if (historyData?.state === "flying" && status !== "START") {
      setStatus("WITHDRAW");
      dispatch(decreaseMoney(amount));
    }

    if (status === "WITHDRAW" && flyAway) {
      setStatus("START");

      const scoreList = {
        time: time24,
        coefficient: displayCoefficient,
        consumAmount: amount,
        earnAmount: '-'
      }

      dispatch(saveScore(scoreList))
    }

    if(status === "WAITING" && historyData?.state === "ending") {
      setStatus("START");
    }
  }, [historyData?.state, flyAway]);

  useEffect(() => {
    if (historyData?.state === "betting") {
      restartAnimations();
    } else if (historyData?.state === "ending") {
      // setTimeout(() => {
      //   handleFlyAway();
      //   setResetCoefficient(false); // Stop resetting coefficient when the round ends
      // }, 2000)
    } else {
      setResetCoefficient(false);
    }
  }, [historyData?.state]);

  setTimeout(() => {
    if (showToast) {
      setShowToast(false)
    }
  }, 2000)

  useEffect(() => {
    setTotalAmount(amount * displayCoefficient);

    if (historyData?.state === "ending" && displayCoefficient === historyData?.current_coefficients[0]) {
      handleFlyAway();
      setResetCoefficient(false); // Stop resetting coefficient when the round ends
    }
  }, [displayCoefficient, historyData?.current_coefficients]);

  const handleBet = () => {
    if (status === "START") {
      if (current_amount - amount >= 0) {
        if (historyData?.state === "betting" || historyData?.state === "waiting") {
          setStatus("WAITING");
        } else {
          setStatus("CANCEL");
        }
      } else {
        alert("Недостаточно средств");
      }
    } else if (status === "CANCEL") {
      setStatus("START");
    } else if (status === "WITHDRAW") {
      setStatus("START");
      setShowToast(true);
      setWithdrawValue(displayCoefficient);

      const scoreList = {
        time: time24,
        coefficient: displayCoefficient,
        consumAmount: amount,
        earnAmount: displayCoefficient * amount
      }

      console.log(scoreList)

      dispatch(saveScore(scoreList))

      console.log("Amount = ", amount, "WithdrawValue", withdrawValue);
      // dispatch(increaseMoney(amount * withdrawValue));
    }
  }

  useEffect(() => {
    if(status === "START" && withdrawValue !== 1) {
      dispatch(increaseMoney(amount * withdrawValue));
    }
  }, [withdrawValue])

  return (
    <>
      {historyData?.state === "waiting" || historyData?.state === "betting" ?
        <>
          <div className="loading-container">
            <img src="/loading.svg" alt="" />
            <h3 className="waiting-text">Waiting for the next <br></br>round</h3>
            <div style={{ width: "245px", background: "rgba(255, 255, 255, 0.1)", borderRadius: "24px", height: "5px" }}>
              <div className="jMhEmG">
              </div>
            </div>
          </div>
        </>
        : <div style={{ height: "100%" }} className={`game-container ${historyData?.state === "waiting" ? "loading" : ""} ${flyAway ? "animation-stopped" : ""}`}>
          <div className={`star ${flyAway ? "animation-stopped" : ""}`}></div>
          <div className={`cloud ${flyAway ? "animation-stopped" : ""}`}></div>
          {<div className={`toast ${showToast ? "show" : ""}`}>
            <div id="win-notify" className="win-notify">
              <div className="eGpkga">
                <span>You managed to get it!</span>
                <h2>
                  x {formatNumber(withdrawValue)}
                </h2>
              </div>
              <div className="bjRgBy">
                <h2>{formatNumber(amount * withdrawValue)}&nbsp;₽</h2>
                <span>Your winnings</span>
              </div>
            </div>
          </div>}
          <div className="game-center-text">
            <div className={`current-coffecient ${flyAway ? "animation-coffecient" : ''}`}><span style={{ fontSize: "40px" }}>x</span>{formatNumber(displayCoefficient)}</div>
            {historyData?.state === "ending" && flyAway && <h3 className="game-text flew-away">Flew Away</h3>}
          </div>
          <GameAnimation
            flyAway={flyAway}
            animationKey={animationKey}
          />
        </div>}

      <div className={style.main}>
        <div className={style.stavka}>
          <div className={style.slotHeader}>
            <div className={style.autoBet}>
              <div className={style.autoBetCheckBox}></div>
              <div className={style.autoBetText}>Auto bet</div>
            </div>
            <div className={style.autoWithdrawal}>
              <div className={style.autoWithdrawalCheckBox}></div>
              <div className={style.autoWithdrawalText}>Auto withdrawal</div>
            </div>
            <div className={style.coefInput}>
              <input id="coef-input" pattern="\d*(\s|\d)*(\.|,)?\d?\d?" type="text" inputmode="decimal" className={`${style.jwCcuy}`} value="x 2.00" />
              <div className={`${style.iBYHtE}`}>
                <div>x</div>
                <div>2.00</div>
              </div>
            </div>
          </div>

          <div className={style.betButtonGroup}>
            <div className={style.betAmountController}>
              <div className={style.top}>
                <div className={style.minus}>
                  <button id="bet-control-minus" className={style.btnMinus}>
                    <div className={`${style.hSepGF}`}>
                      <img src="https://lucky-jet.gamedev-atech.cc/assets/media/97de90559589bee034295a9d2e9e626a.svg" />
                    </div>

                  </button>
                </div>
                <div className={style.currentAmount}>
                  <input className={style.input} value={`${amount}\u00A0₽`} onChange={handleAmountChange} />
                </div>
                <div className={style.plus}>
                  <button id="bet-control-plus" className={style.btnMinus}>
                    <div className={`${style.hSepGF}`}>
                      <img src="https://lucky-jet.gamedev-atech.cc/assets/media/02f73e3c8eee420b71b6f7c6b409b20d.svg" />
                    </div>
                  </button>
                </div>
              </div>
              <div className={style.bottom}>
                <div className={style.chnFhm}>
                  <button className={style.btnMinus} onClick={() => handleAmountIncrement(50)}>
                    <div className={style.hSepGF}>+50
                    </div>
                  </button>
                </div>
                <div className={style.chnFhm}>
                  <button className={style.btnMinus} onClick={() => handleAmountIncrement(100)}>
                    <div className={style.hSepGF}>+100
                    </div>
                  </button>
                </div>
                <div className={style.chnFhm}>
                  <button className={style.btnMinus} onClick={() => handleAmountIncrement(200)}>
                    <div className={style.hSepGF}>+200
                    </div>
                  </button>
                </div>
                <div className={style.chnFhm}>
                  <button className={style.btnMinus} onClick={() => handleAmountIncrement(500)}>
                    <div className={style.hSepGF}>+500
                    </div>
                  </button>
                </div>
              </div>
            </div>
            <button className={`${style.betAfter} ${status === "START" ? style.betAfter : status === "WITHDRAW" ? style.withdrawAfter : status === "WAITING" ? style.waitingAfter : style.cancelAfter}`} disabled={status === "WAITING" ? 'disabled' : ''} onClick={handleBet}>
              <div className={status === "START" ? style.stavkabtn : status === "WITHDRAW" ? style.withdrawBtn : status === "WAITING" ? style.waitingBtn : style.cancelBtn}>
                {status === "WITHDRAW" ? (
                  <div>{formatNumber(totalAmount)}&nbsp;₽</div>
                ) : null}
                <div>{status}</div>
              </div>
            </button>
          </div>
        </div>
        <div className={style.stavka}>
          <div className={style.slotHeader}>
            <div className={style.autoBet}>
              <div className={style.autoBetCheckBox}></div>
              <div className={style.autoBetText}>Auto bet</div>
            </div>
            <div className={style.autoWithdrawal}>
              <div className={style.autoWithdrawalCheckBox}></div>
              <div className={style.autoWithdrawalText}>Auto withdrawal</div>
            </div>
            <div className={style.coefInput}>
              <input id="coef-input" pattern="\d*(\s|\d)*(\.|,)?\d?\d?" type="text" inputmode="decimal" className={`${style.jwCcuy}`} value="x 2.00" />
              <div className={`${style.iBYHtE}`}>
                <div>x</div>
                <div>2.00</div>
              </div>
            </div>
          </div>

          <div className={style.betButtonGroup}>
            <div className={style.betAmountController}>
              <div className={style.top}>
                <div className={style.minus}>
                  <button id="bet-control-minus" className={style.btnMinus}>
                    <div className={`${style.hSepGF}`}>
                      <img src="https://lucky-jet.gamedev-atech.cc/assets/media/97de90559589bee034295a9d2e9e626a.svg" />
                    </div>

                  </button>
                </div>
                <div className={style.currentAmount}> 
                  <input className={style.input} value={`${200}\u00A0₽`} />
                </div>
                <div className={style.plus}>
                  <button id="bet-control-plus" className={style.btnMinus}>
                    <div className={`${style.hSepGF}`}>
                      <img src="https://lucky-jet.gamedev-atech.cc/assets/media/02f73e3c8eee420b71b6f7c6b409b20d.svg" />
                    </div>
                  </button>
                </div>
              </div>
              <div className={style.bottom}>
                <div className={style.chnFhm}>
                  <button className={style.btnMinus}>
                    <div className={style.hSepGF}>+50
                    </div>
                  </button>
                </div>
                <div className={style.chnFhm}>
                  <button className={style.btnMinus}>
                    <div className={style.hSepGF}>+100
                    </div>
                  </button>
                </div>
                <div className={style.chnFhm}>
                  <button className={style.btnMinus}>
                    <div className={style.hSepGF}>+200
                    </div>
                  </button>
                </div>
                <div className={style.chnFhm}>
                  <button className={style.btnMinus}>
                    <div className={style.hSepGF}>+500
                    </div>
                  </button>
                </div>
              </div>
            </div>
            <button className={`${style.betAfter}`}>
              <div className={style.stavkabtn}>
                <p>START</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainGameBlock;
