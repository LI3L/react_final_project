import { observer } from "mobx-react-lite";
import { Words } from "../utils/Words";

const UsedLetters = observer(({ letter }) => {
  let letters = "";
  function addToLetters(letter) {
    letters += letter + ", ";
  }
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        width: "100%",
      }}
    >
      {addToLetters(letter)}
      <h3>{letters}</h3>
    </div>
  );
});

export default UsedLetters;
