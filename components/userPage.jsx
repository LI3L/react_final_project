import { useUser } from "./UserContext";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Container, Dropdown } from "react-bootstrap";
import "./Layout/UserPage.module.css";
import LeaderBoard from "./LeaderBoard";
import CreateWord from "./createWord"; // corrected import name
import CreateSentence from "./createSentence";
import PiChart from "./PieChart";
const myData = [
  { name: "Category 1", value: 40 },
  { name: "Category 2", value: 20 },
  { name: "Category 3", value: 30 },
];

export default function UserPage(dif) {
  const [admin, setAdmin] = useState(false);
  const [adminDataWord, setAdminDataWord] = useState(false);
  const [adminDataSentence, setAdminDataSentence] = useState(false);
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
      if (user && user._id) {
        // Check if user exists before accessing its properties
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
        if (user.admin === true) setAdmin(true); // Correct comparison operator
        console.log(JSON.stringify(user) + "asfakjfakjnfakjn");
        console.log(user.admin + "asfakjfakjnfakjn");
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
    <>
      {/* <PieChart /> */}
      <PiChart />
      {/* <div
        className="user-page"
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
        <div style={{ display: "flex", flexDirection: "column", width: "30%" }}>
          <LeaderBoard />

          {user && admin && !adminDataWord ? (
            <button
              style={{
                height: 60,
                fontSize: 20,
                backgroundColor: "#89e219",
                margin: 5,
              }} // Changed to Bootstrap Button
              onClick={(e) => {
                e.preventDefault();
                setAdminDataWord(!adminDataWord);
              }}
            >
              Add Word
            </button>
          ) : (
            ""
          )}
          {user && admin && adminDataWord ? (
            <button
              style={{
                height: 60,
                fontSize: 20,
                backgroundColor: "#89e219",
                margin: 5,
              }}
              onClick={(e) => {
                e.preventDefault();
                setAdminDataWord(!adminDataWord);
              }}
            >
              Close
            </button>
          ) : (
            ""
          )}

          {user && admin && !adminDataSentence ? (
            <button
              style={{
                height: 60,
                fontSize: 20,
                backgroundColor: "#89e219",
                margin: 5,
              }} // Changed to Bootstrap Button
              onClick={(e) => {
                e.preventDefault();
                setAdminDataSentence(!adminDataSentence);
              }}
            >
              Add Sentence
            </button>
          ) : (
            ""
          )}
          {user && admin && adminDataSentence ? (
            <button
              style={{
                height: 60,
                fontSize: 20,
                backgroundColor: "#89e219",
                margin: 5,
              }}
              onClick={(e) => {
                e.preventDefault();
                setAdminDataSentence(!adminDataSentence);
              }}
            >
              Close
            </button>
          ) : (
            ""
          )}
          {user && adminDataWord ? <CreateWord /> : ""}
          {user && adminDataSentence ? <CreateSentence /> : ""}
        </div>
        <div
          style={{
            margin: 0,
            // width: "100%",
            flex: 3,
            height: "10%",
            display: "flex",
            alignItems: "center",
            justifyContent: "end",
            flexDirection: "column",
            // position: "absolute",
          }}
        >
          <h1>Profile</h1>
          <h2>{user && user.name}</h2>
          <h2>Points: {points}</h2>

          <div className="dropdowns-container">
            <div className="dropdown-section">
              <h2>Words:</h2>
              <Container>
                <Dropdown title="easy" id="basic-dropdown1">
                  {words_easy.length === 0 ? (
                    <p>No words found for easy level</p>
                  ) : (
                    <p>
                      easy:
                      {JSON.stringify(words_easy)
                        .replace(/"/g, "")
                        .replace(/[\[\]']+/g, "")
                        .trim()}
                    </p>
                  )}
                </Dropdown>
                <Dropdown title="medium" id="basic-dropdown2">
                  {words_medium.length === 0 ? (
                    <p>No words found for medium level</p>
                  ) : (
                    <p>
                      medium:
                      {JSON.stringify(words_medium)
                        .replace(/"/g, "")
                        .replace(/[\[\]']+/g, "")
                        .trim()}
                    </p>
                  )}
                </Dropdown>
                <Dropdown title="hard" id="basic-dropdown3">
                  {words_hard.length === 0 ? (
                    <p>No words found for hard level</p>
                  ) : (
                    <p>
                      hard:
                      {JSON.stringify(words_hard)
                        .replace(/"/g, "")
                        .replace(/[\[\]']+/g, "")
                        .trim()}
                    </p>
                  )}
                </Dropdown>
              </Container>
            </div>

            <div className="dropdown-section">
              <h2>Sentences:</h2>
              <Container>
                <Dropdown title="easy" id="basic-dropdown4">
                  {sentences_easy.length === 0 ? (
                    <p>No sentences found for easy level</p>
                  ) : (
                    <p>
                      easy:
                      {JSON.stringify(sentences_easy)
                        .replace(/"/g, "")
                        .replace(/[\[\]']+/g, "")
                        .trim()}
                    </p>
                  )}
                </Dropdown>
                <Dropdown title="medium" id="basic-dropdown5">
                  {sentences_medium.length === 0 ? (
                    <p>No sentences found for medium level</p>
                  ) : (
                    <p>
                      medium:
                      {JSON.stringify(sentences_medium)
                        .replace(/"/g, "")
                        .replace(/[\[\]']+/g, "")
                        .trim()}
                    </p>
                  )}
                </Dropdown>
                <Dropdown title="hard" id="basic-dropdown6">
                  {sentences_hard.length === 0 ? (
                    <p>No sentences found for hard level</p>
                  ) : (
                    <p>
                      hard:
                      {JSON.stringify(sentences_hard)
                        .replace(/"/g, "")
                        .replace(/[\[\]']+/g, "")
                        .trim()}
                    </p>
                  )}
                </Dropdown>
              </Container>
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
}
