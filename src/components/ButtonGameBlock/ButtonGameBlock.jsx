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
    if(historyData?.state === "ending" && status === "WITHDRAW") {
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
        <div className={style.one}>
          <div className={style.back}>
            <div className={style.only}></div>
          </div>
          <p className={style.text}>Автоставка</p>
          <div className={style.back}>
            <div className={style.only}></div>
          </div>
          <p className={style.text}>Автовывод</p>

          <div className={style.keff}>
            <span className={style.x}>х</span> 2.00
          </div>
        </div>

        <div className={style.background}>
          <div className={style.flex}>
            <div className={style.number}>
              <div className={style.onein}>
                <div className={style.img}>
                  <img style={{ width: "11px" }} src="https://lucky-jet.gamedev-atech.cc/assets/media/97de90559589bee034295a9d2e9e626a.svg" alt="" />
                </div>
                <input className={style.input} value={amount} onChange={handleAmountChange} />
                <div className={style.img}>
                  <img style={{ width: "11px" }} src="https://lucky-jet.gamedev-atech.cc/assets/media/02f73e3c8eee420b71b6f7c6b409b20d.svg" alt="" />
                </div>
              </div>
              <div className={style.twoin}>
                <div onClick={() => handleAmountIncrement(50)} className={style.numback}>
                  +50
                </div>
                <div onClick={() => handleAmountIncrement(100)} className={style.numback}>
                  +100
                </div>
                <div onClick={() => handleAmountIncrement(200)} className={style.numback}>
                  +200
                </div>
                <div onClick={() => handleAmountIncrement(500)} className={style.numback}>
                  +500
                </div>
              </div>
            </div>

            <div className={style.button}>
              <div onClick={handleBet} className={status === "START" ? style.stavkabtn : status === "WITHDRAW" ? style.withdrawBtn : style.cancelBtn}>
                {status === "WITHDRAW" ? (
                  <p>{amount * historyData?.current_coefficients[0]} </p>
                ) : null}
                <p>{status}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={style.stavka}>
        <div className={style.one}>
          <div className={style.back}>
            <div className={style.only}></div>
          </div>
          <p className={style.text}>Автоставка</p>
          <div className={style.back}>
            <div className={style.only}></div>
          </div>
          <p className={style.text}>Автовывод</p>

          <div className={style.keff}>
            <span className={style.x}>х</span> 2.00
          </div>
        </div>

        <div className={style.background}>
          <div className={style.flex}>
            <div className={style.number}>
              <div className={style.onein}>
                <div className={style.img}>
                  <img style={{ width: "11px" }} src="https://lucky-jet.gamedev-atech.cc/assets/media/97de90559589bee034295a9d2e9e626a.svg" alt="" />
                </div>
                <div className={style.input}>20 ₽</div>
                <div className={style.img}>
                  <img style={{ width: "11px" }} src="https://lucky-jet.gamedev-atech.cc/assets/media/02f73e3c8eee420b71b6f7c6b409b20d.svg" alt="" />
                </div>
              </div>
              <div className={style.twoin}>
                <div className={style.numback}>+50</div>
                <div className={style.numback}>+100</div>
                <div className={style.numback}>+200</div>
                <div className={style.numback}>+500</div>
              </div>
            </div>

            <div className={style.buttonTWO}>
              <div className={style.stavkabtn}>CTABKA</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ButtonGameBlock;
