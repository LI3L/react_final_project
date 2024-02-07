import React, { useState } from "react";
import axios from "axios";

const axiosInstance = axios.create({
  validateStatus: (status) => status < 500,
});

export default function CreatreWord() {
  const [formData, setFormData] = useState({
    name: "",
    difficulty: "",
    translation: "",
    points: 0,
  });
  const [worngValue, setWorngValue] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.post(
        "http://localhost:3001/api/words",
        formData
      );
      console.log("Data sent successfully");
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div style={{ flexDirection: "column", border: "solid 1px black" }}>
      <div>
        <form
          style={{ display: "flex", flexDirection: "column" }}
          onSubmit={handleSubmit}
        >
          <label>
            word:
            <input
              type="text"
              name="word"
              value={formData.name}
              onChange={handleChange}
            />
          </label>
          <label>
            difficulty:
            <input
              type="text"
              name="difficulty"
              value={formData.difficulty}
              onChange={handleChange}
            />
          </label>
          <label>
            translation:
            <input
              type="text"
              name="translation"
              value={formData.translation}
              onChange={handleChange}
            />
          </label>
          <label>
            points:
            <input
              type="text"
              name="points"
              value={formData.points}
              onChange={handleChange}
            />
          </label>
          <button type="submit">Submit</button>
        </form>
      </div>
      <label style={{ color: "red" }}>{worngValue}</label>
    </div>
  );
}
