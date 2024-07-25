import style from "./MainContent.module.css";
import HistoryBlock from "../HistoryBlock/HistoryBlock";
import GameBlock from "../GameBlock/GameBlock";

const MainContent = () => {
  return (
    <div className={style.container}>
      <HistoryBlock />
      <GameBlock />
    </div>
  );
};

export default MainContent;
