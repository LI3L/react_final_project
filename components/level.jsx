import React, { useState, useEffect, use } from "react";
import axios from "axios";
import { useUser } from "./UserContext";

export default function Level({ dif }) {
  const { user, setUser: setContextUser } = useUser();
  const [words, setWords] = useState([]);
  const [randomWordIndex, setRadomWordIndex] = useState(0);
  const [answer, setAnswer] = useState("");

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
  async function getWords() {
    try {
      if (user._id) {
        const response = await axios.get(
          "http://localhost:3001/api/words/byDifficulty/" + dif
        );
        setWords(response.data);
        setRadomWordIndex(getRandomInt(0, response.data.length));
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    const fetchData = async () => await getWords();

    fetchData();
  }, [dif]);

  const getRandomInt = (min, max) => {
    let num = Math.floor(Math.random() * (max - min) + min);
    let end = false;
    while (
      user &&
      words.length > 0 &&
      user.words[dif].includes(words[num].name)
    ) {
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
    if (answer === words[randomWordIndex].translation) {
      updateWords();
      updatePoints();
      setRadomWordIndex(getRandomInt(0, words.length));
      setContextUser({
        ...user,
        points: user.points + words[randomWordIndex].points,
        words: {
          ...user.words,
          [dif]: [...user.words[dif], words[randomWordIndex].name],
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
        {randomWordIndex == -1 ? "you finished this level" : ""}
        {words && randomWordIndex != -1 && words[randomWordIndex]
          ? words[randomWordIndex].name
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
