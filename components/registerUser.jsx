import React, { useState } from "react";
import { useRouter } from "next/router";
import styles from "./Layout/register.module.css";
import axios from "axios";

export default function RegisterUser() {
  const [name, setName] = useState("");
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  const router = useRouter();
  const [worngValue, setWorngValue] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    let exists = false;
    try {
      const result = await axios.post(
        "http://localhost:3001/api/users/exists",
        mail
      );
      exists = result.data;
      console.log(exists);
    } catch (err) {
      console.log(err);
    }

    if (!exists) {
      axios.post("http://localhost:3001/api/users/", {
        name: name,
        mail: mail,
        password: password,
        age: age,
      });
      // Add your registration logic here
      console.log("Registration data:", {
        name: name,
        mail: mail,
        password: password,
        age: age,
      });
      router.push("../login");
    } else {
      setWorngValue("This email is already registered");
    }
  };

  return (
    <div className={styles.registerPage} style={{ flexDirection: "column" }}>
      <div className={styles.registerContainer}>
        <div className={styles.registerBox}>
          <h2>Register</h2>
          <form onSubmit={handleSubmit} className={styles.getDataFrom}>
            <label className={styles.getLable}>Name</label>
            <input
              type="text"
              className={styles.mailPawwordInput}
              placeholder="name"
              value={name}
              onChange={(e) => {
                e.preventDefault();
                setName(e.target.value);
              }}
              required
            />

            <label className={styles.getLable}>Email</label>
            <input
              type="email"
              className={styles.mailPawwordInput}
              placeholder="Email"
              value={mail}
              onChange={(e) => {
                e.preventDefault();
                setMail(e.target.value);
              }}
              required
            />
            <label className={styles.getLable}>Age</label>
            <input
              type="number"
              className={styles.mailPawwordInput}
              placeholder="age"
              value={age}
              onChange={(e) => {
                e.preventDefault();
                const inputValue = e.target.value;
                if (/^\d+$/.test(inputValue) || inputValue === "")
                  setAge(inputValue);
              }}
              required
            />

            <label className={styles.getLable}>Password</label>
            <input
              type="password"
              className={styles.mailPawwordInput}
              placeholder="Password"
              value={password}
              onChange={(e) => {
                e.preventDefault();
                setPassword(e.target.value);
              }}
              required
            />

            <button type="submit" className={styles.registerButton}>
              Register
            </button>
          </form>
        </div>
      </div>
      <label className={styles.getLable} style={{ color: "red" }}>
        {worngValue}
      </label>
    </div>
  );
}

RegisterUser.getLayout = function getLayout(page) {
  return (
    <Layout>
      <NestedLayout>{page}</NestedLayout>
    </Layout>
  );
};
