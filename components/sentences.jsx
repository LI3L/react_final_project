import React, { useState, useEffect, use } from "react";
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
      await axios.post("http://localhost:3001/api/users/addPoints", {
        userId: user._id,
        points: sentences[randomSentenceIndex].points,
      });
      await axios.post(
        "http://localhost:3001/api/users/addSuccess/" + user._id
      );
      console.log(
        "s" +
          sentences[randomSentenceIndex].sentence +
          "||" +
          sentences[randomSentenceIndex].points
      );
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
        success: user.success + 1,
      });
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
      setContextUser({
        ...user,
        points: user.points + sentences[randomSentenceIndex].points,
      });
    } catch (err) {
      console.log(err);
    }
  }

  async function updateFail() {
    try {
      await axios.post(
        "http://localhost:3001/api/users/addFailure/" + user._id
      );
      setContextUser({
        ...user,
        failure: user.failure + 1,
      });
    } catch (err) {
      console.log(err);
    }
  }

  async function updateSuccess() {
    try {
      await axios.post(
        "http://localhost:3001/api/users/addSuccess/" + user._id
      );
      setContextUser({
        ...user,
        success: user.success + 1,
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
        if (response.data.length === user.sentences[dif].length) {
          setRandomSentenceIndex(-1);
          setActiveSentence("You finished this level");
        } else {
          let rnd = getRandomInt(0, response.data.length);
          while (user.sentences[dif].includes(response.data[rnd].sentence)) {
            rnd = getRandomInt(0, response.data.length);
          }
          setRandomSentenceIndex(rnd);
          createAnswer(rnd, response.data);
        }
      }
    } catch (err) {
      console.log(err);
    }
  }

  function createAnswer(rnd, data) {
    const sen = data[rnd].sentence.split(" ");
    const ans = sen[getRandomInt(0, sen.length)];
    const words = data[rnd].words;
    words.push(ans);
    words.sort(() => Math.random() - 0.5);
    setWords(words);
    setAnswer(ans);
    const temp = data[rnd].sentence.replace(ans, "__");
    setActiveSentence(temp);
  }

  useEffect(() => {
    const fetchData = async () => await getSentence();
    fetchData();
  }, [dif, user]);

  const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
  };

  async function checkWord(word) {
    if (word === answer) {
      setWrong("");
      await updateSentence();
    } else {
      setWrong("X");
      await updateFail();
    }
  }

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
      <h2>Points: {user.points}</h2>
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
            : activeSentence + " " + randomSentenceIndex}
        </h1>
        <div style={{ display: "flex" }}>
          {randomSentenceIndex !== -1 &&
            words.map((word, index) => (
              <button key={index} onClick={() => checkWord(word)}>
                {word}
              </button>
            ))}
          {randomSentenceIndex !== -1 ? (
            <h3 style={{ color: "red", fontSize: 40 }}>{wrong}</h3>
          ) : null}
        </div>
      </div>
    </div>
  );
}
