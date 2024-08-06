import style from "./MainContent.module.css";
import HistoryBlock from "../HistoryBlock/HistoryBlock";
import GameBlock from "../GameBlock/GameBlock";
import Header from "../Header/Header";

const MainContent = () => {
  return (
    <div className={style.container}>
      <Header />
      <HistoryBlock />
      <GameBlock />
    </div>
  );
};

export default MainContent;
