import React, { useState, useEffect } from "react";
import axios from "axios";
import { useUser } from "./UserContext";
import { set } from "mobx";

export default function sentences({ dif }) {
  const { user, setUser: setContextUser } = useUser();
  const [sentences, setSentences] = useState([]);
  const [radomSentenceIndex, setRadomSentenceIndex] = useState(0);
  const [activeSentence, setActiveSentence] = useState("");
  const [answer, setAnswer] = useState("");
  const [words, setWords] = useState([]);

  async function updateSentences() {
    try {
      const response = await axios.post(
        "http://localhost:3001/api/users/addWord/" + user._id,
        {
          word: sentences[radomSentenceIndex].sentence,
          difficulty: dif,
        }
      );
      console.log("updateSentences");
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
          points: sentences[radomSentenceIndex].points,
        }
      );
      console.log("updatePoints");
    } catch (err) {
      console.log(err);
    }
  }
  async function getSentences() {
    try {
      if (user._id) {
        const response = await axios.get(
          "http://localhost:3001/api/sentences/difficulty/" + dif
        );
        console.log("getSentences: " + JSON.stringify(response.data));
        setSentences(response.data);
        console.log("sentences------" + JSON.stringify(sentences));
      }
    } catch (err) {
      console.log(err);
    }
    setRadomSentenceIndex(getRandomInt(0, sentences.length));
    setAnswer(
      sentences[radomSentenceIndex].sentence.split(" ")[
        getRandomInt(
          0,
          sentences[radomSentenceIndex].sentence.split(" ").length
        )
      ]
    );
    sentences[radomSentenceIndex].sentence.split(" ").map((word) => {
      if (word === answer) {
        setActiveSentence(activeSentence + " " + "______");
      } else {
        setActiveSentence(activeSentence + " " + word);
      }
    });
    setWords(sentences[radomSentenceIndex].words, answer);

    for (let i = words.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [words[i], words[j]] = [words[j], words[i]];
    }
  }

  useEffect(() => {
    getSentences();
    console.log("sentences------" + JSON.stringify(sentences));
  }, []);
  const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
  };

  const checkAnswer = (clicked) => {
    if (document.getElementById(clicked).value === answer) {
      updatePoints();
      updateSentences();
      setContextUser({
        ...user,
        points: user.points + sentences[radomSentenceIndex].points,
        words: {
          ...user.words,
          [dif]: [...user.words[dif], sentences[radomSentenceIndex].sentence],
        },
      });
      getSentences();
    } else {
      console.log("wrong answer");
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
        {radomSentenceIndex == -1 ? "you finished this level" : ""}
        {sentences && radomSentenceIndex != -1 && sentences[radomSentenceIndex]
          ? activeSentence
          : ""}
      </h1>
      {words.map((word) => {
        return (
          <button id={word} value={word} onClick={() => checkAnswer(word)}>
            {word}
          </button>
        );
      })}
    </div>
  );
}
