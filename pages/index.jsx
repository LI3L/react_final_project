import { useState } from "react";
import NavBar from "../components/navbar";
import { useRouter } from "next/router";

const user = {};
const wordList = ["apple", "banana", "home", "dog", "class"];

export default function Home() {
  const router = useRouter();

  return (
    <>
      <NavBar />
    </>
  );
}
