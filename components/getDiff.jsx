import React, { useState } from "react";
import { useRouter } from "next/router";
import styles from "./Layout/register.module.css";
import axios from "axios";
import Level from "./level.jsx";

export default function GetDiff({ dif,userId }) {
  return (
    <div>
      {dif == "easy" ? (
        <div>
            <Level userId={userId} dif={dif}/>
          <h1>easy</h1>
        </div>
      ) : dif == "medium" ? (
        <div>
          <h1>medium</h1>
        </div>
      ) : dif == "hard" ? (
        <div>
          <h1>hard</h1>
        </div>
      ) : dif == "random" ? (
        <div>
          <h1>random</h1>
        </div>
      ) : (
        <div>
          <h1>no dif</h1>
        </div>
      )}
    </div>
  );
}

// RegisterUser.getLayout = function getLayout(page) {
//   return (
//     <Layout>
//       <NestedLayout>{page}</NestedLayout>
//     </Layout>
//   );
// };
