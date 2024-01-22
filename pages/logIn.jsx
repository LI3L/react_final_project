import { useState } from "react";
import NavBar from "../components/navbar";

export default function logIn() {
  return (
    <>
      <NavBar />
      <div className="logInPage">
        <div className="login-container">
          <div className="login-box">
            <h2>Login</h2>
            <form>
              <label htmlFor="username">Username:</label>
              <input type="text" id="username" name="username" />

              <label htmlFor="password">Password:</label>
              <input type="password" id="password" name="password" />

              <button type="submit">Login</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
