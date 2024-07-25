import { shallowEqual, useSelector } from "react-redux";
import style from "./HistoryBlock.module.css";

const HistoryBlock = () => {
  const history_data = useSelector((state) => state.history.historyData, shallowEqual());
  const my_score_list = useSelector((state) => state.score.scoreList, shallowEqual());

  const cash_outs = history_data?.cash_outs || [];

  // console.log("CASHOUT IS ", cash_outs);

  return (
    <div className={style.history}>
      <div className={style.block}>
        <div className={style.no}>Все</div>
        <div className={style.active}>Мои</div>
        <div className={style.notwo}>Топ</div>
      </div>
      <div className="">
        {my_score_list.length > 0 && my_score_list.map((scoreList) => {
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
