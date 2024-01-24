import { useState } from "react";
import NavBar from "../components/navbar";
import Layout from "../components/Layout/loginLayout";
import ConfirmUser from "../components/ConfirmUser";

export default function logIn() {
  return (
    <>
      <ConfirmUser />
      {/* <div className="logInPage">
        <div className={styles.loginContainer}>
          <div className="loginBox">
            <h2>Login</h2>
            <form className={styles.getData} onSubmit={}>
              <label className={styles.getLable} htmlFor="username">
                Username:
              </label>
              <input
                className={styles.mailPawwordInput}
                type="text"
                id="username"
                name="username"
              />

              <label className={styles.getLable} htmlFor="password">
                Password:
              </label>
              <input
                className={styles.mailPawwordInput}
                type="password"
                id="password"
                name="password"
              />

              <button className={styles.loginButton} type="submit">
                Login
              </button>
            </form>
          </div>
        </div>
      </div> */}
    </>
  );
}

logIn.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
