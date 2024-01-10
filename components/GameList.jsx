import { BigHead } from "@bigheads/core";
import { observer } from "mobx-react-lite";

const GameList = observer(({ gameListState }) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        width: "100%",
      }}
    >
      {gameListState.playersInGame.map((p) => (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            border: "1px solid black",
          }}
        >
          <BigHead {...p.img} style={{ height: "150px" }} />
          <h3 style={{ marginBottom: -20 }}>{p.name}</h3>
          <h4 style={{ marginBottom: -20 }}>score: {p.score}</h4>
          <h4>letters:{p.chars}</h4>
        </div>
      ))}
      {/* <small> (double-click a plater to edit)</small> */}
    </div>
  );
});

export default GameList;
