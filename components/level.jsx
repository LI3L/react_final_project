import React, { useState, useEffect, use } from "react";
import axios from "axios";
import { useUser } from "./UserContext";
import { get } from "mobx";

export default function Level({ dif }) {
  const { user, setUser: setContextUser } = useUser();
  const [words, setWords] = useState([]);
  const [randomWordIndex, setRadomWordIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [wrong, setWrong] = useState("");
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
    } catch (err) {
      console.log(err);
    }
  }
  async function updatePoints() {
    try {
      const response = await axios.post(
        "http://localhost:3001/api/users/addPoints",
        {
          userId: user._id,
          points: words[randomWordIndex].points,
        }
      );
      console.log("updatePoints");
    } catch (err) {
      console.log(err);
    }
  }
  async function updateSuccsess() {
    try {
      await axios.post(
        "http://localhost:3001/api/words/addSuccess/" +
          words[randomWordIndex]._id
      );
    } catch (err) {
      console.log(err);
    }
  }
  async function updateFailure() {
    try {
      await axios.post(
        "http://localhost:3001/api/words/addFailure/" +
          words[randomWordIndex]._id
      );
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
        setRadomWordIndex(getRandomInt(0, response.data.length, response.data));
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    const fetchData = async () => await getWords();

    fetchData();
  }, [dif]);

  const getRandomInt = (min, max, words) => {
    try {
      let num = Math.floor(Math.random() * (max - min) + min);
      console.log("Random " + num);
      let invalid = true;
      if (user.words[dif].length === words.length) {
        return -1;
      }
      let count = 0;
      while (invalid && count < max) {
        invalid = false;
        for (let i = 0; i < user.words[dif].length; i++) {
          if (user.sentences[dif][i] === words[num].name) {
            invalid = true;
            break;
          }
        }
        if (invalid) {
          num = Math.floor(Math.random() * (max - min) + min);
          console.log("Invalid " + num);
        }
        count++;
      }
      if (count >= max) {
        console.log("Exceeded maximum attempts");
        return -1;
      }
      return num;
    } catch (err) {
      console.log(err);
    }
  };
  const checkWord = () => {
    if (getRandomInt === -1) {
      return;
    } else if (answer === words[randomWordIndex].translation) {
      updateWords();
      updatePoints();
      updateSuccsess();
      setRadomWordIndex(getRandomInt(0, words.length, words));
      setContextUser({
        ...user,
        points: user.points + words[randomWordIndex].points,
        words: {
          ...user.words,
          [dif]: [...user.words[dif], words[randomWordIndex].name],
        },
      });
      setAnswer("");
      setWrong("");
    } else {
      setWrong("X");
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
        {randomSentenceIndex === -1 ? (
          <button onClick={resetLevel}>Reset Level </button>
        ) : (
          ""
        )}
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
          <button style={{ margin: 10 }} onClick={checkWord}>
            check
          </button>
          <button
            onClick={() => {
              setRadomWordIndex(getRandomInt(0, words.length, words));
              setWrong("");
              setAnswer("");
            }}
          >
            next
          </button>
        </div>
      </div>
    </div>
  );
}

// RegisterUser.getLayout = function getLayout(page) {
//   return (
//     <Layout>
//       <NestedLayout>{page}</NestedLayout>
//     </Layout>
//   );
// };
