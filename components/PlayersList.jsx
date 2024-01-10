import { observer } from "mobx-react-lite";
import { BigHead } from "@bigheads/core";
// import {ListHead} from "./ListHead.jsx"

// import TodoView from "./TodoView";

const PlayersList = observer(({ players: playersState, gameListState }) => {
  const removePlayer = (p) => {
    playersState.removePlayer(p.id);
    gameListState.removePlayer(p.id);
  };

  const checked = (player) => {
    if (gameListState.playersInGame.find((p) => p.id == player.id)) {
      gameListState.removePlayer(player.id);
    } else if (gameListState.playersInGame.length <= 4) {
      gameListState.addToGame(playersState.players.find((p) => p.id == player.id));
    } else {
      alert("the game is full");
    }
  };

  return (
    <div>
      {playersState.players.map((p) => (
        <>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <BigHead {...p.img} style={{ height: "50px" }} />
            <h4>{p.name}</h4>
            <input type="checkbox" onClick={() => checked(p)} />
            <button onClick={() => removePlayer(p)}>X</button>
          </div>
        </>
      ))}
      {/* <small> (double-click a plater to edit)</small> */}
    </div>
  );
});

export default PlayersList;
