import React, { useState, useEffect, use } from "react";
import axios from "axios";
import { useUser } from "./UserContext";

export default function sentences({ dif }) {
  const { user, setUser: setContextUser } = useUser();
  const [sentences, setSentences] = useState([]);
  const [radomSentenceIndex, setRadomSentenceIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [activeSentence, setActiveSentence] = useState("");
  const [wrong, setWrong] = useState("");

  async function updateSentence() {
    try {
      const response = await axios.post(
        "http://localhost:3001/api/users/addSentence/" + user._id,
        {
          sentence: sentences[randomWordIndex].sentence,
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
          points: sentences[randomWordIndex].points,
        }
      );
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
        setRadomSentenceIndex(rnd);
        if (rnd != -1) createAnswer(rnd, response.data);
      }
    } catch (err) {
      console.log(err);
    }
  }
  function createAnswer(rnd, data) {
    let ans =
      data[rnd].sentence.split(" ")[
        getRandomInt(0, data[rnd].sentence.split(" ").length, data)
      ];
    setAnswer(ans);
    let temp = "";
    data[rnd].sentence.split(" ").map((word) => {
      if (word === ans) {
        temp += " " + "__";
      } else {
        temp += " " + word;
      }
    });

    setActiveSentence(temp);
    let tempWords = response.data[rmd].words;
    tempWords.push(ans);
    setWords(tempWords);
  }

  useEffect(() => {
    const fetchData = async () => await getSentence();
    fetchData();
  }, [dif]);

  const getRandomInt = (min, max, sentences) => {
    console.log("getRandomInt enter");
    let num = Math.floor(Math.random() * (max - min) + min);
    let end = false;
    while (
      user &&
      sentences.length > 0 &&
      user.sentences[dif].includes(sentences[num].sentence)
    ) {
      console.log(
        "while" +
          num +
          " " +
          sentences[num].sentence +
          " " +
          user.sentences[dif]
      );
      if (user && sentences && user.sentences[dif].length == sentences.length) {
        end = true;
        break;
      } else {
        num = Math.floor(Math.random() * (max - min) + min);
      }
    }
    if (end) {
      return -1;
    }
    return num;
  };
  const checkWord = (clicked) => {
    if (answer === clicked) {
      updateSentence();
      updatePoints();
      setContextUser({
        ...user,
        points: user.points + sentences[randomWordIndex].points,
        sentences: {
          ...user.words,
          [dif]: [...user.words[dif], sentences[randomWordIndex].name],
        },
      });
      const rnd = getRandomInt(0, sentences.length, sentences);
      setRadomSentenceIndex(rnd);
      if (rnd != -1) createAnswer(rnd, sentences);
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
      <h2>points: {user.points}</h2>
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
          {radomSentenceIndex == -1
            ? "you finished this level"
            : sentences &&
              radomSentenceIndex != -1 &&
              sentences[radomSentenceIndex]
            ? activeSentence
            : ""}
        </h1>
        <div style={{ display: "flex" }}>
          {console.log(JSON.stringify(sentences))}
          {radomSentenceIndex != -1
            ? sentences.map((word, index) => {
                return (
                  <button key={index} id={word} onClick={() => checkWord(word)}>
                    {word}
                  </button>
                );
              })
            : ""}
        </div>
      </div>
    </div>
  );
}
