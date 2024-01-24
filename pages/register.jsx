import { useState } from "react";
import NavBar from "../components/navbar";
import Layout from "../components/Layout/loginLayout";
import ConfirmUser from "../components/register";

export default function Register() {
  return (
    <>
      <Register/>
      
    </>
  );
}

Register.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
