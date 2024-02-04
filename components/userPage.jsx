import { useUser } from "./UserContext";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Dropdown } from "react-bootstrap";
import 

export default function UserPage(dif) {
  const { user, setUser: setContextUser } = useUser();
  const [words_easy, setWords_easy] = useState([]);
  const [words_medium, setWords_medium] = useState([]);
  const [words_hard, setWords_hard] = useState([]);
  const [sentences_easy, setSentences_easy] = useState([]);
  const [sentences_medium, setSentences_medium] = useState([]);
  const [sentences_hard, setSentences_hard] = useState([]);
  const [points, setPoints] = useState(0);

  async function getData() {
    try {
      if (user._id) {
        const response = await axios.get(
          "http://localhost:3001/api/users/" + user._id
        );
        setWords_easy(response.data.words.easy);
        setWords_medium(response.data.words.medium);
        setWords_hard(response.data.words.hard);
        setSentences_easy(response.data.sentences.easy);
        setSentences_medium(response.data.sentences.medium);
        setSentences_hard(response.data.sentences.hard);
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
    <div className="user-page">
      <h1>Profil</h1>
      <h2>{user.name}</h2>
      <h2>Points: {points}</h2>

      <div className="dropdowns-container">
        <div className="dropdown-section">
          <h2>Words:</h2>
          <Dropdown title="easy" id="basic-dropdown">
            {words_easy.map((word) => (
              <Dropdown.Item key={word.id}>{word.name}</Dropdown.Item>
            ))}
          </Dropdown>
          <Dropdown title="medium" id="basic-dropdown">
            {words_medium.map((word) => (
              <Dropdown.Item key={word.id}>{word.name}</Dropdown.Item>
            ))}
          </Dropdown>
          <Dropdown title="hard" id="basic-dropdown">
            {words_hard.map((word) => (
              <Dropdown.Item key={word.id}>{word.name}</Dropdown.Item>
            ))}
          </Dropdown>
        </div>

        <div className="dropdown-section">
          <h2>Sentences:</h2>
          <Dropdown title="easy" id="basic-dropdown">
            {sentences_easy.map((sentence) => (
              <Dropdown.Item key={sentence.id}>
                {sentence.sentence}
              </Dropdown.Item>
            ))}
          </Dropdown>
          <Dropdown title="medium" id="basic-dropdown">
            {sentences_medium.map((sentence) => (
              <Dropdown.Item key={sentence.id}>
                {sentence.sentence}
              </Dropdown.Item>
            ))}
          </Dropdown>
          <Dropdown title="hard" id="basic-dropdown">
            {sentences_hard.map((sentence) => (
              <Dropdown.Item key={sentence.id}>
                {sentence.sentence}
              </Dropdown.Item>
            ))}
          </Dropdown>
        </div>
      </div>
    </div>
  );
}
