import { useUser } from "./UserContext";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Dropdown } from "react-bootstrap";
import "./Layout/UserPage.module.css";

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
    <div
      className="user-page"
      style={{
        margin: 0,
        width: "100%",
        height: "88%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#57CC04",
        flexDirection: "column",
        position: "absolute",
      }}
    >
      <h1>Profile</h1>
      <h2>{user.name}</h2>
      <h2>Points: {points}</h2>

      <div className="dropdowns-container">
        <div className="dropdown-section">
          <h2>Words:</h2>
          <Container>
            <Dropdown title="easy" id="basic-dropdown1">
              {JSON.stringify(words_easy)
                .replace(/"/g, "")
                .replace(/[\[\]']+/g, "")
                .trim()}
              {words_easy.length === 0 && <p>No words found for easy level</p>}
            </Dropdown>
            <Dropdown title="medium" id="basic-dropdown2">
              {JSON.stringify(words_medium)
                .replace(/"/g, "")
                .replace(/[\[\]']+/g, "")
                .trim()}
              {words_medium.length === 0 && (
                <p>No words found for medium level</p>
              )}
            </Dropdown>
            <Dropdown title="hard" id="basic-dropdown3">
              {JSON.stringify(words_hard)
                .replace(/"/g, "")
                .replace(/[\[\]']+/g, "")
                .trim()}
              {words_hard.length === 0 && <p>No words found for hard level</p>}
            </Dropdown>
          </Container>
        </div>

        <div className="dropdown-section">
          <h2>Sentences:</h2>
          <Container>
            <Dropdown title="easy" id="basic-dropdown4">
              {sentences_easy.map((sentence) => (
                <Dropdown.Item key={sentence.id}>
                  {sentence.sentence}
                </Dropdown.Item>
              ))}
              {sentences_easy.length === 0 && (
                <p>No sentences found for easy level</p>
              )}
            </Dropdown>
            <Dropdown title="medium" id="basic-dropdown5">
              {sentences_medium.map((sentence) => (
                <Dropdown.Item key={sentence.id}>
                  {sentence.sentence}
                </Dropdown.Item>
              ))}
              {sentences_medium.length === 0 && (
                <p>No sentences found for medium level</p>
              )}
            </Dropdown>
            <Dropdown title="hard" id="basic-dropdown6">
              {sentences_hard.map((sentence) => (
                <Dropdown.Item key={sentence.id}>
                  {sentence.sentence}
                </Dropdown.Item>
              ))}
              {sentences_hard.length === 0 && (
                <p>No sentences found for hard level</p>
              )}
            </Dropdown>
          </Container>
        </div>
      </div>
    </div>
  );
}
