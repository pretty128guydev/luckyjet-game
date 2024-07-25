import ButtonGameBlock from "../ButtonGameBlock/ButtonGameBlock";
import HistoryGameBlock from "../HistoryGameBlock/HistoryGameBlock";
import MainGameBlock from "../MainGameBlock/MainGameBlock";
import style from "./GameBlock.module.css";

const GameBlock = () => {
  return (
    <div className={style.game}>
      {/* <HistoryGameBlock /> */}
      <MainGameBlock />
      <ButtonGameBlock />
    </div>
  );
};

export default GameBlock;
