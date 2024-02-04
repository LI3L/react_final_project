import { useUser } from "./UserContext";
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function UserPage(dif) {
  const { user, setUser: setContextUser } = useUser();
  const [words, setWords] = useState([]);
  const [sentences, setSentences] = useState([]);
  const [points, setPoints] = useState(0);

  async function getData() {
    try {
      if (user._id) {
        const response = await axios.get(
          "http://localhost:3001/api/users/" + user._id
        );
        setWords(response.data.words);
        setSentences(response.data.sentences);
        setPoints(response.data.points);
      }
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    const fetchData = async () => await getData();
    fetchData();
  }, [dif]);

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
      <h1>Profil</h1>
      <h1>{user.name}</h1>
      <h1>{points}</h1>
      <h1>Words:</h1>
      <ul>
        {words.map((word) => (
          <li>{word.name}</li>
        ))}
      </ul>
      <h1>Sentences:</h1>
      <ul>
        {sentences.map((sentence) => (
          <li>{sentence.sentence}</li>
        ))}
      </ul>
    </div>
  );
}
