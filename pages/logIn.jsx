import { useState } from "react";

export default function logIn() {
  return (
    <>
      <div
        className="container"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <input
          type="text"
          name="mail"
          className="inputText"
          placeholder="enter mail"
        />
        <input
          type="text"
          name="password"
          className="inputText"
          placeholder="enter password"
        />
        <button style={{ margin: "10px" }}>Log In</button>
      </div>
    </>
  );
}
