import React, { useState, useEffect, use } from "react";
import axios from "axios";
import { useUser } from "./UserContext";

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
        "http://localhost:3001/api/users/addSentence/" + user._id,
        {
          sentence: sentences[radomSentenceIndex].sentence,
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
          points: sentences[radomSentenceIndex].points,
        }
      );
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
        setSentences(response.data);
        let rndi = getRandomInt(0, response.data.length, response.data);
        setRadomSentenceIndex(rndi);
        if (rndi != -1) {
          let ans =
            response.data[rndi].sentence.split(" ")[
              getRandomInt(
                0,
                response.data[rndi].sentence.split(" ").length,
                response.data
              )
            ];
          setAnswer(ans);
          let temp = "";
          response.data[rndi].sentence.split(" ").map((word) => {
            if (word === ans) {
              temp += " " + "____";
            } else {
              temp += " " + word;
            }
          });

          setActiveSentence(temp);
          let tempWords = response.data[rndi].words;
          tempWords.push(ans);
          setWords(tempWords);
        }
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    const fetchData = async () => await getSentences();

    fetchData();
  }, [dif]);

  const getRandomInt = (min, max, sentences) => {
    let num = Math.floor(Math.random() * (max - min) + min);
    let end = false;
    while (
      user &&
      sentences.length > 0 &&
      user.sentences[dif].includes(sentences[num].sentence)
    ) {
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

  const checkAnswer = (clicked) => {
    if (clicked == answer) {
      updatePoints();
      updateSentences();
      setContextUser({
        ...user,
        points: user.points + sentences[radomSentenceIndex].points,
        sentences: {
          ...user.sentences,
          [dif]: [
            ...user.sentences[dif],
            sentences[radomSentenceIndex].sentence,
          ],
        },
      });
      console.log("updateUser" + user.sentences[dif]);
      getSentences();
      dif = "easy";
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
        {radomSentenceIndex == -1
          ? "you finished this level"
          : sentences &&
            radomSentenceIndex != -1 &&
            sentences[radomSentenceIndex]
          ? activeSentence
          : ""}
      </h1>
      {radomSentenceIndex != -1
        ? words.map((word, index) => {
            return (
              <button key={index} id={word} onClick={() => checkAnswer(word)}>
                {word}
              </button>
            );
          })
        : ""}
    </div>
  );
}
