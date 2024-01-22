import React from "react";
import { useRouter } from "next/router";
import { Navbar } from "react-bootstrap";

export default function NavBar() {
  const router = useRouter();
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="/">
          {" "}
          <h2>Home</h2>{" "}
        </Navbar.Brand>
        <Navbar.Brand href="/login">
          {" "}
          <h2>Login</h2>{" "}
        </Navbar.Brand>
      </Navbar>
    </>
  );
}
