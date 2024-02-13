import React, { useState, useEffect, use } from "react";
import axios from "axios";
import { useUser } from "./UserContext";

export default function Level({ dif }) {
  const { user, setUser: setContextUser } = useUser();
  const [words, setWords] = useState([]);
  const [randomWordIndex, setRadomWordIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [wrong, setWrong] = useState("");
  const btnStyle = {
    appearance: "button",
    backgroundColor: "#1899D6",
    border: "solid transparent",
    borderRadius: "16px",
    borderWidth: "0 0 4px",
    boxSizing: "border-box",
    color: "#FFFFFF",
    cursor: "pointer",
    display: "inline-block",
    fontSize: "15px",
    fontWeight: "700",
    letterSpacing: ".8px",
    lineHeight: "20px",
    margin: "0",
    outline: "none",
    overflow: "visible",
    textAlign: "center",
    textTransform: "lowercase",
    touchAction: "manipulation",
    userSelect: "none",
    webkitUserSelect: "none",
    width: "100%",
  };

  async function updateLevel() {
    try {
      await axios.post("http://localhost:3001/api/users/updateLevel", {
        userId: user._id,
        level: dif,
        data: [],
        type: "words",
      });
    } catch (err) {
      console.log(err);
    }

    const rnd = getRandomInt(0, words.length, words);
    setRandomWordsIndex(rnd);
    if (rnd !== -1) createAnswer(rnd, words);
  }

  const resetLevel = () => {
    updateLevel();
    setContextUser({
      ...user,
      words: {
        ...user.words,
        [dif]: [],
      },
    });
  };

  async function updateWords() {
    try {
      const response = await axios.post(
        "http://localhost:3001/api/users/addWord/" + user._id,
        {
          word: words[randomWordIndex].name,
          difficulty: dif,
        }
      );
      await axios.post("http://localhost:3001/api/users/addPoints", {
        userId: user._id,
        points: words[randomWordIndex].points,
      });
      await axios.post(
        "http://localhost:3001/api/words/addSuccess/" + user._id
      );
      setContextUser({
        ...user,
        points: user.points + words[randomWordIndex].points,
        words: {
          ...user.words,
          [dif]: [...user.words[dif], words[randomWordIndex].name],
        },
        success: user.success + 1,
      });
    } catch (err) {
      console.log(err);
    }
  }

  async function updateFailure() {
    try {
      await axios.post(
        "http://localhost:3001/api/words/addFailure/" + user._id
      );
      setContextUser({
        ...user,
        failure: user.failure + 1,
      });
    } catch (err) {
      console.log(err);
    }
  }
  async function getWords() {
    try {
      if (user._id) {
        const response = await axios.get(
          "http://localhost:3001/api/words/byDifficulty/" + dif
        );
        setWords(response.data);
        if (user.words[dif].length === response.data.length) {
          setRadomWordIndex(-1);
        } else {
          let rnd = getRandomInt(0, response.data.length, response.data);
          while (user.words[dif].includes(response.data[rnd].name)) {
            rnd = getRandomInt(0, response.data.length, response.data);
          }
          setRadomWordIndex(rnd);
        }
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    const fetchData = async () => await getWords();

    fetchData();
  }, [dif, user.points]);

  const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
  };

  const checkWord = () => {
    if (answer === words[randomWordIndex].translation) {
      setWrong("");
      setAnswer("");
      updateWords();
    } else {
      console.log(randomWordIndex);
      setWrong("X");
      setAnswer("");
      updateFailure();
    }
  };

  return (
    <div
      style={{
        margin: 0,
        width: "100%",
        height: "88%",
        display: "flex",
        backgroundColor: "#57CC04",
        flexDirection: "column",
        position: "absolute",
      }}
    >
      <h2>points: {user && user.points}</h2>
      <div
        style={{
          margin: 0,
          width: "100%",
          height: "88%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          position: "absolute",
        }}
      >
        <h1>
          {randomWordIndex == -1 ? "you finished this level" : ""}
          {words && randomWordIndex != -1 && words[randomWordIndex]
            ? words[randomWordIndex].name
            : ""}
        </h1>
        {randomWordIndex === -1 ? (
          <button style={btnStyle} onClick={resetLevel}>
            Reset Level{" "}
          </button>
        ) : (
          <>
            <div style={{ display: "flex" }}>
              <input
                id="answer"
                style={{ margin: 10 }}
                type="text"
                value={answer}
                onChange={(e) => {
                  e.preventDefault();
                  setAnswer(e.target.value);
                }}
              />
              <h3 style={{ color: "red", fontSize: 40 }}>{wrong}</h3>
            </div>
            <div>
              <button style={btnStyle} onClick={checkWord}>
                check
              </button>
              <button
                style={btnStyle}
                onClick={() => {
                  setRadomWordIndex(getRandomInt(0, words.length, words));
                  setWrong("");
                  setAnswer("");
                }}
              >
                next
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
