import { useState } from "react";
import CustomNavbar from "../components/navbar";
import { useRouter } from "next/router";
import GetDiff from "../components/getDiff";

export default function Home() {
  return (
    <>
      <CustomNavbar />
      <GetDiff />

    </>
  );
}
