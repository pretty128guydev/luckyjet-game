import ButtonGameBlock from "../ButtonGameBlock/ButtonGameBlock";
import HistoryGameBlock from "../HistoryGameBlock/HistoryGameBlock";
import MainGameBlock from "../MainGameBlock/MainGameBlock";
import style from "./GameBlock.module.css";
import RoundHistory from '../RoundHistory/RoundHistory'

const GameBlock = () => {
  return (
    <div className={style.game}>
      <MainGameBlock />
      {/* <ButtonGameBlock /> */}
    </div>
  );
};

export default GameBlock;
