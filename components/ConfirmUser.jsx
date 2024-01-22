import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export default function ConfirmUser() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const router = useRouter(); // Get the router instance

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const respons = await axios.post(
        "http://localhost:27017/Duolingo/api/users/login",
        formData
      );
        const user =await respons.json();

      if (user) {
        router.push("../pages/index.jsx/" + user.name); // Use router.push to navigate
      }

      console.log("Data sent successfully");
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}
