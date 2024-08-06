import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import style from "./ButtonGameBlock.module.css";
import { decreaseMoney } from "../../store/actions/moneyActions";
import usePolling from "../../hooks/usePolling";
import { fetchHistoryData } from "../../store/actions/historyActions";
import { saveScore } from "../../store/actions/scoreActions";


const ButtonGameBlock = () => {
  const [amount, setAmount] = useState(500);
  const [status, setStatus] = useState("START");

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };
  const handleAmountIncrement = (value) => {
    setAmount(amount + value);
  };
  const dispatch = useDispatch();
  const historyData = useSelector((state) => state.history.historyData);
  const current_amount = useSelector((state) => state.money.currentMoney);

  usePolling(() => dispatch(fetchHistoryData()), 1000);

  useEffect(() => {
    if (historyData?.state === "flying" && status !== "START") {
      setStatus("WITHDRAW");
    }
    if (historyData?.state === "ending" && status === "WITHDRAW") {
      setStatus("START");

      const scoreList = {
        time: new Date().toLocaleTimeString(),
        coefficient: historyData?.current_coefficients[0],
        consumAmount: historyData?.current_coefficients[0] * amount,
        earnAmount: historyData?.current_coefficients[0] * amount - amount
      }

      dispatch(saveScore(scoreList))
    }
  }, [historyData?.state]);

  const handleBet = () => {
    if (historyData?.state === "betting") {
      if (current_amount - amount >= 0) {
        dispatch(decreaseMoney(amount));
      } else {
        alert("Недостаточно средств");
      }
      setStatus("CANCEL")
    } else if (historyData?.state === "flying") {
      setStatus("CANCEL");
    } else if (historyData?.state === "ending") {
      setStatus("START");
    } else if (historyData?.state === "waiting") {
      setStatus("WITHDRAW");
    }

    if (status === "CANCEL" || status === "WITHDRAW") {
      setStatus("START");
    }

  };
  return (
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
            <input id="coef-input" pattern="\d*(\s|\d)*(\.|,)?\d?\d?" type="text" inputmode="decimal" className={`${style.jwCcuy}`} value="1.00" />
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
                <input className={style.input} value={amount} onChange={handleAmountChange} />
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
          <button className={style.betButton} onClick={handleBet}>
            <div className={status === "START" ? style.stavkabtn : status === "WITHDRAW" ? style.withdrawBtn : style.cancelBtn}>
              {status === "WITHDRAW" ? (
                  <p>{amount * historyData?.current_coefficients[0]} </p>
                ) : null}
                <p>{status}</p>
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
            <input id="coef-input" pattern="\d*(\s|\d)*(\.|,)?\d?\d?" type="text" inputmode="decimal" className={`${style.jwCcuy}`} value="1.00" />
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
                <input className={style.input} value={amount} onChange={handleAmountChange} />
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
          <button className={style.betButton}>
            <div className={style.stavkabtn}> START </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ButtonGameBlock;
