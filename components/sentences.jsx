import React, { useState, useEffect } from "react";
import axios from "axios";
import { useUser } from "./UserContext";

export default function Sentences({ dif }) {
  const { user, setUser: setContextUser } = useUser();
  const [sentences, setSentences] = useState([]);
  const [randomSentenceIndex, setRandomSentenceIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [activeSentence, setActiveSentence] = useState("");
  const [words, setWords] = useState([]);
  const [wrong, setWrong] = useState("");

  async function updateSentence() {
    try {
      await axios.post(
        "http://localhost:3001/api/users/addSentence/" + user._id,
        {
          sentence: sentences[randomSentenceIndex].sentence,
          difficulty: dif,
        }
      );
    } catch (err) {
      console.log(err);
    }
  }
  async function updateSuccsess() {
    try {
      await axios.post(
        "http://localhost:3001/api/words/addSuccess/" +
          sentences[randomSentenceIndex]._id
      );
    } catch (err) {
      console.log(err);
    }
  }
  async function updateFailure() {
    try {
      await axios.post(
        "http://localhost:3001/api/words/addFailure/" +
          sentences[randomWordIndex]._id
      );
    } catch (err) {
      console.log(err);
    }
  }

  async function updatePoints() {
    try {
      await axios.post("http://localhost:3001/api/users/addPoints", {
        userId: user._id,
        points: sentences[randomSentenceIndex].points,
      });
    } catch (err) {
      console.log(err);
    }
  }
  async function updateLevel() {
    try {
      await axios.post("http://localhost:3001/api/users/updateLevel", {
        userId: user._id,
        level: dif,
        data: [],
        type: "sentences",
      });
    } catch (err) {
      console.log(err);
    }
  }

  async function getSentence() {
    try {
      if (user._id) {
        const response = await axios.get(
          "http://localhost:3001/api/sentences/difficulty/" + dif
        );
        setSentences(response.data);
        const rnd = getRandomInt(0, response.data.length, response.data);
        setRandomSentenceIndex(rnd);
        if (rnd !== -1) createAnswer(rnd, response.data);
      }
    } catch (err) {
      console.log(err);
    }
  }

  function createAnswer(rnd, data) {
    const randomWordIndex = getRandomInt(0, data.length, data);
    const ans = data[rnd].sentence.trim().split(" ")[randomWordIndex];
    const words = data[rnd].words;
    words.push(ans);
    setWords(words);
    setAnswer(ans);

    const temp = data[rnd].sentence.replace(ans, "__");
    setActiveSentence(temp);
  }

  useEffect(() => {
    const fetchData = async () => await getSentence();
    fetchData();
  }, [dif]);

  const getRandomInt = (min, max, sentences) => {
    try {
      let num = Math.floor(Math.random() * (max - min) + min);
      let invalid = true;
      if (user.sentences[dif].length === sentences.length) {
        return -1;
      }
      let count = 0;
      while (invalid && count < max) {
        invalid = false;
        for (let i = 0; i < user.sentences[dif].length; i++) {
          if (user.sentences[dif][i] === sentences[num].sentence) {
            invalid = true;
            break;
          }
        }
        if (invalid) {
          num = Math.floor(Math.random() * (max - min) + min);
        }
        count++;
      }
      if (count >= max) {
        return -1;
      }
      return num;
    } catch (err) {
      console.log(err);
    }
  };
  const resetLevel = () => {
    updateLevel();
    setContextUser({
      ...user,
      sentences: {
        ...user.sentences,
        [dif]: [],
      },
    });

    const rnd = getRandomInt(0, sentences.length, sentences);
    setRandomSentenceIndex(rnd);
    document.getElementById(0).style.background = "white";
    document.getElementById(1).style.background = "white";
    document.getElementById(2).style.background = "white";
    document.getElementById(3).style.background = "white";
    if (rnd !== -1) {
      createAnswer(rnd, sentences);
    } else return;
  };

  const checkWord = (clicked, id) => {
    if (randomSentenceIndex === -1) {
      return;
    } else if (answer === clicked) {
      updateSentence();
      updateSuccsess();
      updatePoints();
      setContextUser({
        ...user,
        points: user.points + sentences[randomSentenceIndex].points,
        sentences: {
          ...user.sentences,
          [dif]: [
            ...user.sentences[dif],
            sentences[randomSentenceIndex].sentence,
          ],
        },
      });
      const rnd = getRandomInt(0, sentences.length, sentences);
      setRandomSentenceIndex(rnd);
      document.getElementById(0).style.background = "white";
      document.getElementById(1).style.background = "white";
      document.getElementById(2).style.background = "white";
      document.getElementById(3).style.background = "white";
      if (rnd !== -1) {
        createAnswer(rnd, sentences);
      } else return;
    } else {
      updateFailure();
      document.getElementById(id).style.background = "red";
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
      <h2>Points: {user && user.points}</h2>
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
          {randomSentenceIndex === -1
            ? "You finished this level"
            : activeSentence}
        </h1>
        {/* {randomSentenceIndex === -1 ? (
          <button onClick={resetLevel}>Reset Level </button>
        ) : (
          ""
        )} */}
        <div style={{ display: "flex" }}>
          {randomSentenceIndex !== -1 &&
            words.map((word, index) => (
              <button id={index} onClick={() => checkWord(word, index)}>
                {word}
              </button>
            ))}
        </div>
      </div>
    </div>
  );
}
