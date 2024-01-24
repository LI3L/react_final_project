import { useState } from "react";
import CustomNavbar from "../components/navbar";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  return (
    <>
      <CustomNavbar />
    </>
  );
}
