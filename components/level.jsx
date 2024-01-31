import React, { useState, useEffect } from "react";
import axios from "axios";
import { useUser } from "./UserContext";

export default function Level({ dif }) {
  const { user, setUser: setContextUser } = useUser();
  const [words, setWords] = useState([]);
  const [radomWordIndex, setRadomWordIndex] = useState(0);
  const [answer, setAnswer] = useState("");

  console.log("LEVEL " + JSON.stringify(user) + " " + dif);
  async function updateWords() {
    console.log();
    try {
      const response = await axios.post(
        "http://localhost:3001/api/users/addWord/" + user._id,
        {
          word: words[radomWordIndex].name,
          difficulty: dif,
        }
      );
      console.log("updateWords");
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
          points: words[radomWordIndex].points,
        }
      );
      console.log("updatePoints");
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
      }
    } catch (err) {
      console.log(err);
    }
    setRadomWordIndex(getRandomInt(0, words.length));
  }

  useEffect(() => {
    getWords();
  }, []);
  const getRandomInt = (min, max) => {
    let num = Math.floor(Math.random() * (max - min) + min);
    let end = false;
    console.log("--------------------" + JSON.stringify(words[num]));
    while (user && words && user.words[dif].includes(words[num].name)) {
      if (user && words && user.words[dif].length == words.length) {
        end = true;
        break;
      }
      num = Math.floor(Math.random() * (max - min) + min);
    }
    if (end) {
      return -1;
    }
    return num;
  };
  const checkWord = () => {
    console.log(answer);
    console.log(words);
    console.log(radomWordIndex);
    console.log(words[radomWordIndex]);
    if (answer === words[radomWordIndex].translation) {
      updateWords();
      updatePoints();
      setRadomWordIndex(getRandomInt(0, words.length));
      setContextUser({
        ...user,
        points: user.points + words[radomWordIndex].points,
        words: {
          ...user.words,
          [dif]: [...user.words[dif], words[radomWordIndex].name],
        },
      });
      setAnswer("");
    } else {
      console.log("wrong");
    }
  };

  return (
    <div
      style={{
        margin: 0,
        width: "100%",
        height: "88%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "red",
        flexDirection: "column",
        position: "absolute",
      }}
    >
      <h1>
        {radomWordIndex == -1 ? "you finished this level" : ""}
        {words && radomWordIndex != -1 && words[radomWordIndex]
          ? words[radomWordIndex].name
          : ""}
      </h1>
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
      <div>
        <button style={{ margin: 10 }} onClick={checkWord}>
          check
        </button>
        <button
          onClick={() => setRadomWordIndex(getRandomInt(0, words.length))}
        >
          next
        </button>
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
