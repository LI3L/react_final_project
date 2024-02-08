import React, { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

export default function CreateSentence() {
  const [sentence, setSentence] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [words, setWords] = useState("");
  const [points, setPoints] = useState("");
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      axios.post("http://localhost:3001/api/sentences/", {
        sentence: sentence,
        difficulty: difficulty,
        words: words.split(),
        points: points,
      });
    } catch (err) {
      console.log(err);
    }
    setSentence("");
    setDifficulty("");
    setWords("");
    setPoints("");
  };

  return (
    <div style={{}}>
      <div style={styles.registerContainer}>
        <div style={styles.registerBox}>
          <form onSubmit={handleSubmit} style={styles.getDataFrom}>
            <input
              type="text"
              style={styles.mailPawwordInput}
              placeholder="sentence"
              value={sentence}
              onChange={(e) => {
                e.preventDefault();
                setSentence(e.target.value);
              }}
              required
            />
            <input
              type="text"
              style={styles.mailPawwordInput}
              placeholder="words space bettwen words"
              value={words}
              onChange={(e) => {
                e.preventDefault();
                setWords(e.target.value);
              }}
              required
            />
            <input
              type="text"
              style={styles.mailPawwordInput}
              placeholder="difficulty"
              value={difficulty}
              onChange={(e) => {
                e.preventDefault();
                setDifficulty(e.target.value);
              }}
              required
            />
            <input
              type="number"
              style={styles.mailPawwordInput}
              placeholder="points"
              value={points}
              onChange={(e) => {
                e.preventDefault();
                const inputValue = e.target.value;
                if (/^\d+$/.test(inputValue) || inputValue === "")
                  setPoints(inputValue);
              }}
              required
            />

            <button type="submit" style={styles.registerButton}>
              create
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

const styles = {
  registerBox: {
    padding: "50px" /* Increase the padding for a larger box */,
  },

  getDataFrom: {
    display: "flex",
    flexdirection: "column",
  },

  getLable: {
    marginbottom: "8px" /* Adjust margin for labels */,
    fontsize: "18px" /* Adjust font size for labels */,
  },

  mailPawwordInput: {
    padding: "4px" /* Adjust padding for input fields */,
    marginbottom: "12px" /* Adjust margin for input fields */,
    fontsize: "16px" /* Adjust font size for input fields */,
  },

  registerButton: {
    padding: "9px" /* Adjust padding for the button */,
    fontsize: "18px" /* Adjust font size for the button */,
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderradius: "6px",
    cursor: "pointer",
  },
};
