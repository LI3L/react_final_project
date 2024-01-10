import { observer } from "mobx-react-lite";
import GameList from "./GameList";
import { Words } from "../utils/Words";
import StartGame from "./StartGame";
import { useEffect } from "react";

const GameCmp = observer(({ gameListState }) => {
  // let randomWord2=Words[Math.floor(Math.random() * Words.length)];
  // // const randomWord=()=>Words[Math.floor(Math.random() * Words.length)];}, [gameListState.gameOn]
  // // let word="_".repeat(randomWord.length);
  // useEffect(() => {
  //   const randomWord=()=>Words[Math.floor(Math.random() * Words.length)];
  //   return () => {
  //     randomWord2=randomWord();
  //   };
  // }, [gameListState.gameOn]);

  // console.log(randomWord2);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-around",
        width: "100%",
      }}
    >
      <GameList gameListState={gameListState} />
      {/* check for more then 2 */}
      {gameListState.playersInGame.length >= 2 && (
        <StartGame gameListState={gameListState} />
      )}
    </div>
  );
});

export default GameCmp;
