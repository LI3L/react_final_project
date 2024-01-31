import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import styles from "./Layout/login.module.css";
import { useUser } from "./UserContext";

const axiosInstance = axios.create({
  validateStatus: (status) => status < 500,
});

export default function ConfirmUser() {

  const [formData, setFormData] = useState({
    mail: "",
    password: "",
  });
  const [worngValue, setWorngValue] = useState("");

  const router = useRouter(); // Get the router instance

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.post(
        "http://localhost:3001/api/users/login",
        formData
      );
      const logedinUser = response.data;
      console.log(logedinUser);
      if (logedinUser) {
        router.push("../user/" + logedinUser._id);
      } else {
        setWorngValue("Wrong username or password");
      }

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
    <div className={styles.logInPage} style={{ flexDirection: "column" }}>
      <div className={styles.loginContainer}>
        <h2>Login</h2>
        <form className={styles.getDataForm} onSubmit={handleSubmit}>
          <label className={styles.getLable}>
            Username:
            <input
              className={styles.mailPawwordInput}
              type="text"
              name="mail"
              value={formData.mail}
              onChange={handleChange}
            />
          </label>
          <label className={styles.getLable}>
            Password:
            <input
              className={styles.mailPawwordInput}
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </label>
          <button className={styles.loginButton} type="submit">
            Submit
          </button>
        </form>
      </div>
      <label className={styles.getLable} style={{ color: "red" }}>
        {worngValue}
      </label>
    </div>
  );
}

ConfirmUser.getLayout = function getLayout(page) {
  return (
    <Layout>
      <NestedLayout>{page}</NestedLayout>
    </Layout>
  );
};
