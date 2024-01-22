import React from "react";
import { useRouter } from "next/router";
import Navbar from "./navbar";
import Footer from "./footer";

export default function NavBar() {
  const router = useRouter();
  return (
    <>
      <Navbar />
      <button onClick={() => router.push("/")}>Home</button>
      <button onClick={() => router.push("/login")}>login</button>
      <Footer />
    </>
  );
}
