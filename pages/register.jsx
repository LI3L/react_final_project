import { useState } from "react";
import Layout from "../components/Layout/registerLayout";
import Register from "../components/register";

export default function Register() {
  return (
    <>
      <Register />
    </>
  );
}

Register.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
