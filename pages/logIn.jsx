import { useState } from "react";
import CustomNavbar from "../components/navbar";
import Layout from "../components/Layout/loginLayout";
import ConfirmUser from "../components/ConfirmUser";

export default function logIn() {
  return (
    <>
      <ConfirmUser />
    </>
  );
}

logIn.getLayout = function getLayout(page) {
  return <ConfirmUser />;
};
