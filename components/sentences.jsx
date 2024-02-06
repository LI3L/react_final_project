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

  async function updatePoints() {
    try {
      await axios.post("http://localhost:3001/api/users/addPoints", {
        userId: user._id,
        points: sentences[randomSentenceIndex].points,
      });
      console.log("updatePoints");
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
        console.log(JSON.stringify(response.data));
        setRandomSentenceIndex(rnd);
        if (rnd !== -1) createAnswer(rnd, response.data);
      }
    } catch (err) {
      console.log(err);
    }
  }

  function createAnswer(rnd, data) {
    const randomWordIndex = getRandomInt(0, data.length, data);
    const ans = data[rnd].sentence.split(" ")[randomWordIndex];
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
      console.log("Random " + num);
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

  const checkWord = (clicked) => {
    if (answer === clicked) {
      console.log("Correct");
      updateSentence();
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
      if (rnd !== -1) {
        createAnswer(rnd, sentences);
      } else {
        return;
      }
      console.log("user: " + JSON.stringify(user));
      setWrong("");
    } else {
      setWrong("X");
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
            : activeSentence}
        </h1>
        <div style={{ display: "flex" }}>
          {randomSentenceIndex !== -1 &&
            words.map((word, index) => (
              <button key={index} onClick={() => checkWord(word)}>
                {word}
              </button>
            ))}
        </div>
      </div>
    </div>
  );
}
