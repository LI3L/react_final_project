import { useState } from "react";
import Layout from "../components/Layout/registerLayout";
import RegisterUser from "../components/registerUser";

export default function register() {
  return (
    <>
      <RegisterUser />
    </>
  );
}

register.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
